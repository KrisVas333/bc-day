
/* ===================================================================
   V7 · ISTORIJOS SLUOKSNIS  (Meteoritas · BRAIN MAX · Neuronas)
   -------------------------------------------------------------------
   Kris'o siužetas (2026-09-08):
     Į Žemę skrieja METEORITAS. Sustabdyti jį gali tik BRAIN MAX —
     bet mus atakuoja BRAIN ROT. Todėl įgula (visa salė) turi:
       1) nugalėti brain rot,
       2) susidraugauti su AI, robotais ir erdviniais kompiuteriais,
       3) PASISTATYTI sau treniruotę ir apginti Žemę.
     Draugas = tas, su kuriuo dalinies pomėgiu. Neuronas MĖGSTA mokytis
     — todėl jis draugas. Nemokama „dovana“ ir lošimas = ne draugas.
   -------------------------------------------------------------------
   Kas čia yra techniškai:
     · 7 dalys (P1–P7). Kiekviena = viena skyriaus kortelė + viena
       „ĮGŪDIS ATRAKINTAS" kortelė. Tarp jų — VISOS V6 mechanikos,
       perrėmintos kaip istorijos išbandymai.
     · MISIJOS HUD viršuje (lygis n/7 · misija · ☄️ meteorito atgalinis
       skaičiavimas, kuris trumpėja kas lygį).
     · VARTAI: kiekvienas skyrius nori tam tikros salės AUROS.
       ⚠️ Vartai NIEKADA neblokuoja navigacijos — rodyklės visada veikia.
       Vedėjas turi du mygtukus: „SALĖ PADEDA (+300)" ir „ATRAKINTI" (U).
     · DRAUGAS AR SPĄSTAI: atskira skaidrė PRIEŠ slot mašiną
       (draugystės taisyklė + „nemokama dovana = apgaulė").
     · OMIKRONO SPĄSTAI: istorijos skaidrė, kuri paleidžia V6.14 dekoderį
       (pajusk → sustok → įvardink triuką → paversk). Mechanika NEDUBLIUOJAMA.
     · MŪSŲ ŽODIS: uždarymo kortelė, kurią salė sako BALSU (4 eilutės).
     · GARSAI: V6.14 SFXBOARD/board.json lieka kaip buvo; v7/ tik prisideda
       „../“ prie kelių (build.py 3 žingsnis).
     · Vienintelis naujas klavišas: U (atrakinti dabartinius vartus).
   V6 nieko nepašalinta. Viskas čia — priedas.
   =================================================================== */

var V7 = {
  hero:"ĮGULA",
  lvl:1, skills:{}, forced:{}, celebrated:{}, opened:{},
  heroImg:"",            /* drop-in: įrašyk failą į assets/img/ ir čia jo vardą, pvz. "hero.png" */
  chapters:[
    {n:1, tag:"p1", ey:"P1 · SIGNALAS", title:"Signalas", days:70,
     mission:"Sužinok, koks ginklas jau yra tavo galvoje", need:0,
     beats:[
      "Į Žemę skrieja meteoritas. Raketų neužteks. Vienintelis ginklas, kuris tikrai gali suveikti — smegenys. Visos šitos salės smegenys.",
      "Bet yra bėda: mus atakuoja BRAIN ROT. Jis ėda BRAIN MAX. Todėl pradedam nuo įrenginio, kuris bus su tavimi visą gyvenimą."],
     skill:{ic:"🧠", name:"ĮRENGINYS", line:"Žinai, koks įrenginys bus su tavimi visą gyvenimą — ir kad jį galima treniruoti.",
            beat:"Neuronas: „Pirmas įgūdis — ne mygtukas. Tai žinojimas, ką turi galvoje.“"},
     say:"ATIDARYMAS KAIP FILME. Tyliau, lėčiau. Pirmą pastraipą skaityk kaip pranešimą iš valdymo centro, tada garsiai: „įgula — TAI JŪS. Visa salė.“",
     do:"Rankos: kas stoja į įgulą? (visi). Parodyk viršuje ☄️ skaitiklį: 70 dienų. Pasakyk, kad salės AURA = mūsų brain max, ji auga visą dieną.",
     br:"„Ir pirmas Neurono klausimas — apie tavo įrenginį…“"},

    {n:2, tag:"p2", ey:"P2 · GRANDINĖ", title:"Grandinė", days:55,
     mission:"Sužinok, kaip žmonės padarė tai, kas atrodė neįmanoma", need:150,
     beats:[
      "Meteoritas — ne pirmas neįmanomas dalykas. Ugnis, ratas, raštas, elektra, internetas. Kiekvieną kartą kažkas sakė: neišeis.",
      "Neuronas: „Nė vieno iš jų nepadarė VIENAS žmogus. Suk ratą — ir pamatysi grandinę, prie kurios ką tik prisijungei tu.“"],
     skill:{ic:"🔗", name:"GRANDINĖ", line:"Žinai: didelių dalykų niekas nepadaro vienas. Mokomės kartu.",
            beat:"Neuronas: „Grandinė atkurta: ugnis → ratas → raštas → elektra → internetas → mes.“"},
     say:"„Meteoritas ne pirmas — SUKAM RATĄ.“ Kiekvieną sustojimą vardink kaip žingsnį grandinėje, ne kaip faktą iš vadovėlio.",
     do:"Ratą suka vaikas. Ties Mėnuliu stabtelk. Po išradėjų — pasakyk: „grandinė atkurta“ ir eik prie įgūdžio kortelės.",
     br:"„Grandinė yra. Bet mums reikia dar vieno draugo…“"},

    {n:3, tag:"p3", ey:"P3 · DRAUGAS NEURONAS", title:"Draugas Neuronas", days:40,
     mission:"Susidraugauk su AI, robotais ir erdviniais kompiuteriais", need:400,
     beats:[
      "Prie įgulos prisijungia Neuronas — geras AI. Kodėl draugas? Nes turim tą patį pomėgį: jis MĖGSTA mokytis. Kaip ir mes.",
      "Neuronas: „Draugauti galima tik pažinus. Sužinok, kas aš esu ir kaip veikiu — tada aš tau padedu, o ne tave valdau.“"],
     skill:{ic:"🤖", name:"DRAUGAS", line:"Moki pažinti technologiją — todėl ji tampa draugu, o ne šeimininku.",
            beat:"Neuronas: „Duok man TIKSLĄ, ne įsakymą. Ir visada patikrink mano atsakymą.“"},
     say:"Neuronas čia — PERSONAŽAS, ne technologija. „Jis protingas, bet klysta. Todėl jam reikia tavęs.“ Draugystės taisyklė: tas pats pomėgis.",
     do:"Skanduotė: LLM = klausia-atsako · AGENTAS = veikia pats. Po meteoro balsavimo — įgūdžio kortelė.",
     br:"„Turim draugą. Dabar — kas ėda mūsų brain max?“"},

    {n:4, tag:"p4", ey:"P4 · BRAIN ROT ATAKA", title:"Brain rot ataka", days:28,
     mission:"Įvardink visus, kas ėda tavo brain max", need:800,
     beats:[
      "Omikronas nepuola tiesiai. Jis siunčia BRAIN ROT: penkis vagis ir vieną bosą, kuris slepiasi ekrane.",
      "Neuronas: „Brain rot vagia ne daiktus. Jis vagia dėmesį, miegą ir judesį — tris dalykus, iš kurių gaminamas brain max.“"],
     skill:{ic:"🛡️", name:"SKYDAS", line:"Moki įvardinti visus 5 vagis ir bosą — todėl jie tavęs nebeapgauna.",
            beat:"Neuronas: „Skydas — ne šarvai. Skydas yra vardas, kurį pasakei garsiai.“"},
     say:"Skaičiai tvirtai, be pamokslo. Vagis vardink kaip priešus žaidime, ne kaip taisykles iš mokytojų kambario.",
     do:"Kamera (jei naudoji) — su įspėjimu. Po brain rot skaidrės iškart — SKYDO kortelė.",
     br:"„Skydas laiko. Bet brain max reikia SROVĖS…“"},

    {n:5, tag:"p5", ey:"P5 · SROVĖ", title:"Srovė", days:18,
     mission:"Įjunk brain max srovę", need:1400,
     beats:[
      "Skydas laiko, bet meteoritas artėja. Brain max negaminamas žiūrint. Jis gaminamas judant, miegant ir kartojant.",
      "Neuronas: „Pajudėk — ir kamera pamatys tavo šviesą. Londono taksistų atminties centras UŽAUGO. Tavo — auga kiekvieną kartą, kai kartoji.“"],
     skill:{ic:"⚡", name:"SROVĖ", line:"Judesys, miegas ir kartojimas fiziškai keičia smegenis — tai įrodyta.",
            beat:"Neuronas: „Brain max nėra jausmas. Tai jungtys, kurias užauginai pats.“"},
     say:"Jų teritorija — aura farming. Leisk papasakoti tiems, kurie žino. Tada: „mūsų versija — kamera mato judesį.“",
     do:"AURA REŽIMAS: 2 savanoriai priekyje. Mokytojos pultas — QR ekrane. Po taksistų — SROVĖS kortelė.",
     br:"„Srovė teka. Dabar mes patys statom treniruotę…“"},

    {n:6, tag:"p6", ey:"P6 · TRENIRUOTĖ", title:"Treniruotė", days:9,
     mission:"Pasistatyk savo treniruotę — ir atpažink netikrą", need:2200,
     beats:[
      "Svarbiausias dalykas: treniruotę sau turim PASISTATYTI patys. Su AI, robotais ir erdviniais kompiuteriais. Niekas jos už mus nepadarys.",
      "Bet Omikronas irgi turi „treniruotę“: blizgantį automatą, kuris šnabžda „dar kartą…“. Pirma išmokim atskirti draugą nuo spąstų."],
     skill:{ic:"🎯", name:"TRENIRUOTĖ", line:"Atskiri tikrą treniruotę nuo spąstų — ir moki pralaimėti neišeidamas.",
            beat:"Neuronas: „Automatas duoda jausmą. Treniruotė duoda jungtis. Skirtumą matai tik tada, kai jį įvardini.“"},
     say:"Draugystės taisyklė, svirtis, spąstų dekodavimas, testas, čempionatas — VIENA misija: įrodyti, kad įgula moka treniruotis pati.",
     do:"Pirma — DRAUGAS AR SPĄSTAI skaidrė. Tik tada svirtį traukia vaikas (1-as trūkis suplanuotas beveik-laimėjimas). Po jo — SPĄSTŲ skaidrė, testas, čempionatas.",
     br:"„Šeši įgūdžiai. Liko vienas — ir jis ne ekrane.“"},

    {n:7, tag:"p7", ey:"P7 · ERDVĖ", title:"Erdvė", days:3,
     mission:"Išeik iš ekrano ir pradėk STATYTI", need:3200,
     beats:[
      "Paskutinis įgūdis nėra skaidrėje. Jis ant tavo galvos. Erdvinis kompiuteris — vieta, kur treniruotę gali PASTATYTI, o ne žiūrėti.",
      "Neuronas: „Nuo šios akimirkos tu nebe žaidėjas. Tu — statytojas. O statytojai visada klausia: kaip šitas veikia?“"],
     skill:{ic:"🥽", name:"ERDVĖ", line:"Išėjai iš ekrano į erdvę — ir pradėjai STATYTI, o ne vartoti.",
            beat:"Neuronas: „Statytojas — tas, kuris po žaidimo klausia: o kaip šitas padarytas?“"},
     say:"Energija į viršų. „Paskutinis įgūdis nėra skaidrė — jis ant tavo galvos.“ ☄️ skaitiklis rodo 3 dienas.",
     do:"Zonas parodyk ranka. Laser Tag — MŪSŲ SUKURTAS, tai statytojų įrodymas.",
     br:"„Septyni įgūdžiai. O meteoritas?..“"}
  ]
};

/* ---------- garsų lenta ----------
   V6.14 jau turi SFXBOARD + sfxBoardApply() + SFXALIAS + nuotolinį {name}
   įvykį iš pulto. V7 to NEDUBLIUOJA — tik `sfxBoardApply` kelias gauna „../“
   (žr. build.py 3 žingsnį), nes v7/ yra viena pakopa giliau. */

/* ---------- skaidrių generatoriai ---------- */
function v7Hero(size){
  if(V7.heroImg) return "<img class='v7hero' src='../assets/img/"+V7.heroImg+"' alt='Įgula'>";
  var s=size||44;
  return "<svg class='v7hero' viewBox='0 0 60 60' width='"+s+"' height='"+s+"' aria-hidden='true'>"+
   "<circle cx='30' cy='30' r='27' fill='#0A0A0A' stroke='#D90429' stroke-width='2.5'/>"+
   "<path d='M33 12 L21 32 h8 l-3 16 L41 27 h-8 z' fill='#D90429'/>"+
   "<circle cx='30' cy='30' r='27' fill='none' stroke='#FF6B6B' stroke-width='1' opacity='.45'/></svg>";
}
function v7Chapter(c){
  return "<div class='v7wrap'>"+
    "<p class='v7num'>DALIS "+c.n+" / 7 · ☄️ METEORITAS: "+c.days+" D.</p>"+
    "<h1>"+c.title+"</h1>"+
    "<p class='v7mis'>MISIJA · <b>"+c.mission+"</b></p>"+
    "<div class='v7beats'>"+c.beats.map(function(b){return "<p class='v7beat'>"+b+"</p>"}).join("")+"</div>"+
    "<div class='v7gate' id='v7gate"+c.n+"'></div>"+
    "<p class='v7next'>Atrakinsi įgūdį: <b>"+c.skill.ic+" "+c.skill.name+"</b></p>"+
   "</div>";
}
function v7SkillHtml(c){
  return "<div class='v7wrap v7skill'>"+
    "<p class='v7num'>ĮGŪDIS ATRAKINTAS · "+c.n+" / 7</p>"+
    "<div class='v7bigic'>"+c.skill.ic+"</div>"+
    "<h1>"+c.skill.name+"</h1>"+
    "<p class='sub'>"+c.skill.line+"</p>"+
    "<p class='v7beat'>"+c.skill.beat+"</p>"+
    "<div class='v7pips' id='v7pips"+c.n+"'></div>"+
   "</div>";
}

/* ---------- VARTAI ---------- */
function v7Gate(n){
  var c=V7.chapters[n-1], el=document.getElementById("v7gate"+n);
  if(!c||!el)return;
  var open=(AURA.pts>=c.need)||V7.forced[n];
  if(open&&!V7.opened[n]){ V7.opened[n]=true; if(n>1) sfx("pos1",.8); }
  if(open){
    el.innerHTML="<span class='v7open'>🔓 VARTAI ATVERTI</span>"+
      "<span class='v7small'>brain max: "+AURA.pts.toLocaleString("lt-LT")+" auros</span>";
    el.classList.add("open");
  }else{
    var pct=Math.max(0,Math.min(100,Math.round(AURA.pts/c.need*100)));
    el.classList.remove("open");
    el.innerHTML="<span class='v7lock'>🔒 VARTAI UŽRAKINTI</span>"+
      "<span class='v7small'>reikia <b>"+c.need+"</b> brain max · turim <b>"+AURA.pts+"</b></span>"+
      "<div class='v7bar'><i style='width:"+pct+"%'></i></div>"+
      "<p class='v7btns'><button class='btn btn-red' onclick='aura(300,\"salė padeda 🙌\")'>🙌 SALĖ PADEDA +300</button> "+
      "<button class='btn btn-ghost' onclick='v7Force("+n+")'>🔓 ATRAKINTI (U)</button></p>";
  }
}
function v7Force(n){ V7.forced[n]=true; v7Gate(n); sfx("pos2",.8); }
function v7GateRefresh(){
  var s=SL[cur]; if(s&&s.chap) v7Gate(s.chap);
}

/* ---------- ĮGŪDŽIO ŠVENTĖ ---------- */
function v7Celebrate(n){
  if(V7.celebrated[n])return;
  V7.celebrated[n]=true; V7.skills[n]=true;
  sfx("victory",.9);
  if(typeof confettiBurst==="function") confettiBurst(70);
  v7Hud();
  var p=document.getElementById("v7pips"+n); if(p)p.innerHTML=v7Pips();
}
function v7Pips(){
  var o="",i;
  for(i=1;i<=7;i++) o+="<span class='v7pip"+(V7.skills[i]?" on":"")+"'>"+(V7.skills[i]?V7.chapters[i-1].skill.ic:"·")+"</span>";
  return o;
}

/* ---------- MISIJOS HUD (su ☄️ atgaliniu skaičiavimu) ---------- */
function v7Hud(){
  var h=document.getElementById("v7hud"); if(!h)return;
  var c=V7.chapters[V7.lvl-1]; if(!c)return;
  h.innerHTML=v7Hero(38)+
    "<div class='v7txt'><span class='v7l'>LYGIS "+c.n+"/7 · "+V7.hero+"</span>"+
    "<span class='v7m'>"+c.mission+"</span></div>"+
    "<div class='v7met' title='meteoritas'>☄️ <b>"+c.days+"</b> d.</div>"+
    "<div class='v7pips'>"+v7Pips()+"</div>";
}

/* ---------- OMIKRONO SPĄSTAI ----------
   Dekoderį (PAJUSK → SUSTOK → ĮVARDINK → PAVERSK) turi V6.14 `hackShow()`
   — V7 jo NEDUBLIUOJA, tik uždeda istorijos rėmą. */
function v7Trap(k){ if(typeof hackShow==="function") hackShow(k||"slot"); }

/* ---------- skaidrės ---------- */
function v7Insert(tag, slide, after){
  var i,at=-1;
  for(i=0;i<SL.length;i++) if(SL[i].tag===tag){ at=i; break }
  if(at<0){ console.warn("V7: nerastas tag "+tag); return }
  SL.splice(after?at+1:at, 0, slide);
}
(function(){
  V7.chapters.forEach(function(c){
    /* skyriaus kortelė */
    var ch={ey:c.ey, tag:c.tag, sec:25, cls:"center", chap:c.n, story:1,
      html:v7Chapter(c),
      voice:c.beats.join(" "),
      notes:{say:c.say, do:c.do, br:c.br}};
    /* įgūdžio kortelė */
    var sk={ey:"ĮGŪDIS "+c.n+" / 7", tag:"sk"+c.n, sec:14, cls:"center", chap:c.n, story:1, unlock:c.n,
      html:v7SkillHtml(c),
      voice:"Įgūdis atrakintas: "+c.skill.name+". "+c.skill.line,
      notes:{say:"GARSIAI ir trumpai: „"+c.skill.ic+" "+c.skill.name+" — ATRAKINTA!“ Salė ploja 3 sekundes, ne ilgiau.",
       do:"Konfeti ir fanfara paleidžiami patys. Jei nori dar — spausk mygtuką „🎉“ (arba pultas).",
       br:c.n<7?"„Meteoritas arčiau. Kitas įgūdis…“":"„O meteoritas vis dar skrieja…“"}};
    c._ch=ch; c._sk=sk;
  });

  /* skyrių kortelės PRIEŠ šias V6 skaidres */
  v7Insert("start",    V7.chapters[0]._ch, false);
  v7Insert("istorija", V7.chapters[1]._ch, false);
  v7Insert("vr",       V7.chapters[2]._ch, false);
  v7Insert("priesai",  V7.chapters[3]._ch, false);
  v7Insert("aura",     V7.chapters[4]._ch, false);
  v7Insert("brainmax", V7.chapters[5]._ch, false);
  v7Insert("vrzonos",  V7.chapters[6]._ch, false);

  /* įgūdžių kortelės PO šių V6 skaidrių */
  v7Insert("plan",        V7.chapters[0]._sk, true);
  v7Insert("isradejai",   V7.chapters[1]._sk, true);
  v7Insert("dino",        V7.chapters[2]._sk, true);
  v7Insert("brainrot",    V7.chapters[3]._sk, true);
  v7Insert("smegenys",    V7.chapters[4]._sk, true);
  v7Insert("cempionatas", V7.chapters[5]._sk, true);

  /* DRAUGAS AR SPĄSTAI — draugystės taisyklė PRIEŠ slot mašiną
     (įterpiama po P6 skyriaus kortelės, prieš V6 „brainmax“ skaidrę) */
  v7Insert("brainmax", {
    ey:"DRAUGAS AR SPĄSTAI", tag:"draugai", sec:50, cls:"center", chap:6, story:1,
    html:"<div class='v7wrap'><h1>Kas yra <span class='rword'>draugas</span>?</h1>"+
      "<p class='v7beat'>Draugas — tas, su kuriuo turi tą patį pomėgį. Neuronas MĖGSTA mokytis. Mes irgi. Todėl susidraugavom.</p>"+
      "<p class='v7beat'>Su technologija draugaujam taip pat: sužinom, kas ji yra ir kaip veikia. Pažinai — tapo draugu. Nepažinai — tapo šeimininku.</p>"+
      "<div class='v7two'>"+
      "<div class='v7fr ok'><div class='emo'>🤝</div><h3>DRAUGAS</h3>"+
        "<p>Po jo tavo gyvenimas geresnis.</p><p>Nori mokytis ir statyti.</p><p>Norisi siekti žvaigždžių.</p>"+
        "<p class='v7ex'>AI · robotai · VR treniruotės · būrelis · knyga · sportas</p></div>"+
      "<div class='v7fr no'><div class='emo'>🚫</div><h3>NE DRAUGAS</h3>"+
        "<p>„Dovana“, kuri kažką iš tavęs PAIMA.</p><p>Verčia lošti ar suktis ratu.</p><p>Po jo norisi tik „dar kartą“.</p>"+
        "<p class='v7ex'>loot box'ai · nubraukiami bilietai · lošimo mechanikos</p></div></div>"+
      "<p class='v7rule'>🎁 DOVANA ar 🪝 MASALAS? Biblioteka, mokyklos būrelis, internetas — tikros dovanos. Masalas — kai klausi „ką jie iš manęs PAIMA?“ ir atsakymas: laiką, miegą, pinigus, draugus.</p>"+
      "<p class='v7beat'><b>Neuronas:</b> „Klausk manęs ir bet kurios programėlės tą patį: KAM tu padaryta?“</p></div>",
    voice:"Kas yra draugas? Tas, su kuriuo turi tą patį pomėgį. Neuronas mėgsta mokytis — mes irgi. Su technologija draugaujam taip pat: pažįstam, kas ji yra ir kaip veikia. O dovana ar masalas? Klausk: ką jie iš manęs paima? Jei laiką, miegą, pinigus ar draugus — tai ne draugas. Jis nori tavo miego, sveikatos ir draugų.",
    notes:{say:"Du klausimai salei, po 10 sek: (1) „Iš ko atpažįstat tikrą draugą?“ (2) „Dovana ar masalas: biblioteka? loot box'as? Iš ko atskiriat?“ Pasakyk aiškiai: nemokama NĖRA blogai — internetas buvo dovana (Berners-Lee, P2). Masalas = tas, kuris ką nors PAIMA.",
     do:"Balsavimas rankomis: DRAUGAS ar NE DRAUGAS — pasakyk 3 pavyzdžius (būrelis · loot box'as · knyga). Tada iškart eik prie automato: „o dabar parodysiu, kaip veikia NE draugas.“",
     br:"„Štai jums Omikrono „treniruotė“ — automatas.“"}
  }, false);

  /* OMIKRONO SPĄSTAI — iškart po slot mašinos */
  v7Insert("brainmax", {
    ey:"OMIKRONO SPĄSTAI", tag:"spastai", sec:70, cls:"center", chap:6, story:1,
    html:"<div class='v7wrap'><h1>🧠 Kaip tai <span class='rword'>hack'ina</span> smegenis?</h1>"+
      "<p class='v7beat'>Automatas, nubraukiamas bilietas, loot box'as žaidime — tas pats variklis. Omikronas jo nesugalvojo. Jis tik jį nusipirko.</p>"+
      "<div class='v7steps'>"+
      "<div class='v7step'><span class='v7sn'>1</span><h3>PAJUSK</h3><p>„noriu dar kartą“ — tai jausmas, ne sprendimas</p></div>"+
      "<div class='v7step'><span class='v7sn'>2</span><h3>SUSTOK</h3><p>viena sekundė. Ranka nuo svirties</p></div>"+
      "<div class='v7step'><span class='v7sn'>3</span><h3>ĮVARDINK TRIUKĄ</h3><p>kuris iš keturių dabar veikia?</p></div>"+
      "<div class='v7step'><span class='v7sn'>4</span><h3>PAVERSK</h3><p>tą patį norą nukreipk į tikrą treniruotę</p></div></div>"+
      "<div class='cards' style='max-width:1050px'>"+
      "<div class='card' onclick='this.classList.toggle(\"open\")'><div class='emo'>🎲</div><h3>Kintamas atlygis</h3><p class='fix'>Nežinai, KADA laimėsi — todėl bandai vėl. Tas pats triukas, kaip begaliniame srauto slinkime.</p></div>"+
      "<div class='card' onclick='this.classList.toggle(\"open\")'><div class='emo'>😮</div><h3>Beveik-laimėjimas</h3><p class='fix'>Du iš trijų. Smegenys tai skaito kaip „vos vos“ — nors tai buvo pralaimėjimas.</p></div>"+
      "<div class='card' onclick='this.classList.toggle(\"open\")'><div class='emo'>😰</div><h3>Praradimo baimė</h3><p class='fix'>„Prarasi seriją / prarasi progą.“ Prarasti skauda labiau, nei gauti džiugina.</p></div>"+
      "<div class='card' onclick='this.classList.toggle(\"open\")'><div class='emo'>⏳</div><h3>FOMO</h3><p class='fix'>„Tik šiandien, tik dabar.“ Skuba išjungia mąstymą — būtent tam ji ir įjungta.</p></div></div>"+
      "<p class='v7beat'><b>Neuronas:</b> „Ir mane galima pastatyti taip, kad tave laikyčiau prie ekrano. Todėl klausk visada: KAM tu padaryta?“</p>"+
      "<p class='v7btns'><button class='btn btn-red' onclick='v7Trap(\"slot\")'>🎰 SLOT</button>"+
      "<button class='btn btn-ghost' onclick='v7Trap(\"scratch\")'>🎫 BILIETAS</button>"+
      "<button class='btn btn-ghost' onclick='v7Trap(\"loot\")'>🎁 LOOT / PRIZAS</button></p></div>",
    voice:"Automatas, nubraukiamas bilietas, loot box'as žaidime — tas pats variklis. Ką daryti? Pajusk. Sustok. Įvardink triuką: kintamas atlygis, beveik-laimėjimas, praradimo baimė, arba fomo. Ir paversk tą patį norą tikra treniruote.",
    notes:{say:"⚠️ ŠITA SKAIDRĖ NIEKO NEPARDUODA. Ji apsaugo. Pasakyk atvirai: „aš jums ką tik parodžiau automatą — dabar parodysiu, kaip jis veikia.“ Keturis triukus vardink kaip priešų sąrašą, ne kaip paskaitą.",
     do:"Klausk salės: kur dar jūs tai matėt? (loot box'ai, serijos/streak'ai, „tik šiandien“ pasiūlymai). Priimk 2–3 atsakymus, ne daugiau. Trys mygtukai atidaro V6.14 dekoderį (🎰 slot · 🎫 bilietas · 🎁 loot) — BILIETĄ atidaryk dar kartą, kai čempionate savanoris braukia loterijos bilietą.",
     br:"„Dabar — TIKRA treniruotė. Testas ir čempionatas.“"}
  }, true);

  /* P7 įgūdis + CLIFFHANGERIS — po finalinio boso, prieš MŪSŲ ŽODĮ */
  v7Insert("bosas", {
    ey:"7 / 7 · TĘSINYS", tag:"cliff", sec:55, cls:"center", chap:7, story:1, unlock:7,
    html:"<div class='v7wrap v7skill'>"+
      "<p class='v7num'>ĮGŪDIS ATRAKINTAS · 7 / 7</p>"+
      "<div class='v7bigic'>🥽</div><h1>ERDVĖ</h1>"+
      "<div class='v7pips' id='v7pips7'></div>"+
      "<p class='v7beat'>Septyni įgūdžiai — turim. O meteoritas? <b>Vis dar skrieja. ☄️ 3 dienos.</b></p>"+
      "<p class='v7beat'>Neuronas: „Treniruotę PASISTATYTI jau mokat. Bet pirma tikra treniruotė vyksta ne čia — su akiniais ant galvos.“</p>"+
      "<div class='v7cont'><p class='v7num'>TĘSINYS · BRAIN CLUB</p>"+
      "<div class='v7clist'>"+
      "<div><span>🥽</span><p>Pirma tikra brain max treniruotė VR</p></div>"+
      "<div><span>🤖</span><p>Neurono treniravimas — savaitė po savaitės</p></div>"+
      "<div><span>🧠</span><p>Statai savo treniruotę, o ne žaidi svetimą</p></div>"+
      "<div><span>🏆</span><p>Tikras čempionatas, ne viena diena</p></div></div></div>"+
      "<p class='closeq'>Meteoritas dar neįveiktas. <span>Treniruotė — ne ekrane.</span></p></div>",
    voice:"Septyni įgūdžiai — turim. O meteoritas vis dar skrieja: trys dienos. Neuronas sako: jūs jau mokate pasistatyti treniruotę. Bet pirma tikra treniruotė vyksta ne čia — su akiniais ant galvos, Brain Club'e. Meteoritas dar neįveiktas.",
    notes:{say:"CLIFFHANGERIS. Perskaityk lėtai ir SUSTOK po „vis dar skrieja“. Tada tyla 3 sekundes. Tada: „įgūdžius turit. Treniruotės dar nepastatėt — jos pirma diena ne čia.“ Nepažadėk daugiau, nei duosi.",
     do:"Perskaityk galutinę salės AURĄ garsiai: „šiandien užauginot X brain max.“ Tada rodyklė → MŪSŲ ŽODIS.",
     br:"„Ir dabar — keturi sakiniai, kuriuos pasakom garsiai. Visi kartu.“"}
  }, true);

  /* MŪSŲ ŽODIS — pagrindinė žinutė, salė sako BALSU, prieš kvietimo skaidrę */
  v7Insert("finalas", {
    ey:"MŪSŲ ŽODIS", tag:"manifestas", sec:60, cls:"center", chap:7, story:1,
    html:"<div class='v7wrap'>"+
      "<h1>Visi kartu, <span class='rword'>garsiai</span></h1>"+
      "<div class='v7man'>"+
      "<div class='v7line'><span>1</span><b>MOKYKIS MOKYTIS</b></div>"+
      "<div class='v7line'><span>2</span><b>MOKYKIS KARTU SU DRAUGAIS</b></div>"+
      "<div class='v7line'><span>3</span><b>GERBK SAVO MOKYTOJUS</b></div>"+
      "<div class='v7line'><span>4</span><b>NEPAMIRŠK LINKSMINTIS</b></div></div>"+
      "<p class='v7rule'>Štai taip nugalimas brain rot. Ir štai taip statoma brain max treniruotė. ☄️</p></div>",
    voice:"Visi kartu, garsiai. Mokykis mokytis. Mokykis kartu su draugais. Gerbk savo mokytojus. Nepamiršk linksmintis.",
    notes:{say:"TU sakai eilutę — SALĖ kartoja. Keturis kartus. Tada: „o dabar visi keturi iš karto, po trijų. Trys — du — vienas!“ Ir salė rėkia visas keturias.",
     do:"Atsistok arčiau salės, ranka rodyk eilutę ekrane. Mokytojams linktelėk per 3-ią eilutę — tai jų momentas. Po ketvirtos — plojimai + 🎉 (aura +300).",
     br:"„O kaip smegenis treniruosi TU? Štai kvietimas…“"}
  }, false);

  /* skyriaus numeris kiekvienai skaidrei (V6 skaidrėms taip pat) */
  (function(){
    var c=1,i;
    for(i=0;i<SL.length;i++){
      if(SL[i].chap && SL[i].story && SL[i].tag && SL[i].tag.charAt(0)==="p" && SL[i].tag.length===2) c=SL[i].chap;
      if(!SL[i].chap) SL[i].chap=c;
    }
  })();
})();

/* ---------- prisijungiam prie variklio ---------- */
var _v7show=show;
show=function(i){
  _v7show(i);
  var s=SL[cur];
  if(s&&s.chap) V7.lvl=s.chap;
  v7Hud();
  if(s&&s.chap) v7Gate(s.chap);
  var p=document.getElementById("v7pips"+(s&&s.unlock)); if(p)p.innerHTML=v7Pips();
  if(s&&s.unlock) setTimeout(function(){ v7Celebrate(s.unlock) },260);
};
var _v7aura=aura;
aura=function(d,r){ var v=_v7aura(d,r); try{ v7GateRefresh() }catch(e){} return v };

/* Klavišas U — vedėjas atrakina dabartinio skyriaus vartus.
   (H · C · R · M · T · F · A · S · +/− lieka V6 rankose.) */
document.addEventListener("keydown",function(e){
  if(e.target.tagName==="INPUT"||e.target.tagName==="SELECT")return;
  if(e.key==="u"||e.key==="U"){ var s=SL[cur]; if(s&&s.chap) v7Force(s.chap); }
});
