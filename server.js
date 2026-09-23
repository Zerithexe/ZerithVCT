/*
  OPTIONAL LIVE DATA BRIDGE
  ----------------------------------------
  GitHub Pages only serves static files. To get true second-by-second scores,
  deploy a small Node service somewhere that can access your chosen esports
  data provider, then set LIVE_API_URL in script.js to this server's endpoint.

  This template intentionally does not hard-code an unofficial scraper.
  Expected GET /api/matches response:
  {
    "matches": [
      {"id":"m1","date":"2026-09-24T17:00:00+08:00","a":"Team Liquid","b":"Paper Rex","scoreA":1,"scoreB":0,"status":"live","liveMap":"Haven"}
    ]
  }
*/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (_req,res)=>res.json({ok:true,service:'VCT PULSE live bridge'}));
app.get('/api/matches', (_req,res)=>{
  res.json({
    updatedAt:new Date().toISOString(),
    matches:[]
  });
});

app.listen(PORT,()=>console.log(`VCT PULSE bridge listening on :${PORT}`));
