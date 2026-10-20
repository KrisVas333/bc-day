/* ml-form.js · el. pašto forma medziaga.html puslapiui.
   Rašo į Supabase public.mokytojai_el_pastai (anon INSERT, RLS), iš ten Neuron sinchronizuoja į
   MailerLite grupę „Mokytojai · DI (Lietuva)" (201850418262705835). MailerLite raktas niekada nebūna puslapyje. */
(function(){
  var box=document.getElementById('ml-signup'); if(!box) return;
  var URL='https://iiekmeylpppczicrsxho.supabase.co/rest/v1/mokytojai_el_pastai';
  var KEY='sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF';
  var q=new URLSearchParams(location.search), src=(q.get('src')||'medziaga').slice(0,60);
  var css='#ml-signup .mlf{border:2px solid var(--ink,#0A0A0A);border-radius:4px;padding:16px;background:var(--surface,#F7F7F5)}'+
    '#ml-signup h2{margin:0 0 6px;font-size:19px}#ml-signup p{font-size:15px;color:var(--muted,#595959);margin:0 0 12px}'+
    '#ml-signup input[type=email]{width:100%;min-height:52px;font-size:18px;padding:10px 12px;border:2px solid var(--line,#E5E2DE);border-radius:4px;font-family:inherit}'+
    '#ml-signup label.c{display:flex;gap:10px;align-items:flex-start;font-size:15px;margin:12px 0;cursor:pointer}'+
    '#ml-signup label.c input{width:24px;height:24px;flex:none;margin-top:1px;accent-color:#D90429}'+
    '#ml-signup button{width:100%;min-height:52px;font-size:18px;font-weight:700;background:#D90429;color:#fff;border:0;border-radius:4px;cursor:pointer;font-family:inherit}'+
    '#ml-signup button[disabled]{opacity:.6}#ml-signup .hp{position:absolute;left:-9999px}'+
    '#ml-signup .msg{margin-top:10px;font-size:16px;font-weight:700;min-height:1.3em}#ml-signup .ok{color:#1a7f37}#ml-signup .err{color:#D90429}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  box.innerHTML='<form class="mlf" novalidate>'+
    '<h2>Gaukite atmintinę ir naujienas el. paštu</h2>'+
    '<p>Nauja grupė: Lietuvos mokytojai, kurie mokosi DI. Užklausos, įrankiai, kitų mokymų medžiaga.</p>'+
    '<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="jusu@mokykla.lt" required aria-label="El. paštas">'+
    '<input class="hp" type="text" name="web" tabindex="-1" autocomplete="off" aria-hidden="true">'+
    '<label class="c"><input type="checkbox" name="ok" required><span>Sutinku gauti Kris Vas laiškus apie DI mokytojams. Galiu atsisakyti bet kada.</span></label>'+
    '<button type="submit" data-track="medziaga_email">Siųsti</button><div class="msg" aria-live="polite"></div></form>';
  var f=box.querySelector('form'), msg=box.querySelector('.msg'), btn=f.querySelector('button');
  function say(t,c){msg.textContent=t;msg.className='msg '+(c||'');}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var em=f.email.value.trim();
    if(f.web.value) return say('Ačiū!','ok');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)||em.length>254) return say('Patikrinkite el. pašto adresą.','err');
    if(!f.ok.checked) return say('Pažymėkite sutikimą.','err');
    btn.disabled=true; say('Siunčiama…');
    fetch(URL,{method:'POST',headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
      body:JSON.stringify({el_pastas:em,sutikimas:true,mokymai:'siaures-ai-90',src:src})})
    .then(function(r){
      if(r.ok||r.status===409){f.reset();say('Ačiū! Laiškas atkeliaus netrukus.','ok');}
      else{btn.disabled=false;say('Nepavyko. Pabandykite dar kartą.','err');}
    },function(){btn.disabled=false;say('Nėra ryšio. Pabandykite dar kartą.','err');});
  });
})();
