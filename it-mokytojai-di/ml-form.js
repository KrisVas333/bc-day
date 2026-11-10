/* ml-form.js · el. pašto forma medziaga.html puslapiui (it-mokytojai-di, KŠIC Zoom 2026-11-10).
   Rašo į Supabase public.mokytojai_el_pastai (anon INSERT, RLS: sutikimas = true), iš ten Neuron rankiniu būdu sinchronizuoja į
   MailerLite grupę „Mokytojai · DI (Lietuva)". MailerLite raktas niekada nebūna puslapyje. Laiškas automatiškai NEsiunčiamas.
   Lentelėje nėra stulpelio dirbtuvių norui, todėl jis keliauja src lauke: src = <URL src arba it-mokytojai-1110> + "+dirbtuves" (≤ 60 ženklų). */
(function(){
  var box=document.getElementById('ml-signup'); if(!box) return;
  var URL='https://iiekmeylpppczicrsxho.supabase.co/rest/v1/mokytojai_el_pastai';
  var KEY='sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF';
  var q=new URLSearchParams(location.search), src0=(q.get('src')||'it-mokytojai-1110').replace(/[^a-z0-9_+-]/gi,'').slice(0,49)||'it-mokytojai-1110';
  var css='#ml-signup .mlf{border:2px solid var(--ink,#0A0A0A);border-radius:4px;padding:16px;background:var(--surface,#F7F7F5)}'+
    '#ml-signup h2{margin:0 0 6px;font-size:20px}#ml-signup p{font-size:17px;color:var(--muted,#595959);margin:0 0 12px}'+
    '#ml-signup input[type=email]{width:100%;min-height:52px;font-size:18px;padding:10px 12px;border:2px solid var(--ink,#0A0A0A);border-radius:4px;font-family:inherit;background:#fff}'+
    '#ml-signup label.c{display:flex;gap:12px;align-items:flex-start;font-size:17px;line-height:1.4;margin:12px 0;cursor:pointer;min-height:44px}'+
    '#ml-signup label.c input{width:26px;height:26px;flex:none;margin-top:1px;accent-color:#D90429}'+
    '#ml-signup label.c.w{border:2px solid #D90429;border-radius:4px;padding:10px 12px;background:#fff;font-weight:700}'+
    '#ml-signup button{width:100%;min-height:52px;font-size:18px;font-weight:700;background:#D90429;color:#fff;border:0;border-radius:4px;cursor:pointer;font-family:inherit}'+
    '#ml-signup button[disabled]{opacity:.6}#ml-signup .hp{position:absolute;left:-9999px}'+
    '#ml-signup .msg{margin-top:10px;font-size:17px;font-weight:700;min-height:1.3em}#ml-signup .ok{color:#1a7f37}#ml-signup .err{color:#D90429}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  box.innerHTML='<form class="mlf" novalidate>'+
    '<h2>Gaukite skaidres, užklausas ir šaltinius el. paštu</h2>'+
    '<p>Atsiųsime šios medžiagos nuorodą ir retas naujienas apie DI mokytojams.</p>'+
    '<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="jusu@mokykla.lt" required aria-label="El. paštas">'+
    '<input class="hp" type="text" name="web" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '<label class="c w"><input type="checkbox" name="dirb"><span>Noriu praktinių dirbtuvių: susikurti savo antrąsias smegenis</span></label>'+
    '<label class="c"><input type="checkbox" name="ok" required><span>Sutinku gauti Kris Vas laiškus apie DI mokytojams. Galiu atsisakyti bet kada.</span></label>'+
    '<p class="pv" style="font-size:15px">Duomenis tvarko Kristijonas Vasiliauskas (krisvas.lt), tik šiai medžiagai ir kvietimui į dirbtuves. Norite ištrinti? Atsakykite į bet kurį mūsų laišką.</p>'+
    '<button type="submit" data-track="medziaga_email">Siųsti</button><div class="msg" aria-live="polite"></div></form>';
  var f=box.querySelector('form'), msg=box.querySelector('.msg'), btn=f.querySelector('button');
  function say(t,c){msg.textContent=t;msg.className='msg '+(c||'');}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var em=f.email.value.trim();
    if(f.web.value) return say('Ačiū!','ok');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)||em.length>254) return say('Patikrinkite el. pašto adresą.','err');
    if(!f.ok.checked) return say('Pažymėkite sutikimą gauti laiškus.','err');
    var src=(src0+(f.dirb.checked?'+dirbtuves':'')).slice(0,60);
    btn.disabled=true; say('Siunčiama…');
    try{if(window.bt)window.bt('medziaga_email',{dirb:f.dirb.checked?1:0});}catch(x){}
    fetch(URL,{method:'POST',headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({el_pastas:em,sutikimas:true,mokymai:'it-mokytojai-di',src:src})})
    .then(function(r){
      if(r.ok||r.status===409){f.reset();btn.disabled=false;say('Ačiū! Visa medžiaga jau šiame puslapyje. Jei pažymėjote dirbtuves, parašysime, kai bus data.','ok');}
      else{btn.disabled=false;say('Nepavyko. Pabandykite dar kartą.','err');}
    },function(){btn.disabled=false;say('Nėra ryšio. Pabandykite dar kartą.','err');});
  });
})();
