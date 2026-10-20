// Records the live learning map (krisvas333.github.io/vaiko-zemelapis) via CDP screencast → frames + ffmpeg concat list
const puppeteer=require('puppeteer-core');const fs=require('fs');const out=process.argv[2];
(async()=>{const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage();await p.setViewport({width:1280,height:800});
await p.goto('https://krisvas333.github.io/vaiko-zemelapis/?src=siaures-90-rec',{waitUntil:'networkidle2',timeout:60000});await new Promise(r=>setTimeout(r,3000));
await p.evaluate(()=>{setInterval(()=>{[...document.querySelectorAll('body *')].filter(e=>e.shadowRoot).forEach(e=>e.style.display='none');},50);});
const W=ms=>new Promise(r=>setTimeout(r,ms));await W(500);
const cdp=await p.target().createCDPSession();const frames=[];
cdp.on('Page.screencastFrame',async f=>{const fn=out+'/c'+String(frames.length).padStart(4,'0')+'.jpg';fs.writeFileSync(fn,Buffer.from(f.data,'base64'));frames.push([fn,f.metadata.timestamp]);try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId});}catch(e){}});
await cdp.send('Page.startScreencast',{format:'jpeg',quality:82,everyNthFrame:1});
await W(1000);
await p.mouse.move(500,300);await p.mouse.move(617,433,{steps:12});await W(200);await p.mouse.click(617,433);await W(2600);
await p.select('#grade',await p.evaluate(()=>document.querySelector('#grade').options[4].value));await W(2000);
await p.mouse.move(980,105,{steps:10});await p.click('#q');await p.keyboard.type('trupmen',{delay:110});await W(700);await p.evaluate(()=>{const li=document.querySelector('#qres > div');if(li){window.__li=li.getBoundingClientRect();}});const r=await p.evaluate(()=>window.__li&&{x:__li.x+__li.width/2,y:__li.y+__li.height/2});if(r){await p.mouse.move(r.x,r.y,{steps:8});await p.mouse.click(r.x,r.y);}else await p.keyboard.press('Enter');await W(3000);
await cdp.send('Page.stopScreencast');await W(300);
const list=frames.map((f,i)=>"file '"+f[0]+"'\nduration "+Math.max(0.02,((frames[i+1]||[0,f[1]+0.1])[1]-f[1])).toFixed(3)).join('\n')+"\nfile '"+frames[frames.length-1][0]+"'\n";
fs.writeFileSync(out+'/list.txt',list);console.log('frames',frames.length,'secs',(frames[frames.length-1][1]-frames[0][1]).toFixed(1));await b.close();})();
