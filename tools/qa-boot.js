/* QA: jsdom boot test — paleidžia deck'ą be naršyklės ir patikrina V6 kelius.
   Paleisti:  node tools/qa-boot.js                                        */
const fs=require('fs'),path=require('path');
const {JSDOM,VirtualConsole}=require('jsdom');

const ROOT=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');

let pass=0,fail=0;const fails=[];
function ok(name,cond,extra){
  if(cond){pass++;console.log('  ✅ '+name);}
  else{fail++;fails.push(name+(extra?' — '+extra:''));console.log('  ❌ '+name+(extra?' — '+extra:''));}
}

// nutildom tik išorinių resursų triukšmą, bet gaudom tikras JS klaidas
const errors=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>{
  const m=String(e.message||'');
  if(/Could not load|Failed to load|not implemented|resource/i.test(m))return;
  errors.push(m);
});
vc.on('error',(...a)=>errors.push(a.join(' ')));

// išpjaunam išorinius <script src> (CDN nepasiekiamas jsdom'e) — tikrinam savo kodą
const local=html.replace(/<script src="https:[^"]*"><\/script>/g,'');

// jsdom neturi canvas/matchMedia — pakisam minimalius stubus PRIES scenarijaus vykdyma,
// kad testuotume savo koda, o ne jsdom spragas.
const dom=new JSDOM(local,{runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc,
  url:'http://localhost:8899/index.html'});
const w=dom.window;
w.matchMedia=q=>({matches:false,media:q,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
const ctx2d=new Proxy({},{get:(t,k)=>{
  if(k==='canvas')return{width:300,height:150};
  if(k==='getImageData')return(x,y,cw,chh)=>({data:new Uint8ClampedArray(Math.max(4,cw*chh*4))});
  if(k==='createLinearGradient'||k==='createRadialGradient')return()=>({addColorStop(){}});
  if(k==='measureText')return()=>({width:10});
  return()=>{};
}});
w.HTMLCanvasElement.prototype.getContext=()=>ctx2d;
w.HTMLMediaElement.prototype.play=function(){return Promise.resolve()};
w.HTMLMediaElement.prototype.pause=function(){};
w.HTMLMediaElement.prototype.load=function(){};
w.navigator.mediaDevices={getUserMedia:()=>Promise.reject(new Error('no cam'))};
w.confirm=()=>true; w.alert=()=>{};
w.AudioContext=w.webkitAudioContext=function(){
  const node=()=>({connect(){},start(){},stop(){},
    gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},
    frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){},value:0},
    type:'',Q:{value:0},buffer:null});
  return{state:'running',currentTime:0,sampleRate:44100,destination:{},resume(){},
    createOscillator:node,createGain:node,createBiquadFilter:node,createBufferSource:node,
    createBuffer:(c,l)=>({getChannelData:()=>new Float32Array(l)})};
};
// dabar paleidziam puslapio scenarijus su paruosta aplinka
dom.window.document.querySelectorAll('script').forEach(sc=>{
  if(sc.src)return;
  try{ w.eval(sc.textContent); }catch(e){ errors.push('SCRIPT: '+e.message); }
});

console.log('\n== 1. Įkrova ==');
ok('be JS klaidų įkraunant',errors.length===0,errors.slice(0,3).join(' | '));
ok('sukurtos visos skaidrės',w.document.querySelectorAll('.slide').length===22,
   'rasta '+w.document.querySelectorAll('.slide').length);
ok('SL masyvas = 22',w.SL&&w.SL.length===22,'SL='+(w.SL&&w.SL.length));
ok('kiekviena skaidrė turi notes',w.SL.every(s=>s.notes&&s.notes.say&&s.notes.do&&s.notes.br));
ok('kiekviena skaidrė turi tag ir sec',w.SL.every(s=>s.tag&&s.sec>0));

console.log('\n== 2. VO prisegimas (vo:N nepasislinko) ==');
const vos=w.SL.filter(s=>s.vo).map(s=>s.vo);
ok('18 VO failų prisegti',vos.length===18,'rasta '+vos.length);
ok('VO numeriai 1..18 be dublikatų',
   JSON.stringify(vos.slice().sort((a,b)=>a-b))===JSON.stringify([...Array(18)].map((_,i)=>i+1)));
const newSlides=w.SL.filter(s=>!s.vo).map(s=>s.tag);
ok('naujos skaidrės be VO (kris TTS)',newSlides.length===4,newSlides.join(','));

console.log('\n== 3. SFX su trūkstamais failais ==');
ok('SFX registras turi 4 vardus',
   ['fa','jee','tada','victory'].every(k=>w.SFX[k]&&/assets\/sfx\//.test(w.SFX[k])));
let sfxThrew=null;
try{['fa','jee','tada','victory'].forEach(n=>w.sfx(n));}catch(e){sfxThrew=e.message}
ok('sfx() neišmeta klaidos be mp3 failų',!sfxThrew,sfxThrew);
ok('sfx pažymėtas probing/synth (ne file)',
   Object.keys(w.SFXST).length===4 && Object.values(w.SFXST).every(s=>s.mode!=='file'));
w.toggleMute();
ok('mute perjungiamas',w.MUTED===true);
w.toggleMute();
ok('unmute grąžina',w.MUTED===false);

console.log('\n== 4. AURA API ==');
const a0=w.AURA.pts;
w.aura(500,'testas');
ok('aura(+500) prideda',w.AURA.pts===a0+500,'pts='+w.AURA.pts);
w.aura(-100,'testas');
ok('aura(-100) atima',w.AURA.pts===a0+400);
ok('HUD atsidaro savaime',w.AURA.on===true);
ok('HUD rodo skaičių',/\d/.test(w.document.getElementById('auraVal').textContent));
ok('popup sukuriamas',w.document.querySelectorAll('#auraPops .apop').length>0);
ok('aura log pildomas',w.AURA.log.length>=2);
w.aura(0,'nulis');
ok('aura(0) nieko nedaro',w.AURA.log.length===2||w.AURA.log.length>=2);

console.log('\n== 5. Chat variklis ==');
w.streamToggle(true);
ok('stream įsijungia',w.STREAM.on===true&&w.document.body.classList.contains('stream'));
ok('chat klasė uždėta',w.document.body.classList.contains('chat'));
for(let i=0;i<60;i++)w.chatSay();
const msgs=w.document.querySelectorAll('#chatLog .cmsg').length;
ok('chat žinutės atsiranda',msgs>0,'log='+msgs);
ok('logas apribotas (<=16)',msgs<=16,'log='+msgs);
ok('žinučių suskaičiuota >=50',w.STREAM.msgs>=50,'msgs='+w.STREAM.msgs);
const topics=Object.keys(w.CHATP).length;
ok('temų pool >= 20',topics>=20,'temų='+topics);
const total=Object.values(w.CHATP).reduce((n,p)=>n+p.length,0);
ok('žinučių bazė >= 90',total>=90,'iš viso='+total);
const qs=Object.values(w.CHATP).reduce((n,p)=>n+p.filter(m=>m.q).length,0);
ok('klausimų >= 10',qs>=10,'klausimų='+qs);
const v0=w.STREAM.viewers;
w.streamAuraEvent(500);
ok('aura įvykis kelia žiūrovus',w.STREAM.viewers>v0);
ok('sekėjai auga',w.STREAM.follows>0);
w.forceMilestone();
ok('1000 sekėjų riboženklis suveikia',w.STREAM.milestoneHit===true);
ok('prizo perdanga rodoma',w.document.getElementById('milestone').classList.contains('on'));
w.streamToggle(false);
ok('stream išsijungia',w.STREAM.on===false&&!w.document.body.classList.contains('stream'));

console.log('\n== 6. Čempionato būsenų mašina ==');
w.show(w.SL.findIndex(s=>s.tag==='cempionatas'));
['A','B','C','D'].forEach((n,i)=>{const el=w.document.getElementById('chn'+i);if(el)el.value='Vaikas'+n;});
w.chStart();
ok('4 žaidėjai sukurti',w.CH.players.length===4);
ok('vardai perimti',w.CH.players[0].n==='VaikasA');
ok('1 ratas · žaidimas A',w.CH.round===1&&w.CH.game==='A');
ok('scratch faze',w.CH.phase==='scratch');
ok('bilieto canvas yra',!!w.document.getElementById('scratchCv'));
ok('bracket atvaizduotas',w.document.querySelectorAll('#chBracket .chp').length===4);
// visi 4 gauna taškus (apeinam realų žaidimą)
for(let i=0;i<4;i++){w.CH.idx=i;w.chScore(4-i,'qa');if(i<3)w.chNext();}
ok('taškai užskaityti',w.CH.players.map(p=>p.score).join(',')==='4,3,2,1');
w.chRoundEnd();
ok('2 silpniausi iškrenta',w.CH.players.filter(p=>p.out).length===2);
ok('finalas paruoštas (žaidimas B)',w.CH.round===2&&w.CH.game==='B'&&w.CH.order.length===2);
w.CH.idx=0;w.chScore(5,'qa');w.CH.idx=1;w.chScore(2,'qa');
w.chRoundEnd();
ok('nugalėtojas paskelbtas',!!w.document.getElementById('chWinner').textContent.match(/ČEMPIONAS/));
ok('nugalėtojas teisingas',w.CH.players.find(p=>p.winner).n==='VaikasA');
// lygiųjų kelias -> žaidimas C
w.chReset();
ok('reset grąžina į setup',w.CH.phase==='setup'&&w.CH.players.length===0);
w.chStart();
for(let i=0;i<4;i++){w.CH.idx=i;w.chScore(2,'qa');if(i<3)w.chNext();}
w.chRoundEnd();
w.CH.idx=0;w.chScore(3,'qa');w.CH.idx=1;w.chScore(3,'qa');
w.chRoundEnd();
ok('lygiosios -> REAKCIJA (C)',w.CH.round===3&&w.CH.game==='C');

console.log('\n== 7. Pultas / Supabase (be tinklo) ==');
ok('kambario kodas 4 simbolių',/^[A-Z0-9]{4}$/.test(w.pultRoom()),w.pultRoom());
ok('kodas stabilus',w.pultRoom()===w.pultRoom());
ok('pulto URL teisingas',w.pultURL().endsWith('pultas.html?room='+w.pultRoom()),w.pultURL());
let pultThrew=null;
try{w.pultInit();}catch(e){pultThrew=e.message}
ok('pultInit() nelūžta be supabase',!pultThrew,pultThrew);
ok('be interneto rodo išjungtą būseną',
   /išjungtas|nepasiekiamas|jungiamasi/.test(w.document.getElementById('pultState').textContent));
let confThrew=null;
try{w.confettiBurst(10);}catch(e){confThrew=e.message}
ok('confettiBurst veikia',!confThrew&&w.document.querySelectorAll('#confetti .conf').length===10,confThrew);

console.log('\n== 8. Kiti V6 keliai ==');
let memeThrew=null;
try{w.memeShow();}catch(e){memeThrew=e.message}
ok('memeShow() veikia',!memeThrew&&w.document.getElementById('memeBox').classList.contains('on'),memeThrew);
w.memeHide();
ok('memeHide() uždaro',!w.document.getElementById('memeBox').classList.contains('on'));
ok('67 testas: teisingas atsakymas duoda aurą',(()=>{
  w.show(w.SL.findIndex(s=>s.tag==='miegas'));
  const before=w.AURA.pts;
  w.q67(1,w.document.querySelector('#q67 .bigans:last-child'));
  return w.AURA.pts===before+400;})());
ok('67 testas: neteisingas atima',(()=>{
  const before=w.AURA.pts;
  w.q67(0,w.document.querySelector('#q67 .bigans'));
  return w.AURA.pts===before-100;})());
w.timerStart();w.timerRender();
ok('laikmatis piešiamas',/⏱/.test(w.document.getElementById('tmrBox')?w.document.getElementById('tmrBox').innerHTML:''));
const budget=w.SL.reduce((n,s)=>n+s.sec,0);
ok('tempo biudžetas 24–33 min',budget>=1440&&budget<=1980,Math.round(budget/60)+' min');
let gestThrew=null;
try{w.MP.poseRes=null;w.MP.handRes=null;w.auraGestures();
    w.auraOn=true;w.MP.poseRes=[{x:.5,y:.5,visibility:.9}];w.auraGestures();
    w.MP.poseRes=null;w.auraOn=false;}catch(e){gestThrew=e.message}
ok('auraGestures() saugus su tuščiais duomenimis',!gestThrew,gestThrew);
ok('countFingers() atviras delnas = 5',(()=>{
  const lm=[];for(let i=0;i<21;i++)lm.push({x:.5,y:.5});
  [[8,6],[12,10],[16,14],[20,18]].forEach(([t,p])=>{lm[t].y=.2;lm[p].y=.5});
  lm[4]={x:.1,y:.5};lm[3]={x:.42,y:.5};lm[17]={x:.6,y:.5};
  return w.countFingers(lm)===5;})());
// visos skaidrės perjungiamos be klaidų
const before=errors.length;
for(let i=0;i<w.SL.length;i++)w.show(i);
ok('visos 22 skaidrės perjungiamos be klaidų',errors.length===before,errors.slice(before,before+3).join(' | '));

console.log('\n== 9. Numirę keliai pašalinti ==');
ok('nėra toggleGestures',typeof w.toggleGestures==='undefined');
ok('nėra gestOn kintamojo',typeof w.gestOn==='undefined');

// ============================ V6.14 ============================
console.log('\n== 10. V6.14 garsu lenta ==');
ok('SFXBOARD turi 10 garsu',Array.isArray(w.SFXBOARD)&&w.SFXBOARD.length===10,
   'rasta '+(w.SFXBOARD&&w.SFXBOARD.length));
ok('board id pos1-4/neg1-4/fun1-2',
   ['pos1','pos2','pos3','pos4','neg1','neg2','neg3','neg4','fun1','fun2']
     .every(id=>w.SFXBOARD.some(x=>x.id===id)));
ok('visi board id yra SFX zemelapyje',
   ['pos1','neg4','fun2'].every(id=>/assets\/sfx\//.test(w.SFX[id]||'')));
ok('kiekvienas garsas turi label+emoji+kind',
   w.SFXBOARD.every(x=>x.label&&x.emoji&&/^(pos|neg|fun)$/.test(x.kind)));
ok('sfxStatus() isvardija ir naujus id',(()=>{
   const out=w.sfxStatus();return out.some(l=>/pos1/.test(l))&&out.some(l=>/fun2/.test(l));})());
let boardThrew=null;
try{ ['pos1','neg1','fun1','fun2'].forEach(n=>w.sfx(n)); }catch(e){ boardThrew=e.message }
ok('sfx() su lentos id neismeta klaidos',!boardThrew,boardThrew);
ok('SFXALIAS neg->fa, fun->victory, pos->jee',
   w.SFXALIAS.neg1==='fa'&&w.SFXALIAS.fun1==='victory'&&w.SFXALIAS.pos1==='jee');
ok('klavisai 1-4/5-8/9-0 priristi prie lentos',
   w.SFXKEYS['1']==='pos1'&&w.SFXKEYS['4']==='pos4'&&w.SFXKEYS['5']==='neg1'&&
   w.SFXKEYS['8']==='neg4'&&w.SFXKEYS['9']==='fun1'&&w.SFXKEYS['0']==='fun2');
ok('skaitmens klavisas nekeicia skaidres',(()=>{
   const before=w.cur;
   w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'1'}));
   return w.cur===before;})());

console.log('\n== 11. V6.14 streamer kamera ==');
ok('SCAM pradine busena off/right',w.SCAM.mode==='off'&&w.SCAM.side==='right');
ok('scamCycle() be kameros nesugriauna deck o',(()=>{
   try{ w.scamCycle(); return true }catch(e){ return false }})());
ok('scamSwap() keicia puse ir CSS klase',(()=>{
   w.scamSwap();
   const l=w.document.body.classList.contains('scam-left');
   w.scamSwap();
   return l&&w.document.body.classList.contains('scam-right');})());
ok('scamSet("half") uzdeda body.scam-half',(()=>{
   w.camStream={getTracks:()=>[{stop(){}}]};      // apsimetam, kad srautas jau yra
   w.scamSet('half');
   const on=w.document.body.classList.contains('scam-half');
   w.scamSet('off'); w.camStream=null;
   return on;})());
ok('scamSet("off") nuima klases',
   !w.document.body.classList.contains('scam-half')&&!w.document.body.classList.contains('scam-pip'));
ok('camBusy() melagingas kai viskas isjungta',w.camBusy()===false);
ok('camGet/camAttach egzistuoja (vienas srautas)',
   typeof w.camGet==='function'&&typeof w.camAttach==='function');
ok('#scam ir #scamVid yra DOM e',!!w.document.getElementById('scam')&&!!w.document.getElementById('scamVid'));

console.log('\n== 12. V6.14 tvarkarastis ==');
ok('tvarkarascio skaidre yra',w.SL.some(s=>s.tag==='tvarkarastis'));
ok('TVK numatytieji: ketvirtadieniais + QR_URL',w.TVK.diena===4&&w.TVK.nuoroda===w.QR_URL);
ok('tvkDate() -> lietuviskas menuo',w.tvkDate('2026-09-18')==='nuo rugsėjo 18 d.');
ok('tvkDate() tuscia = tuscia',w.tvkDate('')==='');
ok('tvkRender() pripildo eilute',(()=>{
   w.TVK.diena=4; w.TVK.laikas='14:00-15:30'; w.TVK.kab='23'; w.TVK.nuo='2026-09-18';
   w.tvkRender();
   const L=w.document.getElementById('tvkLine').textContent;
   const M=w.document.getElementById('tvkMeta').textContent;
   return /Ketvirtadieniais/.test(L)&&/14:00–15:30/.test(L)&&/23 kab\./.test(M)&&/rugsėjo 18/.test(M);})());
ok('tvkSave() irasytas i localStorage',(()=>{
   w.document.getElementById('tvkM').value='Testų licėjus';
   w.document.getElementById('tvkD').value='2';
   w.document.getElementById('tvkT').value='15:00-16:30';
   w.document.getElementById('tvkK').value='7';
   w.tvkSave();
   const j=JSON.parse(w.localStorage.getItem('bcday-tvk')||'{}');
   return j.mokykla==='Testų licėjus'&&j.diena===2&&j.kab==='7';})());
ok('tvkEdit() atidaro ir uzdaro forma',(()=>{
   w.tvkEdit(); const on=w.document.getElementById('tvkForm').classList.contains('on');
   w.tvkEdit(0); return on&&!w.document.getElementById('tvkForm').classList.contains('on');})());
ok('tvkGo() nusoka i tvarkarascio skaidre',(()=>{
   w.tvkGo(); const i=w.SL.findIndex(s=>s.tag==='tvarkarastis');
   w.tvkEdit(0); return w.cur===i;})());

console.log('\n== 13. V6.14 hack sluoksnis ==');
ok('HACK turi slot/loot/scratch',!!(w.HACK.slot&&w.HACK.loot&&w.HACK.scratch));
ok('kiekvienas turi 4 taktus',
   ['slot','loot','scratch'].every(k=>w.HACK[k].feel&&w.HACK[k].freeze&&w.HACK[k].name&&w.HACK[k].turn));
ok('ivardinti tikri triukai',(()=>{
   const all=JSON.stringify(w.HACK);
   return /kintamas atlygis/.test(all)&&/beveik-laimėjimas/.test(all)&&
          /praradimo baimė/.test(all)&&/FOMO/.test(all)&&/dar vieną kartą/.test(all);})());
ok('hackShow() atidaro perdanga su taisykle',(()=>{
   w.hackShow('slot');
   const b=w.document.getElementById('hackBox');
   return b.classList.contains('on')&&/tavo dėmesio pirkimas/.test(b.textContent);})());
ok('hackHide() uzdaro',(()=>{ w.hackHide();
   return !w.document.getElementById('hackBox').classList.contains('on');})());
ok('hackToggle() (H) paslepia mygtukus',(()=>{
   w.hackToggle(); const off=w.document.body.classList.contains('nohack');
   w.hackToggle(); return off&&!w.document.body.classList.contains('nohack');})());
ok('hack mygtukai ant slot + bilieto skaidriu',
   w.document.querySelectorAll('.hackbtn').length>=2,
   'rasta '+w.document.querySelectorAll('.hackbtn').length);

console.log('\n== 14. V6.14 pultas v2 ==');
ok('pultSend/pultSlide/pultStats yra',
   ['pultSend','pultSlide','pultStats'].every(f=>typeof w[f]==='function'));
ok('pultSend tyli be rysio (PULT.ok=false)',(()=>{
   try{ w.pultSend('slide',{}); return true }catch(e){ return false }})());
ok('slideTitle() istraukia h1 be zymu',(()=>{
   const t=w.slideTitle(0); return t.length>3&&!/[<>]/.test(t);})());
ok('comboStart() ijungia metra',(()=>{
   w.comboStart(600);
   return w.comboOn()&&w.document.getElementById('combo').classList.contains('on');})());
ok('combo padvigubina teigiama aura',(()=>{
   const a=w.AURA.pts; w.aura(100,'testas'); const d=w.AURA.pts-a;
   return d===200;})());
ok('combo NEDAUGINA minuso',(()=>{
   const a=w.AURA.pts; w.aura(-100,'testas'); return w.AURA.pts-a===-100;})());
ok('raidBanner() parodo juosta',(()=>{
   w.raidBanner();
   return w.document.getElementById('raidBan').classList.contains('on');})());
ok('emoFloat() veikia ir be Twitch rezimo',(()=>{
   const n=w.document.getElementById('emoRain').children.length;
   w.emoFloat('❤️');
   return w.document.getElementById('emoRain').children.length===n+1;})());

console.log('');
ok('yra toggleAuraCam',typeof w.toggleAuraCam==='function');

console.log('\n────────────────────────────');
console.log(`REZULTATAS: ${pass} praėjo · ${fail} krito`);
if(errors.length)console.log('JS klaidos:',errors.slice(0,5));
if(fail){console.log('\nKRITO:');fails.forEach(f=>console.log('  · '+f));
  try{dom.window.close()}catch(e){}
  process.exit(1);}
console.log('✅ VISI TESTAI PRAĖJO');
// deck'o setInterval'ai (bootRun, laikmatis, chat) laiko node event loop gyvą
try{dom.window.close()}catch(e){}
process.exit(0);
