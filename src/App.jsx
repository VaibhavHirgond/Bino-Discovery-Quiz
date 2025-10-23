// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';

const BACKEND = process.env.REACT_APP_BACKEND || 'http://localhost:4000';

function App(){
  const [count, setCount] = useState(null);

  useEffect(()=> {
    fetch(`${BACKEND}/api/stats`).then(r=>r.json()).then(d=>setCount(d.total)).catch(()=>{});
  }, []);

  const shareText = encodeURIComponent(
    "Discover Bino — a WhatsApp-based search platform that answers queries instantly. Try it: https://bino.example.com"
  );

  const handleShare = async () => {
    // fire backend event
    try {
      await fetch(`${BACKEND}/api/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Shared Bino QuickShare', origin: 'landing' })
      });
      const stats = await fetch(`${BACKEND}/api/stats`).then(r=>r.json());
      setCount(stats.total);
    } catch(e) {
      console.error(e);
    }
    // open WhatsApp share
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
  };

  return (
    <div style={{fontFamily:'Inter, system-ui', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:20}}>
      <div style={{maxWidth:800, width:'100%', textAlign:'center', borderRadius:12, padding:30, boxShadow:'0 10px 30px rgba(0,0,0,0.08)'}}>
        <h1 style={{marginBottom:6}}>Bino QuickShare</h1>
        <p style={{color:'#555'}}>Share Bino fast on WhatsApp and help it reach more users. Click the button below to pre-fill the message.</p>

        <div style={{margin:'20px 0'}}>
          <button onClick={handleShare} style={{padding:'12px 20px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600}}>
            Share on WhatsApp
          </button>
        </div>

        <div style={{marginTop:10, color:'#666'}}>
          <strong>{count !== null ? count : '—'}</strong> shares recorded
        </div>

        <small style={{display:'block', marginTop:14, color:'#999'}}>One-click share + tracking. Deployable in minutes.</small>
      </div>
    </div>
  );
}

export default App;
