/* QA V7 — tikras Chrome. Paleisti iš /Users/kris/bc-day:
     python3 -m http.server 8899 &   node v7/qa-v7.js
   Tikrina: įkrovą · 36 skaidres · istorijos sluoksnį (HUD · vartai · įgūdžiai ·
   spąstų dekoderis) · V6 mechanikas (aura · slot · čempionatas · Twitch) ·
   garsų lentą · konsolės klaidas · horizontalų persiliejimą 1280×720 ir 1920×1080. */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8899/v7/index.html';

let pass=0,fail=0;const fails=[];
function ok(n,c,x){ if(c){pass++;console.log('  ✅ '+n)}
  else{fail++;fails.push(n+(x?' — '+x:''));console.log('  ❌ '+n+(x?' — '+x:''))} }

(async()=>{
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',
  args:['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required','--font-render-hinting=none']});
const page=await browser.newPage();
const errs=[];
page.on('console',m=>{const t=m.text();
  if(m.type()==='error'){ if(/Failed to load resource|net::ERR|404|MediaPipe/i.test(t))return; errs.push(t);} });
page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));

for(const [W,H] of [[1280,720],[1920,1080]]){
  console.log(`\n════ ${W}x${H} ════`);
  await page.setViewport({width:W,height:H});
  await page.goto(URL,{waitUntil:'domcontentloaded'});
  await new Promise(r=>setTimeout(r,3600));

  console.log('\n== Įkrova ==');
  ok('boot dingo',await page.$eval('#boot',e=>e.classList.contains('done')||e.style.display==='none'));
  ok('start matomas',await page.$eval('#start',e=>getComputedStyle(e).display!=='none'));
  await page.click('#start .btn-red');
  await new Promise(r=>setTimeout(r,700));
  const n=await page.$$eval('.slide',x=>x.length);
  ok('37 skaidrės (22 V6 + 15 istorijos)',n===37,'rasta '+n);
  ok('1 skaidrė = P1 istorijos kortelė',await page.$eval('#s0',e=>/PRABUDIMAS/.test(e.textContent)));
  ok('aura HUD matomas',await page.$eval('#auraHud',e=>e.classList.contains('on')));
  ok('misijos HUD matomas',await page.$eval('#v7hud',e=>getComputedStyle(e).display!=='none'&&/LYGIS 1\/7/.test(e.textContent)));

  console.log('\n== Istorijos sluoksnis ==');
  const chaps=await page.evaluate(()=>SL.filter(s=>s.story&&/^p[1-7]$/.test(s.tag)).length);
  ok('7 skyrių kortelės',chaps===7,'rasta '+chaps);
  const skills=await page.evaluate(()=>SL.filter(s=>s.unlock).length);
  ok('7 įgūdžio atrakinimai',skills===7,'rasta '+skills);
  ok('kiekviena skaidrė turi skyrių',await page.evaluate(()=>SL.every(s=>s.chap>=1&&s.chap<=7)));
  ok('kiekviena skaidrė turi užrašus',
     await page.evaluate(()=>SL.every(s=>s.notes&&s.notes.say&&s.notes.do&&s.notes.br)));
  ok('kiekviena skaidrė turi balsą',await page.evaluate(()=>SL.every(s=>!!s.voice)));

  // vartai: P2 užrakinti be auros, atsirakina peržengus slenkstį
  const p2=await page.evaluate(()=>SL.findIndex(s=>s.tag==='p2'));
  await page.evaluate(i=>show(i),p2);
  await new Promise(r=>setTimeout(r,250));
  ok('P2 vartai užrakinti (0 auros)',await page.$eval('#v7gate2',e=>/UŽRAKINTI/.test(e.textContent)));
  await page.evaluate(()=>aura(200,'qa'));
  await new Promise(r=>setTimeout(r,250));
  ok('P2 vartai atsirakino po +200',await page.$eval('#v7gate2',e=>/ATVERTI/.test(e.textContent)));
  await page.evaluate(()=>{AURA.pts=0;auraRender();});
  const p5=await page.evaluate(()=>SL.findIndex(s=>s.tag==='p5'));
  await page.evaluate(i=>show(i),p5);
  await new Promise(r=>setTimeout(r,200));
  await page.keyboard.press('u');
  await new Promise(r=>setTimeout(r,150));
  ok('vedėjo klavišas U atrakina vartus',await page.$eval('#v7gate5',e=>/ATVERTI/.test(e.textContent)));

  // įgūdis atrakinamas atėjus į kortelę
  const sk1=await page.evaluate(()=>SL.findIndex(s=>s.tag==='sk1'));
  await page.evaluate(i=>show(i),sk1);
  await new Promise(r=>setTimeout(r,600));
  ok('įgūdis 1 pažymėtas',await page.evaluate(()=>V7.skills[1]===true));
  ok('HUD pip užsidegė',await page.$eval('#v7hud',e=>e.querySelectorAll('.v7pip.on').length>=1));

  // spąstų dekoderis — V7 tik rėmas, mechanika V6.14 hackShow()
  await page.evaluate(()=>v7Trap('scratch'));
  await new Promise(r=>setTimeout(r,250));
  ok('V6.14 dekoderis atsidaro iš istorijos skaidrės',
     await page.$eval('#hackBox',e=>e.classList.contains('on')&&/loterijos bilietas/i.test(e.textContent)));
  await page.evaluate(()=>hackHide());
  await new Promise(r=>setTimeout(r,150));
  ok('dekoderis užsidaro',await page.$eval('#hackBox',e=>!e.classList.contains('on')));
  ok('V7 nedubliuoja dekoderio',await page.evaluate(()=>!document.getElementById('v7trapBox')));
  const sp=await page.evaluate(()=>SL.findIndex(s=>s.tag==='spastai'));
  ok('spąstų skaidrė po slot mašinos',
     await page.evaluate(i=>SL[i-1].tag==='brainmax',sp));
  ok('4 triukai įvardinti',await page.evaluate(i=>{
     const t=document.getElementById('s'+i).textContent;
     return /Kintamas atlygis/.test(t)&&/Beveik-laimėjimas/.test(t)&&/Praradimo baimė/.test(t)&&/FOMO/.test(t);},sp));

  // cliffhangeris
  const cl=await page.evaluate(()=>SL.findIndex(s=>s.tag==='cliff'));
  ok('cliffhangeris prieš kvietimo skaidrę',await page.evaluate(i=>SL[i+1].tag==='finalas',cl));
  ok('tvarkaraščio/registracijos skaidrė lieka paskutinė',
     await page.evaluate(()=>SL[SL.length-1].tag==='tvarkarastis'));
  ok('cliffhangeryje yra „Tęsinys · BRAIN CLUB“',
     await page.evaluate(i=>/TĘSINYS · BRAIN CLUB/.test(document.getElementById('s'+i).textContent),cl));

  console.log('\n== Garsų lenta ==');
  ok('board.json įkeltas (10 garsų)',await page.evaluate(()=>Array.isArray(SFXBOARD)&&SFXBOARD.length===10));
  ok('10 lentos garsų SFX žemėlapyje su ../',
     await page.evaluate(()=>['pos1','pos2','pos3','pos4','neg1','neg2','neg3','neg4','fun1','fun2']
       .every(k=>SFX[k]&&SFX[k].indexOf('../assets/sfx/')===0)));
  ok('kind -> sintezuotas pakaitalas priskirtas',
     await page.evaluate(()=>SFXALIAS.pos1==='jee'&&SFXALIAS.neg1==='fa'));
  ok('nuotolinis {name} įvykis registruotas VIENĄ kartą',
     await page.evaluate(()=>document.documentElement.innerHTML.split('event:"sfx"').length-1===1));
  ok('visi lentos mp3 tikrai pasiekiami iš v7/',await page.evaluate(async()=>{
     const ids=['pos1','pos2','pos3','pos4','neg1','neg2','neg3','neg4','fun1','fun2','fa','jee','tada','victory'];
     for(const k of ids){ const r=await fetch(SFX[k],{method:'HEAD'}); if(!r.ok) return false }
     return true;}));
  ok('seni garsai išliko',await page.evaluate(()=>['fa','jee','tada','victory'].every(k=>/^\.\.\/assets\/sfx\//.test(SFX[k]))));

  console.log('\n== V6 mechanikos ==');
  ok('aura() veikia',await page.evaluate(()=>{const b=AURA.pts;aura(100,'qa');return AURA.pts===b+100}));
  ok('confetti veikia',await page.evaluate(()=>{confettiBurst(10);return document.getElementById('confetti').children.length>0}));
  const bm=await page.evaluate(()=>SL.findIndex(s=>s.tag==='brainmax'));
  await page.evaluate(i=>show(i),bm);
  await new Promise(r=>setTimeout(r,200));
  ok('slot mašina pastatyta',await page.$eval('#slotBox',e=>e.querySelectorAll('.reel').length===3));
  const ce=await page.evaluate(()=>SL.findIndex(s=>s.tag==='cempionatas'));
  await page.evaluate(i=>show(i),ce);
  await new Promise(r=>setTimeout(r,200));
  await page.evaluate(()=>chStart());
  await new Promise(r=>setTimeout(r,400));
  ok('čempionatas startuoja',await page.$eval('#chPlay',e=>getComputedStyle(e).display!=='none'));
  ok('bracket nupieštas',await page.$eval('#chBracket',e=>e.children.length===4));
  await page.evaluate(()=>chReset());
  await page.evaluate(()=>streamToggle());
  await new Promise(r=>setTimeout(r,300));
  ok('Twitch sluoksnis įsijungia',await page.evaluate(()=>document.body.classList.contains('stream')));
  await page.evaluate(()=>streamToggle());
  ok('pulto QR / kambario kodas yra',await page.$eval('#pultRoom',e=>/^[A-Z0-9]{4}$/.test(e.textContent)));

  console.log('\n== Visos skaidrės ==');
  let overflow=[],empty=[];
  for(let i=0;i<n;i++){
    await page.evaluate(j=>show(j),i);
    await new Promise(r=>setTimeout(r,120));
    const r=await page.evaluate(j=>({
      wide:document.documentElement.scrollWidth>window.innerWidth+2,
      h:document.getElementById('s'+j).getBoundingClientRect().height,
      txt:document.getElementById('s'+j).textContent.trim().length
    }),i);
    if(r.wide)overflow.push(i);
    if(r.h<80||r.txt<10)empty.push(i);
  }
  ok('nėra horizontalaus persiliejimo',overflow.length===0,'skaidrės: '+overflow.join(','));
  ok('visos skaidrės atsivaizduoja',empty.length===0,'tuščios: '+empty.join(','));
  ok('užrašai renderinasi visoms',await page.evaluate(n=>{
    for(let i=0;i<n;i++){show(i);const t=document.getElementById('notes').textContent;
      if(!/KĄ SAKYTI/.test(t)||t.length<40)return false}
    return true;},n));
}

console.log('\n== Konsolės klaidos ==');
ok('nėra JS klaidų',errs.length===0,errs.slice(0,4).join(' | '));

console.log(`\n──────── ${pass} PASS · ${fail} FAIL ────────`);
if(fails.length)console.log(fails.map(f=>'  • '+f).join('\n'));
await browser.close();
process.exit(fail?1:0);
})();
