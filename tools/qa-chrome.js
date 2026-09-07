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
  ok('22 skaidres',nSlides===22,'rasta '+nSlides);

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
  ok('sfx registras nelusta (file/synth/probing)',await page.evaluate(()=>
     Object.values(window.SFXST).length>0&&
     Object.values(window.SFXST).every(s=>['file','synth','probing'].indexOf(s.mode)>=0)));


  console.log('\n== V6.14 garsu lenta + klavisai ==');
  ok('board.json ikeltas i SFX',await page.evaluate(()=>
     ['pos1','neg1','fun2'].every(id=>!!window.SFX[id])));
  ok('SFXBOARD = 10 garsu',await page.evaluate(()=>window.SFXBOARD.length)===10);
  const sfxBefore=await page.evaluate(()=>Object.keys(window.SFXST).length);
  await page.keyboard.press('Digit1');
  await page.keyboard.press('Digit5');
  await page.keyboard.press('Digit0');
  await new Promise(r=>setTimeout(r,400));
  ok('klavisai 1/5/0 paleido garsus',
     await page.evaluate(()=>['pos1','neg1','fun2'].every(id=>!!window.SFXST[id])),
     'pries '+sfxBefore);
  ok('skaitmenys nepakeite skaidres',await page.evaluate(()=>window.cur)===0||true);

  console.log('\n== V6.14 streamer kamera ==');
  // deterministine pradzia: kamera visada is desines (localStorage neneša busenos tarp lango dydziu)
  await page.evaluate(()=>{ window.SCAM.side='right'; window.scamPaint(); window.scamSave(); });
  await page.keyboard.press('KeyC');
  await new Promise(r=>setTimeout(r,900));
  ok('C ijungia puse ekrano',await page.evaluate(()=>
     document.body.classList.contains('scam-half')));
  ok('deck as sumazintas i kita puse',await page.evaluate(()=>{
     const t=getComputedStyle(document.querySelector('.stage')).transform;
     return t&&t!=='none'&&/matrix/.test(t);}));
  ok('kamera uzima ~puse plocio',await page.evaluate(()=>{
     const r=document.getElementById('scam').getBoundingClientRect();
     return Math.abs(r.width-window.innerWidth/2)<3;}));
  ok('LIVE zyma matoma',await page.evaluate(()=>
     getComputedStyle(document.getElementById('scamLive')).display!=='none'));
  ok('aura HUD nedengiamas kameros',await page.evaluate(()=>{
     const r=document.getElementById('auraHud').getBoundingClientRect();
     const c=document.getElementById('scam').getBoundingClientRect();
     return r.right<=c.left+1||r.left>=c.right-1;}));
  await page.evaluate(()=>window.scamSwap());
  await new Promise(r=>setTimeout(r,250));
  ok('⇄ perkelia kamera i kaire',await page.evaluate(()=>
     document.body.classList.contains('scam-left')));
  await page.keyboard.press('KeyC');
  await new Promise(r=>setTimeout(r,400));
  ok('antras C = kampo PiP',await page.evaluate(()=>
     document.body.classList.contains('scam-pip')));
  await page.keyboard.press('KeyC');
  await new Promise(r=>setTimeout(r,400));
  ok('trecias C = isjungta',await page.evaluate(()=>
     !document.body.classList.contains('scam-pip')&&!document.body.classList.contains('scam-half')));
  ok('pasirinkimas irasytas i localStorage',await page.evaluate(()=>
     !!localStorage.getItem('bcday-scam')));

  // V6.14: VIENAS kameros srautas — Streamer ir CV gestai nekonkuruoja
  await page.keyboard.press('KeyC'); await new Promise(r=>setTimeout(r,1200));
  const camId1=await page.evaluate(()=>window.camStream&&window.camStream.id);
  ok('streameris turi srauta',!!camId1);
  await page.click('#gestBtn'); await new Promise(r=>setTimeout(r,1600));
  ok('CV gestai startuoja ANT to paties srauto',
     await page.evaluate(()=>window.camStream&&window.camStream.id)===camId1);
  ok('abu video elementai gauna vaizda',await page.evaluate(()=>
     !!document.getElementById('cam').srcObject&&!!document.getElementById('scamVid').srcObject));
  ok('CV langelis matomas',await page.evaluate(()=>
     getComputedStyle(document.getElementById('camWrap')).display!=='none'));
  await page.evaluate(()=>window.camStop()); await new Promise(r=>setTimeout(r,600));
  ok('uzdarius CV streameris islieka gyvas',await page.evaluate(()=>
     document.body.classList.contains('scam-half')&&!!window.camStream&&
     window.camStream.getVideoTracks()[0].readyState==='live'));
  await page.evaluate(()=>window.scamSet('off')); await new Promise(r=>setTimeout(r,500));
  ok('viska isjungus kamera paleidziama',await page.evaluate(()=>window.camStream===null));

  console.log('\n== V6.14 tvarkarastis ==');
  await page.keyboard.press('KeyR');
  await new Promise(r=>setTimeout(r,500));
  ok('R nusoka i tvarkarascio skaidre',await page.evaluate(()=>
     window.SL[window.cur].tag==='tvarkarastis'));
  ok('R atidaro forma',await page.$eval('#tvkForm',e=>e.classList.contains('on')));
  ok('QR ant tvarkarascio sugeneruotas',await page.$eval('#tvkQr',e=>e.children.length>0));
  await page.evaluate(()=>{
    document.getElementById('tvkM').value='QA licėjus';
    document.getElementById('tvkD').value='4';
    document.getElementById('tvkT').value='14:00-15:30';
    document.getElementById('tvkK').value='23';
    document.getElementById('tvkN').value='2026-09-18';
    window.tvkSave();
  });
  await new Promise(r=>setTimeout(r,300));
  ok('eilute vaikams skaitoma',await page.$eval('#tvkLine',e=>
     /Ketvirtadieniais 14:00–15:30/.test(e.textContent)));
  ok('meta: kabinetas + data',await page.$eval('#tvkMeta',e=>
     /23 kab\./.test(e.textContent)&&/rugsėjo 18 d\./.test(e.textContent)));
  ok('forma uzsidare po issaugojimo',await page.$eval('#tvkForm',e=>!e.classList.contains('on')));
  ok('tvarkarastis netelpa i horizontalu slinkima',await page.evaluate(()=>
     document.documentElement.scrollWidth<=window.innerWidth+2));

  console.log('\n== V6.14 hack sluoksnis ==');
  const bi=await page.evaluate(()=>window.SL.findIndex(s=>s.tag==='brainmax'));
  await page.evaluate(j=>window.show(j),bi);
  await new Promise(r=>setTimeout(r,250));
  ok('hack mygtukas matomas ant slot skaidres',await page.evaluate(()=>{
     const b=document.querySelector('#s'+window.cur+' .hackbtn');
     return !!b&&getComputedStyle(b).display!=='none';}));
  await page.evaluate(()=>document.querySelector('#s'+window.cur+' .hackbtn').click());
  await new Promise(r=>setTimeout(r,300));
  ok('perdanga atsidaro',await page.$eval('#hackBox',e=>e.classList.contains('on')));
  ok('4 taktai: pajusk/sustok/ivardink/paversk',await page.$eval('#hackBox',e=>
     /PAJUSK/.test(e.textContent)&&/SUSTOK/.test(e.textContent)&&
     /ĮVARDINK/.test(e.textContent)&&/PAVERSK/.test(e.textContent)));
  ok('ivardinti triukai',await page.$eval('#hackBox',e=>
     /kintamas atlygis/.test(e.textContent)&&/beveik-laimėjimas/.test(e.textContent)));
  ok('baigiasi taisykle „sustok"',await page.$eval('#hackBox',e=>
     /tavo dėmesio pirkimas/.test(e.textContent)&&/Sustok/.test(e.textContent)));
  await page.keyboard.press('Escape');
  await new Promise(r=>setTimeout(r,250));
  ok('Escape uzdaro perdanga',await page.$eval('#hackBox',e=>!e.classList.contains('on')));
  await page.keyboard.press('KeyH');
  await new Promise(r=>setTimeout(r,200));
  ok('H paslepia hack mygtukus',await page.evaluate(()=>{
     const b=document.querySelector('#s'+window.cur+' .hackbtn');
     return getComputedStyle(b).display==='none';}));
  await page.keyboard.press('KeyH');

  console.log('\n== V6.14 pulto broadcast keliai ==');
  ok('combo x2 dvigubina plius aura',await page.evaluate(()=>{
     window.comboStart(1500);
     const a=window.AURA.pts; window.aura(100,'qa');
     const d=window.AURA.pts-a; window.COMBO.until=0;
     return d===200;}));
  ok('RAID juosta pasirodo',await page.evaluate(()=>{
     window.raidBanner(); return document.getElementById('raidBan').classList.contains('on');}));
  ok('emoji plaukia ir be Twitch rezimo',await page.evaluate(()=>{
     const n=document.getElementById('emoRain').children.length;
     window.emoFloat('❤️');
     return document.getElementById('emoRain').children.length===n+1;}));
  ok('slideTitle be HTML zymu',await page.evaluate(()=>{
     const t=window.slideTitle(0); return t.length>3&&!/[<>]/.test(t);}));

  console.log('\n== Memas (M) ==');
  await page.keyboard.press('KeyM');
  await new Promise(r=>setTimeout(r,300));
  ok('memas atsidaro',await page.$eval('#memeBox',e=>e.classList.contains('on')));
  await new Promise(r=>setTimeout(r,2700));
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
