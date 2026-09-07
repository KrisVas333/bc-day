
/* ===================================================================
   V7 · ISTORIJOS SLUOKSNIS  (Brain City · Kibirkštis · Omikronas)
   -------------------------------------------------------------------
   Kas čia yra:
     · 7 dalys (P1–P7). Kiekviena = viena skyriaus kortelė + viena
       „ĮGŪDIS ATRAKINTAS" kortelė. Tarp jų — VISOS V6 mechanikos,
       perrėmintos kaip istorijos išbandymai.
     · MISIJOS HUD viršuje (lygis n/7 · misija · herojaus avataras).
     · VARTAI: kiekvienas skyrius nori tam tikros salės AUROS.
       ⚠️ Vartai NIEKADA neblokuoja navigacijos — rodyklės visada veikia.
       Vedėjas turi du mygtukus: „SALĖ PADEDA (+300)" ir „ATRAKINTI" (U).
     · OMIKRONO SPĄSTAI: istorijos skaidrė, kuri paleidžia V6.14 dekoderį
       (pajusk → sustok → įvardink triuką → paversk). Mechanika NEDUBLIUOJAMA.
     · GARSAI: V6.14 SFXBOARD/board.json lieka kaip buvo; v7/ tik prisideda
       „../“ prie kelių (patch-v7.py 3 žingsnis).
     · Vienintelis naujas klavišas: U (atrakinti dabartinius vartus).
   V6 nieko nepašalinta. Viskas čia — priedas.
   =================================================================== */

var V7 = {
  hero:"KIBIRKŠTIS",
  lvl:1, skills:{}, forced:{}, celebrated:{}, opened:{},
  heroImg:"",            /* drop-in: įrašyk failą į assets/img/ ir čia jo vardą, pvz. "hero.png" */
  chapters:[
    {n:1, tag:"p1", ey:"P1 · PRABUDIMAS", title:"Prabudimas",
     mission:"Sužinok, kas tu esi", need:0,
     beats:[
      "Tu atsimerki Brain City — mieste, pastatytame iš minčių. Šviesos gęsta. Neprisimeni nieko: nei vardo, nei kodėl čia esi.",
      "Prieina Neuronas Riteris: „Tavo kodinis vardas — Kibirkštis. Miestą siurbia Omikronas. Tau reikia septynių įgūdžių. Pradedam nuo įrenginio.“"],
     skill:{ic:"🧠", name:"ĮRENGINYS", line:"Žinai, koks įrenginys bus su tavimi visą gyvenimą.",
            beat:"Neuronas: „Pirmas įgūdis nėra mygtukas. Tai žinojimas, ką turi galvoje.“"},
     say:"ATIDARYMAS KAIP FILME. Tyliau, lėčiau, tamsiau. Perskaityk pirmą pastraipą kaip pasaką, tada garsiai: „šiandien Kibirkštis — TU. Visa salė.“",
     do:"Rankos: kas nori būti Kibirkštis? (visi). Pasakyk, kad salės AURA = miesto šviesa — ji matoma viršuje visą dieną.",
     br:"„Ir pirmas Neurono klausimas — apie įrenginį…“"},

    {n:2, tag:"p2", ey:"P2 · MIESTO ATMINTIS", title:"Miesto atmintis",
     mission:"Atgauk miesto atmintį", need:150,
     beats:[
      "Omikronas išėdė miesto atmintį. Kibirkštis nežino, iš kur žmonės gavo galią — nei kaip jie ją perdavė toliau.",
      "Neuronas: „Suk ratą. Kiekvienas sustojimas — vienas prisiminimas, kurį miestas atgauna.“"],
     skill:{ic:"🔗", name:"GRANDINĖ", line:"Supranti: nieko didelio nepadarė VIENAS žmogus.",
            beat:"AItor iš tolo: „Grandinė atkurta. Ugnis → ratas → raštas → elektra → internetas → aš.“"},
     say:"„Miestas nieko neprisimena — todėl SUKAM RATĄ.“ Kiekvieną sustojimą pavadink kaip prisiminimą, ne kaip faktą.",
     do:"Ratą suka vaikas. Ties Mėnuliu stabtelk. Po išradėjų — pasakyk: „grandinė atkurta“ ir eik prie įgūdžio kortelės.",
     br:"„Miestas prisiminė. Bet Kibirkštis vis dar vienas…“"},

    {n:3, tag:"p3", ey:"P3 · SĄJUNGININKAS", title:"Sąjungininkas",
     mission:"Rask tą, kuris mąsto kitaip", need:400,
     beats:[
      "Vienam neužtenka. Miesto pakraštyje sėdi AItor — dirbtinis protas. Jis mąsto ne kaip žmogus: greitai, plačiai, kartais visai pro šalį.",
      "Neuronas įspėja: „Duok jam TIKSLĄ — ne įsakymą. Ir visada patikrink atsakymą. Sąjungininkas nėra tas pats, kas šeimininkas.“"],
     skill:{ic:"🤖", name:"SĄJUNGININKAS", line:"Moki duoti AI tikslą — ir patikrinti, ar jis neapsiriko.",
            beat:"AItor: „Aš perskaičiau beveik viską. Bet tik tu žinai, ko iš tikrųjų nori.“"},
     say:"Čia įvedi AItorą kaip PERSONAŽĄ, ne kaip technologiją. „Jis protingas — bet klysta. Todėl mums reikia tavęs.“",
     do:"Skanduotė: LLM = klausia-atsako · AGENTAS = veikia pats. Po meteoro balsavimo — įgūdžio kortelė.",
     br:"„Turim sąjungininką. Dabar — kas vagia miesto šviesą?“"},

    {n:4, tag:"p4", ey:"P4 · KAS VAGIA ŠVIESĄ", title:"Kas vagia šviesą",
     mission:"Įvardink Omikrono vagis", need:800,
     beats:[
      "AItor nuskenuoja miestą: šviesą vagia penki. Ir vienas bosas, kuris slepiasi ekrane.",
      "Neuronas: „Vagies, kurio nemoki įvardinti, nesustabdysi. Įvardink garsiai — ir jis praranda galią.“"],
     skill:{ic:"🛡️", name:"SKYDAS", line:"Moki įvardinti visus 5 vagis ir bosą — todėl jie tavęs nebeapgauna.",
            beat:"Neuronas: „Skydas nėra šarvai. Skydas — tai vardas, kurį pasakei garsiai.“"},
     say:"Skaičiai tvirtai, be pamokslo. Vagis vardink kaip priešus žaidime, ne kaip taisykles iš mokytojų kambario.",
     do:"Kamera (jei naudoji) — su įspėjimu. Po brain rot skaidrės iškart — SKYDO kortelė.",
     br:"„Skydas laiko. Bet miestui reikia SROVĖS…“"},

    {n:5, tag:"p5", ey:"P5 · SROVĖ", title:"Srovė",
     mission:"Įjunk aurą į miesto tinklą", need:1400,
     beats:[
      "Skydas laiko, bet miestas vis tiek blausus. Šviesai reikia SROVĖS — o srovė gimsta tik iš judesio.",
      "AItor: „Aš tavęs nematau, kol nejudi. Pajudėk — ir aš įjungsiu tavo šviesą į miesto tinklą.“"],
     skill:{ic:"⚡", name:"SROVĖ", line:"Judesys ir kartojimas fiziškai keičia smegenis — tai įrodyta.",
            beat:"Neuronas: „Londono taksistų atminties centras UŽAUGO. Tavo — auga kiekvieną kartą, kai kartoji.“"},
     say:"Jų teritorija — aura farming. Leisk papasakoti tiems, kurie žino. Tada: „mūsų versija — kamera mato judesį.“",
     do:"AURA REŽIMAS: 2 savanoriai priekyje. Mokytojos pultas — QR ekrane. Po taksistų — SROVĖS kortelė.",
     br:"„Srovė teka. Dabar Omikronas mums parodys savo paskutinį triuką…“"},

    {n:6, tag:"p6", ey:"P6 · TRENIRUOTĖ", title:"Treniruotė",
     mission:"Įrodyk, kad tikrai gali", need:2200,
     beats:[
      "Omikronas nebekovoja. Jis pastato blizgantį automatą, kuris šnabžda: „dar kartą… dar vieną kartą…“",
      "Neuronas: „Tai ne treniruotė. Tikra treniruotė — miegas, judesys, mokymasis. Ir bandymai, kuriuos gali ir pralaimėti.“"],
     skill:{ic:"🎯", name:"TRENIRUOTĖ", line:"Atskiri tikrą treniruotę nuo spąstų — ir moki pralaimėti neišeidamas.",
            beat:"AItor: „Automatas duoda jausmą. Treniruotė duoda jungtis. Skirtumą matai tik tada, kai jį įvardini.“"},
     say:"Svirtis, spąstų dekodavimas, testas, čempionatas — visa tai VIENA misija: įrodyti, kad Kibirkštis moka treniruotis.",
     do:"Svirtį traukia vaikas (1-as trūkis suplanuotas beveik-laimėjimas). Po jo — SPĄSTŲ skaidrė. Tada testas ir čempionatas.",
     br:"„Šeši kvartalai šviečia. Liko vienas — ir jis ne ekrane.“"},

    {n:7, tag:"p7", ey:"P7 · STATYTOJAS", title:"Statytojas",
     mission:"Pastatyk pirmą kvartalą", need:3200,
     beats:[
      "Šeši kvartalai šviečia. Liko paskutinis įgūdis — ir jo neišmoksi žiūrėdamas į ekraną.",
      "AItor: „Uždėk akinius. Nuo šios akimirkos tu šitam mieste nebe žaidėjas. Tu — statytojas.“"],
     skill:{ic:"🥽", name:"ERDVĖ", line:"Išėjai iš ekrano į erdvę — ir pradėjai STATYTI, o ne vartoti.",
            beat:"Neuronas: „Statytojas — tai tas, kuris po žaidimo klausia: o kaip šitas veikia?“"},
     say:"Energija į viršų. „Paskutinis įgūdis nėra skaidrė — jis ant tavo galvos.“",
     do:"Zonas parodyk ranka. Laser Tag — MŪSŲ SUKURTAS, tai statytojų įrodymas.",
     br:"„Ir tada — tai, ko Omikronas nepaliko…“"}
  ]
};

/* ---------- garsų lenta ----------
   V6.14 jau turi SFXBOARD + sfxBoardApply() + SFXALIAS + nuotolinį {name}
   įvykį iš pulto. V7 to NEDUBLIUOJA — tik `sfxBoardApply` kelias gauna „../“
   (žr. build žingsnį patch-v7.py), nes v7/ yra viena pakopa giliau. */

/* ---------- skaidrių generatoriai ---------- */
function v7Hero(size){
  if(V7.heroImg) return "<img class='v7hero' src='../assets/img/"+V7.heroImg+"' alt='Kibirkštis'>";
  var s=size||44;
  return "<svg class='v7hero' viewBox='0 0 60 60' width='"+s+"' height='"+s+"' aria-hidden='true'>"+
   "<circle cx='30' cy='30' r='27' fill='#0A0A0A' stroke='#D90429' stroke-width='2.5'/>"+
   "<path d='M33 12 L21 32 h8 l-3 16 L41 27 h-8 z' fill='#D90429'/>"+
   "<circle cx='30' cy='30' r='27' fill='none' stroke='#FF6B6B' stroke-width='1' opacity='.45'/></svg>";
}
function v7Chapter(c){
  return "<div class='v7wrap'>"+
    "<p class='v7num'>DALIS "+c.n+" / 7</p>"+
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
      "<span class='v7small'>miesto šviesa: "+AURA.pts.toLocaleString("lt-LT")+" auros</span>";
    el.classList.add("open");
  }else{
    var pct=Math.max(0,Math.min(100,Math.round(AURA.pts/c.need*100)));
    el.classList.remove("open");
    el.innerHTML="<span class='v7lock'>🔒 VARTAI UŽRAKINTI</span>"+
      "<span class='v7small'>reikia <b>"+c.need+"</b> auros · turim <b>"+AURA.pts+"</b></span>"+
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

/* ---------- MISIJOS HUD ---------- */
function v7Hud(){
  var h=document.getElementById("v7hud"); if(!h)return;
  var c=V7.chapters[V7.lvl-1]; if(!c)return;
  h.innerHTML=v7Hero(38)+
    "<div class='v7txt'><span class='v7l'>LYGIS "+c.n+"/7 · "+V7.hero+"</span>"+
    "<span class='v7m'>"+c.mission+"</span></div>"+
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
       br:c.n<7?"„Kitas kvartalas laukia…“":"„Ir tada Omikronas paėmė vieną dalyką…“"}};
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
      "<p class='v7beat'><b>AItor:</b> „Aš irgi galiu būti pastatytas taip, kad tave laikyčiau. Klausk manęs, KAM aš padarytas — visada.“</p>"+
      "<p class='v7btns'><button class='btn btn-red' onclick='v7Trap(\"slot\")'>🎰 SLOT</button>"+
      "<button class='btn btn-ghost' onclick='v7Trap(\"scratch\")'>🎫 BILIETAS</button>"+
      "<button class='btn btn-ghost' onclick='v7Trap(\"loot\")'>🎁 LOOT / PRIZAS</button></p></div>",
    voice:"Automatas, nubraukiamas bilietas, loot box'as žaidime — tas pats variklis. Ką daryti? Pajusk. Sustok. Įvardink triuką: kintamas atlygis, beveik-laimėjimas, praradimo baimė, arba fomo. Ir paversk tą patį norą tikra treniruote.",
    notes:{say:"⚠️ ŠITA SKAIDRĖ NIEKO NEPARDUODA. Ji apsaugo. Pasakyk atvirai: „aš jums ką tik parodžiau automatą — ir dabar parodysiu, kaip jis veikia.“ Keturis triukus vardink kaip priešų sąrašą, ne kaip paskaitą.",
     do:"Klausk salės: kur dar jūs tai matėt? (loot box'ai, serijos/streak'ai, „tik šiandien“ pasiūlymai). Priimk 2–3 atsakymus, ne daugiau. Trys mygtukai atidaro V6.14 dekoderį (🎰 slot · 🎫 bilietas · 🎁 loot) — BILIETĄ atidaryk dar kartą, kai čempionate savanoris braukia loterijos bilietą.",
     br:"„Dabar — tikra treniruotė. Testas ir čempionatas.“"}
  }, true);

  /* P7 įgūdis + CLIFFHANGERIS — po finalinio boso, prieš kvietimo skaidrę */
  v7Insert("bosas", {
    ey:"7 / 7 · TĘSINYS", tag:"cliff", sec:55, cls:"center", chap:7, story:1, unlock:7,
    html:"<div class='v7wrap v7skill'>"+
      "<p class='v7num'>ĮGŪDIS ATRAKINTAS · 7 / 7</p>"+
      "<div class='v7bigic'>🥽</div><h1>ERDVĖ</h1>"+
      "<div class='v7pips' id='v7pips7'></div>"+
      "<p class='v7beat'>Septyni kvartalai šviečia. Omikronas nedingo — jis atsitraukė. Ir pasiėmė vieną dalyką: <b>tavo vardą.</b></p>"+
      "<p class='v7beat'>Kas buvo Kibirkštis PRIEŠ prabundant? Neuronas žino. Bet atsakymo šitoje salėje nėra.</p>"+
      "<div class='v7cont'><p class='v7num'>TĘSINYS · BRAIN CLUB</p>"+
      "<div class='v7clist'>"+
      "<div><span>🧠</span><p>Lygis 8+: kas Kibirkštis buvo iš tikrųjų</p></div>"+
      "<div><span>🤖</span><p>AItoro treniravimas — savaitė po savaitės</p></div>"+
      "<div><span>🥽</span><p>Savo Brain City kvartalo statyba VR</p></div>"+
      "<div><span>🏆</span><p>Tikras čempionatas, ne viena diena</p></div></div></div>"+
      "<p class='closeq'>Istorija sustoja čia. <span>Tęsinys — ne ekrane.</span></p></div>",
    voice:"Septyni kvartalai šviečia. Omikronas nedingo — jis atsitraukė. Ir pasiėmė vieną dalyką: tavo vardą. Kas Kibirkštis buvo prieš prabundant? Atsakymo šitoje salėje nėra. Istorija sustoja čia. Tęsinys — Brain Club'e.",
    notes:{say:"CLIFFHANGERIS. Perskaityk lėtai ir SUSTOK po „tavo vardą“. Tada tyla 3 sekundes. Tada: „Kas Kibirkštis buvo iš tikrųjų? Aš žinau. Bet čia to nepasakysiu.“ Nepažadėk daugiau, nei duosi — tęsinys tikrai yra Brain Club programoje.",
     do:"Perskaityk galutinę salės AURĄ garsiai: „šiandien miestui grąžinot X auros.“ Tada rodyklė → kvietimo skaidrė su QR.",
     br:"„O kaip smegenis treniruosi TU?“"}
  }, true);

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
