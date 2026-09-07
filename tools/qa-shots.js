const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT='/private/tmp/claude-501/-Users-kris-Desktop-Kris-BrAIn/ebef1dc1-2891-4c9b-9b4a-82fa9dd19999/scratchpad/v615/';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',
 args:['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
       '--autoplay-policy=no-user-gesture-required','--font-render-hinting=none']});
const p=await b.newPage();
const shot=async n=>{ await p.screenshot({path:OUT+n+'.png'}); console.log('  📸 '+n+'.png'); };
for(const [W,H] of [[1280,720],[1920,1080]]){
  const T=W+'x'+H;
  await p.setViewport({width:W,height:H});
  await p.goto('http://localhost:8899/index.html?mokykla=%C5%A0iaur%C4%97s+lic%C4%97jus&diena=4&laikas=14:00-15:30&kab=23&nuo=2026-09-18',{waitUntil:'domcontentloaded'});
  await wait(3800); await p.click('#start .btn-red'); await wait(900);

  // tvarkarastis (pilnas)
  await p.evaluate(()=>window.show(window.SL.findIndex(s=>s.tag==='tvarkarastis')));
  await wait(900); await shot('tvarkarastis-pilnas-'+T);
  console.log('   fit tvk:',await p.evaluate(()=>{const s=document.querySelector('.slide.on');
    const r=s.getBoundingClientRect();return JSON.stringify({bottom:Math.round(r.bottom),ih:innerHeight,
      docH:document.documentElement.scrollHeight,docW:document.documentElement.scrollWidth,iw:innerWidth});}));
  // tvarkarastis su QR
  await p.evaluate(()=>window.tvkQrToggle(true)); await wait(500); await shot('tvarkarastis-su-qr-'+T);
  await p.evaluate(()=>window.tvkQrToggle(false)); await wait(300);
  // tuscias
  await p.evaluate(()=>{localStorage.removeItem('bcday-tvk');
    window.TVK.mokykla='';window.TVK.laikas='';window.TVK.kab='';window.TVK.nuo='';window.tvkRender();});
  await wait(500); await shot('tvarkarastis-tuscias-'+T);
  await p.evaluate(()=>{window.TVK.mokykla='Šiaurės licėjus';window.TVK.laikas='14:00-15:30';
    window.TVK.kab='23';window.TVK.nuo='2026-09-18';window.tvkRender();}); await wait(300);

  // finalas
  await p.evaluate(()=>window.show(window.SL.findIndex(s=>s.tag==='finalas')));
  await wait(700); await shot('finalas-'+T);
  console.log('   fit finalas:',await p.evaluate(()=>{const s=document.querySelector('.slide.on');
    const r=s.getBoundingClientRect();
    let maxB=0;s.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.height>0&&q.bottom>maxB)maxB=q.bottom});
    return JSON.stringify({slideBottom:Math.round(r.bottom),lastChild:Math.round(maxB),ih:innerHeight,
      docH:document.documentElement.scrollHeight,scrollH:s.scrollHeight});}));

  // modulis: half-right / half-left / kampai / dydziai / CV
  await p.evaluate(()=>window.show(window.SL.findIndex(s=>s.tag==='aura')));
  await wait(700);
  await p.evaluate(()=>{localStorage.removeItem('bcday-scam');window.SCAM.x=null;window.SCAM.y=null;
    window.SCAM.corner='br';window.SCAM.size='m';window.SCAM.side='right';window.scamSet('half');});
  await wait(1600); await shot('modulis-half-right-'+T);
  await p.evaluate(()=>window.scamSwap()); await wait(500); await shot('modulis-half-left-'+T);
  for(const c of ['tl','tr','bl','br','tc']){
    await p.evaluate(k=>{window.scamSet('pip');window.SCAM.x=null;window.SCAM.y=null;
      window.SCAM.corner=k;window.scamPaint();document.getElementById('scam').classList.add('bar');},c);
    await wait(500); await shot('modulis-kampas-'+c+'-'+T);
  }
  for(const z of ['s','m','l']){
    await p.evaluate(k=>{window.SCAM.size=k;window.SCAM.corner='br';window.scamPaint()},z);
    await wait(350); await shot('modulis-dydis-'+z+'-'+T);
  }
  // CV + AURA ant modulio
  await p.evaluate(()=>{window.SCAM.size='l';window.SCAM.corner='br';window.scamPaint();window.scamAuraMode(true)});
  await wait(4500); await shot('modulis-cv-aura-'+T);
  console.log('   CV:',await p.evaluate(()=>JSON.stringify({cv:window.SCAM.cv,aura:window.SCAM.aura,
    vision:window.visionOn,streams:window.camStream?1:0,
    camWrap:getComputedStyle(document.getElementById('camWrap')).display})));
  // tempimas
  await p.evaluate(()=>{window.SCAM.x=380;window.SCAM.y=140;window.scamPaint();
    document.getElementById('scam').classList.add('bar')});
  await wait(500); await shot('modulis-tempta-vieta-'+T);
  // half + CV
  await p.evaluate(()=>{window.scamSet('half');window.scamPaint()}); await wait(1200);
  await shot('modulis-half-cv-'+T);
  await p.evaluate(()=>window.scamSet('off')); await wait(400);

  // pulto skaidre su prijungtu telefonu
  await p.evaluate(()=>{window.pultTouch({cid:'demo1'})}); await wait(300);
  await shot('aura-skaidre-pultas-'+T);
}
// ---- pultas telefone: zalia / raudona / klaidu eilute ----
const ROOM='SHOT';
const d2=await b.newPage(); await d2.setViewport({width:1280,height:720});
await d2.goto('http://localhost:8899/index.html?room='+ROOM,{waitUntil:'domcontentloaded'});
await wait(3800); await d2.click('#start .btn-red'); await wait(900);
const ph=await b.newPage(); await ph.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
await ph.goto('http://localhost:8899/pultas.html?room='+ROOM,{waitUntil:'domcontentloaded'});
await wait(5000);
await ph.screenshot({path:OUT+'pultas-zalia-390x844.png',fullPage:true});
console.log('  📸 pultas-zalia-390x844.png ·',await ph.$eval('#state',e=>e.textContent));
await ph.evaluate(()=>{document.getElementById('roomInp').value='ZZ99'});
await ph.click('#bRoom'); await wait(9000);
await ph.screenshot({path:OUT+'pultas-raudona-390x844.png',fullPage:true});
console.log('  📸 pultas-raudona-390x844.png ·',await ph.$eval('#state',e=>e.textContent));
await d2.screenshot({path:OUT+'deckas-pultas-badge-1280x720.png'});
console.log('  📸 deckas-pultas-badge-1280x720.png ·',await d2.$eval('#pultBadge',e=>e.textContent));
await b.close(); console.log('done');
})().catch(e=>{console.error(e);process.exit(1)});
