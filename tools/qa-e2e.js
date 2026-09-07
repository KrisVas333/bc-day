/* E2E: tikras deck'as + tikras pultas per Supabase Realtime */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOM='QA'+Math.floor(10+Math.random()*89);
let pass=0,fail=0;const fails=[];
const ok=(n,c,x)=>{ if(c){pass++;console.log('  ✅ '+n)} else {fail++;fails.push(n+(x?' — '+x:''));console.log('  ❌ '+n+(x?' — '+x:''))} };
const wait=ms=>new Promise(r=>setTimeout(r,ms));

(async()=>{
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',
  args:['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required']});

const deck=await b.newPage();
const derr=[]; deck.on('pageerror',e=>derr.push('DECK: '+e.message));
await deck.setViewport({width:1280,height:720});
await deck.goto('http://localhost:8899/index.html?room='+ROOM,{waitUntil:'domcontentloaded'});
await wait(3800);
await deck.click('#start .btn-red');
await wait(1200);

const phone=await b.newPage();
const perr=[]; phone.on('pageerror',e=>perr.push('PULTAS: '+e.message));
await phone.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
await phone.goto('http://localhost:8899/pultas.html?room='+ROOM,{waitUntil:'domcontentloaded'});
await wait(4000);

console.log('\n== Pultas: pakrovimas ==');
ok('pultas prisijunge',await phone.$eval('#state',e=>e.classList.contains('ok')),
   await phone.$eval('#state',e=>e.textContent));
const nb=await phone.$$eval('button.sfx',n=>n.length);
ok('10 garsu mygtuku',nb===10,'rasta '+nb);
ok('4 pos / 4 neg / 2 fun',
   await phone.$$eval('#gPos button',n=>n.length)===4 &&
   await phone.$$eval('#gNeg button',n=>n.length)===4 &&
   await phone.$$eval('#gFun button',n=>n.length)===2);
ok('etiketes is board.json',
   await phone.$eval('#gPos button .l',e=>e.textContent)==='Vine boom');
ok('jokiu dubliuotu id',await phone.evaluate(()=>{
   const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
   return new Set(ids).size===ids.length;}));
ok('mygtukai neisejo uz ekrano',await phone.evaluate(()=>
   document.documentElement.scrollWidth<=window.innerWidth+1));

console.log('\n== 1. Garsu lenta: pultas -> deck as ==');
await deck.evaluate(()=>{ window.__sfxHits=[]; const o=window.sfx;
  window.sfx=function(n,v){ window.__sfxHits.push(n); return o(n,v) }; });
await phone.click('#sfx-pos1');
await wait(1600);
ok('pos1 pasieke deck a',await deck.evaluate(()=>window.__sfxHits.includes('pos1')),
   await deck.evaluate(()=>JSON.stringify(window.__sfxHits)));
await phone.click('#sfx-neg3');
await wait(1600);
ok('neg3 pasieke deck a',await deck.evaluate(()=>window.__sfxHits.includes('neg3')));
ok('atvesinimas: antras bakstelejimas per 1,5 s ignoruojamas',await (async()=>{
   await deck.evaluate(()=>window.__sfxHits=[]);
   await phone.click('#sfx-fun1'); await wait(200);
   await phone.click('#sfx-fun1'); await wait(1200);
   const n=await deck.evaluate(()=>window.__sfxHits.filter(x=>x==='fun1').length);
   return n===1;})());

console.log('\n== 5. Pulto valdikliai ==');
ok('deck as atsiunte skaidres antraste',
   await phone.$eval('#slideCard',e=>e.classList.contains('on')));
const ttl=await phone.$eval('#scTitle',e=>e.textContent);
ok('antraste netuscia',ttl.length>3,ttl);
ok('„ka sakyti" atsiustas',await phone.$eval('#scSay',e=>e.textContent.length>20));
const c0=await deck.evaluate(()=>window.cur);
await phone.click('#bNext'); await wait(1500);
const c1=await deck.evaluate(()=>window.cur);
ok('▶ perjungia skaidre telefone',c1===c0+1,c0+'->'+c1);
ok('nauja antraste atkeliavo',await phone.$eval('#scNum',e=>/SKAIDRĖ 2 /.test(e.textContent)));
await phone.click('#bPrev'); await wait(1500);
ok('◀ grazina atgal',await deck.evaluate(()=>window.cur)===c0);
const a0=await deck.evaluate(()=>window.AURA.pts);
await phone.click('#bRaid'); await wait(1500);
ok('RAID prideda aura + juosta',
   await deck.evaluate(()=>window.AURA.pts)>a0 &&
   await deck.$eval('#raidBan',e=>e.classList.contains('on')));
await phone.click('#bPlus'); await phone.click('#bPlus'); await phone.click('#bPlus');
await wait(1800);
ok('3x ✨ per 5 s ijungia HYPE COMBO',await deck.evaluate(()=>window.comboOn()));
ok('combo metras matomas',await deck.$eval('#combo',e=>e.classList.contains('on')));
await deck.evaluate(()=>{window.COMBO.until=0});
await phone.click('#gEmo button'); await wait(1400);
ok('emoji reakcija plaukia ekrane',await deck.evaluate(()=>
   document.getElementById('emoRain').children.length>0));
const wasMuted=await deck.evaluate(()=>window.MUTED);
await phone.click('#bMute'); await wait(1400);
ok('🔇 TYLA nutildo deck a',await deck.evaluate(()=>window.MUTED)===true,'pries: '+wasMuted);
ok('sekeju juosta matoma telefone',await phone.$eval('#goal',e=>e.classList.contains('on')));

console.log('\n== Konsole ==');
ok('deck as be JS klaidu',derr.length===0,derr.join(' | '));
ok('pultas be JS klaidu',perr.length===0,perr.join(' | '));

console.log('\n────────────────────────────');
console.log('E2E: '+pass+' praejo · '+fail+' krito');
if(fail){ console.log('\nKRITO:'); fails.forEach(f=>console.log('  · '+f)); }
await b.close();
process.exit(fail?1:0);
})().catch(e=>{console.error('E2E KLAIDA:',e);process.exit(1)});
