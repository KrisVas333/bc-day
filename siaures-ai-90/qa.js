/* QA: DI mokytojams 90 min. (Šiaurės 2026-10-20). Headless Chrome, išplėstas Deck A qa.js.
   cd ~/bc-day && python3 -m http.server 8899 &   (serveris iš bc-day šaknies)
   node siaures-ai-90/qa.js [deckBase] [--shots]
   Tikrina: deck'as (31 skaidrė: 28 + papildoma „Antros smegenys" + 2 priedai; rezultatai prieš/po; pasirenkamos 12 ir 24; „Rask klaidą"; reiškinys; „Dalyvausiu"; QR bėgelis Q; judėjimo pertrauka B; be 3D, žingsniai, telpa, užrašai, laikas 90 min., interaktyvi užduotis kas ≤20 min., laikmačiai, quiz,
   klasių žemėlapis, kito žodžio demo, VO failai, rankinis režimas, atsarginės nuotraukos, em dash, JS klaidos) ·
   GYVAI per Supabase Realtime: 2 telefonai → deck'o stulpeliai, pulsas, quiz atskleidimas telefone, lygis → kitas žingsnis, pultas → deck'as ·
   telefonas 360 px: be horizontalaus scroll, mygtukai ≥44 px, šriftas ≥17 px, disclaimer, kv-track full. */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=(process.argv.find(a=>/^https?:/.test(a)))||'http://localhost:8899/siaures-ai-90/';
const SHOTS=process.argv.includes('--shots');
const ROOM='Q'+Math.random().toString(36).slice(2,5).toUpperCase().replace(/[^A-Z0-9]/g,'X');
let pass=0,fail=0;const fails=[];
function ok(n,c,x){if(c){pass++;console.log('  ✅ '+n)}else{fail++;fails.push(n+(x?' :: '+x:''));console.log('  ❌ '+n+(x?' :: '+x:''))}}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,ms=12000,step=200){const t=Date.now();while(Date.now()-t<ms){try{if(await fn())return true;}catch(e){}await sleep(step);}return false;}
function watch(page,errs){
  page.on('console',m=>{if(m.type()==='error'){const t=m.text();if(/Failed to load resource|net::ERR|favicon/i.test(t))return;errs.push(t);}});
  page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
}
(async()=>{
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const deckErrs=[];
const deck=await browser.newPage();watch(deck,deckErrs);
await deck.setViewport({width:1920,height:1080});
const DURL=BASE+'index.html?room='+ROOM+'&local=1';
await deck.goto(DURL,{waitUntil:'domcontentloaded'});
await deck.evaluate(()=>{localStorage.clear();sessionStorage.clear();});
await deck.goto(DURL,{waitUntil:'domcontentloaded'});
await sleep(2500);
/* ---------- DECK ---------- */
console.log('\n== Deck ==');
{
  const page=deck;
  const n=await page.evaluate(()=>__deck.slides.length);
  ok('31 skaidrė (28 + 1 papildoma + 2 priedai)',n===31,String(n));
  ok('1 skaidrė rodoma',await page.evaluate(()=>__deck.st.slide===0&&__deck.slides[0].classList.contains('on')));
  ok('JBM šriftas įkeltas',await page.evaluate(async()=>{await document.fonts.ready;return document.fonts.check('800 40px JBM');}));
  ok('salės kodas = '+ROOM,await page.evaluate(r=>__deck.ROOM===r&&document.getElementById('joincode').textContent===r,ROOM));
  ok('prisijungimo QR sugeneruotas',await until(()=>page.evaluate(()=>!!document.querySelector('#joinqr img,#joinqr canvas'))));
  ok('join URL rodo join.html?r=KODAS',await page.evaluate(r=>/join\.html\?r=/.test(document.getElementById('joinurl').textContent)&&document.getElementById('joinurl').textContent.endsWith(r),ROOM));
  // laikas
  const at=await page.evaluate(()=>__deck.slides.map(s=>({at:+s.dataset.at,act:!!s.dataset.act,label:s.dataset.label})));
  const main=at.slice(0,28);
  ok('kiekviena skaidrė turi data-at',at.every(x=>!isNaN(x.at)));
  ok('laikas didėja ir baigiasi 88 → 90 min.',main.every((x,i)=>i===0||x.at>=main[i-1].at)&&main[27].at===88&&at[28].at===90,JSON.stringify(main.map(x=>x.at)));
  { const g=l=>at.find(x=>x.label===l).at;
    ok('2 pertraukos telpa į planą (Testas 21 → 26, Ką sukūrėte 60 → 65)',g('Kada DI padeda mokytis')-g('Testas: kaip veikia DI')===5&&g('Mokymosi mokslas')-g('Ką sukūrėte')===5);
    ok('praktika L1 = 20 min. (40 → 60)',g('Ką sukūrėte')-g('Praktika L1')===20);
    ok('pasirenkamos: Pasaulis ir L3 (data-optional), 0 min. plane',await page.evaluate(()=>{const o=l=>__deck.slides.find(s=>s.dataset.label===l);return o('Pasaulis').dataset.optional==='1'&&o('L3 antros smegenys').dataset.optional==='1'&&o('Pasaulis').dataset.at===o('Etika').dataset.at&&o('L3 antros smegenys').dataset.at===o('Ką išbandysite?').dataset.at;})); }
  ok('pradžia = interaktyvi užduotis (0 min.)',main[0].act&&main[0].at===0);
  const acts=main.filter(x=>x.act).map(x=>x.at);const gaps=acts.slice(1).map((a,i)=>a-acts[i]);gaps.push(90-acts[acts.length-1]);
  ok('interaktyvi užduotis kas ≤20 min. (gaps '+gaps.join('/')+')',gaps.every(g=>g<=20),JSON.stringify(acts));
  // pereiti visas skaidres
  let visited=new Set(),guard=0,over=[],hidden=[];
  while(guard++<200){
    const s=await page.evaluate(()=>{const st=__deck.st,el=__deck.slides[st.slide];
      const shown=[].filter.call(el.querySelectorAll('[data-step]'),x=>+x.dataset.step<=st.step).every(x=>x.classList.contains('show'));
      const r=el.getBoundingClientRect();
      const ov=[].filter.call(el.querySelectorAll('h1,h2,.card,.res,.tools,.ladder,.gm,.world,.sb,.lights,.prompt,.refs,.avg,.wall,.chart,.mq,.qr,.dash,.kpis,.coi,.cast,.screen,.llm,.ss,.photo,.ask,.brains,.bdia,.nd'),x=>{if(!x.offsetParent)return false;const b=x.getBoundingClientRect();return b.height>0&&(b.bottom>r.bottom-20||b.right>r.right+1);}).map(x=>x.className.split(' ')[0]||x.tagName);
      return{i:st.slide,step:st.step,shown,ov,label:el.dataset.label};});
    visited.add(s.i);
    if(!s.shown)hidden.push(s.i+1+'.'+s.step);
    if(s.ov.length)over.push((s.i+1)+'.'+s.step+' '+s.label+' ['+s.ov.join(',')+']');
    const atEnd=await page.evaluate(()=>{const b=__deck.st.slide,c=__deck.st.step;__deck.next();return b===__deck.st.slide&&c===__deck.st.step;});
    if(atEnd)break;await sleep(40);
    // papildomos skaidrės → aplankom tiesiai (→ jas praleidžia), tada grįžtam į eilę
    const opt=await page.evaluate(()=>__deck.slides.map((x,i)=>x.dataset.optional?i:-1).filter(i=>i>=0));
    if(opt.length&&!visited.has(opt[0])&&await page.evaluate(()=>__deck.st.slide)>opt[0]){const back=await page.evaluate(()=>__deck.st.slide);for(const oi of opt){await page.evaluate(i=>__deck.goTo(i,0),oi);await sleep(60);
      const so=await page.evaluate(()=>{const el=__deck.slides[__deck.st.slide],r=el.getBoundingClientRect();return [].filter.call(el.querySelectorAll('h1,h2,.card,.bdia,.brains'),x=>{if(!x.offsetParent)return false;const b=x.getBoundingClientRect();return b.height>0&&(b.bottom>r.bottom-20||b.right>r.right+1);}).map(x=>x.className.split(' ')[0]);});
      if(so.length)over.push((oi+1)+'.0 papildoma ['+so.join(',')+']');visited.add(oi);}
      await page.evaluate(i=>__deck.goTo(i,0),back);}
  }
  ok('visos skaidrės aplankytos (su papildoma)',visited.size===n,visited.size+'/'+n);
  ok('visi žingsniai matomi',hidden.length===0,hidden.join(' '));
  ok('turinys telpa kiekviename žingsnyje (1920×1080)',over.length===0,over.slice(0,8).join(' | '));
  ok('kiekviena skaidrė turi užrašus',await page.evaluate(()=>__deck.NOTES.every(t=>t.length>40)));
  ok('kiekvienas L ženklelis yra L1/L2/L3',await page.evaluate(()=>[].every.call(document.querySelectorAll('.lv'),e=>/^L[123]$/.test(e.textContent.trim()))));
  // quiz1 + laikmatis
  const qi=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.act==='quiz1'));
  await page.evaluate(i=>__deck.goTo(i,0),qi);await sleep(200);
  ok('quiz: prieš atskleidimą nėra .good',await page.evaluate(()=>!document.querySelector('.slide.on .row.good')));
  await page.keyboard.press('t');await sleep(2200);
  const tv=await page.evaluate(()=>document.querySelector('.slide.on .timer').textContent);
  ok('quiz laikmatis skaičiuoja (1:00 → 0:5x)',/^0:5\d$/.test(tv),tv);
  await page.keyboard.press('t');
  await page.keyboard.press('ArrowRight');await sleep(400);
  ok('quiz: atskleidus B pažymėtas',await page.evaluate(()=>{const r=document.querySelectorAll('.slide.on [data-res="quiz1.a"] .row');return r[1]&&r[1].classList.contains('good');}));
  // praktikos laikmatis 12:00
  const ri=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Praktika L1'));
  await page.evaluate(i=>__deck.goTo(i,0),ri);await sleep(150);
  ok('praktikos laikmatis 20:00',await page.evaluate(()=>document.querySelector('.slide.on .timer').textContent==='20:00'));
  await page.keyboard.press('t');await sleep(1300);
  ok('praktikos laikmatis paleistas',await page.evaluate(()=>/^19:5\d$/.test(document.querySelector('.slide.on .timer').textContent)));
  await page.keyboard.press('t');
  await page.evaluate(i=>__deck.goTo(i,0),ri);await sleep(150);
  ok('Rask klaidą: 5 DI klausimai, klaida dar nepažymėta, savo testo kortelės paslėptos',await page.evaluate(()=>{const s=document.querySelector('.slide.on');return s.querySelectorAll('.fq li').length===5&&!s.querySelector('.fq li.rv')&&!s.querySelector('.fix').classList.contains('show')&&!s.querySelector('[data-only="2"]').classList.contains('show')&&/1401/.test(s.querySelector('.fq').textContent);}));
  await page.keyboard.press('ArrowRight');await sleep(250);
  ok('→ atskleidžia klaidą: 3 klausimas paraudonuoja + 1410 m.',await page.evaluate(()=>{const s=document.querySelector('.slide.on'),b=s.querySelector('.fq li.bad');return b.classList.contains('rv')&&b===s.querySelectorAll('.fq li')[2]&&s.querySelector('.fix').classList.contains('show')&&/1410/.test(s.querySelector('.fix').textContent);}));
  await page.keyboard.press('ArrowRight');await sleep(250);
  ok('→ dar kartą: savo testas (klaidos blokas paslėptas)',await page.evaluate(()=>{const s=document.querySelector('.slide.on');return s.querySelector('[data-only="2"]').classList.contains('show')&&!s.querySelector('.fq').offsetParent;}));
  ok('užrašuose: „svarbiausias įgūdis: patikrinti"',await page.evaluate(i=>/svarbiausias įgūdis: patikrinti/.test(__deck.NOTES[i]),ri));
  // pasirenkamos skaidrės 12 ir 24
  for(const [from,to] of [['Kada DI padeda mokytis','Etika'],['L2 kuriu','Ką išbandysite?']]){
    const fi=await page.evaluate(l=>__deck.slides.findIndex(s=>s.dataset.label===l),from);
    await page.evaluate(i=>__deck.goTo(i,__deck.slides[i].dataset.steps-1),fi);await sleep(80);await page.evaluate(()=>__deck.next());await sleep(80);
    const lab=await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label);
    await page.evaluate(()=>__deck.prev());await sleep(80);
    const back=await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label);
    ok('→ iš „'+from+'" praleidžia pasirenkamą, ← grįžta',lab===to&&back===from,lab+' / '+back);}
  await page.keyboard.press('1');await page.keyboard.press('2');await page.keyboard.press('Enter');await sleep(200);
  ok('12 + Enter atidaro „Pasaulis"',await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label==='Pasaulis'));
  await page.keyboard.press('2');await page.keyboard.press('4');await page.keyboard.press('Enter');await sleep(200);
  ok('24 + Enter atidaro „L3 antros smegenys"',await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label==='L3 antros smegenys'));
  // mokymosi rezultatai
  ok('4 skaidrė: „Po 90 min. galėsite" + 3 rezultatai + telefonas (tikslai)',await page.evaluate(()=>{const s=__deck.slides[3];return s.dataset.label==='Ko išmoksite'&&s.dataset.act==='tikslai'&&s.querySelectorAll('.outc .card').length===3&&/Po 90 min\. galėsite/.test(s.textContent)&&/šviesofor/.test(s.textContent)&&/BUP/.test(s.textContent)&&__deck.ACTS.tikslai.parts.length===3&&__deck.ACTS.tikslai.parts.every(p=>p.type==='scale'&&p.n===5);}));
  ok('pabaigoje tie patys 3 klausimai (next o1–o3 = tikslai)',await page.evaluate(()=>{const A=__deck.ACTS;return ['o1','o2','o3'].every(k=>{const a=A.tikslai.parts.find(p=>p.k===k),b=A.next.parts.find(p=>p.k===k);return a&&b&&a.q===b.q;});}));
  // reiškinys
  const di=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Dalykai ir testai'));
  await page.evaluate(i=>__deck.goTo(i,4),di);await sleep(200);
  ok('Dalykai: 5-as vaizdas = reiškinys „vanduo mūsų mieste" (L1) + užrašuose PhenoBL',await page.evaluate(i=>{const v=document.querySelector('.slide.on [data-only="4"]');return v.classList.contains('show')&&/vanduo mūsų mieste/.test(v.textContent)&&/rubrika/.test(v.textContent)&&!!v.querySelector('.lv.l1')&&/PhenoBL/.test(__deck.NOTES[i]);},di));
  // klasių žemėlapis
  const gi=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Klasių žemėlapis'));
  await page.evaluate(i=>__deck.goTo(i,0),gi);await sleep(150);
  ok('klasių žemėlapis: 12 pakopų, pradžia 2 kl.',await page.evaluate(()=>document.querySelectorAll('#gmT button').length===12&&document.getElementById('gmH').textContent==='2 kl.'));
  await page.keyboard.press('ArrowRight');await sleep(150);
  ok('→ 4 kl.',await page.evaluate(()=>document.getElementById('gmH').textContent==='4 kl.'&&/4 kl\./.test(document.getElementById('gmP').textContent)));
  await page.keyboard.press('ArrowRight');await sleep(150);
  ok('→ 9 kl. (3 numatytos klasės)',await page.evaluate(()=>document.getElementById('gmH').textContent==='9 kl.'&&__deck.st.step===2));
  await page.evaluate(()=>document.querySelectorAll('#gmT button')[11].click());await sleep(150);
  ok('paspaudus 11 kl. pavyzdys keičiasi (pasiekia visas 12)',await page.evaluate(()=>document.getElementById('gmH').textContent==='11 kl.'&&/Estija/.test(document.getElementById('gmEx').textContent)));
  await page.evaluate(()=>{const r=document.getElementById('gmR');r.value=0;r.dispatchEvent(new Event('input'));});await sleep(100);
  ok('slankiklis grąžina į darželį su „mūsų pasiūlymas"',await page.evaluate(()=>document.getElementById('gmH').textContent==='Darželis'&&/Mūsų pasiūlymas/.test(document.getElementById('gmEx').textContent)));
  // kito žodžio demo
  await page.evaluate(()=>__deck.goTo(7,0));await sleep(200);
  await page.click('#nwGo');await sleep(100);
  ok('kito žodžio demo prideda žodį',await page.evaluate(()=>__deck.NW.words().length===1&&document.querySelectorAll('#nwBars .row').length===6));
  await page.evaluate(()=>{const r=document.getElementById('nwT');r.value=0.2;r.dispatchEvent(new Event('input'));});
  ok('atsitiktinumo slankiklis keičia tikimybes',await page.evaluate(()=>+document.querySelector('#nwBars .num').textContent.replace('%','')>=80));
  // 3D neuronas pašalintas (Kris 10-20) → 2D LLM schema + nuotraukos
  ok('nėra 3D neurono (jokio three.js, neuron.glb, .three)',await page.evaluate(()=>!document.querySelector('.three,canvas#hero3d,canvas#slide3d')&&!document.querySelector('script[src*="three"]')&&!/neuron\.glb|GLTFLoader/.test(document.documentElement.innerHTML)&&!window.THREE));
  ok('8 skaidrė: LLM schema su LT etiketėmis (tekstas · sluoksniai · kitas žodis)',await page.evaluate(()=>{const v=document.getElementById('llmviz');return !!v&&v.closest('.slide')===__deck.slides[7]&&/TEKSTAS/.test(v.textContent)&&/SLUOKSNIAI/.test(v.textContent)&&/KITAS ŽODIS/.test(v.textContent)&&v.querySelectorAll('.pulse').length>=3&&v.querySelectorAll('.pb').length===4;}));
  const imgs=await page.evaluate(async()=>{const L=[...document.querySelectorAll('.slide img')].map(i=>i.getAttribute('src')).filter(u=>/^assets\//.test(u));const r=await Promise.all(L.map(u=>fetch(u).then(async x=>({u,st:x.status,kb:Math.round((await x.blob()).size/1024)}))));return r;});
  ok('naujos nuotraukos/logotipai/veikėjai: visi 200 ir ≤300 KB ('+imgs.length+')',imgs.length>=10&&imgs.every(x=>x.st===200&&x.kb<=300),JSON.stringify(imgs.filter(x=>x.st!==200||x.kb>300)));
  ok('1 skaidrė: Kris mokymuose nuotrauka',await page.evaluate(()=>{const i=__deck.slides[0].querySelector('.photo img');return !!i&&/kris-mokymai/.test(i.src);}));
  await page.evaluate(()=>__deck.goTo(2,0));await sleep(300);
  ok('3 skaidrė: Kris nuotrauka + klausimo burbulas',await page.evaluate(()=>{const s=__deck.slides[2];return !!s.querySelector('.ask .av img')&&!!s.querySelector('#askBub .qm');}));
  await page.evaluate(()=>__deck.goTo(4,1));await sleep(2200);
  const s4=await page.evaluate(()=>{const s=__deck.slides[4],t=s.textContent;return{nd:/disleksij/i.test(t)&&/ADHD/.test(t)&&/disgrafij/i.test(t),logos:[...s.querySelectorAll('.vent .lg img')].filter(i=>i.complete&&i.naturalWidth>0).length,cast:[...s.querySelectorAll('.cast img')].filter(i=>i.complete&&i.naturalWidth>0).map(i=>i.alt).join(','),cnt:s.querySelector('[data-count-to="20000"]').textContent,coi:/nieko neparduodu/.test(t),vid:(()=>{const v=document.getElementById('mapvid');return{ok:!!v&&v.muted&&v.loop,rs:v.readyState,paused:v.paused};})()};});
  ok('5 skaidrė: disleksija + ADHD + disgrafija',s4.nd);
  ok('5 skaidrė: 3 logotipai (RA · ExoClass · Brain Club) įkelti',s4.logos===3,String(s4.logos));
  ok('5 skaidrė: BC Jr veikėjai Klaidas · Misty · Baitas · Neuron · Lekta',s4.cast==='Klaidas,Misty,Baitas,Neuron,Lekta',s4.cast);
  ok('5 skaidrė: skaitiklis pasiekia 20 000+',s4.cnt==='20 000+',s4.cnt);
  ok('5 skaidrė: interesų atskleidimas toje pačioje skaidrėje',s4.coi);
  ok('5 skaidrė: žemėlapio įrašas groja (muted loop)',s4.vid.ok&&s4.vid.rs>=2&&!s4.vid.paused,JSON.stringify(s4.vid));
  const vsz=await page.evaluate(async()=>Math.round((await (await fetch('assets/video/zemelapis-loop.mp4')).blob()).size/1024));
  ok('žemėlapio video ≤3 MB ('+vsz+' KB)',vsz>0&&vsz<=3072);
  await page.evaluate(()=>__deck.goTo(8,0));await sleep(1400);
  const b0=await page.evaluate(()=>getComputedStyle(document.querySelector('.slide.on .scale .beam')).transform);
  await page.evaluate(()=>__deck.next());await sleep(1600);
  const b1=await page.evaluate(()=>getComputedStyle(document.querySelector('.slide.on .scale .beam')).transform);
  ok('9 skaidrė: svarstyklės pasvirę → išsilygina, kai atsiranda silpnybės',b0!==b1&&/matrix\(1, 0, 0, 1/.test(b1),b0+' → '+b1);
  // QR bėgelis
  await page.evaluate(()=>{sessionStorage.removeItem('siaures-ai90-qr');});
  await page.evaluate(()=>__deck.goTo(2,0));await sleep(300);
  const qrA=await page.evaluate(()=>{const j=document.getElementById('joinmini'),jr=j.getBoundingClientRect(),s=__deck.slides[2];const hit=[...s.querySelectorAll('h2,.cloud,.res,.ask,.thint,.rcount')].filter(x=>{const b=x.getBoundingClientRect();return b.width>0&&!(b.right<=jr.left||b.left>=jr.right||b.bottom<=jr.top||b.top>=jr.bottom);}).map(x=>x.className);return{on:j.classList.contains('on'),rail:document.getElementById('stage').classList.contains('qr-on'),hit,mode:__deck.QR.mode()};});
  ok('QR bėgelis: užduoties skaidrėje rodomas ir NIEKO neuždengia',qrA.on&&qrA.rail&&qrA.hit.length===0&&qrA.mode==='auto',JSON.stringify(qrA));
  await page.evaluate(()=>__deck.goTo(4,0));await sleep(150);
  ok('QR auto: skaidrėje be užduoties paslėptas',await page.evaluate(()=>!document.getElementById('joinmini').classList.contains('on')));
  await page.evaluate(()=>__deck.goTo(2,0));await sleep(150);
  await page.keyboard.press('q');await sleep(150);
  ok('Q paslepia QR (režimas off, išsaugotas sesijai)',await page.evaluate(()=>!document.getElementById('joinmini').classList.contains('on')&&!document.getElementById('stage').classList.contains('qr-on')&&sessionStorage.getItem('siaures-ai90-qr')==='off'));
  await page.keyboard.press('q');await sleep(150);await page.evaluate(()=>__deck.goTo(4,0));await sleep(150);
  ok('Q antrą kartą: QR visose skaidrėse',await page.evaluate(()=>__deck.QR.mode()==='all'&&document.getElementById('joinmini').classList.contains('on')));
  await page.keyboard.press('q');await sleep(150);
  ok('Q trečią kartą: atgal į auto',await page.evaluate(()=>__deck.QR.mode()==='auto'));
  // judėjimo pertrauka
  ok('laikas nuo pradžios skaičiuojamas viršuje',await page.evaluate(()=>/^⏱ \d+:\d\d$/.test(document.getElementById('elapsed').textContent)&&!!sessionStorage.getItem('siaures-ai90-t0')));
  const before=await page.evaluate(()=>__deck.st.slide);
  await page.keyboard.press('b');await sleep(2300);
  const mv=await page.evaluate(()=>{const m=document.getElementById('move');return{on:m.classList.contains('on'),cues:[...m.querySelectorAll('.mseq span')].map(x=>x.textContent).join('|'),c:+m.querySelector('.mc').textContent,fig:!!m.querySelector('svg.mfig.m-arms')};});
  ok('B: 2 min. judėjimo pertrauka (4 judesiai, skaičiuoja atgal)',mv.on&&/Sukame rankas/.test(mv.cues)&&/sukame galvą/.test(mv.cues)&&/Šokinėjame vietoje/.test(mv.cues)&&/Pasitempiame/.test(mv.cues)&&mv.c<30&&mv.c>=26&&mv.fig,JSON.stringify(mv));
  await page.keyboard.press('Escape');await sleep(200);
  ok('Esc grįžta į tą pačią skaidrę',await page.evaluate(b=>!document.getElementById('move').classList.contains('on')&&__deck.st.slide===b,before));
  await page.evaluate(()=>{sessionStorage.setItem('siaures-ai90-lastbrk',String(Date.now()-26*60000));});
  await page.goto(DURL,{waitUntil:'domcontentloaded'});await sleep(1800);
  await page.evaluate(()=>__deck.BRK.tick());await sleep(200);
  ok('po 25 min. kampe priminimas „Judėjimo pertrauka? B" (neblokuoja)',await page.evaluate(()=>document.getElementById('brk').classList.contains('on')&&!document.getElementById('move').classList.contains('on')));
  await page.keyboard.press('Escape');await sleep(150);
  ok('Esc atideda priminimą',await page.evaluate(()=>!document.getElementById('brk').classList.contains('on')));
  // papildoma skaidrė
  const ai=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Ačiū'));
  await page.evaluate(i=>__deck.goTo(i,0),ai);await sleep(100);await page.evaluate(()=>__deck.next());await sleep(100);
  ok('→ iš „Ačiū" praleidžia papildomą skaidrę',await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label==='Šaltiniai (priedas)'));
  await page.evaluate(()=>__deck.prev());await sleep(100);
  ok('← grįžta į „Ačiū" (papildoma praleidžiama)',await page.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label==='Ačiū'));
  await page.keyboard.press('2');await page.keyboard.press('9');await page.keyboard.press('Enter');await sleep(300);
  const sb=await page.evaluate(()=>{const s=__deck.slides[__deck.st.slide],t=s.textContent;return{l:s.dataset.label,opt:s.dataset.optional,forte:/Tiago Forte/.test(t),tools:/Obsidian/.test(t)&&/Claude/.test(t)&&/Google Drive/.test(t),cost:/\$20/.test(t),three:/TITO SMEGENYS/.test(t)&&/GABRIELIO SMEGENYS/.test(t)&&/KRIS BRAIN/.test(t),notes:/PAPILDOMA/.test(__deck.NOTES[__deck.st.slide]),privacy:/Vaikų duomenų/.test(t)};});
  ok('29 + Enter: „Antros smegenys" (Forte, įrankiai, kaina, 3 smegenys, užrašai)',sb.l==='Antros smegenys (papildomai)'&&sb.opt==='1'&&sb.forte&&sb.tools&&sb.cost&&sb.three&&sb.notes&&sb.privacy,JSON.stringify(sb));
  await page.evaluate(()=>__deck.goTo(7,0));await sleep(200);
  // VO
  const vo=await page.evaluate(async()=>{const s=__deck.slides.filter(x=>x.dataset.vo).map(x=>x.dataset.vo);const r=await Promise.all(s.map(u=>fetch(u,{method:'HEAD'}).then(x=>x.status)));return{s,r};});
  ok('VO: 4 skaidrės su Kris balso failu, visi 200',vo.s.length===4&&vo.r.every(x=>x===200),JSON.stringify(vo));
  await page.keyboard.press('v');await sleep(600);
  ok('V paleidžia VO',await page.evaluate(()=>/assets\/vo\/07\.mp3/.test(__deck.VO.src)&&!__deck.VO.paused));
  await page.keyboard.press('v');
  // atsarginės nuotraukos
  const bk=await page.evaluate(async()=>{const s=__deck.slides.filter(x=>x.dataset.backup).map(x=>x.dataset.backup);const r=await Promise.all(s.map(u=>fetch(u,{method:'HEAD'}).then(x=>x.status)));return{s,r};});
  ok('atsarginės nuotraukos demo skaidrėms egzistuoja',bk.s.length>=2&&bk.r.every(x=>x===200),JSON.stringify(bk));
  // rankinis režimas
  await page.evaluate(()=>__deck.goTo(1,0));await sleep(150);
  await page.keyboard.press('m');await sleep(150);
  ok('M atidaro rankinį įvedimą',await page.evaluate(()=>document.getElementById('manual').classList.contains('on')));
  await page.evaluate(()=>document.querySelector('#manual button[data-m="d"][data-i="2"][data-d="1"]').click());await sleep(50);
  await page.evaluate(()=>document.querySelector('#manual button[data-m="__n"][data-i="1"]').click());await sleep(300);
  ok('rankinis +1 matosi stulpelyje ir skaičiuje',await page.evaluate(()=>{const r=document.querySelectorAll('.slide.on [data-res="kas.d"] .row .num');return r[2].textContent==='1'&&/^1 atsakė/.test(document.querySelector('.slide.on [data-count="kas"]').textContent);}));
  await page.keyboard.press('m');
  await page.keyboard.down('Shift');await page.keyboard.press('R');await page.keyboard.press('R');await page.keyboard.up('Shift');await sleep(300);
  ok('Shift+R ×2 išvalo klausimą',await page.evaluate(()=>/^0 atsakė/.test(document.querySelector('.slide.on [data-count="kas"]').textContent)));
  ok('įrankiai: 4 kortelės su Copilot + COI toje pačioje skaidrėje',await page.evaluate(()=>{const s=__deck.slides.find(x=>x.dataset.label==='Įrankiai');return s.querySelectorAll('.tools .card').length===4&&/Copilot/.test(s.querySelector('.tools').textContent)&&/Nė vienas man nemoka/.test(s.textContent);}));
  ok('nėra „ne X, o Y" ekrano formulių (5 pataisytos)',await page.evaluate(()=>{const t=__deck.slides.map(s=>{const c=s.cloneNode(true);c.querySelectorAll('aside').forEach(a=>a.remove());return c.textContent;}).join(' ');return !/ne magija|ne šūkį|modelius, ne vaikus|galvoti daugiau<\/b>, ne mažiau/.test(t);}));
  ok('užrašuose nėra 86 mlrd. ir „kelias savaites"',await page.evaluate(()=>!/86 mlrd|kelias savaites/.test(__deck.NOTES.join(' '))));
  ok('12 ir 24 skaidrės užrašuose PASIRENKAMA',await page.evaluate(()=>/PASIRENKAMA/.test(__deck.NOTES[11])&&/PASIRENKAMA/.test(__deck.NOTES[23])&&__deck.slides[11].dataset.label==='Pasaulis'&&__deck.slides[23].dataset.label==='L3 antros smegenys'));
  // pagalba
  await page.keyboard.press('?');await sleep(100);
  ok('? rodo pultą ir salės kanalą',await page.evaluate(()=>/pultas\.html\?room=/.test(document.getElementById('pulturl').textContent)&&/Salės kanalas/.test(document.getElementById('livestate').textContent)));
  ok('pagalboje Q, B ir 12/24/29+Enter',await page.evaluate(()=>{const t=document.getElementById('help').textContent;return /QR/.test(t)&&/pertrauka/.test(t)&&/Antros smegenys/.test(t)&&/Pasaulis/.test(t)&&/29/.test(t);}));
  await page.keyboard.press('Escape');
  const html=await page.content();
  ok('em dash 0 (deck)',!/—/.test(html));
  ok('kv-track kids režimas projektoriuje',await page.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="kids"]')));
  ok('jokių venture CTA nuorodų deck\'e',await page.evaluate(()=>![].some.call(document.querySelectorAll('a,iframe'),a=>/exoclass\.lt|robotikos|brainclub/i.test(a.href||a.dataset.src||''))));
  if(SHOTS){
    const li=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='L1 demo'));
    await page.evaluate(i=>__deck.goTo(i,1),li);await sleep(700);
    await page.screenshot({path:__dirname+'/backup/l1-testas-pavyzdys.png'});
    for(const [lab,step,file] of [['Prisijunkite',0,'s01'],['Ko tikitės?',0,'s03'],['Kas aš',1,'s04'],['Kas yra DI?',1,'s07'],['Stiprybės ir silpnybės',1,'s08'],['Antros smegenys (papildomai)',0,'s28'],['Kada DI padeda mokytis',1,'s10'],['Klasių žemėlapis',4,'s20'],['3 lygiai',2,'s06'],['Įrankiai',1,'s14']]){
      const i=await page.evaluate(l=>__deck.slides.findIndex(s=>s.dataset.label===l),lab);await page.evaluate((i,s)=>__deck.goTo(i,s),i,step);await sleep(1500);
      await page.screenshot({path:__dirname+'/qa-shot-'+file+'.png'});}
  }
}
/* ---------- GYVAI: 2 telefonai + pultas ---------- */
console.log('\n== Gyvai (Supabase Realtime) ==');
const live=await until(()=>deck.evaluate(()=>__deck.LIVE.ok()),15000);
ok('deck\'o salės kanalas atidarytas',live);
await deck.evaluate(()=>__deck.goTo(1,0));await sleep(500);
async function phone(name){
  const p=await browser.newPage();const errs=[];watch(p,errs);
  await p.setViewport({width:360,height:740,isMobile:true,hasTouch:true,deviceScaleFactor:2});
  await p.goto(BASE+'join.html?r='+ROOM+'&src=qa',{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>localStorage.clear());await p.goto(BASE+'join.html?r='+ROOM+'&src=qa',{waitUntil:'domcontentloaded'});
  return {p,errs,name};
}
const A=await phone('A'),B=await phone('B');
ok('telefonas A gauna 1 klausimą iš ekrano',await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Kas šiandien salėje?'),15000));
ok('telefonas B gauna 1 klausimą',await until(()=>B.p.evaluate(()=>document.getElementById('actTitle').textContent==='Kas šiandien salėje?'),15000));
ok('deck\'as mato 2 telefonus',await until(()=>deck.evaluate(()=>__deck.LIVE.present()>=2),10000));
async function tapOpt(ph,k,i){await ph.p.evaluate((k,i)=>document.querySelectorAll('.opts[data-k="'+k+'"] .opt')[i].click(),k,i);}
await tapOpt(A,'d',2);await tapOpt(A,'d',1);await tapOpt(A,'kl',2);
await A.p.evaluate(()=>document.querySelector('.send').click());
ok('A: „✅ Ekrane" (deck\'as patvirtino)',await until(()=>A.p.evaluate(()=>/Ekrane/.test(document.getElementById('msg').textContent))));
await tapOpt(B,'d',2);await tapOpt(B,'kl',3);await B.p.evaluate(()=>document.querySelector('.send').click());
ok('deck: 2 atsakė, Matematika = 2',await until(()=>deck.evaluate(()=>{const r=document.querySelectorAll('.slide.on [data-res="kas.d"] .row .num');return /^2 atsakė/.test(document.querySelector('.slide.on [data-count="kas"]').textContent)&&r[2].textContent==='2'&&r[1].textContent==='1';})));
// žodžių debesis
await deck.evaluate(()=>__deck.goTo(2,0));
ok('A gauna lūkesčių klausimą',await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Lūkesčiai')));
await A.p.type('input[type=text]','laikas, testai');await A.p.evaluate(()=>document.querySelector('.send').click());
await B.p.waitForSelector('input[type=text]');await B.p.type('input[type=text]','Laikas');await B.p.evaluate(()=>document.querySelector('.send').click());
ok('žodžių debesis: „laikas" ×2 didžiausias',await until(()=>deck.evaluate(()=>{const s=document.querySelectorAll('.slide.on .cloud span');return s.length===2&&s[0].textContent==='laikas'&&parseInt(s[0].style.fontSize)>parseInt(s[1].style.fontSize);})));
// mokymosi rezultatai: prieš
await deck.evaluate(()=>__deck.goTo(3,0));
ok('A gauna „Ko išmoksite" su 3 skalėmis 1–5',await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Ko išmoksite'&&document.querySelectorAll('.scale').length===3&&document.querySelectorAll('.scale')[0].children.length===5)));
await A.p.evaluate(()=>{const sc=document.querySelectorAll('.scale');[1,2,0].forEach((v,i)=>sc[i].children[v].click());document.querySelector('.send').click();});
await until(()=>B.p.evaluate(()=>document.getElementById('actTitle').textContent==='Ko išmoksite'));
await B.p.evaluate(()=>{const sc=document.querySelectorAll('.scale');[2,2,2].forEach((v,i)=>sc[i].children[v].click());document.querySelector('.send').click();});
ok('deck: „prieš" vidurkiai (① 2.5 · ② 3.0 · ③ 2.0, n=2)',await until(()=>deck.evaluate(()=>{const v=[...document.querySelectorAll('.slide.on .pp .nv')].map(x=>x.textContent);return v.length===3&&/^2\.5/.test(v[0])&&/^3\.0/.test(v[1])&&/^2\.0/.test(v[2])&&/n=2/.test(v[0])&&/^2 atsakė/.test(document.querySelector('.slide.on [data-count="tikslai"]').textContent);})));
// pulsas
await A.p.evaluate(()=>document.querySelector('#pulse button[data-p="1"]').click());
await B.p.evaluate(()=>document.querySelector('#pulse button[data-p="0"]').click());
ok('pulsas: deck\'as rodo Nesupratau 1 · Supratau 1',await until(()=>deck.evaluate(()=>{const s=__deck.LIVE.D().pulse;const v=Object.values(s).map(x=>x.v).sort();return v.join()==='0,1';})));
await deck.keyboard.press('p');await sleep(300);
ok('P rodo pulso skydą su skaičiais',await deck.evaluate(()=>{const r=document.querySelectorAll('#pbig .row .num');return document.getElementById('pbig').classList.contains('on')&&r[0].textContent==='1'&&r[1].textContent==='1';}));
await deck.keyboard.press('p');
// quiz → atskleidimas telefone
const qi=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.act==='quiz1'));
await deck.evaluate(i=>__deck.goTo(i,0),qi);
ok('A gauna testą',await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Testas')));
await tapOpt(A,'a',1);
await until(()=>B.p.evaluate(()=>document.getElementById('actTitle').textContent==='Testas'));await tapOpt(B,'a',0);
ok('quiz: deck\'as 2 atsakymai (vienas tap = siunčia)',await until(()=>deck.evaluate(()=>/^2 atsakė/.test(document.querySelector('.slide.on [data-count="quiz1"]').textContent))));
await deck.keyboard.press('ArrowRight');
ok('quiz: atskleidimas pasiekia telefoną (B žalias, A „Teisingai")',await until(()=>A.p.evaluate(()=>document.querySelectorAll('.opts[data-k="a"] .opt')[1].classList.contains('good')&&/Teisingai/.test(document.getElementById('msg').textContent))));
ok('quiz: neteisingai atsakiusiam rodomas teisingas',await until(()=>B.p.evaluate(()=>/Teisingas: B/.test(document.getElementById('msg').textContent))));
// lygis → kitas žingsnis
const li=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.act==='lygis'));
await deck.evaluate(i=>__deck.goTo(i,0),li);
await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Jūsų lygis'));
await tapOpt(A,'l',1);
ok('lygis: deck\'as L2 = 1',await until(()=>deck.evaluate(()=>document.querySelectorAll('.slide.on [data-res="lygis.l"] .row .num')[1].textContent==='1')));
ok('telefonas prisimena L2',await A.p.evaluate(()=>__join.LEVEL()==='l2'));
const ni=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.act==='next'));
await deck.evaluate(i=>__deck.goTo(i,0),ni);
ok('pabaigoje A mato L2 kitą žingsnį + užklausą + video',await until(()=>A.p.evaluate(()=>!document.getElementById('nextBox').classList.contains('hide')&&/L2 · Kuriu/.test(document.getElementById('nextBox').textContent)&&/video/.test(document.getElementById('nextBox').textContent)&&!!document.querySelector('#nextBox pre'))));
ok('B (be lygio) mato L1',await until(()=>B.p.evaluate(()=>/L1 · Pradedu/.test(document.getElementById('nextBox').textContent))));
ok('pabaigoje telefone: „Po 2 savaičių" + „Dalyvausiu" + tie patys 3 klausimai',await A.p.evaluate(()=>{const t=document.getElementById('actBody').textContent;return /Po 2 savaičių: 30 min\. susitikimas/.test(t)&&/Dalyvausiu/.test(t)&&/Vienu sakiniu paaiškinti/.test(t)&&/duomenų šviesoforą/.test(t)&&document.querySelectorAll('.scale').length===4;}));
await tapOpt(A,'po',0);
ok('„Dalyvausiu" vienu paspaudimu → ekrane 1',await until(()=>deck.evaluate(()=>{const r=document.querySelectorAll('.slide.on [data-res="next.po"] .row');return r.length===2&&r[0].querySelector('.num').textContent==='1'&&/Dalyvausiu/.test(r[0].textContent);})));
ok('ekrane: po 2 savaičių 30 min. susitikimas su DI testu',await deck.evaluate(()=>/Po 2 savaičių · 30 min\./.test(document.querySelector('.slide.on').textContent)&&/vieną DI testą/.test(document.querySelector('.slide.on').textContent)));
await A.p.evaluate(()=>{const sc=document.querySelectorAll('.scale');sc[0].children[4].click();[3,3,2].forEach((v,i)=>sc[i+1].children[v].click());});await tapOpt(A,'t',0);await A.p.evaluate(()=>document.querySelector('.send').click());
ok('atsiliepimas: naudingumas 5 ekrane',await until(()=>deck.evaluate(()=>document.querySelectorAll('.slide.on [data-res="next.u"] .row .num')[4].textContent==='1')));
await deck.keyboard.press('ArrowRight');
ok('→ prieš → po: ① 2.5 → 4.0 · ② 3.0 → 4.0 · ③ 2.0 → 3.0',await until(()=>deck.evaluate(()=>{const v=[...document.querySelectorAll('.slide.on [data-only="1"].show .pp .nv')].map(x=>x.textContent);return v.join('|')==='prieš 2.5|po 4.0|prieš 3.0|po 4.0|prieš 2.0|po 3.0';}),8000),await deck.evaluate(()=>[...document.querySelectorAll('.slide.on .pp .nv')].map(x=>x.textContent).join('|')));
if(SHOTS){await sleep(900);await deck.screenshot({path:__dirname+'/qa-shot-s27b.png'});await deck.evaluate(()=>__deck.prev());await sleep(900);await deck.screenshot({path:__dirname+'/qa-shot-s27.png'});await A.p.evaluate(()=>scrollTo(0,0));await A.p.screenshot({path:__dirname+'/qa-shot-phone-next.png',fullPage:true});
  await deck.evaluate(()=>__deck.goTo(3,0));await sleep(1200);await deck.screenshot({path:__dirname+'/qa-shot-s04-tikslai.png'});await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Ko išmoksite'));await A.p.evaluate(()=>scrollTo(0,0));await A.p.screenshot({path:__dirname+'/qa-shot-phone-tikslai.png'});
  const di=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Dalykai ir testai'));await deck.evaluate(i=>__deck.goTo(i,4),di);await sleep(900);await deck.screenshot({path:__dirname+'/qa-shot-s20-reiskinys.png'});}
// rubrika + siena
const rbi=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Praktika L1'));
await deck.evaluate(i=>__deck.goTo(i,0),rbi);
await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Praktika: jūsų testas'));
ok('telefone „Rask klaidą": 5 DI klausimai + pasirinkimas 1–5',await A.p.evaluate(()=>{const i=document.querySelector('.card.info');return !!i&&/1401 m\./.test(i.textContent)&&/Mindaugas/.test(i.textContent)&&document.querySelectorAll('.opts[data-k="kl"] .opt').length===5;}));
await tapOpt(A,'kl',2);await until(()=>B.p.evaluate(()=>document.getElementById('actTitle').textContent==='Praktika: jūsų testas'));await tapOpt(B,'kl',0);
ok('„Rask klaidą" vienu paspaudimu → ekrane 3 kl. = 1, 1 kl. = 1',await until(()=>deck.evaluate(()=>{const r=document.querySelectorAll('.slide.on [data-res="rubric.kl"] .row .num');return r.length===5&&r[2].textContent==='1'&&r[0].textContent==='1';})));
if(SHOTS){await sleep(700);await deck.screenshot({path:__dirname+'/qa-shot-s17.png'});await A.p.evaluate(()=>document.querySelector('.card.info').scrollIntoView());await sleep(200);await A.p.screenshot({path:__dirname+'/qa-shot-phone-klaida.png'});}
await deck.keyboard.press('ArrowRight');
ok('atskleidimas telefone: A „Radote!", 3 klausimas žalias',await until(()=>A.p.evaluate(()=>document.querySelectorAll('.opts[data-k="kl"] .opt')[2].classList.contains('good')&&/Radote/.test((document.querySelector('.rvmsg')||{}).textContent||''))));
ok('atskleidimas telefone: B mato teisingą (1410 m.)',await until(()=>B.p.evaluate(()=>/1410 m\./.test((document.querySelector('.rvmsg')||{}).textContent||''))));
ok('deck: teisingas atsakymas (3) pažymėtas raudonai',await deck.evaluate(()=>document.querySelectorAll('.slide.on [data-res="rubric.kl"] .row')[2].classList.contains('good')));
if(SHOTS){await sleep(700);await deck.screenshot({path:__dirname+'/qa-shot-s17b.png'});await A.p.evaluate(()=>document.querySelector('.rvmsg').scrollIntoView({block:'center'}));await sleep(200);await A.p.screenshot({path:__dirname+'/qa-shot-phone-klaida-rv.png'});}
await deck.keyboard.press('ArrowRight');await sleep(300);
if(SHOTS){await sleep(600);await deck.screenshot({path:__dirname+'/qa-shot-s17c.png'});}
ok('praktika: telefone yra kopijuojama užklausa',await A.p.evaluate(()=>/Siekinys iš BUP/.test(document.querySelector('#actBody pre').textContent)));
await A.p.evaluate(()=>{const sc=document.querySelectorAll('.scale');[2,1,2,0].forEach((v,i)=>sc[i].children[v].click());});
await A.p.type('textarea','Kodėl 1/3 mažiau nei 1/2?');await A.p.evaluate(()=>document.querySelector('.send').click());
await deck.evaluate(i=>__deck.goTo(i+1,0),rbi);
ok('rubrikos vidurkiai + siena rezultatų skaidrėje',await until(()=>deck.evaluate(()=>{const b=document.querySelectorAll('.slide.on .avg b');return b[0].textContent==='3.0'&&b[3].textContent==='1.0'&&/1\/3/.test(document.querySelector('.slide.on .wall').textContent);})));
// pultas → deck'as
console.log('\n== Pultas ==');
const P=await browser.newPage();const pErrs=[];watch(P,pErrs);
await P.setViewport({width:390,height:844,isMobile:true});
await P.goto(BASE+'pultas.html?room='+ROOM,{waitUntil:'domcontentloaded'});
ok('pultas: „DECK\'AS GIRDI"',await until(()=>P.evaluate(()=>/GIRDI/.test(document.getElementById('state').textContent)),15000));
const before=await deck.evaluate(()=>__deck.st.slide);
await P.evaluate(()=>document.querySelector('.nav .nx').click());
ok('pultas → deck\'as perjungė skaidrę',await until(()=>deck.evaluate(b=>__deck.st.slide===b+1,before)));
ok('pultas rodo salės eilutę',await until(()=>P.evaluate(()=>/telefon/.test(document.getElementById('live').textContent))));
const qm0=await deck.evaluate(()=>__deck.QR.mode());
await P.evaluate(()=>document.getElementById('bQr').click());
ok('pultas: QR mygtukas keičia deck\'o QR režimą',await until(()=>deck.evaluate(m=>__deck.QR.mode()!==m,qm0)));
await P.evaluate(()=>document.getElementById('bBrk').click());
ok('pultas: pertraukos mygtukas atidaro judėjimo pertrauką',await until(()=>deck.evaluate(()=>__deck.BRK.on())));
await P.evaluate(()=>document.getElementById('bBrk').click());
ok('pultas: antras paspaudimas uždaro pertrauką',await until(()=>deck.evaluate(()=>!__deck.BRK.on())));
while(await deck.evaluate(()=>__deck.QR.mode())!=='auto'){await deck.keyboard.press('q');await sleep(100);}
ok('pultas JS klaidų 0',pErrs.length===0,pErrs.join(' | '));
/* ---------- Telefonas 360 px ---------- */
console.log('\n== Telefonas 360 px ==');
{
  const p=A.p;
  await deck.evaluate(i=>__deck.goTo(i,0),rbi);await sleep(1500);
  ok('nėra horizontalaus scroll 360px',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),String(await p.evaluate(()=>document.documentElement.scrollWidth)));
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  ok('nėra horizontalaus scroll ir su atidarytu užklausų banku',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const small=await p.evaluate(()=>[].filter.call(document.querySelectorAll('button,summary,input,textarea'),b=>{const r=b.getBoundingClientRect();return r.width>0&&r.height<44;}).map(b=>(b.textContent||b.tagName).trim().slice(0,20)+':'+Math.round(b.getBoundingClientRect().height)));
  ok('visi mygtukai ir laukai ≥44 px aukščio',small.length===0,small.join(', '));
  ok('body šriftas ≥17px',await p.evaluate(()=>parseFloat(getComputedStyle(document.body).fontSize)>=17));
  ok('užklausų bankas: 19 kopijuojamų užklausų (L1/L2/L3)',await p.evaluate(()=>document.querySelectorAll('#bank pre').length===19&&document.querySelectorAll('#bank details').length===3));
  ok('bankas: pamokos planas + NotebookLM video + video scenarijus + reiškinys',await p.evaluate(()=>{const t=document.getElementById('bank').textContent;return /Pamokos planas/.test(t)&&/Video ar garso apžvalga/.test(t)&&/Mokomasis video telefonu/.test(t)&&/Reiškinys: DI kaip tyrimo partneris/.test(t);}));
  ok('kiekviena BUP vieta turi „savais žodžiais" atsarginį kelią',await p.evaluate(()=>[].every.call(document.querySelectorAll('#bank pre'),x=>!/emokykla|BUP siekin|lygių aprašas|požymiai:/.test(x.textContent)||/savais žodžiais/.test(x.textContent))));
  const txt=await p.evaluate(()=>document.body.innerText);
  ok('⚗️ disclaimer eilutė',/Eksperimentinis prototipas, sukurtas su DI\. Gali klysti/.test(txt));
  ok('interesų atskleidimas',/bendraįkūrėjas/.test(txt));
  ok('kv-track.js data-mode=full (Clarity tik po sutikimo)',await p.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="full"]')));
  ok('pulso mygtukai fiksuoti apačioje',await p.evaluate(()=>getComputedStyle(document.getElementById('pulse')).position==='fixed'));
  ok('em dash 0 (join)',!/—/.test(await p.content()));
  ok('telefono A JS klaidų 0',A.errs.length===0,A.errs.join(' | '));
  ok('telefono B JS klaidų 0',B.errs.length===0,B.errs.join(' | '));
  if(SHOTS){await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=false);scrollTo(0,0);});await sleep(200);await p.screenshot({path:__dirname+'/qa-shot-phone.png'});}
}
/* ---------- MENTOR + RESET (engine, 2026-10-20) ---------- */
console.log('\n== Mentoriui ==');
{
  const KRIS_ONLY=['Ką dar pridėjau (Kris)'];
  const chk=await deck.evaluate(ko=>{const M=window.MENTOR||{},bad=[],aud=__deck.slides.map(s=>s.dataset.label).filter(l=>ko.indexOf(l)<0);
    aud.forEach(l=>{const m=M[l];if(!m){bad.push(l+':nėra');return;}const f=m.f||[],e=m.e||[];
      if(f.length<3||f.length>5)bad.push(l+':f='+f.length);if(e.length<1||e.length>3)bad.push(l+':e='+e.length);
      if(!f.every(x=>x.t&&x.t.length>10))bad.push(l+':f tuščias');if(!e.every(x=>x.t&&x.d))bad.push(l+':e tuščias');
      if(!f.every(x=>!x.g||/^[ABC]$/.test(x.g)))bad.push(l+':g');});
    return{n:aud.length,bad:bad,keys:Object.keys(M).length,extra:Object.keys(M).filter(k=>aud.indexOf(k)<0),dash:/—/.test(JSON.stringify(M))};},KRIS_ONLY);
  ok('MENTOR: kiekviena salės skaidrė ('+chk.n+') turi 3–5 faktus + 1–3 pavyzdžius',chk.bad.length===0,chk.bad.join(', '));
  ok('MENTOR: raktai = data-label (nėra pašalinių)',chk.extra.length===0,chk.extra.join(', '));
  ok('MENTOR: faktai su A/B/C lygiu turi šaltinį',await deck.evaluate(()=>Object.values(window.MENTOR||{}).every(m=>(m.f||[]).every(x=>!x.g||!!x.s))));
  ok('MENTOR: em dash 0 (mentor.js)',!chk.dash);
  ok('MENTOR: pagal nutylėjimą paslėpta',await deck.evaluate(()=>!document.getElementById('mentor').classList.contains('on')&&!__deck.MENTOR_UI.on()));
  await deck.evaluate(()=>__deck.goTo(7,0));await sleep(300);
  await deck.keyboard.press('k');await sleep(250);
  ok('K atidaro skydelį su šios skaidrės medžiaga',await deck.evaluate(()=>{const m=document.getElementById('mentor');return m.classList.contains('on')&&m.textContent.indexOf(__deck.slides[__deck.st.slide].dataset.label)>-1&&m.querySelectorAll('li').length>=3&&m.querySelectorAll('.mex').length>=1;}));
  ok('skydelis telpa ekrane (1920×1080), šriftas ≥22 px',await deck.evaluate(()=>{const m=document.getElementById('mentor'),r=m.getBoundingClientRect(),li=m.querySelector('li');return r.right<=innerWidth+1&&r.bottom<=innerHeight+1&&parseFloat(getComputedStyle(li).fontSize)>=22;}));
  if(SHOTS){await sleep(300);await deck.screenshot({path:__dirname+'/qa-shot-mentor.png'});}
  await deck.keyboard.press('ArrowRight');await sleep(300);
  ok('→ atnaujina skydelį kitai skaidrei',await deck.evaluate(()=>document.getElementById('mentor').textContent.indexOf(__deck.slides[__deck.st.slide].dataset.label)>-1));
  await deck.keyboard.press('k');await sleep(200);
  ok('K antrą kartą uždaro',await deck.evaluate(()=>!document.getElementById('mentor').classList.contains('on')));
  await deck.evaluate(()=>document.getElementById('bMentor').click());await sleep(200);
  ok('📘 mygtukas viršuje atidaro',await deck.evaluate(()=>document.getElementById('mentor').classList.contains('on')));
  await deck.keyboard.press('Escape');await sleep(200);
  ok('Esc uždaro',await deck.evaluate(()=>!document.getElementById('mentor').classList.contains('on')));
  // telefonas
  const p=A.p;await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=false));
  await deck.evaluate(()=>__deck.goTo(8,0));await sleep(400);
  await p.evaluate(()=>document.getElementById('mBtn').click());
  const lab8=await deck.evaluate(()=>__deck.slides[8].dataset.label);
  ok('telefonas: „Mentoriui" rodo DABARTINĖS skaidrės medžiagą',await until(()=>p.evaluate(l=>{const b=document.getElementById('mentorBox');return !b.classList.contains('hide')&&b.querySelector('h1').textContent===l&&b.querySelectorAll('li').length>=3;},lab8),8000));
  ok('telefonas: mentoriaus lange be horizontalaus scroll, mygtukai ≥44 px',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&[].every.call(document.querySelectorAll('#mentorBox button'),b=>b.getBoundingClientRect().height>=44)));
  if(SHOTS){await sleep(200);await p.screenshot({path:__dirname+'/qa-shot-phone-mentor.png'});}
  await deck.evaluate(()=>__deck.goTo(10,0));const lab10=await deck.evaluate(()=>__deck.slides[10].dataset.label);
  ok('telefonas: ekranui perjungus skaidrę, medžiaga atsinaujina',await until(()=>p.evaluate(l=>document.querySelector('#mentorBox h1').textContent===l,lab10),8000));
  await p.evaluate(()=>document.getElementById('mNext').click());
  ok('telefonas: › naršo toliau savarankiškai',await p.evaluate(l=>document.querySelector('#mentorBox h1').textContent!==l,lab10));
  await p.evaluate(()=>document.getElementById('mClose').click());
  ok('telefonas: ✕ uždaro',await p.evaluate(()=>document.getElementById('mentorBox').classList.contains('hide')));
  // pultas
  await P.evaluate(()=>document.getElementById('bMent').click());
  ok('pultas: 📘 rodo skydelį deck\'e',await until(()=>deck.evaluate(()=>__deck.MENTOR_UI.on())));
  ok('pultas: mentoriaus tekstas skaitomas telefone',await until(()=>P.evaluate(()=>document.querySelectorAll('#mnt li').length>=3)));
  if(SHOTS){await P.evaluate(()=>{document.querySelector('#mnt').closest('details').open=true;document.getElementById('bMent').scrollIntoView();});await sleep(200);await P.screenshot({path:__dirname+'/qa-shot-pultas-mentor.png'});}
  await P.evaluate(()=>document.getElementById('bMent').click());
  ok('pultas: antras 📘 paslepia',await until(()=>deck.evaluate(()=>!__deck.MENTOR_UI.on())));
}
console.log('\n== Atstatyti (RESET) ==');
{
  const SK='siaures-ai90-res-'+ROOM;
  ok('prieš RESET: atsakymų ir pulso yra',await deck.evaluate(()=>{const D=__deck.LIVE.D();return Object.keys(D.ans).length>=5&&D.pulseAll.reduce((a,b)=>a+b,0)>=2;}));
  const rbi2=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Praktika L1'));
  await deck.evaluate(i=>__deck.goTo(i,0),rbi2);await sleep(200);
  await deck.keyboard.press('t');await sleep(2300);
  await deck.keyboard.type('0');await deck.keyboard.press('Enter');await sleep(200);
  ok('prieš RESET: laikmatis eina, plano laikrodis perstatytas, pertraukų laikas skaičiuoja',await deck.evaluate(()=>!!__deck.T.iv&&localStorage.getItem('siaures-ai90-start')!==null&&!!sessionStorage.getItem('siaures-ai90-t0')));
  await deck.keyboard.down('Shift');await deck.keyboard.press('X');await deck.keyboard.up('Shift');await sleep(250);
  ok('Shift+X vieną kartą: rodo „Tikrai išvalyti viską? Spauskite dar kartą per 3 s", nieko nevalo',await deck.evaluate(()=>{const b=document.getElementById('rconfirm');return b.classList.contains('on')&&/Tikrai išvalyti viską\? Spauskite dar kartą per 3 s/.test(b.textContent)&&Object.keys(__deck.LIVE.D().ans).length>=5&&__deck.st.slide>0;}));
  if(SHOTS){await deck.screenshot({path:__dirname+'/qa-shot-reset-confirm.png'});}
  await sleep(3300);
  ok('po 3 s patvirtinimas dingsta, duomenys liko',await deck.evaluate(()=>!document.getElementById('rconfirm').classList.contains('on')&&Object.keys(__deck.LIVE.D().ans).length>=5));
  await deck.evaluate(()=>document.getElementById('bReset').click());await sleep(150);
  ok('↺ mygtukas viršuje: 1 paspaudimas tik ginkluoja',await deck.evaluate(()=>__deck.RESET.armed()&&document.getElementById('bReset').classList.contains('arm')&&Object.keys(__deck.LIVE.D().ans).length>=5));
  await deck.evaluate(()=>document.getElementById('bReset').click());await sleep(500);
  const r=await deck.evaluate(SK=>{const D=__deck.LIVE.D(),s=JSON.parse(localStorage.getItem(SK)||'{}'),t=__deck.slides.find(x=>x.dataset.label==='Praktika L1').querySelector('.timer');
    const st=__deck.START();return{ans:Object.keys(D.ans).length,man:Object.keys(D.man).length,pulse:Object.keys(D.pulse).length,pa:D.pulseAll.join(),hid:Object.keys(D.hidden).length,ep:D.epoch,lsAns:Object.keys(s.ans||{}).length,lsEp:s.epoch,
      iv:!!__deck.T.iv,tt:t.textContent,run:t.classList.contains('run'),slide:__deck.st.slide,el:__deck.BRK.elapsed(),t0:sessionStorage.getItem('siaures-ai90-t0'),start:localStorage.getItem('siaures-ai90-start'),hh:st.getHours()+':'+st.getMinutes(),banner:document.getElementById('rconfirm').classList.contains('on')};},SK);
  ok('RESET: visi atsakymai, rankiniai, pulsas, paslėpti = 0',r.ans===0&&r.man===0&&r.pulse===0&&r.pa==='0,0,0,0'&&r.hid===0,JSON.stringify(r));
  ok('RESET: localStorage šiam kambariui išvalytas (nauja epocha)',r.lsAns===0&&r.lsEp===r.ep&&r.ep>0);
  ok('RESET: laikmatis sustabdytas ir grąžintas į 20:00',!r.iv&&!r.run&&r.tt==='20:00',r.tt);
  ok('RESET: plano laikrodis 16:30, pertraukų laikas 0:00, 1 skaidrė',r.start===null&&r.hh==='16:30'&&r.el==='0:00'&&r.t0===null&&r.slide===0,JSON.stringify(r));
  ok('RESET: deck\'as skaičiuoja 0 atsakymų visose veiklose',await deck.evaluate(()=>Object.keys(__deck.ACTS).every(k=>__deck.LIVE.respondents(k)===0)));
  ok('RESET: telefonas A pamiršo atsakymus (reset broadcast)',await until(()=>A.p.evaluate(()=>Object.keys(__join.sent()).length===0&&__join.LEVEL()===null),8000));
  await deck.evaluate(()=>__deck.goTo(1,0));
  ok('po RESET telefone klausimas be pažymėjimų',await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Kas šiandien salėje?'&&document.querySelectorAll('.opt.sel').length===0&&!/Ekrane/.test((document.getElementById('msg')||{}).textContent||'')),8000));
  await tapOpt(A,'d',0);await A.p.evaluate(()=>document.querySelector('.send').click());
  ok('po RESET telefonas gali atsakyti iš naujo (ekrane 1 atsakė + ✅)',await until(()=>deck.evaluate(()=>/^1 atsakė/.test(document.querySelector('.slide.on [data-count="kas"]').textContent)))&&await until(()=>A.p.evaluate(()=>/Ekrane/.test(document.getElementById('msg').textContent))));
  // telefonas, praleidęs reset broadcast, pasiveja per epochą
  await B.p.evaluate(r=>{localStorage.setItem('di90-ep-'+r,'123');window.sent={kas:{d:[1]}};},ROOM);
  await deck.evaluate(()=>{__deck.goTo(2,0);__deck.goTo(1,0);});
  ok('praleidęs reset telefonas pasiveja per epochą (state)',await until(()=>B.p.evaluate(()=>Object.keys(__join.sent()).length===0),8000));
  // pultas: dvigubas paspaudimas
  await P.evaluate(()=>document.getElementById('bRst').click());await sleep(1200);
  ok('pultas: 1 paspaudimas rodo „Tikrai…", deck\'as nevalo',await P.evaluate(()=>/Tikrai išvalyti viską\? Spauskite dar kartą per 3 s/.test(document.getElementById('bRst').textContent))&&await deck.evaluate(()=>Object.keys(__deck.LIVE.D().ans).length===1));
  await P.evaluate(()=>document.getElementById('bRst').click());
  ok('pultas: 2 paspaudimas per 3 s išvalo deck\'ą',await until(()=>deck.evaluate(()=>Object.keys(__deck.LIVE.D().ans).length===0&&__deck.st.slide===0),8000));
  ok('pultas JS klaidų 0 (mentor + reset)',pErrs.length===0,pErrs.join(' | '));
  ok('telefonų JS klaidų 0 (mentor + reset)',A.errs.length===0&&B.errs.length===0,A.errs.concat(B.errs).join(' | '));
  ok('em dash 0 (pultas, deck)',!/—/.test(await P.content())&&!/—/.test(await deck.content()));
}
/* ---------- be ryšio ---------- */
console.log('\n== Be ryšio ==');
{
  const p=await browser.newPage();const errs=[];watch(p,errs);
  await p.setRequestInterception(true);p.on('request',r=>{if(/supabase|jsdelivr|cdnjs|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await p.setViewport({width:1280,height:720});
  await p.goto(BASE+'index.html?room=OFFL',{waitUntil:'domcontentloaded'});await sleep(1500);
  ok('be interneto deck\'as veikia klaviatūra',await p.evaluate(()=>{__deck.next();return __deck.st.slide===1||__deck.st.step===1;}));
  ok('be interneto ženklelis siūlo M',await p.evaluate(()=>/ryšio nėra \(M\)/.test(document.getElementById('joinbadge').textContent)));
  await p.evaluate(()=>{localStorage.removeItem('siaures-ai90-res-OFFL');});await p.goto(BASE+'index.html?room=OFFL',{waitUntil:'domcontentloaded'});await sleep(1200);
  await p.evaluate(()=>{__deck.goTo(3,0);__deck.LIVE.manual();});await sleep(150);
  await p.evaluate(()=>document.querySelector('#manual button[data-m="o1"][data-i="3"][data-d="1"]').click());await sleep(400);
  ok('M režimas: „prieš" ① = 4.0 be interneto',await p.evaluate(()=>/^4\.0/.test(document.querySelector('.slide.on .pp .nv').textContent)));
  const nx=await p.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.act==='next'));
  await p.evaluate(i=>{__deck.goTo(i,0);__deck.LIVE.manual();},nx);await sleep(150);
  await p.evaluate(()=>document.querySelector('#manual button[data-m="o1"][data-i="4"][data-d="1"]').click());await sleep(100);
  await p.evaluate(()=>document.querySelector('#manual button[data-m="po"][data-i="0"][data-d="1"]').click());await sleep(100);
  await p.evaluate(()=>{__deck.LIVE.manual();__deck.next();});await sleep(500);
  ok('M režimas: prieš 4.0 → po 5.0 + „Dalyvausiu" 1',await p.evaluate(()=>{const v=[...document.querySelectorAll('.slide.on [data-only="1"].show .pp .nv')].map(x=>x.textContent);return v[0]==='prieš 4.0'&&v[1]==='po 5.0'&&document.querySelector('.slide.on [data-res="next.po"] .row .num').textContent==='1';}));
  const ph=await browser.newPage();await ph.setRequestInterception(true);ph.on('request',r=>{if(/supabase|jsdelivr|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await ph.setViewport({width:360,height:740,isMobile:true});await ph.goto(BASE+'join.html?r=OFFL',{waitUntil:'domcontentloaded'});await sleep(1200);
  ok('be interneto telefonas sako „nėra ryšio" ir rodo užklausas',await ph.evaluate(()=>/nėra ryšio/.test(document.getElementById('conn').textContent)&&document.querySelectorAll('#bank pre').length===19));
  ok('be interneto JS klaidų 0',errs.length===0,errs.join(' | '));
}
ok('deck JS klaidų 0 (visa sesija)',deckErrs.length===0,deckErrs.join(' | '));
await browser.close();
console.log(`\nPASS ${pass} · FAIL ${fail}`);if(fail)console.log(fails.join('\n'));process.exit(fail?1:0);
})();
