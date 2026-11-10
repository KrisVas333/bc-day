/* qa-engine.js · generic QA for any training built on the siaures-ai-90 engine (mokymai skill).
   Copied into each training folder as qa.js by new-training.py. Topic-agnostic: reads ACTS, slides and
   data-* from the deck itself. Add topic checks at the bottom of the "Turinys" block if needed.

   cd <folder-parent> && python3 -m http.server 8899 &
   NODE_PATH=~/bc-day/node_modules node <slug>/qa.js http://localhost:8899/<slug>/ [--engine-only] [--shots] [--allow-venture]

   --engine-only  skip the pedagogy canon block (use on a fresh skeleton; the final gate runs WITHOUT it)
   --shots        write qa-shot-*.png next to this file (first slide, every act slide, phone)
   --allow-venture  venture-owned training (RA / ExoClass / BC canon): venture links allowed on the deck
   Exit code 0 = 0 FAIL. */
const puppeteer=require('puppeteer-core');
const CHROME=process.env.CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
const BASE=(process.argv.find(a=>/^https?:/.test(a)))||'http://localhost:8899/';
const SHOTS=process.argv.includes('--shots'),ENGINE_ONLY=process.argv.includes('--engine-only'),VENTURE=process.argv.includes('--allow-venture');
const ROOM='Q'+Math.random().toString(36).slice(2,5).toUpperCase().replace(/[^A-Z0-9]/g,'X');
let pass=0,fail=0;const fails=[];const EXT=[];
function ok(n,c,x){if(c){pass++;console.log('  ✅ '+n)}else{fail++;fails.push(n+(x?' :: '+x:''));console.log('  ❌ '+n+(x?' :: '+x:''))}}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,ms=12000,step=200){const t=Date.now();while(Date.now()-t<ms){try{if(await fn())return true;}catch(e){}await sleep(step);}return false;}
function watch(page,errs){
  page.on('console',m=>{if(m.type()==='error'){const t=m.text();if(/Failed to load resource|net::ERR|favicon/i.test(t))return;errs.push(t);}});
  /* it-mokytojai-di: išorinio sekiklio (neuron-ar/track.js, umami) klaida localhost'e nėra šio deck'o kodas; ji yra ir siaures-ai-90. Skaičiuojama atskirai. */
  page.on('pageerror',e=>{if(/neuron-ar\/track\.js/.test(e.stack||'')){EXT.push(e.message);return;}errs.push('PAGEERROR: '+e.message);});
}
const ssKey=suf=>`Object.keys(sessionStorage).find(k=>k.endsWith('${suf}'))`;
(async()=>{
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
const deckErrs=[];
const deck=await browser.newPage();watch(deck,deckErrs);
await deck.setViewport({width:1920,height:1080});
const DURL=BASE+'index.html?room='+ROOM+'&local=1';
await deck.goto(DURL,{waitUntil:'domcontentloaded'});
await deck.evaluate(()=>{localStorage.clear();sessionStorage.clear();});
await deck.goto(DURL,{waitUntil:'domcontentloaded'});
await sleep(2500);
const M=await deck.evaluate(()=>{const s=__deck.slides.map((x,i)=>({i,at:+x.dataset.at,act:x.dataset.act||'',label:x.dataset.label||'',opt:!!x.dataset.optional,quiz:x.classList.contains('quiz-slide'),timer:+(x.dataset.timer||0),ans:+(x.dataset.answer||0),vo:x.dataset.vo||'',backup:x.dataset.backup||''}));
  return{s,acts:__deck.ACTS};});
const S=M.s,ACTS=M.acts,D=Math.max(...S.filter(x=>!x.opt).map(x=>x.at));
const main=S.filter(x=>!x.opt&&x.at<D);
const firstAct=S.find(x=>x.act&&x.i>0)||S.find(x=>x.act);
const quiz=S.find(x=>x.quiz&&x.act);
console.log(`\n== Deck (${S.length} skaidrės · ${D} min. · kambarys ${ROOM}) ==`);
{
  const page=deck;
  ok('≥ 10 skaidrių',S.length>=10,String(S.length));
  ok('1 skaidrė rodoma',await page.evaluate(()=>__deck.st.slide===0&&__deck.slides[0].classList.contains('on')));
  ok('JBM šriftas įkeltas',await page.evaluate(async()=>{await document.fonts.ready;return document.fonts.check('800 40px JBM');}));
  ok('salės kodas = '+ROOM,await page.evaluate(r=>__deck.ROOM===r&&document.getElementById('joincode').textContent===r,ROOM));
  ok('prisijungimo QR sugeneruotas',await until(()=>page.evaluate(()=>!!document.querySelector('#joinqr img,#joinqr canvas'))));
  ok('join URL = join.html?r=KODAS',await page.evaluate(r=>/join\.html\?r=/.test(document.getElementById('joinurl').textContent)&&document.getElementById('joinurl').textContent.endsWith(r),ROOM));
  ok('kiekviena skaidrė turi data-at',S.every(x=>!isNaN(x.at)));
  ok('data-at didėja (be papildomų)',S.filter(x=>!x.opt).every((x,k,a)=>k===0||x.at>=a[k-1].at),JSON.stringify(S.filter(x=>!x.opt).map(x=>x.at)));
  const aciu=S.find(x=>/^Ačiū|^Thank/.test(x.label));
  ok('„Ačiū" ≤ D−2 ('+D+' min.)',!!aciu&&aciu.at<=D-2&&aciu.at>=D-6,aciu?String(aciu.at):'nėra');
  ok('pradžia = interaktyvi užduotis (0 min.)',!!S[0].act&&S[0].at===0);
  const acts=main.filter(x=>x.act).map(x=>x.at);const gaps=acts.slice(1).map((a,i)=>a-acts[i]);gaps.push(D-acts[acts.length-1]);
  ok('interaktyvi užduotis kas ≤ 20 min. ('+gaps.join('/')+')',gaps.every(g=>g<=20),JSON.stringify(acts));
  ok('kiekvienas data-act turi ACTS apibrėžimą',S.filter(x=>x.act).every(x=>!!ACTS[x.act]),S.filter(x=>x.act&&!ACTS[x.act]).map(x=>x.act).join(','));
  ok('variklio act\'ai yra (lygis · next)',!!ACTS.lygis&&!!ACTS.next&&ACTS.next.next===true&&ACTS.lygis.parts.some(p=>p.k==='l'));
  // walk every slide + step
  let visited=new Set(),guard=0,over=[],hidden=[];
  while(guard++<400){
    const s=await page.evaluate(()=>{const st=__deck.st,el=__deck.slides[st.slide];
      const shown=[].filter.call(el.querySelectorAll('[data-step]'),x=>+x.dataset.step<=st.step).every(x=>x.classList.contains('show'));
      const r=el.getBoundingClientRect();
      const ov=[].filter.call(el.querySelectorAll(':scope > *:not(aside), h1, h2, .card, .res, .prompt, .refs, .avg, .wall, .photo, img, svg'),x=>{if(!x.offsetParent)return false;const b=x.getBoundingClientRect();return b.height>0&&(b.bottom>r.bottom-20||b.right>r.right+1);}).map(x=>x.className&&x.className.baseVal===undefined?(x.className.split(' ')[0]||x.tagName):x.tagName);
      return{i:st.slide,step:st.step,shown,ov,label:el.dataset.label};});
    visited.add(s.i);
    if(!s.shown)hidden.push(s.i+1+'.'+s.step);
    if(s.ov.length)over.push((s.i+1)+'.'+s.step+' '+s.label+' ['+s.ov.join(',')+']');
    const atEnd=await page.evaluate(()=>{const b=__deck.st.slide,c=__deck.st.step;__deck.next();return b===__deck.st.slide&&c===__deck.st.step;});
    if(atEnd)break;await sleep(40);
  }
  for(const o of S.filter(x=>x.opt)){await page.evaluate(i=>__deck.goTo(i,0),o.i);await sleep(80);visited.add(o.i);}
  ok('visos skaidrės aplankytos',visited.size===S.length,visited.size+'/'+S.length);
  ok('visi žingsniai matomi',hidden.length===0,hidden.join(' '));
  ok('turinys telpa kiekviename žingsnyje (1920×1080)',over.length===0,over.slice(0,8).join(' | '));
  ok('kiekviena skaidrė turi užrašus (> 40 ženklų)',await page.evaluate(()=>__deck.NOTES.every(t=>t.length>40)),await page.evaluate(()=>__deck.NOTES.map((t,i)=>t.length>40?'':i+1).filter(Boolean).join(',')));
  ok('kiekvienas L ženklelis yra L1/L2/L3',await page.evaluate(()=>[].every.call(document.querySelectorAll('.lv'),e=>/^L[123]$/.test(e.textContent.trim()))));
  if(quiz){
    await page.evaluate(i=>__deck.goTo(i,0),quiz.i);await sleep(200);
    ok('quiz: prieš atskleidimą nėra .good',await page.evaluate(()=>!document.querySelector('.slide.on .row.good')));
    if(quiz.timer){await page.keyboard.press('t');await sleep(2200);
      const tv=await page.evaluate(()=>document.querySelector('.slide.on .timer').textContent);
      ok('quiz laikmatis skaičiuoja',tv!==Math.floor(quiz.timer/60)+':'+('0'+quiz.timer%60).slice(-2),tv);
      await page.keyboard.press('t');}
    await page.evaluate(()=>__deck.next());await sleep(300);
    ok('quiz: atskleidus pažymėtas teisingas',await page.evaluate(()=>!!document.querySelector('.slide.on .row.good')));
  } else ok('yra bent viena quiz-slide su data-act',false);
  const prak=S.find(x=>x.act&&x.timer>=180);
  if(prak){await page.evaluate(i=>__deck.goTo(i,0),prak.i);await sleep(200);
    const want=Math.floor(prak.timer/60)+':'+('0'+prak.timer%60).slice(-2);
    ok('praktikos laikmatis '+want,await page.evaluate(w=>document.querySelector('.slide.on .timer').textContent===w,want));
    await page.keyboard.press('t');await sleep(2200);
    ok('praktikos laikmatis paleistas',await page.evaluate(w=>document.querySelector('.slide.on .timer').textContent!==w,want));
    await page.keyboard.press('t');}
  // QR rail
  const noAct=S.find(x=>!x.act&&x.i>0);
  await page.evaluate(new Function('const k='+ssKey('-qr')+';if(k)sessionStorage.removeItem(k);'));
  await page.evaluate(i=>__deck.goTo(i,0),firstAct.i);await sleep(300);
  const qrA=await page.evaluate(i=>{const j=document.getElementById('joinmini'),jr=j.getBoundingClientRect(),s=__deck.slides[i];const hit=[...s.querySelectorAll('h1,h2,.res,.cloud,.card,.rcount')].filter(x=>{const b=x.getBoundingClientRect();return b.width>0&&!(b.right<=jr.left||b.left>=jr.right||b.bottom<=jr.top||b.top>=jr.bottom);}).map(x=>x.className||x.tagName);return{on:j.classList.contains('on'),rail:document.getElementById('stage').classList.contains('qr-on'),hit,mode:__deck.QR.mode()};},firstAct.i);
  ok('QR bėgelis: užduoties skaidrėje rodomas ir nieko neuždengia',qrA.on&&qrA.rail&&qrA.hit.length===0&&qrA.mode==='auto',JSON.stringify(qrA));
  if(noAct){await page.evaluate(i=>__deck.goTo(i,0),noAct.i);await sleep(150);
    ok('QR auto: skaidrėje be užduoties paslėptas',await page.evaluate(()=>!document.getElementById('joinmini').classList.contains('on')));}
  await page.keyboard.press('q');await sleep(150);
  ok('Q ciklas: auto → off',await page.evaluate(()=>__deck.QR.mode()==='off'));
  await page.keyboard.press('q');await sleep(150);
  ok('Q ciklas: off → visur',await page.evaluate(()=>__deck.QR.mode()==='all'&&document.getElementById('joinmini').classList.contains('on')));
  await page.keyboard.press('q');await sleep(150);
  ok('Q ciklas: → auto',await page.evaluate(()=>__deck.QR.mode()==='auto'));
  // movement break
  ok('⏱ laikas nuo pradžios skaičiuojamas',await page.evaluate(new Function('return /^⏱ \\d+:\\d\\d$/.test(document.getElementById("elapsed").textContent)&&!!'+ssKey('-t0'))));
  const before=await page.evaluate(()=>__deck.st.slide);
  await page.keyboard.press('b');await sleep(2300);
  const mv=await page.evaluate(()=>{const m=document.getElementById('move');return{on:m.classList.contains('on'),n:m.querySelectorAll('.mseq span').length,c:+((m.querySelector('.mc')||{}).textContent),fig:!!m.querySelector('svg.mfig')};});
  ok('B: 2 min. judėjimo pertrauka (4 judesiai, skaičiuoja atgal)',mv.on&&mv.n===4&&mv.c<30&&mv.c>=26&&mv.fig,JSON.stringify(mv));
  await page.keyboard.press('Escape');await sleep(200);
  ok('Esc grįžta į tą pačią skaidrę',await page.evaluate(b=>!document.getElementById('move').classList.contains('on')&&__deck.st.slide===b,before));
  await page.evaluate(new Function('sessionStorage.setItem('+ssKey('-lastbrk')+',String(Date.now()-31*60000));'));
  await page.goto(DURL,{waitUntil:'domcontentloaded'});await sleep(1800);
  await page.evaluate(()=>__deck.BRK.tick());await sleep(200);
  ok('pertraukos priminimas kampe (neblokuoja)',await page.evaluate(()=>document.getElementById('brk').classList.contains('on')&&!document.getElementById('move').classList.contains('on')));
  await page.keyboard.press('Escape');await sleep(150);
  ok('Esc atideda priminimą',await page.evaluate(()=>!document.getElementById('brk').classList.contains('on')));
  // optional slides are skipped by →
  const opt=S.filter(x=>x.opt);
  if(opt.length){const o=opt[0];await page.evaluate(i=>__deck.goTo(i-1,0),o.i);await sleep(80);
    const pv=await page.evaluate(()=>{const p=__deck.st.slide;__deck.goTo(p,99);__deck.next();return __deck.st.slide;});
    ok('→ praleidžia papildomą skaidrę „'+o.label+'"',!S[pv]||!S[pv].opt,String(pv));}
  // VO + backup files exist
  const files=await page.evaluate(async()=>{const u=__deck.slides.flatMap(x=>[x.dataset.vo,x.dataset.backup]).filter(Boolean);const r=await Promise.all(u.map(x=>fetch(x,{method:'HEAD'}).then(y=>y.status).catch(()=>0)));return{u,r};});
  ok('visi data-vo / data-backup failai = 200 ('+files.u.length+')',files.r.every(x=>x===200),JSON.stringify(files));
  const imgs=await page.evaluate(async()=>{const u=[...new Set([].map.call(document.querySelectorAll('.slide img[src]'),i=>i.getAttribute('src')))];const r=await Promise.all(u.map(x=>fetch(x,{method:'HEAD'}).then(y=>[x,y.status,+(y.headers.get('content-length')||0)]).catch(()=>[x,0,0])));return r;});
  ok('visi paveikslėliai = 200 ir ≤ 300 KB ('+imgs.length+')',imgs.every(x=>x[1]===200&&x[2]<=300*1024),JSON.stringify(imgs.filter(x=>x[1]!==200||x[2]>300*1024)));
  // manual mode
  await page.evaluate(i=>__deck.goTo(i,0),firstAct.i);await sleep(150);
  await page.keyboard.press('m');await sleep(150);
  ok('M atidaro rankinį įvedimą',await page.evaluate(()=>document.getElementById('manual').classList.contains('on')));
  const clicked=await page.evaluate(()=>{const b=document.querySelector('#manual button[data-d="1"]'),n=document.querySelector('#manual button[data-m="__n"]');if(b)b.click();if(n)n.click();return !!(b||n);});
  await sleep(300);
  ok('rankinis +1 įrašomas',clicked&&await page.evaluate(a=>!!__deck.LIVE.D().man[a],firstAct.act));
  await page.keyboard.press('m');
  await page.keyboard.down('Shift');await page.keyboard.press('R');await page.keyboard.press('R');await page.keyboard.up('Shift');await sleep(300);
  ok('Shift+R ×2 išvalo klausimą',await page.evaluate(a=>!__deck.LIVE.D().man[a]&&!__deck.LIVE.D().ans[a],firstAct.act));
  await page.keyboard.press('?');await sleep(150);
  ok('? rodo pultą ir salės kanalą',await page.evaluate(()=>/pultas\.html\?room=/.test(document.getElementById('pulturl').textContent)));
  await page.keyboard.press('Escape');
  const html=await page.content();
  ok('em dash 0 (deck)',!/—/.test(html));
  ok('kv-track kids režimas projektoriuje',await page.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="kids"]')));
  if(!VENTURE)ok('jokių venture CTA nuorodų deck\'e',await page.evaluate(()=>![].some.call(document.querySelectorAll('a,iframe'),a=>/exoclass\.lt|robotikos|brainclub/i.test(a.href||a.dataset.src||''))));
  if(SHOTS){for(const x of [S[0],...S.filter(y=>y.act).slice(1)]){await page.evaluate(i=>__deck.goTo(i,0),x.i);await sleep(900);await page.screenshot({path:__dirname+'/qa-shot-s'+String(x.i+1).padStart(2,'0')+'.png'});}}
}
/* ---------- LIVE: 2 phones + remote ---------- */
console.log('\n== Gyvai (Supabase Realtime) ==');
ok('deck\'o salės kanalas atidarytas',await until(()=>deck.evaluate(()=>__deck.LIVE.ok()),15000));
await deck.evaluate(i=>__deck.goTo(i,0),firstAct.i);await sleep(500);
async function phone(name){
  const p=await browser.newPage();const errs=[];watch(p,errs);
  await p.setViewport({width:360,height:740,isMobile:true,hasTouch:true,deviceScaleFactor:2});
  await p.goto(BASE+'join.html?r='+ROOM+'&src=qa',{waitUntil:'domcontentloaded'});
  await p.evaluate(()=>localStorage.clear());await p.goto(BASE+'join.html?r='+ROOM+'&src=qa',{waitUntil:'domcontentloaded'});
  return {p,errs,name};
}
const A=await phone('A'),B=await phone('B');
const t1=ACTS[firstAct.act].title;
ok('telefonas A gauna 1 klausimą „'+t1+'"',await until(()=>A.p.evaluate(t=>document.getElementById('actTitle').textContent===t,t1),15000));
ok('telefonas B gauna 1 klausimą',await until(()=>B.p.evaluate(t=>document.getElementById('actTitle').textContent===t,t1),15000));
ok('deck\'as mato 2 telefonus',await until(()=>deck.evaluate(()=>__deck.LIVE.present()>=2),10000));
async function answerAll(ph,act,pick){await ph.p.evaluate((parts,pick)=>{parts.forEach(p=>{
    if(p.type==='choice'||p.type==='multi'){const o=document.querySelectorAll('.opts[data-k="'+p.k+'"] .opt');if(o[pick%o.length])o[pick%o.length].click();}
    else if(p.type==='scale'){}
    else if(p.type==='words'||p.type==='text'){const i=[...document.querySelectorAll('#actBody input,#actBody textarea')].find(x=>!x.value);if(i){i.value='qa testas';i.dispatchEvent(new Event('input'));}}});
    [...document.querySelectorAll('#actBody .scale')].forEach(sc=>{if(sc.children[pick%sc.children.length])sc.children[pick%sc.children.length].click();});
    const s=document.querySelector('#actBody .send');if(s)s.click();},ACTS[act].parts,pick);}
await answerAll(A,firstAct.act,1);
ok('A: „✅ Ekrane" (deck\'as patvirtino)',await until(()=>A.p.evaluate(()=>/Ekrane/.test(document.getElementById('msg').textContent))));
await answerAll(B,firstAct.act,0);
ok('deck: 2 atsakymai į „'+firstAct.act+'"',await until(()=>deck.evaluate(a=>Object.keys(__deck.LIVE.D().ans[a]||{}).length===2,firstAct.act)));
await A.p.evaluate(()=>document.querySelector('#pulse button[data-p="1"]').click());await B.p.evaluate(()=>document.querySelector('#pulse button[data-p="0"]').click());
ok('pulsas: deck\'as gavo 2 balsus',await until(()=>deck.evaluate(()=>Object.keys(__deck.LIVE.D().pulse).length===2)));
await deck.keyboard.press('p');await sleep(300);
ok('P rodo pulso skydą',await deck.evaluate(()=>document.getElementById('pbig').classList.contains('on')||getComputedStyle(document.getElementById('pbig')).display!=='none'));
await deck.keyboard.press('p');
if(quiz){await deck.evaluate(i=>__deck.goTo(i,0),quiz.i);
  const qt=ACTS[quiz.act].title;
  ok('A gauna quiz „'+qt+'"',await until(()=>A.p.evaluate(t=>document.getElementById('actTitle').textContent===t,qt)));
  const qk=ACTS[quiz.act].parts[0].k;
  await A.p.evaluate((k,i)=>document.querySelectorAll('.opts[data-k="'+k+'"] .opt')[i].click(),qk,quiz.ans);
  await B.p.evaluate((k,i)=>document.querySelectorAll('.opts[data-k="'+k+'"] .opt')[i].click(),qk,(quiz.ans+1)%ACTS[quiz.act].parts[0].opts.length);
  ok('quiz: 2 atsakymai (vienas tap = siunčia)',await until(()=>deck.evaluate(a=>Object.keys(__deck.LIVE.D().ans[a]||{}).length===2,quiz.act)));
  await deck.evaluate(()=>__deck.next());
  ok('quiz atskleidimas telefone: A „Teisingai"',await until(()=>A.p.evaluate(()=>/Teisingai/.test(document.getElementById('msg').textContent))));
  ok('quiz atskleidimas telefone: B mato teisingą',await until(()=>B.p.evaluate(()=>/Teisingas:/.test(document.getElementById('msg').textContent))));}
const lyg=S.find(x=>x.act==='lygis');
if(lyg){await deck.evaluate(i=>__deck.goTo(i,0),lyg.i);
  await until(()=>A.p.evaluate(t=>document.getElementById('actTitle').textContent===t,ACTS.lygis.title));
  await A.p.evaluate(()=>document.querySelectorAll('.opts[data-k="l"] .opt')[1].click());
  ok('lygis: telefonas prisimena L2',await until(()=>A.p.evaluate(()=>__join.LEVEL()==='l2')));}
const rub=S.filter(x=>x.act==='rubric'||(x.act&&x.timer>=180));
if(rub.length){const r0=rub[0];await deck.evaluate(i=>__deck.goTo(i,0),r0.i);
  ok('praktika: telefonas gauna formą',await until(()=>A.p.evaluate(t=>document.getElementById('actTitle').textContent===t,ACTS[r0.act].title)));
  if(ACTS[r0.act].parts.some(p=>p.type==='copy'))ok('praktika: telefone kopijuojama užklausa',await A.p.evaluate(()=>!!document.querySelector('#actBody pre')));
  await answerAll(A,r0.act,2);
  ok('praktika: deck\'as gavo įvertinimą',await until(()=>deck.evaluate(a=>!!Object.keys(__deck.LIVE.D().ans[a]||{}).length,r0.act)));}
const nx=S.find(x=>x.act==='next');
if(nx){await deck.evaluate(i=>__deck.goTo(i,0),nx.i);
  ok('pabaigoje A mato L2 kitą žingsnį + užklausą',await until(()=>A.p.evaluate(()=>!document.getElementById('nextBox').classList.contains('hide')&&/L2/.test(document.getElementById('nextBox').textContent)&&!!document.querySelector('#nextBox pre'))));
  ok('B (be lygio) mato L1',await until(()=>B.p.evaluate(()=>/L1/.test(document.getElementById('nextBox').textContent))));
  await answerAll(A,'next',4);
  ok('atsiliepimas pasiekė deck\'ą',await until(()=>deck.evaluate(()=>!!Object.keys(__deck.LIVE.D().ans.next||{}).length)));}
console.log('\n== Pultas ==');
const P=await browser.newPage();const pErrs=[];watch(P,pErrs);
await P.setViewport({width:390,height:844,isMobile:true});
await P.goto(BASE+'pultas.html?room='+ROOM,{waitUntil:'domcontentloaded'});
ok('pultas: „DECK\'AS GIRDI"',await until(()=>P.evaluate(()=>/GIRDI/.test(document.getElementById('state').textContent)),15000));
await deck.evaluate(()=>__deck.goTo(1,0));await sleep(300);
const before=await deck.evaluate(()=>__deck.st.slide),stepsB=await deck.evaluate(()=>+__deck.slides[__deck.st.slide].dataset.steps||1);
await P.evaluate(()=>document.querySelector('.nav .nx').click());
ok('pultas → deck\'as eina pirmyn',await until(()=>deck.evaluate((b,n)=>__deck.st.slide===b+1||(n>1&&__deck.st.step===1),before,stepsB)));
const qm0=await deck.evaluate(()=>__deck.QR.mode());
await P.evaluate(()=>document.getElementById('bQr').click());
ok('pultas: QR mygtukas keičia režimą',await until(()=>deck.evaluate(m=>__deck.QR.mode()!==m,qm0)));
await P.evaluate(()=>document.getElementById('bBrk').click());
ok('pultas: pertraukos mygtukas atidaro pertrauką',await until(()=>deck.evaluate(()=>__deck.BRK.on())));
await P.evaluate(()=>document.getElementById('bBrk').click());
ok('pultas: antras paspaudimas uždaro',await until(()=>deck.evaluate(()=>!__deck.BRK.on())));
ok('pultas JS klaidų 0',pErrs.length===0,pErrs.join(' | '));
console.log('\n== Telefonas 360 px ==');
{
  const p=A.p;
  ok('nėra horizontalaus scroll 360 px',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  ok('nėra horizontalaus scroll su atidarytu banku',await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const small=await p.evaluate(()=>[].filter.call(document.querySelectorAll('button,summary,input,textarea'),b=>{const r=b.getBoundingClientRect();return r.width>0&&r.height<44;}).map(b=>(b.textContent||b.tagName).trim().slice(0,20)+':'+Math.round(b.getBoundingClientRect().height)));
  ok('mygtukai ir laukai ≥ 44 px',small.length===0,small.join(', '));
  ok('body šriftas ≥ 17 px',await p.evaluate(()=>parseFloat(getComputedStyle(document.body).fontSize)>=17));
  ok('užklausų bankas: L1/L2/L3 grupės ir ≥ 6 užklausos',await p.evaluate(()=>document.querySelectorAll('#bank details').length===3&&document.querySelectorAll('#bank pre').length>=6));
  const txt=await p.evaluate(()=>document.body.innerText);
  ok('⚗️ disclaimer eilutė telefone',/Eksperimentinis prototipas/.test(txt)&&/klysti/i.test(txt));
  ok('interesų atskleidimas telefone',/įkūrėj|interes|co-?founder/i.test(txt));
  ok('kv-track.js data-mode=full (Clarity tik po sutikimo)',await p.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="full"]')));
  ok('pulso mygtukai fiksuoti apačioje (4)',await p.evaluate(()=>getComputedStyle(document.getElementById('pulse')).position==='fixed'&&document.querySelectorAll('#pulse button').length===4));
  ok('em dash 0 (join)',!/—/.test(await p.content()));
  ok('telefono A JS klaidų 0',A.errs.length===0,A.errs.join(' | '));
  ok('telefono B JS klaidų 0',B.errs.length===0,B.errs.join(' | '));
  if(SHOTS){await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=false);scrollTo(0,0);});await sleep(200);await p.screenshot({path:__dirname+'/qa-shot-phone.png'});}
}
/* ---------- MENTOR + RESET (engine, 2026-10-20) ---------- */
console.log('\n== Mentoriui ==');
{
  const mc=await deck.evaluate(()=>{const M=window.MENTOR,sl=__deck.slides;
    const kris=s=>/\(Kris\)/.test(s.dataset.label||'')||s.hasAttribute('data-kris')||/Kris'ui/.test((s.querySelector('.kick')||{}).textContent||'');
    const aud=sl.filter(s=>!kris(s)).map(s=>s.dataset.label);
    if(!M)return{has:false,aud:aud.length};
    const miss=aud.filter(l=>!M[l]),shape=[],todo=[];
    aud.forEach(l=>{const m=M[l];if(!m)return;const f=m.f||[],e=m.e||[];
      if(f.length<3||f.length>5||e.length<1||e.length>3)shape.push(l+':'+f.length+'/'+e.length);
      if(/TODO/.test(JSON.stringify(m)))todo.push(l);
      if(!f.every(x=>!x.g||(/^[ABC]$/.test(x.g)&&!!x.s)))shape.push(l+':g/s');});
    return{has:true,aud:aud.length,miss,shape,todo,dash:/\u2014/.test(JSON.stringify(M))};});
  ok('mentor.js įkeltas (window.MENTOR)',mc.has);
  if(mc.has){
    ok('MENTOR: kiekviena salės skaidrė ('+mc.aud+') turi įrašą',mc.miss.length===0,mc.miss.join(', '));
    ok('MENTOR: em dash 0',!mc.dash);
    if(!ENGINE_ONLY){
      ok('MENTOR: be TODO (turinys parašytas)',mc.todo.length===0,mc.todo.join(', '));
      ok('MENTOR: 3–5 faktai su A/B/C + šaltiniu, 1–3 pavyzdžiai',mc.shape.length===0,mc.shape.join(', '));
    } else if(mc.todo.length)console.log('  INFO MENTOR TODO stub\'ai: '+mc.todo.length+' (pildyti prieš galutinį QA)');
  }
  ok('MENTOR: pagal nutylėjimą paslėpta',await deck.evaluate(()=>!!document.getElementById('mentor')&&!document.getElementById('mentor').classList.contains('on')));
  await deck.evaluate(()=>__deck.goTo(1,0));await sleep(200);
  await deck.keyboard.press('k');await sleep(250);
  ok('K atidaro skydelį su skaidrės pavadinimu',await deck.evaluate(()=>{const m=document.getElementById('mentor');return m.classList.contains('on')&&m.textContent.indexOf(__deck.slides[__deck.st.slide].dataset.label)>-1;}));
  ok('skydelis telpa ekrane',await deck.evaluate(()=>{const r=document.getElementById('mentor').getBoundingClientRect();return r.right<=innerWidth+1&&r.bottom<=innerHeight+1;}));
  await deck.keyboard.press('k');await sleep(200);
  ok('K antrą kartą uždaro',await deck.evaluate(()=>!document.getElementById('mentor').classList.contains('on')));
  ok('viršuje yra 📘 ir ↺ mygtukai',await deck.evaluate(()=>!!document.getElementById('bMentor')&&!!document.getElementById('bReset')));
  ok('telefone yra „Mentoriui" mygtukas',await A.p.evaluate(()=>!!document.getElementById('mBtn')&&!!document.getElementById('mentorBox')));
  await A.p.evaluate(()=>document.getElementById('mBtn').click());
  const lab=await deck.evaluate(()=>__deck.slides[__deck.st.slide].dataset.label);
  ok('telefonas rodo dabartinės skaidrės medžiagą',await until(()=>A.p.evaluate(l=>{const b=document.getElementById('mentorBox');return !b.classList.contains('hide')&&b.querySelector('h1').textContent===l;},lab),8000));
  await A.p.evaluate(()=>document.getElementById('mClose').click());
  ok('pultas: 📘 ir ↺ mygtukai',await P.evaluate(()=>!!document.getElementById('bMent')&&!!document.getElementById('bRst')));
}
console.log('\n== Atstatyti (RESET) ==');
{
  ok('RESET variklis yra (__deck.RESET)',await deck.evaluate(()=>!!__deck.RESET));
  await deck.evaluate(()=>__deck.goTo(2,0));await sleep(200);
  const n0=await deck.evaluate(()=>Object.keys(__deck.LIVE.D().ans).length);
  ok('prieš RESET: atsakymų yra',n0>=1,String(n0));
  await deck.keyboard.down('Shift');await deck.keyboard.press('X');await deck.keyboard.up('Shift');await sleep(250);
  ok('Shift+X 1 kartą: patvirtinimas ekrane, duomenys lieka',await deck.evaluate(n=>document.getElementById('rconfirm').classList.contains('on')&&/Spauskite dar kartą per 3 s/.test(document.getElementById('rconfirm').textContent)&&Object.keys(__deck.LIVE.D().ans).length===n&&__deck.st.slide===2,n0));
  await deck.keyboard.down('Shift');await deck.keyboard.press('X');await deck.keyboard.up('Shift');await sleep(500);
  ok('Shift+X 2 kartą: atsakymai, pulsas, rankiniai = 0',await deck.evaluate(()=>{const D=__deck.LIVE.D();return !Object.keys(D.ans).length&&!Object.keys(D.man).length&&!Object.keys(D.pulse).length&&D.pulseAll.join()==='0,0,0,0';}));
  ok('RESET: 1 skaidrė, pertraukų laikas 0:00, laikmatis sustabdytas',await deck.evaluate(()=>__deck.st.slide===0&&__deck.BRK.elapsed()==='0:00'&&!__deck.T.iv));
  ok('RESET: telefonas pamiršo atsakymus',await until(()=>A.p.evaluate(()=>Object.keys(__join.sent()).length===0),17000),await A.p.evaluate(()=>JSON.stringify(__join.sent())+' ep='+__join.epoch()+' ok='+__join.ok()));
  await deck.evaluate(i=>__deck.goTo(i,0),firstAct.i);
  await until(()=>A.p.evaluate(t=>document.getElementById('actTitle').textContent===t,ACTS[firstAct.act].title));
  await answerAll(A,firstAct.act,0);
  ok('po RESET telefonas gali atsakyti iš naujo',await until(()=>deck.evaluate(a=>Object.keys(__deck.LIVE.D().ans[a]||{}).length===1,firstAct.act)));
  ok('mentor/reset: telefonų ir pulto JS klaidų 0',A.errs.length===0&&pErrs.length===0,A.errs.concat(pErrs).join(' | '));
}
console.log('\n== Be ryšio ==');
{
  const p=await browser.newPage();const errs=[];watch(p,errs);
  await p.setRequestInterception(true);p.on('request',r=>{if(/supabase|jsdelivr|cdnjs|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await p.setViewport({width:1280,height:720});
  await p.goto(BASE+'index.html?room=OFFL',{waitUntil:'domcontentloaded'});await sleep(1500);
  ok('be interneto deck\'as veikia klaviatūra',await p.evaluate(()=>{__deck.goTo(0,0);__deck.next();return __deck.st.slide===1||__deck.st.step===1;}));
  ok('be interneto ženklelis siūlo M',await p.evaluate(()=>/\(M\)/.test(document.getElementById('joinbadge').textContent)));
  const ph=await browser.newPage();await ph.setRequestInterception(true);ph.on('request',r=>{if(/supabase|jsdelivr|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await ph.setViewport({width:360,height:740,isMobile:true});await ph.goto(BASE+'join.html?r=OFFL',{waitUntil:'domcontentloaded'});await sleep(1200);
  ok('be interneto telefonas rodo užklausų banką',await ph.evaluate(()=>document.querySelectorAll('#bank pre').length>=6));
  ok('be interneto JS klaidų 0',errs.length===0,errs.join(' | '));
}
if(!ENGINE_ONLY){
  console.log('\n== Kanonas (mokymai SKILL.md) ==');
  const c=await deck.evaluate(()=>{const A=__deck.ACTS,sl=__deck.slides;
    const sc=id=>((A[id]||{}).parts||[]).filter(p=>p.type==='scale').map(p=>p.k);
    const nextId=Object.keys(A).find(k=>A[k].next)||'next';const post=sc(nextId);
    const early=[...new Set(sl.filter(s=>+s.dataset.at<=10&&s.dataset.act&&s.dataset.act!==nextId).map(s=>s.dataset.act))];
    const pre=[].concat.apply([],early.map(sc));
    const out=sl.filter(s=>+s.dataset.at<=10).some(s=>{const o=s.querySelector('[data-outcomes]');return (o&&o.querySelectorAll('li').length>=3)||s.querySelectorAll('.outc .card').length>=3;});
    const lv=['L1','L2','L3'].every(l=>[].some.call(document.querySelectorAll('.lv'),e=>e.textContent.trim()===l));
    const src=sl.find(s=>/Šaltiniai|Sources/.test(s.dataset.label||''));
    const graded=src?src.querySelectorAll('.g').length:0;
    const ungraded=src?[].filter.call(src.querySelectorAll('p'),p=>!p.querySelector('.g')&&p.textContent.trim().length>30&&!p.classList.contains('src')).length:-1;
    const pd=src?/Darling-Hammond/.test(src.textContent)&&/Desimone/.test(src.textContent):false;
    const fe=sl.some(s=>{const c=s.cloneNode(true);c.querySelectorAll("aside").forEach(a=>a.remove());return /klaid|error/i.test(s.dataset.label||"")||/rask\s+klaid|find the error|spot the error/i.test(c.textContent);});
    return{fe,pairs:pre.filter(k=>post.indexOf(k)>-1),out,lv,graded,ungraded,pd};});
  ok('rezultatai ekrane per pirmas 10 min. (≥ 3 punktai: .outc .card arba [data-outcomes] li)',c.out);
  ok('pasitikėjimas prieš/po: tie patys scale raktai ankstyvame akte (≤ 10 min.) ir „next“ akte',c.pairs.length>=1,JSON.stringify(c.pairs));
  const prakMin=S.filter(x=>x.act&&x.timer>=180).reduce((a,x)=>{const nx=S.filter(y=>!y.opt&&y.i>x.i)[0];return a+((nx?nx.at:D)-x.at);},0);
  if(prakMin<0.20*D)ok('praktika ≥ 20 % laiko ('+prakMin+'/'+D+' min.)',false);
  else if(prakMin<0.25*D){console.log('  WARN praktika '+prakMin+'/'+D+' min. (20–25 %; tikslas ≥ 25 %)');ok('praktika ≥ 20 % laiko ('+prakMin+'/'+D+' min.; WARN iki 25 %)',true);}
  else ok('praktika ≥ 25 % laiko ('+prakMin+'/'+D+' min.)',true);
  ok('„rask klaidą" užduotis (etiketė ar tekstas)',c.fe);
  const qz=S.filter(x=>x.quiz&&x.act);
  ok('aktyvus prisiminimas + kartojimas tarpais (≥ 2 quiz, tarpas ≥ 20 min.)',qz.length>=2&&qz[qz.length-1].at-qz[0].at>=20,JSON.stringify(qz.map(x=>x.at)));
  ok('lygiai L1 · L2 · L3 visi pažymėti',c.lv);
  ok('šaltiniai: kiekvienas su A/B/C ženkleliu',c.graded>=3&&c.ungraded===0,JSON.stringify(c));
  ok('PD dizaino šaltiniai: Darling-Hammond 2017 + Desimone 2009',c.pd);
}
ok('deck JS klaidų 0 (visa sesija)',deckErrs.length===0,deckErrs.join(' | '));
await browser.close();
console.log('\nIšorinio sekiklio (track.js) klaidų: '+EXT.length);console.log(`\nPASS ${pass} · FAIL ${fail}`);if(fail)console.log(fails.join('\n'));process.exit(fail?1:0);
})();
