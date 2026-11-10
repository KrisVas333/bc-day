/* ivertinimas.js · „⭐ Įvertinkite mokymus ir užduokite klausimą" forma medziaga.html puslapiui (it-mokytojai-di, KŠIC Zoom 2026-11-10).
   Rašo į Supabase public.scorecard (ta pati lentelė kaip scorecard skill'o mygtukas, anon tik INSERT).
   Anonimiška: jokių vardų, el. paštų, slapukų, IP. Klausimas ir atsiliepimas keliauja comment lauke („💬 …" / „❓ …", ≤ 1000 ženklų).
   Skaito tik Neuron per service SQL: select … from scorecard where project='it-mokytojai-di' and not is_test. */
(function(){
  var box=document.getElementById('ivertinkite'); if(!box) return;
  var URL='https://iiekmeylpppczicrsxho.supabase.co/rest/v1/scorecard';
  var KEY='sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF';
  var q=new URLSearchParams(location.search);
  var SRC=(q.get('src')||'medziaga').replace(/[^a-z0-9_+-]/gi,'').slice(0,40)||'medziaga';
  var TEST=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)||q.has('test');
  var CRIT=[['aisku','Buvo aišku'],['naudinga','Naudinga mano pamokoms'],['isbandysiu','Išbandysiu per savaitę']];
  var S={overall:0,scores:{},again:null};

  var css='#ivertinkite .ivf{border:2px solid var(--accent,#D90429);border-radius:4px;padding:16px;background:var(--ground,#fff)}'+
    '#ivertinkite h2{margin:0 0 6px;padding:0;border:0;font-size:20px}#ivertinkite .sub{font-size:17px;color:var(--muted,#595959);margin:0 0 14px}'+
    '#ivertinkite .q{font-weight:700;font-size:17px;margin:14px 0 6px}'+
    '#ivertinkite .stars{display:flex;gap:6px}#ivertinkite .stars button{width:52px;height:52px;font-size:30px;line-height:1;border:2px solid var(--ink,#0A0A0A);border-radius:4px;background:#fff;color:#bbb;cursor:pointer;padding:0}'+
    '#ivertinkite .stars button.on{color:var(--accent,#D90429)}'+
    '#ivertinkite .row{display:grid;grid-template-columns:1fr;gap:4px;padding:8px 0;border-bottom:1px solid var(--line,#E5E2DE)}'+
    '#ivertinkite .row span{font-size:16px}#ivertinkite .sc{display:flex;gap:6px}'+
    '#ivertinkite .sc button,#ivertinkite .ag button{min-width:44px;height:44px;font-family:var(--mono,monospace);font-weight:800;font-size:16px;border:2px solid var(--ink,#0A0A0A);border-radius:4px;background:#fff;color:var(--ink,#0A0A0A);cursor:pointer;padding:0 12px}'+
    '#ivertinkite .sc button.on,#ivertinkite .ag button.on{background:var(--ink,#0A0A0A);color:#fff}'+
    '#ivertinkite .ag{display:flex;gap:8px;flex-wrap:wrap}'+
    '#ivertinkite textarea{width:100%;min-height:88px;font-size:17px;font-family:inherit;padding:10px 12px;border:2px solid var(--ink,#0A0A0A);border-radius:4px;background:#fff;resize:vertical}'+
    '#ivertinkite .hp{position:absolute;left:-9999px}'+
    '#ivertinkite .pv{font-size:15px;color:var(--muted,#595959);margin:12px 0}'+
    '#ivertinkite .send{width:100%;min-height:52px;font-size:18px;font-weight:700;background:var(--accent,#D90429);color:#fff;border:0;border-radius:4px;cursor:pointer;font-family:inherit}'+
    '#ivertinkite .send[disabled]{opacity:.5;cursor:default}'+
    '#ivertinkite .msg{margin-top:10px;font-size:17px;font-weight:700;min-height:1.3em}#ivertinkite .ok{color:var(--ok,#1a7f37)}#ivertinkite .err{color:var(--accent,#D90429)}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  var h='<form class="ivf" novalidate><h2>⭐ Įvertinkite mokymus ir užduokite klausimą</h2>'+
    '<p class="sub">1 minutė. Į klausimus atsakysiu visiems kitame laiške.</p>'+
    '<div class="q">Bendras įvertinimas</div><div class="stars" role="group" aria-label="Bendras įvertinimas nuo 1 iki 5">';
  for(var i=1;i<=5;i++) h+='<button type="button" data-o="'+i+'" aria-label="'+i+' iš 5" aria-pressed="false">★</button>';
  h+='</div><div class="q">Nuo 1 (ne) iki 5 (taip)</div>';
  CRIT.forEach(function(c){
    h+='<div class="row"><span>'+c[1]+'</span><div class="sc" role="group" aria-label="'+c[1]+'">';
    for(var i=1;i<=5;i++) h+='<button type="button" data-k="'+c[0]+'" data-v="'+i+'" aria-pressed="false">'+i+'</button>';
    h+='</div></div>';
  });
  h+='<div class="q">Ar rekomenduotumėte kolegai?</div><div class="ag" role="group" aria-label="Ar rekomenduotumėte kolegai?">'+
    '<button type="button" data-a="taip" aria-pressed="false">Taip</button><button type="button" data-a="gal" aria-pressed="false">Gal</button><button type="button" data-a="ne" aria-pressed="false">Ne</button></div>'+
    '<div class="q"><label for="iv-fb">💬 Kas buvo naudingiausia? Ko trūko?</label></div><textarea id="iv-fb" maxlength="450"></textarea>'+
    '<div class="q"><label for="iv-q">❓ Jūsų klausimas man</label></div><textarea id="iv-q" maxlength="450" placeholder="Pvz. kaip pradėti, jei mokykla leidžia tik Copilot?"></textarea>'+
    '<input class="hp" type="text" name="web" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '<p class="pv">Anonimiška: be vardų, el. paštų ir slapukų. Nerašykite mokinių ar kolegų vardų. Norite asmeninio atsakymo? Palikite el. paštą formoje žemiau.</p>'+
    '<button type="submit" class="send" disabled data-track="medziaga_ivertinimas">Siųsti</button><div class="msg" aria-live="polite"></div></form>';
  box.innerHTML=h;

  var f=box.querySelector('form'), send=f.querySelector('.send'), msg=f.querySelector('.msg'), fb=f.querySelector('#iv-fb'), qq=f.querySelector('#iv-q');
  function say(t,c){msg.textContent=t;msg.className='msg '+(c||'');}
  function ready(){send.disabled=!(S.overall||S.again||Object.keys(S.scores).length||fb.value.trim()||qq.value.trim());}
  function mark(sel,attr,val){[].forEach.call(f.querySelectorAll(sel),function(b){var on=String(b.getAttribute(attr))===String(val);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on?'true':'false');});}
  f.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('button[type=button]'); if(!b) return;
    if(b.dataset.o){S.overall=+b.dataset.o;[].forEach.call(f.querySelectorAll('.stars button'),function(x){var on=+x.dataset.o<=S.overall;x.classList.toggle('on',on);x.setAttribute('aria-pressed',+x.dataset.o===S.overall?'true':'false');});}
    else if(b.dataset.k){S.scores[b.dataset.k]=+b.dataset.v;mark('.sc button[data-k="'+b.dataset.k+'"]','data-v',b.dataset.v);}
    else if(b.dataset.a){S.again=b.dataset.a;mark('.ag button','data-a',b.dataset.a);}
    ready();
  });
  fb.addEventListener('input',ready); qq.addEventListener('input',ready);
  function device(){var w=Math.min(screen.width||innerWidth,innerWidth||9999);return w<600?'phone':(w<1024?'tablet':'desktop');}
  f.addEventListener('submit',function(e){
    e.preventDefault(); if(send.disabled) return;
    if(f.web.value){say('Ačiū!','ok');return;}
    var parts=[]; if(fb.value.trim()) parts.push('💬 '+fb.value.trim().slice(0,450)); if(qq.value.trim()) parts.push('❓ '+qq.value.trim().slice(0,450));
    var row={project:'it-mokytojai-di',version:'2026-11-10',page:location.pathname.slice(0,200),role:'vartotojas',
      overall:S.overall||null,again:S.again,scores:S.scores,comment:parts.join('\n')||null,spot:null,
      context:{scene:'po-mokymu'},lang:'lt',device:device(),src:SRC,is_test:TEST};
    send.disabled=true; say('Siunčiama…');
    try{if(window.bt)window.bt('medziaga_ivertinimas',{o:S.overall||0,q:qq.value.trim()?1:0});}catch(x){}
    fetch(URL,{method:'POST',headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify(row)})
    .then(function(r){
      if(r.ok){f.reset();S={overall:0,scores:{},again:null};[].forEach.call(f.querySelectorAll('button.on'),function(x){x.classList.remove('on');x.setAttribute('aria-pressed','false');});ready();
        say('Ačiū! Gavau. Atsakymus į klausimus atsiųsiu visiems.','ok');}
      else{send.disabled=false;say('Nepavyko. Pabandykite dar kartą.','err');}
    },function(){send.disabled=false;say('Nėra ryšio. Pabandykite dar kartą.','err');});
  });
})();
