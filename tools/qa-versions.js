/* Boots each versions/<tag>/index.html + pultas.html in headless Chrome: asset 404s + JS errors. Needs :8899. */
const puppeteer=require('puppeteer-core');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/qa-chrome.js','utf8');const m=src.match(/executablePath:\s*['"]([^'"]+)['"]/);
const exe=m?m[1]:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=process.env.BASE||'http://localhost:8899/';
(async()=>{const b=await puppeteer.launch({executablePath:exe,headless:true,args:['--no-sandbox']});let fail=0;
for(const t of fs.readdirSync('versions').filter(x=>x.startsWith('v'))){
  for(const f of ['index.html','pultas.html']){
    const p=await b.newPage();const errs=[],bad=[];
    p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{if(r.status()>=400&&!/supabase|jsdelivr|cdn/.test(r.url()))bad.push(r.status()+' '+r.url().replace(BASE,''))});
    await p.setViewport({width:1280,height:720});
    try{await p.goto(BASE+'versions/'+t+'/'+f+'?room=QA'+t.replace(/\D/g,'').slice(-2),{waitUntil:'networkidle2',timeout:60000});}catch(e){errs.push('goto '+e.message)}
    await new Promise(r=>setTimeout(r,2500));
    const ver=await p.evaluate(()=>(document.body.innerText.match(/V6\.\d+/)||['?'])[0]).catch(()=>'?');
    const ok=!errs.length&&!bad.length;if(!ok)fail++;
    console.log((ok?'✅':'❌'),t,f,'label='+ver,errs.length?'JS:'+errs.slice(0,2).join('|'):'',bad.length?'404:'+bad.slice(0,3).join(','):'');
    await p.close();}}
await b.close();console.log(fail?'FAIL '+fail:'ALL OK');process.exit(fail?1:0)})();
