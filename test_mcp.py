import asyncio
import json
from main import mcp, write_memory, read_memory, start_processing_job, check_job_status

async def test_mcp():
    print("--- Testing MCP Tools ---")
    
    # 1. Test write_memory
    res = await write_memory(key="mission", value="Optimize Hospital Expenses")
    print(f"Write: {res}")
    
    # 2. Test read_memory
    res = await read_memory(key="mission")
    print(f"Read: {res}")
    
    # 3. Test start_processing_job
    res = await start_processing_job()
    print(f"Start Job: {res}")
    job_id = res.split(": ")[1]
    
    # 4. Check status immediately
    res = await check_job_status(job_id=job_id)
    print(f"Initial Status: {res}")
    
    # 5. Wait for background task to progress
    print("Waiting 3 seconds...")
    await asyncio.sleep(3)
    
    res = await check_job_status(job_id=job_id)
    print(f"Progress Status: {res}")

if __name__ == "__main__":
    asyncio.run(test_mcp())
