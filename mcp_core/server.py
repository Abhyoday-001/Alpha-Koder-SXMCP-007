import uuid
import time
import sqlite3
import json
import os
from typing import Dict, Any, List, Optional
from mcp.server.fastmcp import FastMCP

class MCPMemoryServer:
    def __init__(self, db_path="data/medifi_memory.db"):
        self.db_path = db_path
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        with self._get_connection() as conn:
            # Enhanced memory table with versioning
            conn.execute("""
                CREATE TABLE IF NOT EXISTS memories (
                    key TEXT PRIMARY KEY,
                    value TEXT,
                    version INTEGER DEFAULT 1,
                    last_updated_by TEXT,
                    updated_at REAL
                )
            """)
            # Audit logs table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    action TEXT,
                    key TEXT,
                    agent TEXT,
                    timestamp REAL
                )
            """)
            # Jobs table
            conn.execute("""
                CREATE TABLE IF NOT EXISTS jobs (
                    job_id TEXT PRIMARY KEY,
                    status TEXT,
                    progress TEXT,
                    result TEXT,
                    created_at REAL
                )
            """)
            conn.commit()

    def write_memory(self, key: str, value: Any, agent: str = "system"):
        with self._get_connection() as conn:
            # Check current version
            row = conn.execute("SELECT version FROM memories WHERE key = ?", (key,)).fetchone()
            new_version = (row[0] + 1) if row else 1
            
            conn.execute("""
                INSERT OR REPLACE INTO memories (key, value, version, last_updated_by, updated_at) 
                VALUES (?, ?, ?, ?, ?)
            """, (key, json.dumps(value), new_version, agent, time.time()))
            
            # Log the action
            conn.execute("""
                INSERT INTO audit_logs (action, key, agent, timestamp) 
                VALUES (?, ?, ?, ?)
            """, ("WRITE", key, agent, time.time()))
            
            conn.commit()

    def read_memory(self, key: str, agent: str = "system") -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            row = conn.execute("SELECT value, version, last_updated_by, updated_at FROM memories WHERE key = ?", (key,)).fetchone()
            if row:
                # Log the read action
                conn.execute("""
                    INSERT INTO audit_logs (action, key, agent, timestamp) 
                    VALUES (?, ?, ?, ?)
                """, ("READ", key, agent, time.time()))
                conn.commit()
                return {
                    "value": json.loads(row[0]),
                    "version": row[1],
                    "last_updated_by": row[2],
                    "updated_at": row[3]
                }
            return None

    def get_audit_logs(self, limit: int = 50) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            rows = conn.execute("SELECT action, key, agent, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT ?", (limit,)).fetchall()
            return [{"action": r[0], "key": r[1], "agent": r[2], "timestamp": r[3]} for r in rows]

# --- MCP Tool Wrapper ---

mcp_server = MCPMemoryServer()
fast_mcp = FastMCP("MediFi_Core", instructions="Advanced Memory Server for Multi-Agent Orchestration")

@fast_mcp.tool()
async def write_memory(key: str, value: str, agent_name: str = "unknown") -> str:
    """Stores information with versioning and audit logs."""
    mcp_server.write_memory(key, value, agent_name)
    return f"Success: Memory '{key}' updated to a new version by {agent_name}."

@fast_mcp.tool()
async def read_memory(key: str, agent_name: str = "unknown") -> str:
    """Retrieves information and logs the access."""
    data = mcp_server.read_memory(key, agent_name)
    if not data:
        return f"Error: No information found for '{key}'."
    return json.dumps(data, indent=2)

@fast_mcp.tool()
async def get_audit_trail() -> str:
    """Returns the last 20 access logs for transparency."""
    logs = mcp_server.get_audit_logs(20)
    return json.dumps(logs, indent=2)
