import React, { useState } from 'react';
import '../styles/App.css';

const Dashboard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulating instant AI processing (No glitches)
    setTimeout(() => {
      setIsUploading(false);
      setShowReport(true);
    }, 1500);
  };

  return (
    <div className="main-layout">
      <nav className="sidebar">
        <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#0984E3', marginBottom: 40}}>MediFi</div>
        <div style={{color: '#636E72', fontSize: '0.8rem', marginBottom: 20}}>MENU</div>
        <div style={{fontWeight: 'bold', color: '#0984E3', marginBottom: 15, cursor: 'pointer', transition: 'color 0.2s'}}>🏠 Dashboard</div>
        <div style={{color: '#636E72', marginBottom: 15, cursor: 'pointer', transition: 'color 0.2s'}}>📋 MCP Memory</div>
        <div style={{color: '#636E72', marginBottom: 15, cursor: 'pointer', transition: 'color 0.2s'}}>📁 Patient Files</div>
        <div style={{color: '#636E72', marginBottom: 15, cursor: 'pointer', transition: 'color 0.2s'}}>🤖 Agent Swarm</div>
        <div style={{color: '#636E72', marginBottom: 15, cursor: 'pointer', transition: 'color 0.2s'}}>📈 Financial Planning</div>
      </nav>

      <main className="content-area">
        <header style={{marginBottom: 30}}>
          <h1 style={{margin: 0}}>Welcome, Dr. Olivia</h1>
          <p style={{color: '#636E72', marginTop: 5}}>MediFi uses MCP to orchestrate medical and financial agents. Upload patient reports to begin automated execution.</p>
        </header>

        {/* UPLOAD SECTION */}
        {!showReport && (
          <div className="upload-box" onClick={handleUpload}>
            {isUploading ? (
              <div style={{color: '#0984E3'}}>
                <div className="spinner"></div> 
                <h3>MCP Agents Orchestrating...</h3>
                <p>Reading Reports • Checking Authenticity • Syncing Memory</p>
              </div>
            ) : (
              <div>
                <span style={{fontSize: '3rem'}}>📄</span>
                <h3>Click to upload Patient Reports</h3>
                <p>Supports PDF, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        )}

        {/* AUTOMATED RESULT SECTION */}
        {showReport && (
          <div className="report-container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <h2 style={{margin: 0}}>Automated AI Summary</h2>
              <div className="auth-badge">AUTHENTICATED BY MCP: Document Source Verified</div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px'}}>
              {/* Report Body */}
              <div>
                <p style={{lineHeight: '1.8'}}>
                  Patient presents with <span className="highlight-yellow">Acute Appendicitis</span> as confirmed by the Medical Agent. 
                  The Insurance Agent has identified <span className="highlight-cyan">Policy #99283-X</span> which covers 85% of surgery costs. 
                  <br/><br/>
                  <strong>NGO Outreach:</strong> Scheme Agent found a match with <span className="highlight-yellow">"HealthFirst NGO"</span> for the remaining balance. 
                  Authenticity check confirms <span style={{color: 'green', fontWeight: 'bold'}}>No Metadata Anomalies</span>; document source verified via Hospital Ledger.
                </p>
                
                <div style={{marginTop: 30, padding: '20px', background: '#F8F9FB', borderRadius: '15px'}}>
                   <h4 style={{marginTop: 0}}>Financial Planner Script:</h4>
                   <p style={{fontSize: '0.9rem', color: '#2D3436'}}><em>"Execute Claim for $4,200 immediately. Draft NGO letter for $800 gap funding. Expected approval: 4 hours."</em></p>
                   <button 
                     onClick={() => alert("Final Output Generated: Insurance claim executed and NGO outreach messaging sent.")}
                     style={{background: '#0984E3', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                   >
                     Execute Workflow
                   </button>
                </div>
              </div>

              {/* Agent Status Side Bar */}
              <div style={{borderLeft: '1px solid #EEE', paddingLeft: '20px'}}>
                <h4 style={{marginTop: 0}}>Agent Trail</h4>
                <div style={{fontSize: '0.85rem', marginBottom: 15, lineHeight: '1.6'}}>
                  <div style={{color: 'var(--success-green)'}}>● Medical: Context Analyzed</div>
                  <div style={{color: 'var(--success-green)'}}>● Insurance: Claim Drafted</div>
                  <div style={{color: 'var(--success-green)'}}>● Scheme: Eligibility Checked</div>
                  <div style={{color: 'var(--success-green)'}}>● NGO: Outreach Ready</div>
                  <div style={{color: 'var(--success-green)'}}>● Financial Planner: Executing</div>
                </div>
                <button onClick={() => setShowReport(false)} style={{background: 'none', border: '1px solid #DDD', padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem'}}>Upload New</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;