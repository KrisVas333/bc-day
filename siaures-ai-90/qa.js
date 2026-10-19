/* QA: DI mokytojams 90 min. (Šiaurės 2026-10-20). Headless Chrome, išplėstas Deck A qa.js.
   cd ~/bc-day && python3 -m http.server 8899 &   (serveris iš bc-day šaknies)
   node siaures-ai-90/qa.js [deckBase] [--shots]
   Tikrina: deck'as (29 skaidrės, žingsniai, telpa, užrašai, laikas 90 min., interaktyvi užduotis kas ≤20 min., laikmačiai, quiz,
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
  ok('29 skaidrės (27 + 2 priedai)',n===29,String(n));
  ok('1 skaidrė rodoma',await page.evaluate(()=>__deck.st.slide===0&&__deck.slides[0].classList.contains('on')));
  ok('JBM šriftas įkeltas',await page.evaluate(async()=>{await document.fonts.ready;return document.fonts.check('800 40px JBM');}));
  ok('salės kodas = '+ROOM,await page.evaluate(r=>__deck.ROOM===r&&document.getElementById('joincode').textContent===r,ROOM));
  ok('prisijungimo QR sugeneruotas',await until(()=>page.evaluate(()=>!!document.querySelector('#joinqr img,#joinqr canvas'))));
  ok('join URL rodo join.html?r=KODAS',await page.evaluate(r=>/join\.html\?r=/.test(document.getElementById('joinurl').textContent)&&document.getElementById('joinurl').textContent.endsWith(r),ROOM));
  // laikas
  const at=await page.evaluate(()=>__deck.slides.map(s=>({at:+s.dataset.at,act:!!s.dataset.act,label:s.dataset.label})));
  const main=at.slice(0,27);
  ok('kiekviena skaidrė turi data-at',at.every(x=>!isNaN(x.at)));
  ok('laikas didėja ir baigiasi 88 → 90 min.',main.every((x,i)=>i===0||x.at>=main[i-1].at)&&main[26].at===88&&at[27].at===90,JSON.stringify(main.map(x=>x.at)));
  ok('pradžia = interaktyvi užduotis (0 min.)',main[0].act&&main[0].at===0);
  const acts=main.filter(x=>x.act).map(x=>x.at);const gaps=acts.slice(1).map((a,i)=>a-acts[i]);gaps.push(90-acts[acts.length-1]);
  ok('interaktyvi užduotis kas ≤20 min. (gaps '+gaps.join('/')+')',gaps.every(g=>g<=20),JSON.stringify(acts));
  // pereiti visas skaidres
  let visited=new Set(),guard=0,over=[],hidden=[];
  while(guard++<200){
    const s=await page.evaluate(()=>{const st=__deck.st,el=__deck.slides[st.slide];
      const shown=[].filter.call(el.querySelectorAll('[data-step]'),x=>+x.dataset.step<=st.step).every(x=>x.classList.contains('show'));
      const r=el.getBoundingClientRect();
      const ov=[].filter.call(el.querySelectorAll('h1,h2,.card,.res,.tools,.ladder,.gm,.world,.sb,.lights,.prompt,.refs,.avg,.wall,.chart,.mq,.qr'),x=>{if(!x.offsetParent)return false;const b=x.getBoundingClientRect();return b.height>0&&(b.bottom>r.bottom-20||b.right>r.right+1);}).map(x=>x.className.split(' ')[0]||x.tagName);
      return{i:st.slide,step:st.step,shown,ov,label:el.dataset.label};});
    visited.add(s.i);
    if(!s.shown)hidden.push(s.i+1+'.'+s.step);
    if(s.ov.length)over.push((s.i+1)+'.'+s.step+' '+s.label+' ['+s.ov.join(',')+']');
    const atEnd=await page.evaluate(()=>{const b=__deck.st.slide,c=__deck.st.step;__deck.next();return b===__deck.st.slide&&c===__deck.st.step;});
    if(atEnd)break;await sleep(40);
  }
  ok('visos skaidrės aplankytos',visited.size===n,visited.size+'/'+n);
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
  ok('praktikos laikmatis 12:00',await page.evaluate(()=>document.querySelector('.slide.on .timer').textContent==='12:00'));
  await page.keyboard.press('t');await sleep(1300);
  ok('praktikos laikmatis paleistas',await page.evaluate(()=>/^11:5\d$/.test(document.querySelector('.slide.on .timer').textContent)));
  await page.keyboard.press('t');
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
  await page.evaluate(()=>__deck.goTo(6,0));await sleep(200);
  await page.click('#nwGo');await sleep(100);
  ok('kito žodžio demo prideda žodį',await page.evaluate(()=>__deck.NW.words().length===1&&document.querySelectorAll('#nwBars .row').length===6));
  await page.evaluate(()=>{const r=document.getElementById('nwT');r.value=0.2;r.dispatchEvent(new Event('input'));});
  ok('atsitiktinumo slankiklis keičia tikimybes',await page.evaluate(()=>+document.querySelector('#nwBars .num').textContent.replace('%','')>=80));
  // 3D
  const has3d=await until(()=>page.evaluate(()=>window.__neuron3d===true),15000);
  ok('3D neuronas (three.js + neuron.glb) pasikrovė',has3d,'gali būti headless WebGL riba');
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
  ok('23 skaidrė pažymėta PASIRENKAMA',await page.evaluate(()=>/PASIRENKAMA/.test(__deck.NOTES[22])));
  // pagalba
  await page.keyboard.press('?');await sleep(100);
  ok('? rodo pultą ir salės kanalą',await page.evaluate(()=>/pultas\.html\?room=/.test(document.getElementById('pulturl').textContent)&&/Salės kanalas/.test(document.getElementById('livestate').textContent)));
  await page.keyboard.press('Escape');
  const html=await page.content();
  ok('em dash 0 (deck)',!/—/.test(html));
  ok('kv-track kids režimas projektoriuje',await page.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="kids"]')));
  ok('jokių venture CTA nuorodų deck\'e',await page.evaluate(()=>![].some.call(document.querySelectorAll('a,iframe'),a=>/exoclass\.lt|robotikos|brainclub/i.test(a.href||a.dataset.src||''))));
  if(SHOTS){
    const li=await page.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='L1 demo'));
    await page.evaluate(i=>__deck.goTo(i,1),li);await sleep(700);
    await page.screenshot({path:__dirname+'/backup/l1-testas-pavyzdys.png'});
    for(const [lab,step,file] of [['Prisijunkite',0,'s01'],['Kada DI padeda mokytis',1,'s10'],['Klasių žemėlapis',4,'s20'],['3 lygiai',2,'s06'],['Įrankiai',1,'s14'],['Kas yra DI?',1,'s07']]){
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
await A.p.evaluate(()=>{document.querySelectorAll('.scale .opt')[4].click();});await tapOpt(A,'t',0);await A.p.evaluate(()=>document.querySelector('.send').click());
ok('atsiliepimas: naudingumas 5 ekrane',await until(()=>deck.evaluate(()=>document.querySelectorAll('.slide.on [data-res="next.u"] .row .num')[4].textContent==='1')));
// rubrika + siena
const rbi=await deck.evaluate(()=>__deck.slides.findIndex(s=>s.dataset.label==='Praktika L1'));
await deck.evaluate(i=>__deck.goTo(i,0),rbi);
await until(()=>A.p.evaluate(()=>document.getElementById('actTitle').textContent==='Praktika: jūsų testas'));
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
  ok('užklausų bankas: 18 kopijuojamų užklausų (L1/L2/L3)',await p.evaluate(()=>document.querySelectorAll('#bank pre').length===18&&document.querySelectorAll('#bank details').length===3));
  ok('bankas: pamokos planas + NotebookLM video + video scenarijus',await p.evaluate(()=>{const t=document.getElementById('bank').textContent;return /Pamokos planas/.test(t)&&/Video ar garso apžvalga/.test(t)&&/Mokomasis video telefonu/.test(t);}));
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
/* ---------- be ryšio ---------- */
console.log('\n== Be ryšio ==');
{
  const p=await browser.newPage();const errs=[];watch(p,errs);
  await p.setRequestInterception(true);p.on('request',r=>{if(/supabase|jsdelivr|cdnjs|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await p.setViewport({width:1280,height:720});
  await p.goto(BASE+'index.html?room=OFFL',{waitUntil:'domcontentloaded'});await sleep(1500);
  ok('be interneto deck\'as veikia klaviatūra',await p.evaluate(()=>{__deck.next();return __deck.st.slide===1||__deck.st.step===1;}));
  ok('be interneto ženklelis siūlo M',await p.evaluate(()=>/ryšio nėra \(M\)/.test(document.getElementById('joinbadge').textContent)));
  const ph=await browser.newPage();await ph.setRequestInterception(true);ph.on('request',r=>{if(/supabase|jsdelivr|krisvas333/.test(r.url()))r.abort();else r.continue();});
  await ph.setViewport({width:360,height:740,isMobile:true});await ph.goto(BASE+'join.html?r=OFFL',{waitUntil:'domcontentloaded'});await sleep(1200);
  ok('be interneto telefonas sako „nėra ryšio" ir rodo užklausas',await ph.evaluate(()=>/nėra ryšio/.test(document.getElementById('conn').textContent)&&document.querySelectorAll('#bank pre').length===18));
  ok('be interneto JS klaidų 0',errs.length===0,errs.join(' | '));
}
ok('deck JS klaidų 0 (visa sesija)',deckErrs.length===0,deckErrs.join(' | '));
await browser.close();
console.log(`\nPASS ${pass} · FAIL ${fail}`);if(fail)console.log(fails.join('\n'));process.exit(fail?1:0);
})();
