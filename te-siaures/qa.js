/* QA: Technologijų etiketas (Šiaurės 2026-10-22). Headless Chrome.
   Serveris iš ~/bc-day šaknies: python3 -m http.server 8899
   node te-siaures/qa.js [baseUrl] [--shots]
   Tikrina: visos skaidrės be JS klaidų ir telpa ekrane · 12 telefonų jungiasi per Supabase Realtime ·
   telefonai gauna klausimą patys · atsakymai → DB → ekrano stulpeliai · žvaigždutės + vidurkis + „Ką patobulinti" ·
   dalinimosi mygtukas po paskutinio klausimo · pultas valdo skaidres · medžiaga: kv-track, OG, be horizontalaus scroll · em dash. */
const puppeteer=require('puppeteer-core');
const fs=require('fs'),path=require('path');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=(process.argv.find(a=>/^https?:/.test(a)))||'http://localhost:8899/te-siaures/';
const SHOTS=process.argv.includes('--shots');
const L='ABCDEFGHJKLMNPRSTUVZ';const ROOM='QATEST'+[0,1,2].map(()=>L[Math.floor(Math.random()*L.length)]).join('');
const PHONES=12;
let pass=0,fail=0;const fails=[];
function ok(n,c,x){if(c){pass++;console.log('  ✅ '+n)}else{fail++;fails.push(n+(x?' :: '+x:''));console.log('  ❌ '+n+(x?' :: '+x:''))}}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,ms=15000,step=250){const t=Date.now();while(Date.now()-t<ms){try{if(await fn())return true}catch(e){}await sleep(step)}return false}
function watch(page,errs){page.on('console',m=>{if(m.type()==='error'){const t=m.text();if(/Failed to load resource|net::ERR|favicon/i.test(t))return;errs.push(t)}});page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message))}
(async()=>{
  const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
  const shotDir=path.join(__dirname,'qa');if(SHOTS&&!fs.existsSync(shotDir))fs.mkdirSync(shotDir);
  console.log('ROOM '+ROOM);
  /* ---- deck ---- */
  const deck=await browser.newPage();const dErr=[];watch(deck,dErr);
  await deck.setViewport({width:1920,height:1080});
  await deck.goto(BASE+'index.html?room='+ROOM,{waitUntil:'networkidle2'});
  ok('deck užsikrauna',await deck.evaluate(()=>!!window.TEDECK));
  const n=await deck.evaluate(()=>TEDECK.n);ok('skaidrių 43 (41 + 2 priedai)',n===43,'yra '+n);
  ok('deck prisijungia prie Realtime',await until(()=>deck.evaluate(()=>document.querySelector('#conn').className==='live')));
  ok('QR nupieštas',await deck.evaluate(()=>!!document.querySelector('.slide.on .qr img, .slide.on .qr canvas')));
  /* visos skaidrės: telpa, nėra em dash */
  const over=[],dash=[];let total=0,qaSec=0;
  for(let i=0;i<n;i++){
    await deck.evaluate(i=>TEDECK.show(i),i);await sleep(120);
    await deck.evaluate(()=>{document.querySelectorAll('.slide.on .step').forEach(e=>e.classList.add('show'))});
    const r=await deck.evaluate(()=>{const s=document.querySelector('.slide.on');const sec=+s.dataset.sec||0;
      const vis=[...s.children].filter(c=>!c.classList.contains('n')&&!c.classList.contains('k'));
      const bottom=Math.max(...vis.map(c=>c.getBoundingClientRect().bottom));const right=Math.max(...vis.map(c=>c.getBoundingClientRect().right));
      const txt=vis.map(c=>c.innerText).join(' ');return {sec,label:s.dataset.label,bottom,right,dash:/—/.test(txt),app:s.dataset.appendix==='1',opt:s.dataset.optional==='1',qa:s.dataset.qa==='1'}});
    if(!r.app&&(r.bottom>1080+2||r.right>1920+2))over.push((i+1)+' '+r.label+' '+Math.round(r.bottom));
    if(r.dash)dash.push((i+1)+' '+r.label);if(r.qa)qaSec+=r.sec;else if(!r.opt)total+=r.sec;
    if(SHOTS)await deck.screenshot({path:path.join(shotDir,'s'+String(i+1).padStart(2,'0')+'.png')});
  }
  ok('visos skaidrės telpa 1920×1080',over.length===0,over.join(' | '));
  ok('skaidrėse nėra em dash',dash.length===0,dash.join(' | '));
  ok('kalba ≤ 35 min. + klausimai, viso ≤ 43 min. (kalba '+Math.round(total/60)+' + klausimai '+Math.round(qaSec/60)+')',total<=35*60&&total+qaSec<=43*60);
  /* ---- telefonai ---- */
  const phones=[];const pErr=[];
  for(let i=0;i<PHONES;i++){const p=await browser.newPage();watch(p,pErr);await p.setViewport({width:390,height:844,isMobile:true});phones.push(p)}
  await Promise.all(phones.map(p=>p.goto(BASE+'join.html?k='+ROOM,{waitUntil:'networkidle2'})));
  const idx=id=>deck.evaluate(id=>[...document.querySelectorAll('.slide')].findIndex(s=>s.dataset.poll===id),id);
  ok('12 telefonų prisijungė',await until(async()=>(await Promise.all(phones.map(p=>p.evaluate(()=>document.querySelector('#st').className==='ok')))).every(Boolean),20000));
  await deck.evaluate(i=>TEDECK.show(i),await idx('p1'));
  ok('telefonai patys gavo 1 klausimą',await until(async()=>(await Promise.all(phones.map(p=>p.evaluate(()=>document.querySelectorAll('button.o').length===4)))).every(Boolean),15000));

  for(let i=0;i<PHONES;i++)await phones[i].evaluate(k=>document.querySelectorAll('button.o')[k].click(),i%4);
  ok('ekranas rodo 12 atsakymų',await until(()=>deck.evaluate(()=>document.querySelector('.slide.on .cnt').textContent==='12'),15000));
  ok('deck mato telefonus (📱 ≥ 10)',await until(()=>deck.evaluate(()=>parseInt(document.querySelector('#ppl').textContent.replace(/\D/g,''),10)>=10),15000));
  ok('stulpeliai užsipildė',await deck.evaluate(()=>[...document.querySelectorAll('.slide.on .bar .f')].some(f=>parseFloat(f.style.width)>0)));
  /* laisvas tekstas */
  await deck.evaluate(i=>TEDECK.show(i),await idx('pk'));
  ok('telefonas gavo „paėmimų" klausimą',await until(()=>phones[0].evaluate(()=>document.querySelectorAll('button.o').length===5)));
  await phones[0].evaluate(()=>document.querySelectorAll('button.o')[1].click());
  ok('eksperimento atsakymas ekrane',await until(()=>deck.evaluate(()=>document.querySelector('.slide.on .cnt').textContent==='1'),12000));
  /* V2: problema + papildomas sakinys */
  await deck.evaluate(i=>TEDECK.show(i),await idx('p9'));
  ok('telefonas gavo „kur kliūva"',await until(()=>phones[1].evaluate(()=>/kliūva/.test(document.body.innerText)&&document.querySelectorAll('button.o').length===5)));
  await phones[1].evaluate(()=>document.querySelectorAll('button.o')[3].click());
  ok('po pasirinkimo klausia „viena problema"',await until(()=>phones[1].evaluate(()=>/Viena problema/.test(document.body.innerText)&&!!document.querySelector('#tx'))));
  await sleep(6000);
  ok('papildomas klausimas neišnyksta po ekrano pulso',await phones[1].evaluate(()=>!!document.querySelector('#tx')));
  ok('dalinimasis dar nerodomas',await phones[1].evaluate(()=>getComputedStyle(document.querySelector('#share')).display==='none'));
  await phones[1].evaluate(()=>{document.querySelector('#tx').value='Sporto salėje visi filmuoja save';document.querySelector('#sendT').click()});
  ok('problemos sakinys ekrane',await until(()=>deck.evaluate(()=>/filmuoja/.test(document.querySelector('.slide.on .pq2').innerText)),12000));
  ok('pasirinkimų stulpeliai problemoje',await until(()=>deck.evaluate(()=>document.querySelector('.slide.on .cnt').textContent==='1'),10000));
  /* žvaigždutės */
  await deck.evaluate(i=>TEDECK.show(i),await idx('p8'));
  ok('telefonai gavo įvertinimą',await until(async()=>(await Promise.all(phones.slice(0,5).map(p=>p.evaluate(()=>document.querySelectorAll('.stars button').length===5)))).every(Boolean)));
  for(let i=0;i<5;i++)await phones[i].evaluate(v=>{document.querySelectorAll('.stars button')[v-1].click();document.querySelector('#sendS').click()},[5,5,4,5,3][i]);
  ok('vidurkis 4,4 ★',await until(()=>deck.evaluate(()=>/4,4/.test(document.querySelector('.slide.on .stars').innerText)),12000));
  ok('po įvertinimo klausia „Ką patobulinti"',await until(()=>phones[0].evaluate(()=>/patobulinti/.test(document.body.innerText)&&!!document.querySelector('#tx'))));
  ok('pasirodė „Pasidalink su kitais tėvais"',await phones[0].evaluate(()=>getComputedStyle(document.querySelector('#share')).display!=='none'));
  const ph=await phones[0].evaluate(()=>({w:document.documentElement.scrollWidth,btn:Math.min(...[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.getBoundingClientRect().height))}));
  ok('telefonas be horizontalaus scroll',ph.w<=390,'plotis '+ph.w);ok('mygtukai ≥ 44 px',ph.btn>=44,'min '+ph.btn);
  if(SHOTS)await phones[0].screenshot({path:path.join(shotDir,'phone-share.png')});
  /* ↺ atstatymas: rezultatai nuo nulio, telefonai lieka ir vėl gauna klausimą */
  await deck.evaluate(()=>TEDECK.reset());
  ok('↺ ekranas po atstatymo rodo 0',await until(()=>deck.evaluate(()=>document.querySelector('.slide.on .cnt').textContent==='0'),8000));
  ok('↺ telefonas vėl gauna įvertinimą (be perskenavimo)',await until(()=>phones[2].evaluate(()=>document.querySelectorAll('.stars button').length===5),15000));
  await phones[2].evaluate(()=>{document.querySelectorAll('.stars button')[4].click();document.querySelector('#sendS').click()});
  ok('↺ naujas atsakymas skaičiuojamas iš naujo (1)',await until(()=>deck.evaluate(()=>document.querySelector('.slide.on .cnt').textContent==='1'),12000));
  /* 📘 M ir 🔊 V */
  await deck.evaluate(()=>{TEDECK.show(2);TEDECK.mentor()});
  ok('📘 M rodo mentoriaus skydelį su medžiaga',await deck.evaluate(()=>{const k=document.querySelector('#kpanel');return k.style.display==='block'&&/Mentoriui/.test(k.innerText)&&/Papildoma medžiaga/.test(k.innerText)}));
  const vo=await deck.evaluate(async()=>{const r=await fetch('assets/vo/02.mp3');return r.status});
  ok('🔊 balso failas skaidrei 2 yra',vo===200,'status '+vo);
  /* ---- pultas ---- */
  const pult=await browser.newPage();const uErr=[];watch(pult,uErr);await pult.setViewport({width:390,height:844,isMobile:true});
  await pult.goto(BASE+'pultas.html?k='+ROOM,{waitUntil:'networkidle2'});
  ok('pultas gauna ekrano būseną',await until(()=>pult.evaluate(()=>/\d+\/43/.test(document.querySelector('#lab').textContent)),15000));
  const before=await deck.evaluate(()=>TEDECK.cur());await pult.click('#nx');
  ok('pultas TOLIAU perjungia skaidrę',await until(async()=>(await deck.evaluate(()=>TEDECK.cur()))===before+1,8000));
  /* ---- medžiaga ---- */
  const med=await browser.newPage();const mErr=[];watch(med,mErr);await med.setViewport({width:390,height:844,isMobile:true});
  await med.goto(BASE+'medziaga.html?src=qa',{waitUntil:'networkidle2'});
  const m=await med.evaluate(()=>({w:document.documentElement.scrollWidth,og:!!document.querySelector('meta[property="og:image"]'),kv:!!document.querySelector('script[src*="kv-track"][data-mode="full"]'),rules:document.querySelectorAll('.rule').length,share:!!document.querySelector('#sh'),dash:/—/.test(document.body.innerText)}));
  ok('medžiaga: 10 taisyklių',m.rules===10);ok('medžiaga: OG paveikslas',m.og);ok('medžiaga: kv-track full',m.kv);ok('medžiaga: dalinimosi mygtukas',m.share);ok('medžiaga be horizontalaus scroll',m.w<=390,'plotis '+m.w);ok('medžiaga be em dash',!m.dash);
  if(SHOTS)await med.screenshot({path:path.join(shotDir,'medziaga.png'),fullPage:false});
  ok('deck be JS klaidų',dErr.length===0,dErr.slice(0,3).join(' | '));ok('telefonai be JS klaidų',pErr.length===0,pErr.slice(0,3).join(' | '));
  ok('pultas be JS klaidų',uErr.length===0,uErr.slice(0,3).join(' | '));ok('medžiaga be JS klaidų',mErr.length===0,mErr.slice(0,3).join(' | '));
  await browser.close();
  console.log('\nQA '+pass+'/'+fail+(fails.length?'\n  '+fails.join('\n  '):'')+'\nROOM '+ROOM+' (ištrinti: delete where room like \'QATEST%\')');
  process.exit(fail?1:0);
})().catch(e=>{console.error(e);process.exit(2)});
