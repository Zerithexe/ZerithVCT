const EVENT_START = new Date('2026-09-24T17:00:00+08:00');
const EVENT_END = new Date('2026-10-18T14:00:00+08:00');
const LIVE_API_URL = ''; // CORS izinli kendi JSON endpoint'in varsa buraya yaz.
const POLL_MS = 5000;

const teams = [
  {id:'100t',name:'100 Thieves',short:'100T',region:'Americas',seed:'Stage 2 #1',color:'#b8bdc9',players:['Asuna','Cryocells','Timotino','vora','bang'],coach:'d00mbr0s',captain:'bang'},
  {id:'g2',name:'G2 Esports',short:'G2',region:'Americas',seed:'Points #2',color:'#d8e0e9',players:['trent','valyn','leaf','jawgemo','BABYBAY'],coach:'JoshRT',captain:'valyn'},
  {id:'loud',name:'LOUD',short:'LOUD',region:'Americas',seed:'Stage 2 #2',color:'#82d2a2',players:['lukxo','Darker','erde','tkzin','DaviH'],coach:'Bati',captain:'tkzin'},
  {id:'nrg',name:'NRG',short:'NRG',region:'Americas',seed:'Points #1',color:'#ff6f22',players:['Ethan','mada','brawk','skuba','keiko'],coach:'bonkar',captain:'Ethan'},
  {id:'fut',name:'FUT Esports',short:'FUT',region:'EMEA',seed:'Points #1',color:'#ffb52e',players:['yetujey','xeus','KROSTALY','s0pp','sociablEE'],coach:'Vlad',captain:'sociablEE'},
  {id:'vit',name:'Team Vitality',short:'VIT',region:'EMEA',seed:'Points #2',color:'#e5b6ff',players:['Derke','Sayonara','Chronicle','Jamppi','PROFEK'],coach:'Scuttt',captain:'Jamppi'},
  {id:'tl',name:'Team Liquid',short:'TL',region:'EMEA',seed:'Stage 2 #2',color:'#00c9e8',players:['nAts','kamo','Kicks','trexx','GSR'],coach:'yaotziN',captain:'nAts'},
  {id:'kc',name:'Karmine Corp',short:'KC',region:'EMEA',seed:'Stage 2 #1',color:'#62a1ff',players:['aveZ','SUYGETSU','dos9','LêwN','N4RRATE'],coach:'simoz',captain:'aveZ'},
  {id:'ge',name:'Global Esports',short:'GE',region:'Pacific',seed:'Stage 2 #1',color:'#ffd63d',players:['Kr1stal','UdoTan','autumn','xavi8k','PatMen'],coach:'Aimix',captain:'PatMen'},
  {id:'ns',name:'Nongshim RedForce',short:'NS',region:'Pacific',seed:'Stage 2 #2',color:'#e51a2d',players:['Xross','Dambi','Francis','Ivy','Rb'],coach:'sungmin',captain:'Ivy'},
  {id:'prx',name:'Paper Rex',short:'PRX',region:'Pacific',seed:'Points #1',color:'#e7cb19',players:['d4v41','f0rsakeN','something','Jinggg','invy'],coach:'alecks',captain:'d4v41'},
  {id:'t1',name:'T1',short:'T1',region:'Pacific',seed:'Points #2',color:'#e71b2c',players:['iZu','stax','Meteor','BuZz','Munchkin'],coach:'KDG',captain:'Munchkin'},
  {id:'tyl',name:'TYLOO',short:'TYL',region:'China',seed:'Stage 2 #1',color:'#ff4d38',players:['slowly','Scales','Splash','Erv','SiuFatBB'],coach:'Billyo',captain:'xihe'},
  {id:'jdg',name:'JD Gaming',short:'JDG',region:'China',seed:'Stage 2 #2',color:'#f0a92d',players:['jkuro','Yuicaw','zhe','BerLIN','crownfisher'],coach:'bail',captain:'BerLIN'},
  {id:'xlg',name:'XLG Esports',short:'XLG',region:'China',seed:'Points #2',color:'#b0c9ff',players:['Rarga','happywei','NoMan','Lysoar','WsLeo'],coach:'steady',captain:'WsLeo'},
  {id:'edg',name:'EDward Gaming',short:'EDG',region:'China',seed:'Points #1',color:'#d8d8d8',players:['CHICHOO','nobody','ZmjjKK','Smoggy','stew'],coach:'indigo',captain:'nobody'}
];

const matches = [
  mk('m1','2026-09-24T17:00:00+08:00','Team Liquid','Paper Rex','C','Opening','upcoming'),
  mk('m2','2026-09-24T20:00:00+08:00','TYLOO','G2 Esports','C','Opening','upcoming'),
  mk('m3','2026-09-25T17:00:00+08:00','Nongshim RedForce','NRG','D','Opening','upcoming'),
  mk('m4','2026-09-25T20:00:00+08:00','Karmine Corp','XLG Esports','D','Opening','upcoming'),
  mk('m5','2026-09-26T17:00:00+08:00','Global Esports','Team Vitality','B','Opening','upcoming'),
  mk('m6','2026-09-26T20:00:00+08:00','LOUD','EDward Gaming','B','Opening','upcoming'),
  mk('m7','2026-09-27T17:00:00+08:00','100 Thieves','T1','A','Opening','upcoming'),
  mk('m8','2026-09-27T20:00:00+08:00','JD Gaming','FUT Esports','A','Opening','upcoming'),
  mk('m9','2026-09-29T17:00:00+08:00','TBD','TBD','C','Winner\'s','upcoming'),
  mk('m10','2026-09-29T20:00:00+08:00','TBD','TBD','D','Winner\'s','upcoming'),
  mk('m11','2026-09-30T17:00:00+08:00','TBD','TBD','A','Winner\'s','upcoming'),
  mk('m12','2026-09-30T20:00:00+08:00','TBD','TBD','B','Winner\'s','upcoming'),
  mk('m13','2026-10-01T17:00:00+08:00','TBD','TBD','C','Elimination','upcoming'),
  mk('m14','2026-10-01T20:00:00+08:00','TBD','TBD','D','Elimination','upcoming'),
  mk('m15','2026-10-02T17:00:00+08:00','TBD','TBD','A','Elimination','upcoming'),
  mk('m16','2026-10-02T20:00:00+08:00','TBD','TBD','B','Elimination','upcoming'),
  mk('m17','2026-10-03T17:00:00+08:00','TBD','TBD','C','Decider','upcoming'),
  mk('m18','2026-10-03T20:00:00+08:00','TBD','TBD','D','Decider','upcoming'),
  mk('m19','2026-10-04T17:00:00+08:00','TBD','TBD','A','Decider','upcoming'),
  mk('m20','2026-10-04T20:00:00+08:00','TBD','TBD','B','Decider','upcoming'),
  mk('m21','2026-10-07T17:00:00+08:00','TBD','TBD','','Upper QF','upcoming'),
  mk('m22','2026-10-07T20:00:00+08:00','TBD','TBD','','Upper QF','upcoming'),
  mk('m23','2026-10-08T17:00:00+08:00','TBD','TBD','','Upper QF','upcoming'),
  mk('m24','2026-10-08T20:00:00+08:00','TBD','TBD','','Upper QF','upcoming'),
  mk('m25','2026-10-09T17:00:00+08:00','TBD','TBD','','Lower R1','upcoming'),
  mk('m26','2026-10-09T20:00:00+08:00','TBD','TBD','','Lower R1','upcoming'),
  mk('m27','2026-10-10T17:00:00+08:00','TBD','TBD','','Upper SF','upcoming'),
  mk('m28','2026-10-10T20:00:00+08:00','TBD','TBD','','Upper SF','upcoming'),
  mk('m29','2026-10-11T17:00:00+08:00','TBD','TBD','','Lower R2','upcoming'),
  mk('m30','2026-10-11T20:00:00+08:00','TBD','TBD','','Lower R2','upcoming'),
  mk('m31','2026-10-16T14:00:00+08:00','TBD','TBD','','Upper Final','upcoming'),
  mk('m32','2026-10-16T17:00:00+08:00','TBD','TBD','','Lower SF','upcoming'),
  mk('m33','2026-10-17T15:00:00+08:00','TBD','TBD','','Lower Final','upcoming'),
  mk('m34','2026-10-18T14:00:00+08:00','TBD','TBD','','Grand Final','upcoming')
];
function mk(id,date,a,b,group,round,status){return {id,date,a,b,group,round,status,scoreA:null,scoreB:null,liveMap:null}}

const groups = {
  A:['100 Thieves','JD Gaming','FUT Esports','T1'],
  B:['Global Esports','LOUD','Team Vitality','EDward Gaming'],
  C:['Team Liquid','Paper Rex','TYLOO','G2 Esports'],
  D:['Nongshim RedForce','NRG','Karmine Corp','XLG Esports']
};

const news = [
  {tag:'CHAMPIONS',title:'Champions Shanghai: Everything You Need To Know',text:'Format, 16 qualified teams, grup aşaması ve playoff yapısı için turnuva öncesi rehber.',url:'https://valorantesports.com/news/everything-you-need-to-know-champions-shanghai'},
  {tag:'SCHEDULE',title:'Champions Shanghai açılış günü belli oldu',text:'24 Eylül’de Team Liquid–Paper Rex ve TYLOO–G2 ile grup aşaması başlıyor.',url:'https://valorantesports.com/'},
  {tag:'FUT',title:'FUT Esports dünya sahnesine dönüyor',text:'FUT, EMEA Championship Points yoluyla 2026 Champions kadrosunda yer alıyor.',url:'https://liquipedia.net/valorant/FUT_Esports'}
];

const state={filter:'all',authMode:'login',user:null,dataMode:'demo'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function teamByName(name){return teams.find(t=>t.name===name||t.short===name)}
function logoHtml(name,cls=''){
  const t=teamByName(name);
  if(!t) return `<span class="team-logo ${cls}" style="--team:#303744">?</span>`;
  return `<span class="team-logo ${cls}" style="--team:${t.color}">${t.short.slice(0,3)}</span>`;
}
function trTime(iso){return new Intl.DateTimeFormat('tr-TR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(iso))}
function trDate(iso){return new Intl.DateTimeFormat('tr-TR',{weekday:'short',day:'2-digit',month:'short'}).format(new Date(iso))}
function diffText(date){const d=Math.max(0,new Date(date)-Date.now());const s=Math.floor(d/1000);const days=Math.floor(s/86400);const hrs=Math.floor(s%86400/3600);const min=Math.floor(s%3600/60);const sec=s%60;return days?`${days}g ${String(hrs).padStart(2,'0')}s`:hrs?`${String(hrs).padStart(2,'0')}:${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function localNowStatus(m){const start=new Date(m.date);const end=new Date(start.getTime()+3*60*60*1000);if(Date.now()>=end && m.scoreA!==null)return'completed';if(Date.now()>=start && Date.now()<end)return'live';return'upcoming'}
function renderCountdown(){const d=Math.max(0,EVENT_START-Date.now());const s=Math.floor(d/1000);const days=Math.floor(s/86400);const h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=s%60;$('#eventCountdown').textContent=`${String(days).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
function renderTicker(){const items=['Champions Shanghai · 24 SEP → 18 OCT','FUT vs JDG · 27 SEP · 15:00 TRT','Group C · TL vs PRX','16 TEAM · 4 GSL GROUPS','GRAND FINAL · 18 OCT'];$('#liveTicker').innerHTML=[...items,...items].map(x=>`<span>◆ ${x}</span>`).join('')}

function renderNextMatch(){const upcoming=matches.filter(m=>localNowStatus(m)==='upcoming').sort((a,b)=>new Date(a.date)-new Date(b.date))[0];if(!upcoming){$('#nextMatch').innerHTML='<div class="empty">Yaklaşan maç bulunamadı.</div>';return}$('#nextMatch').innerHTML=`<div class="feature-label">${upcoming.round} · GROUP ${upcoming.group||'PLAYOFFS'}</div><div class="feature-match"><div class="feature-team">${logoHtml(upcoming.a,'lg')}<span>${upcoming.a}</span></div><div class="vs-box"><strong>${trTime(upcoming.date)}</strong><small>${trDate(upcoming.date)} · TRT</small><br><small>${diffText(upcoming.date)} kaldı</small></div><div class="feature-team"><span>${upcoming.b}</span>${logoHtml(upcoming.b,'lg')}</div></div>`}

function renderMatches(){const status=state.filter;const arr=matches.filter(m=>status==='all'||localNowStatus(m)===status);$('#matchesGrid').innerHTML=arr.map(m=>matchHtml(m)).join('')||'<div class="empty">Bu filtrede maç yok.</div>'}
function matchHtml(m){const st=localNowStatus(m);const isTbd=m.a==='TBD'||m.b==='TBD';let stateHtml=st==='live'?`<span class="status-live"><i></i> CANLI</span>`:st==='completed'?`<span class="status-final">BİTTİ</span>`:`<span>${diffText(m.date)}</span>`;return `<article class="match-card"><div><div class="match-meta">${m.group?`GRUP ${m.group} · `:''}${m.round}</div><div style="margin-top:8px"><span class="pill">BO3</span></div></div><div class="match-versus"><div class="match-team-row"><span>${logoHtml(m.a,'sm')}${m.a}</span><span class="score">${m.scoreA??'—'}</span></div><div class="match-team-row"><span>${logoHtml(m.b,'sm')}${m.b}</span><span class="score">${m.scoreB??'—'}</span></div></div><div class="match-time"><strong>${trTime(m.date)}</strong><span>${trDate(m.date)} · TRT</span><div>${stateHtml}</div>${!isTbd&&st!=='completed'?'<a class="watch-link" href="https://valorantesports.com/" target="_blank" rel="noreferrer">İzleme merkezi ↗</a>':''}</div></article>`}

function renderGroups(){const groupNames=['A','B','C','D'];$('#groupsGrid').innerHTML=groupNames.map(g=>{const rows=groups[g].map((name,i)=>`<div class="group-team"><span class="rank">${i+1}</span>${logoHtml(name,'sm')}<strong>${name}</strong><span class="record">0-0</span></div>`).join('');return `<div class="group-card"><div class="group-head"><span class="group-name">GROUP ${g}</span><span class="muted">GSL · BO3</span></div>${rows}</div>`}).join('')}

function renderTeams(){const q=$('#teamSearch').value.trim().toLowerCase();const list=teams.filter(t=>`${t.name} ${t.short} ${t.region} ${t.players.join(' ')}`.toLowerCase().includes(q));$('#teamsGrid').innerHTML=list.map(t=>`<article class="team-card" style="--team:${t.color}" data-team="${t.id}"><div class="team-top">${logoHtml(t.name,'lg')}<div><div class="team-name">${t.name}</div><div class="team-region">${t.region} · ${t.seed}</div></div></div><div class="team-bottom"><span>ROSTER <b>5</b></span><span>COACH <b>${t.coach}</b></span></div></article>`).join('')||'<div class="empty">Aramana uygun takım yok.</div>';$$('.team-card').forEach(el=>el.addEventListener('click',()=>openTeam(el.dataset.team)))}

function renderNews(){$('#newsGrid').innerHTML=news.map(n=>`<article class="news-card"><div class="news-tag">${n.tag}</div><h3>${n.title}</h3><p>${n.text}</p><a href="${n.url}" target="_blank" rel="noreferrer">Kaynağı aç ↗</a></article>`).join('')}

function getStore(){try{return JSON.parse(localStorage.getItem('vctpulse_state')||'{}')}catch{return{}}}
function setStore(o){localStorage.setItem('vctpulse_state',JSON.stringify(o))}
function getUser(){return state.user}
function userData(){const u=getUser();if(!u)return null;const d=getStore();return d.users?.find(x=>x.username===u.username)||null}
function renderPoints(){const d=userData()||{points:0,correct:0,predictions:0};$('#pointsValue').textContent=d.points;$('#dashPoints').textContent=d.points;$('#dashCorrect').textContent=d.correct;$('#dashPredictions').textContent=d.predictions;const badges=[['FIRST PULSE',d.predictions>=1],['HOT STREAK',d.correct>=3],['500 XP',d.points>=500],['CHAMPIONS FAN',d.predictions>=5]];$('#badges').innerHTML=badges.map(([n,on])=>`<span class="badge">${on?'◆':'◇'} ${n}</span>`).join('');}
function renderUser(){const area=$('#userArea');const u=getUser();area.innerHTML=u?`<div style="display:flex;align-items:center;gap:6px"><button class="user-btn" id="profileBtn"><span class="avatar">${u.username.slice(0,2).toUpperCase()}</span>${u.username}</button><button class="logout" id="logoutBtn">Çıkış</button></div>`:`<button class="user-btn" id="loginBtn">Giriş / Kayıt</button>`;if($('#loginBtn'))$('#loginBtn').onclick=()=>openAuth('login');if($('#profileBtn'))$('#profileBtn').onclick=()=>document.querySelector('#dashboard').scrollIntoView();if($('#logoutBtn'))$('#logoutBtn').onclick=logout}

function challengeRows(){const available=matches.filter(m=>['m1','m2','m3','m4','m5','m6','m7','m8'].includes(m.id));const d=userData();$('#challengeList').innerHTML=available.map(m=>{const chosen=d?.picks?.[m.id]||'';return `<div class="challenge-row"><div><div class="match-meta">${trDate(m.date)} · ${trTime(m.date)} TRT</div><div class="challenge-match">${logoHtml(m.a,'sm')} ${m.a} <span style="color:var(--muted)">vs</span> ${m.b} ${logoHtml(m.b,'sm')}</div></div><div class="challenge-btns"><button class="challenge-option ${chosen===m.a?'selected':''}" ${chosen?'disabled':''} data-match="${m.id}" data-pick="${m.a}">${m.a}</button><button class="challenge-option ${chosen===m.b?'selected':''}" ${chosen?'disabled':''} data-match="${m.id}" data-pick="${m.b}">${m.b}</button></div></div>`}).join('');$$('.challenge-option').forEach(btn=>btn.addEventListener('click',()=>makePick(btn.dataset.match,btn.dataset.pick)))}
function renderLeaderboard(){const d=getStore();const rows=(d.users||[]).map(u=>({name:u.username,points:u.points||0})).sort((a,b)=>b.points-a.points).slice(0,6);while(rows.length<6)rows.push({name:['VALO_FAN','PulseUser','FUTsupport','JettMain','VCTTR','NeonEntry'][rows.length],points:[980,830,720,615,530,480][rows.length]});$('#leaderboard').innerHTML=rows.map((r,i)=>`<div class="leader-row"><span class="leader-rank">#${i+1}</span><span class="leader-name">${r.name}</span><span class="leader-pts">${r.points}</span></div>`).join('')}
async function makePick(matchId,pick){const u=getUser();if(!u){openAuth('login');toast('Tahmin yapmak için giriş yapmalısın.');return}const store=getStore();const usr=store.users.find(x=>x.username===u.username);usr.picks=usr.picks||{};if(usr.picks[matchId])return;usr.picks[matchId]=pick;usr.predictions=(usr.predictions||0)+1;setStore(store);renderPoints();challengeRows();renderLeaderboard();toast('Seçimin kaydedildi.');}

function openTeam(id){const t=teams.find(x=>x.id===id);if(!t)return;$('#teamModalBody').innerHTML=`<div class="team-modal-head">${logoHtml(t.name,'lg')}<div><h2>${t.name}</h2><p>${t.region} · ${t.seed} · IGL: ${t.captain}</p></div></div><div class="roster">${t.players.map(p=>`<div class="player"><span class="player-avatar">${p.slice(0,2).toUpperCase()}</span><div><b>${p}</b><small>PLAYER</small></div></div>`).join('')}</div><div class="staff"><span class="staff-chip">HEAD COACH · <b>${t.coach}</b></span><span class="staff-chip">CAPTAIN / IGL · <b>${t.captain}</b></span></div>`;$('#teamModal').classList.remove('hidden')}
function openAuth(mode){state.authMode=mode;syncAuthUI();$('#authModal').classList.remove('hidden');setTimeout(()=>$('#authUser').focus(),30)}
function syncAuthUI(){const login=state.authMode==='login';$('#authTitle').textContent=login?'Hesabına giriş yap':'Yeni hesap oluştur';$('#authSubmit').textContent=login?'Giriş Yap':'Kayıt Ol';$('#emailWrap').style.display=login?'none':'block';$$('.auth-tab').forEach(b=>b.classList.toggle('active',b.dataset.authTab===state.authMode));$('#authMessage').textContent='';$('#authForm').reset();$('#rememberMe').checked=true}
function closeModals(){$('#authModal').classList.add('hidden');$('#teamModal').classList.add('hidden')}
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.remove('hidden');clearTimeout(window.__toast);window.__toast=setTimeout(()=>$('#toast').classList.add('hidden'),2700)}
async function hashPass(s){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('')}
async function authSubmit(e){e.preventDefault();const username=$('#authUser').value.trim();const email=$('#authEmail').value.trim();const pass=$('#authPass').value;if(username.length<3){$('#authMessage').textContent='Kullanıcı adı en az 3 karakter olmalı.';return}const store=getStore();store.users=store.users||[];if(state.authMode==='register'){if(!email){$('#authMessage').textContent='E-posta gerekli.';return}if(store.users.some(u=>u.username.toLowerCase()===username.toLowerCase())){$('#authMessage').textContent='Bu kullanıcı adı zaten var.';return}store.users.push({username,email,password:await hashPass(pass),points:0,correct:0,predictions:0,picks:{}});setStore(store);state.user={username,email};localStorage.setItem('vctpulse_session',JSON.stringify(state.user));closeModals();renderUser();renderPoints();renderLeaderboard();challengeRows();toast('Hesabın oluşturuldu.')}else{const hash=await hashPass(pass);const usr=store.users.find(u=>u.username===username&&u.password===hash);if(!usr){$('#authMessage').textContent='Kullanıcı adı veya şifre hatalı.';return}state.user={username:usr.username,email:usr.email};const target=$('#rememberMe').checked?localStorage:sessionStorage;target.setItem('vctpulse_session',JSON.stringify(state.user));closeModals();renderUser();renderPoints();renderLeaderboard();challengeRows();toast('Hoş geldin '+usr.username+'!')}}
function restoreSession(){let raw=sessionStorage.getItem('vctpulse_session')||localStorage.getItem('vctpulse_session');if(!raw)return;try{state.user=JSON.parse(raw)}catch{}}
function logout(){sessionStorage.removeItem('vctpulse_session');localStorage.removeItem('vctpulse_session');state.user=null;renderUser();renderPoints();renderLeaderboard();challengeRows();toast('Oturum kapatıldı.')}

async function refreshFromApi(){if(!LIVE_API_URL){state.dataMode='demo';$('#syncStatus').innerHTML='<i></i> Demo veri';return}try{const res=await fetch(LIVE_API_URL,{cache:'no-store'});if(!res.ok)throw new Error('HTTP '+res.status);const payload=await res.json();if(Array.isArray(payload.matches))payload.matches.forEach(remote=>{const local=matches.find(x=>x.id===remote.id);if(local)Object.assign(local,remote)});state.dataMode='live';$('#syncStatus').innerHTML='<i></i> Canlı API';renderMatches();renderNextMatch();challengeRows()}catch(err){state.dataMode='fallback';$('#syncStatus').innerHTML='<i></i> API bekleniyor';}}

function setup(){restoreSession();renderTicker();renderNextMatch();renderMatches();renderGroups();renderTeams();renderNews();renderUser();renderPoints();challengeRows();renderLeaderboard();
  setInterval(()=>{renderCountdown();renderNextMatch();renderMatches()},1000);refreshFromApi();setInterval(refreshFromApi,POLL_MS);
  $$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;renderMatches()});
  $('#teamSearch').addEventListener('input',renderTeams);
  $('#refreshBtn').onclick=()=>{refreshFromApi();toast('Veri yenileme başlatıldı.')};
  $('#themeToggle').onclick=()=>{document.body.classList.toggle('light');localStorage.setItem('vctpulse_theme',document.body.classList.contains('light')?'light':'dark')};
  if(localStorage.getItem('vctpulse_theme')==='light')document.body.classList.add('light');
  $$('[data-close-modal],[data-close-team]').forEach(b=>b.onclick=closeModals);$$('.auth-tab').forEach(b=>b.onclick=()=>{state.authMode=b.dataset.authTab;syncAuthUI()});$('#authForm').addEventListener('submit',authSubmit);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
  document.addEventListener('click',e=>{if(e.target.id==='userArea')return;if(e.target.closest('#profileBtn')){$('#dashboard').scrollIntoView()};if(e.target.closest('.logout'))logout()});
}

document.addEventListener('DOMContentLoaded',setup);
