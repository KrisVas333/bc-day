// Extract inline <script> blocks from index.html / pultas.html -> /tmp for node --check
const fs=require('fs'),path=require('path');
const src=process.argv[2]||'/Users/kris/bc-day/index.html';
const out=process.argv[3]||'/tmp/bcday-check';
fs.mkdirSync(out,{recursive:true});
const html=fs.readFileSync(src,'utf8');
const re=/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
let m,i=0,n=0;
while((m=re.exec(html))){
  const f=path.join(out,path.basename(src,'.html')+'-'+(i++)+'.js');
  fs.writeFileSync(f,m[1]); n++;
  console.log(f);
}
if(!n){console.error('NO INLINE SCRIPTS FOUND');process.exit(1);}
