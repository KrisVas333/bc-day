/* QA: TIKRAS Chrome — perbėga visas skaidres, įjungia Twitch režimą, sužaidžia
   čempionatą pele, tikrina konsolės klaidas ir kad chat NEUŽDENGTŲ turinio.
   Paleisti:  node tools/qa-chrome.js            (reikia http serverio :8899) */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8899/index.html';

let pass=0,fail=0;const fails=[];
function ok(n,c,x){ if(c){pass++;console.log('  ✅ '+n)}
  else{fail++;fails.push(n+(x?' — '+x:''));console.log('  ❌ '+n+(x?' — '+x:''))} }

(async()=>{
const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',
  args:['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
        '--autoplay-policy=no-user-gesture-required','--font-render-hinting=none']});
const page=await browser.newPage();

const errs=[];
page.on('console',m=>{
  const t=m.text();
  if(m.type()==='error'){
    if(/Failed to load resource|net::ERR|404|MediaPipe/i.test(t))return;
    errs.push(t);
  }
});
page.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));

for(const [W,H] of [[1280,720],[1920,1080]]){
  console.log(`\n════ ${W}x${H} ════`);
  await page.setViewport({width:W,height:H});
  await page.goto(URL,{waitUntil:'domcontentloaded'});
  await new Promise(r=>setTimeout(r,3600));

  console.log('\n== Ikrova ==');
  ok('boot ekranas dingo',await page.$eval('#boot',e=>e.classList.contains('done')||e.style.display==='none'));
  ok('start ekranas matomas',await page.$eval('#start',e=>getComputedStyle(e).display!=='none'));
  await page.click('#start .btn-red');
  await new Promise(r=>setTimeout(r,600));
  ok('skaidre 1 rodoma',await page.$eval('#s0',e=>e.classList.contains('on')));
  ok('aura HUD matomas',await page.$eval('#auraHud',e=>e.classList.contains('on')));
  const nSlides=await page.$$eval('.slide',n=>n.length);
  ok('21 skaidre',nSlides===21,'rasta '+nSlides);

  console.log('\n== Visos skaidres ==');
  let overflow=[];
  for(let i=0;i<nSlides;i++){
    await page.evaluate(j=>window.show(j),i);
    await new Promise(r=>setTimeout(r,140));
    const bad=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
    if(bad)overflow.push(i);
  }
  ok('nera horizontalaus persiliejimo',overflow.length===0,'skaidres: '+overflow.join(','));

  // KRITINIS salei: kiekvienas mygtukas/laukas turi buti PASIEKIAMAS
  // (matomas lange IR neuzdengtas fiksuotu HUD/uzrasu sluoksniu)
  let unreach=[];
  for(let i=0;i<nSlides;i++){
    await page.evaluate(j=>window.show(j),i);
    await new Promise(r=>setTimeout(r,140));
    const bad=await page.evaluate(()=>{
      const out=[];
      document.querySelectorAll('.slide.on button, .slide.on input, .slide.on .card, .slide.on .qbox').forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.width<4||r.height<4)return;
        if(getComputedStyle(el).display==='none')return;
        const cx=r.left+r.width/2, cy=r.top+r.height/2;
        if(cy<0||cy>innerHeight||cx<0||cx>innerWidth){out.push('OFFSCREEN '+(el.id||el.className||el.tagName));return}
        const top=document.elementFromPoint(cx,cy);
        if(top&&!el.contains(top)&&top!==el){
          const t=top.tagName+(top.id?'#'+top.id:'')+(top.className?'.'+String(top.className).split(' ')[0]:'');
          out.push('COVERED by '+t+' -> '+(el.id||el.textContent.trim().slice(0,14)));
        }
      });
      return out;
    });
    if(bad.length)unreach.push('s'+i+': '+bad.slice(0,2).join(' ; '));
  }
  ok('visi mygtukai pasiekiami (nepridengti, lange)',unreach.length===0,unreach.slice(0,3).join(' || '));
  ok('perejus visas skaidres nera klaidu',errs.length===0,errs.slice(0,2).join(' | '));

  console.log('\n== Twitch rezimas ==');
  await page.evaluate(()=>window.streamToggle(true));
  await new Promise(r=>setTimeout(r,1200));
  ok('stream juosta matoma',await page.$eval('#streamTop',e=>getComputedStyle(e).display!=='none'));
  ok('chat panele matoma',await page.$eval('#chatPanel',e=>getComputedStyle(e).display!=='none'));
  ok('LIVE zenklas yra',await page.$eval('.live',e=>/LIVE/.test(e.textContent)));
  ok('sazininguomo zyma matoma',await page.$eval('#fakeBadge',
     e=>getComputedStyle(e).display!=='none'&&/DEMO STREAMAS/.test(e.textContent)));

  let worst=null;
  for(let i=0;i<nSlides;i++){
    await page.evaluate(j=>window.show(j),i);
    await new Promise(r=>setTimeout(r,120));
    const r=await page.evaluate(()=>{
      const chat=document.getElementById('chatPanel').getBoundingClientRect();
      const sl=document.querySelector('.slide.on');
      let over=0,worstEl=null;
      sl.querySelectorAll('h1,h2,h3,p,img,button,canvas,svg,.card,.jstep,.chp,input').forEach(el=>{
        const b=el.getBoundingClientRect();
        if(b.width<2||b.height<2)return;
        if(getComputedStyle(el).visibility==='hidden')return;
        const ov=Math.min(b.right,chat.right)-Math.max(b.left,chat.left);
        const ovY=Math.min(b.bottom,chat.bottom)-Math.max(b.top,chat.top);
        if(ov>2&&ovY>2){ if(ov>over){over=ov;worstEl=el.tagName+'.'+el.className} }
      });
      return {over,worstEl};
    });
    if(r.over>0&&(!worst||r.over>worst.over)) worst={slide:i,over:r.over,worstEl:r.worstEl};
  }
  ok('chat neuzdengia jokio turinio',worst===null,
     worst?`skaidre ${worst.slide}: ${worst.worstEl} persidengia ${Math.round(worst.over)}px`:'');

  console.log('\n== Aura + garsas ==');
  const a0=await page.evaluate(()=>window.AURA.pts);
  await page.keyboard.press('Equal');
  await new Promise(r=>setTimeout(r,250));
  const a1=await page.evaluate(()=>window.AURA.pts);
  ok('+ klavisas prideda 100',a1===a0+100,`${a0}->${a1}`);
  await page.keyboard.press('Minus');
  await new Promise(r=>setTimeout(r,250));
  ok('- klavisas atima 100',await page.evaluate(()=>window.AURA.pts)===a0);
  ok('sfx be mp3 nelusta (synth)',await page.evaluate(()=>
     Object.values(window.SFXST).every(s=>s.mode!=='file')));

  console.log('\n== Memas (M) ==');
  await page.keyboard.press('KeyM');
  await new Promise(r=>setTimeout(r,300));
  ok('memas atsidaro',await page.$eval('#memeBox',e=>e.classList.contains('on')));
  await new Promise(r=>setTimeout(r,2100));
  ok('memas uzsidaro pats',await page.$eval('#memeBox',e=>!e.classList.contains('on')));

  if(W===1280){
    console.log('\n== Cempionatas PELE ==');
    const ci=await page.evaluate(()=>window.SL.findIndex(s=>s.tag==='cempionatas'));
    await page.evaluate(j=>window.show(j),ci);
    await new Promise(r=>setTimeout(r,300));
    for(let i=0;i<4;i++){ await page.click('#chn'+i); await page.type('#chn'+i,['Emilija','Gabija','Jonas','Matas'][i]); }
    await page.click('#chSetup .btn-red');
    await new Promise(r=>setTimeout(r,600));
    ok('bracket su 4 vardais',await page.$$eval('#chBracket .chp',n=>n.length)===4);
    ok('bilietas rodomas',await page.$eval('#scratchWrap',e=>getComputedStyle(e).display!=='none'));

    const box=await page.$('#scratchCv');
    const bb=await box.boundingBox();
    await page.mouse.move(bb.x+12,bb.y+bb.height/2);
    await page.mouse.down();
    for(let y=0.2;y<=0.85;y+=0.13){
      for(let x=0;x<=1.001;x+=0.045)
        await page.mouse.move(bb.x+8+x*(bb.width-16),bb.y+y*bb.height);
    }
    await page.mouse.up();
    await new Promise(r=>setTimeout(r,1400));
    ok('nubraukus bilieta prasideda zaidimas',
       await page.evaluate(()=>window.CH.phase==='play'),
       await page.evaluate(()=>window.CH.phase));

    // laukiam INPUT fazes (.chPad), skaitom seka sviezia ir spaudziam tikrus mygtukus
    let played=false;
    for(let round=0;round<6;round++){
      let waited=0;
      while(waited<9000){
        const st=await page.evaluate(()=>({pad:!!document.querySelector('.chPad'),
          next:document.getElementById('chNextBtn').style.display}));
        if(st.next!=='none'){played=true;break}
        if(st.pad)break;
        await new Promise(r=>setTimeout(r,120)); waited+=120;
      }
      if(played)break;
      const seq=await page.evaluate(()=>window.CH.seq.slice());
      for(const d of seq){
        await page.click(`.chPad button:nth-child(${d+1})`);
        await new Promise(r=>setTimeout(r,70));
      }
      const after=await page.evaluate(()=>document.getElementById('chNextBtn').style.display);
      if(after!=='none'){played=true;break}
      await new Promise(r=>setTimeout(r,1100));
    }
    ok('zaidimas A suzaistas pele',played);
    const sc=await page.evaluate(()=>window.CH.players[0].score);
    ok('taskai uzskaityti',sc>0,'score='+sc);
    ok('sale gavo aura uz zaideja',await page.evaluate(()=>window.AURA.pts)>0);
  }

  console.log('\n== Pultas ==');
  await page.evaluate(()=>window.show(window.SL.findIndex(s=>s.tag==='aura')));
  await new Promise(r=>setTimeout(r,2500));
  ok('QR sugeneruotas',await page.$eval('#pultQr',e=>!!e.querySelector('img,canvas')));
  ok('sales kodas 4 simboliu',/^[A-Z0-9]{4}$/.test(await page.$eval('#pultRoom',e=>e.textContent)));
  const ps=await page.$eval('#pultState',e=>e.textContent);
  ok('supabase prisijunge arba svelniai nusileido',
     /prijungtas|nepasiekiamas|isjungtas|išjungtas|jungiamasi/.test(ps),ps);
  console.log('     pulto busena: '+ps);

  console.log('\n== Konsole ==');
  ok('jokiu JS klaidu per visa seansa',errs.length===0,errs.slice(0,3).join(' | '));
}

await browser.close();
console.log('\n────────────────────────────');
console.log(`REZULTATAS: ${pass} praejo · ${fail} krito`);
if(fail){console.log('\nKRITO:');fails.forEach(f=>console.log('  · '+f));process.exit(1)}
console.log('✅ TIKRAS CHROME — VISKAS SVARU');
})().catch(e=>{console.error('QA CHROME KLAIDA:',e);process.exit(1)});
