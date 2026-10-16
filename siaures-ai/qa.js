/* QA: DI etiketas (Šiaurės 2026-10-20). Headless Chrome.
   node siaures-ai/qa.js <deckBase> <qrPageUrl>
   pvz. node siaures-ai/qa.js http://localhost:8899/siaures-ai/ "http://localhost:8898/siaures/?src=siaures-1020"
   Tikrina: JS klaidos · visos skaidrės pereinamos · žingsniai · quiz · laikmatis · užrašai · pultas be JS klaidų ·
   QR puslapis: 10 taisyklių · disclaimer · formos validacija · atsiliepimo įvykis · mobilus be horizontalaus scroll · em dash 0.
   El. pašto forma NESIUNČIAMA į tikrą endpointą (fetch perimamas). */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DECK=process.argv[2]||'http://localhost:8899/siaures-ai/';
const QR=process.argv[3]||'http://localhost:8898/siaures/?src=siaures-1020';
let pass=0,fail=0;const fails=[];
function ok(n,c,x){if(c){pass++;console.log('  ✅ '+n)}else{fail++;fails.push(n+(x?' :: '+x:''));console.log('  ❌ '+n+(x?' :: '+x:''))}}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function watch(page,errs){
  page.on('console',m=>{if(m.type()==='error'){const t=m.text();if(/Failed to load resource|net::ERR/i.test(t))return;errs.push(t);}});
  page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
}
(async()=>{
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
/* ---------- DECK ---------- */
{
  console.log('\n== Deck ==');
  const page=await browser.newPage();const errs=[];watch(page,errs);
  await page.setViewport({width:1920,height:1080});
  await page.goto(DECK+'index.html',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>localStorage.clear());
  await page.goto(DECK+'index.html',{waitUntil:'domcontentloaded'});
  await sleep(1500);
  const n=await page.evaluate(()=>__deck.slides.length);
  ok('19 skaidrių (18 + priedas)',n===19,String(n));
  ok('1 skaidrė rodoma',await page.evaluate(()=>__deck.st.slide===0&&__deck.slides[0].classList.contains('on')));
  ok('JBM šriftas įkeltas',await page.evaluate(async()=>{await document.fonts.ready;return document.fonts.check('800 40px JBM');}));
  let visited=new Set(),guard=0;
  while(guard++<120){
    const s=await page.evaluate(()=>{const st=__deck.st,el=__deck.slides[st.slide];
      const shown=[].filter.call(el.querySelectorAll('[data-step]'),x=>+x.dataset.step<=st.step).every(x=>x.classList.contains('show'));
      const r=el.getBoundingClientRect();
      const over=[].some.call(el.querySelectorAll('h1,h2,.card,.cols,.quiz,.rules,.purpose,.two,.refs'),x=>{const b=x.getBoundingClientRect();return b.bottom>r.bottom+1||b.right>r.right+1;});
      return{i:st.slide,step:st.step,shown,over,notes:__deck.NOTES[st.slide].length};});
    visited.add(s.i);
    if(!s.shown) ok('žingsnis matomas s'+(s.i+1)+'.'+s.step,false);
    if(s.over) ok('turinys telpa s'+(s.i+1),false);
    if(s.i===n-1&&s.step>=0){const last=await page.evaluate(()=>{const b=__deck.st;__deck.next();return b.slide===__deck.st.slide;});if(last)break;}
    await page.keyboard.press('ArrowRight');await sleep(30);
  }
  ok('visos skaidrės aplankytos',visited.size===n,visited.size+'/'+n);
  ok('kiekviena skaidrė turi užrašus',await page.evaluate(()=>__deck.NOTES.every(t=>t.length>40)));
  // quiz
  await page.evaluate(()=>__deck.goTo(8,0));
  ok('quiz: prieš atskleidimą nėra .good',await page.evaluate(()=>!document.querySelector('.slide.on .opt.good')));
  await page.click('.slide.on .opt[data-opt="0"]');await sleep(100);
  ok('quiz: B pažymėtas teisingu',await page.evaluate(()=>document.querySelector('.slide.on .opt[data-opt="1"]').classList.contains('good')));
  ok('quiz: faktas (−17 %) parodytas',await page.evaluate(()=>document.querySelector('.slide.on .fact').classList.contains('show')));
  // timer
  await page.evaluate(()=>__deck.goTo(9,0));
  await page.keyboard.press('t');await sleep(2200);
  const tv=await page.$eval('#timer',e=>e.textContent);
  ok('laikmatis skaičiuoja (1:30 → <1:30)',tv!=='1:30'&&/^1:2\d$/.test(tv),tv);
  await page.keyboard.press('t');
  // notes
  await page.keyboard.press('n');await sleep(100);
  ok('N rodo užrašus',await page.$eval('#notes',e=>e.classList.contains('on')&&e.textContent.length>40));
  // help + pult
  await page.keyboard.press('?');await sleep(100);
  ok('? rodo pagalbą su pulto URL',await page.evaluate(()=>document.getElementById('help').classList.contains('on')&&/pultas\.html\?room=/.test(document.getElementById('pulturl').textContent)));
  // QR svg
  ok('QR skaidrėje yra SVG',await page.evaluate(()=>!!document.querySelector('.qr svg path')));
  const html=await page.content();
  ok('em dash 0',!/—/.test(html));
  ok('deck JS klaidų 0',errs.length===0,errs.join(' | '));
  await page.screenshot({path:__dirname+'/qa-shot-quiz.png'});
  await page.evaluate(()=>{document.getElementById('help').classList.remove('on');document.getElementById('notes').classList.remove('on');__deck.goTo(16,0);});
  await sleep(300);await page.screenshot({path:__dirname+'/qa-shot-qr.png'});
  await page.evaluate(()=>__deck.goTo(6,1));await sleep(600);await page.screenshot({path:__dirname+'/qa-shot-mit.png'});
  await page.evaluate(()=>__deck.goTo(0,0));await sleep(300);
  await page.close();
}
/* ---------- PULTAS ---------- */
{
  console.log('\n== Pultas ==');
  const page=await browser.newPage();const errs=[];watch(page,errs);
  await page.setViewport({width:390,height:844});
  await page.goto(DECK+'pultas.html?room=QATS',{waitUntil:'domcontentloaded'});await sleep(2500);
  ok('pultas užsikrovė',await page.$eval('#state',e=>e.textContent.length>3));
  ok('pultas JS klaidų 0',errs.length===0,errs.join(' | '));
  await page.close();
}
/* ---------- QR PAGE ---------- */
{
  console.log('\n== QR puslapis ==');
  const page=await browser.newPage();const errs=[];watch(page,errs);
  await page.setViewport({width:360,height:740,isMobile:true});
  await page.evaluateOnNewDocument(()=>{
    window.__ev=[];let _bt=null;Object.defineProperty(window,'bt',{configurable:true,get(){return function(n,p){window.__ev.push([n,p]);try{_bt&&_bt(n,p);}catch(e){}};},set(v){_bt=v;}});
    const of=window.fetch;window.__posts=[];
    window.fetch=function(u,o){if(String(u).includes('submit-inquiry')){window.__posts.push(JSON.parse(o.body));return Promise.resolve(new Response(JSON.stringify({ok:true}),{status:200}));}return of.apply(this,arguments);};
  });
  await page.goto(QR,{waitUntil:'networkidle2'}).catch(()=>{});await sleep(1500);
  ok('10 taisyklių',await page.$$eval('#chartija .rules li',l=>l.length)===10);
  const txt=await page.evaluate(()=>document.body.innerText);
  ok('⚗️ disclaimer eilutė',/Eksperimentinis prototipas, sukurtas su DI\. Gali klysti/.test(txt));
  ok('interesų atskleidimas',/bendraįkūrėjas/.test(txt));
  ok('jokio venture CTA (exoclass.lt / robotikosakademija nuorodų nėra)',await page.evaluate(()=>![].some.call(document.querySelectorAll('a'),a=>/exoclass\.lt|robotikos|bureliai/i.test(a.href))));
  ok('nėra horizontalaus scroll 360px',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),String(await page.evaluate(()=>document.documentElement.scrollWidth)));
  ok('body šriftas ≥17px',await page.evaluate(()=>parseFloat(getComputedStyle(document.body).fontSize)>=17));
  ok('kv-track.js data-mode=full',await page.evaluate(()=>!!document.querySelector('script[src*="kv-track.js"][data-mode="full"]')));
  // feedback validation
  await page.click('#fbBtn');await sleep(100);
  ok('atsiliepimas: validacija be atsakymų',await page.$eval('#fbErr',e=>e.textContent.length>0));
  await page.evaluate(()=>{document.querySelector('[data-kv-consent]')&&document.querySelector('[data-kv-consent]').remove();});await page.click('input[name=q1][value="5"]');await page.click('input[name=q2][value="taip"]');
  await page.type('#q3','Daugiau laiko demo');await page.click('#fbBtn');await sleep(150);
  const fbEv=await page.evaluate(()=>window.__ev.find(e=>e[0]==='siaures_feedback'));
  ok('atsiliepimo įvykis su src=siaures-1020',!!fbEv&&fbEv[1].q1===5&&fbEv[1].src==='siaures-1020',JSON.stringify(fbEv));
  ok('atsiliepimas: padėka rodoma',await page.$eval('#fbOk',e=>!e.hidden));
  // email
  await page.type('#em','blogas');await page.click('#capBtn');await sleep(100);
  ok('el. paštas: neteisingas atmetamas',await page.$eval('#capErr',e=>/teisingą/.test(e.textContent)));
  await page.$eval('#em',e=>e.value='');await page.type('#em','test@example.com');await page.click('#capBtn');await sleep(100);
  ok('el. paštas: be sutikimo atmetamas',await page.$eval('#capErr',e=>/sutikim/.test(e.textContent)));
  await page.click('#consent');await page.click('#capBtn');await sleep(300);
  const post=await page.evaluate(()=>window.__posts[0]);
  ok('el. paštas: POST į submit-inquiry su intent ir src',!!post&&post.intent==='Šiaurės DI etiketas'&&/src=siaures-1020/.test(post.message)&&post.autoreply===false,JSON.stringify(post));
  ok('el. paštas: padėka rodoma',await page.$eval('#capOk',e=>!e.hidden));
  const html=await page.content();
  ok('em dash 0',!/—/.test(html.replace(/<script[\s\S]*?<\/script>/g,'')));
  ok('QR puslapio JS klaidų 0',errs.length===0,errs.join(' | '));
  await page.screenshot({path:__dirname+'/qa-shot-mobile.png',fullPage:true});
  await page.close();
}
await browser.close();
console.log(`\nPASS ${pass} · FAIL ${fail}`);if(fail)console.log(fails.join('\n'));process.exit(fail?1:0);
})();
