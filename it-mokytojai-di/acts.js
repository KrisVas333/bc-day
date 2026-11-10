/* acts.js · salės klausimai (vienas tiesos šaltinis): kraunami index.html (deck'as siunčia telefonams) IR join.html
   (atsarginis režimas: jei telefonas negauna ekrano būsenos, pvz. Zoom'e per daug žmonių, jis rodo šiuos klausimus pats
   ir atsakymus siunčia per REST). Keičiant klausimą, keisti tik čia. Act id „lygis" ir „next" reikalingi varikliui. */
var NS='itdi';
var PROMPT_L1='Esu [N] kl. informatikos mokytoja(-as). BUP siekinys: [ĮKLIJUOKITE iš emokykla.lt arba parašykite temą ir klasę savais žodžiais].\nSukurk 20 min. praktinę užduotį poroms. Pateik: tikslą vaiko kalba, 4 žingsnius, ką mokinys parodo pabaigoje, 3 sėkmės kriterijus. Pažymėk, ką turiu patikrinti.';
var OUTC=['① Vienu sakiniu paaiškinti, kas yra DI, LLM ir agentas','② Šią savaitę padaryti vieną darbą su DI savo pamokai ir jį patikrinti','③ Įvertinti riziką ir kainą: ką galima įkelti, kiek kainuoja'];
var OUTC_SHORT=['DI, LLM, agentas','Vienas darbas su DI','Rizika ir kaina'];
function outcParts(){return OUTC.map(function(t,i){return {k:'o'+(i+1),type:'scale',n:5,q:t+'. Ar galite tai dabar? (1 = dar ne, 5 = lengvai)'};});}
var FQ='Tarkime, DI sugeneravo 5 teiginius 7 kl. informatikos testui\n1. 1 baitas = 8 bitai.\n2. Dvejetainis skaičius 1010 dešimtainėje sistemoje yra 10.\n3. „https" adreso pradžioje reiškia, kad ryšys tarp naršyklės ir svetainės šifruojamas.\n4. RAM atmintis išsaugo duomenis ir išjungus kompiuterį.\n5. Python kalboje print("Labas") ekrane parodo žodį Labas.';
var ACTS={
 kas:{title:'Kas šiandien Zoom\'e?',parts:[
  {k:'d',type:'multi',max:3,q:'Ką dėstote? (iki 3)',opts:['Informatika, IT','Matematika','Gamtos m., STEAM','Pradinis ugdymas','Kitas dalykas']},
  {k:'kl',type:'multi',max:3,q:'Kokioms klasėms? (iki 3)',opts:['Darželis, priešmokyklinė','1-2 kl.','3-4 kl.','5-6 kl.','7-8 kl.','9-10 kl. (I-II g.)','11-12 kl. (III-IV g.)']},
  {k:'dinfo',type:'info',q:'DI raštingumo pulsas (1 min.)',text:'Anonimiška. Renkame suvestinę apie Lietuvos mokytojų DI raštingumą. Jokių vardų.'},
  {k:'st',type:'choice',q:'① Kiek laiko naudojate DI?',opts:['Dar nenaudoju','< 3 mėn.','3-12 mėn.','1-2 m.','> 2 m.']},
  {k:'ir',type:'multi',max:11,q:'② Kuriuos DI naudojate? (galima kelis)',opts:['ChatGPT','Google Gemini','Microsoft Copilot','Claude','DeepSeek','Perplexity','Grok','Manus','Meta AI','Kita','Jokio']},
  {k:'dz',type:'choice',q:'③ Kaip dažnai?',opts:['Niekada','Kartą per mėn.','Kas savaitę','Kasdien']},
  {k:'pa',type:'multi',max:7,q:'④ Kam naudojate? (galima kelis)',opts:['Pamokų planams','Testams, užduotims','Vertinimui, grįžtamajam ryšiui','Tekstams, laiškams','Asmeniniam mokymuisi','Mokinių darbui klasėje','Nenaudoju']},
  {k:'sv',type:'scale',n:5,q:'⑤ Savo DI žinias vertinu (1 = mažai, 5 = labai gerai)'},
  {k:'ts',type:'choice',q:'⑥ Ar mokykla turi DI naudojimo taisykles?',opts:['Taip','Ne','Nežinau']}]},
 tikslai:{title:'Ko išmoksite',parts:outcParts()},
 quiz1:{title:'Spėkite',quiz:true,parts:[
  {k:'a',type:'choice',q:'Kai klausiate ChatGPT ar Gemini, jis…',opts:['A · Ieško atsakymo internete, kaip Google','B · Spėja tikėtiniausią tęsinį pagal išmoktus pavyzdžius','C · Supranta klausimą kaip žmogus','D · Visada nurodo patikimus šaltinius']}]},
 lygis:{title:'Jūsų lygis',parts:[
  {k:'l',type:'choice',q:'Kuriame laiptelyje esate šiandien?',opts:['L1 · Pradedu: viena užklausa, 5 min.','L2 · Kuriu: testai, žaidimai, simuliacijos','L3 · Automatizuoju: agentai, antrosios smegenys']}]},
 klaida:{title:'Rask DI klaidą',quiz:true,parts:[
  {k:'fq',type:'info',q:'Tarkime, DI sugeneravo 5 teiginius testui. Viename yra faktinė klaida.',text:FQ},
  {k:'kl',type:'choice',q:'Kuriame teiginyje klaida?',opts:['1 teiginys','2 teiginys','3 teiginys','4 teiginys','5 teiginys'],sendNow:true,
   okMsg:'✅ Radote! RAM yra laikina atmintis: išjungus kompiuterį duomenys dingsta. Tikrinti yra svarbiausias įgūdis.',
   badMsg:'Klaida 4 teiginyje: RAM yra laikina atmintis, išjungus kompiuterį duomenys dingsta (išlieka diske). Klaidą įdėjome patys: DI tokias rašo užtikrintai.'}]},
 recall:{title:'Prisiminkite',quiz:true,parts:[
  {k:'a',type:'choice',q:'Kodėl DI kartais užtikrintai sako netiesą?',opts:['A · Jis tyčia meluoja','B · Jis spėja tikėtiniausius žodžius ir pats faktų netikrina','C · Internete per mažai informacijos','D · Taip būna tik nemokamoje versijoje']}]},
 next:{title:'Jūsų kitas žingsnis',next:true,parts:[
  {k:'u',type:'scale',n:5,q:'Kiek naudinga buvo ši paskaita? (1-5)'},
  {k:'p',type:'choice',q:'Ką išbandysite šią savaitę?',opts:['L1 · Užduotis iš BUP siekinio','L1 · Ta pati užduotis 3 lygiais','L1 · Grįžtamasis ryšys pagal rubriką','L2 · Interaktyvus testas ar žaidimas','L2 · Simuliacija','L3 · Agentas: susitikimas → užduotys']}].concat(outcParts()).concat([
  {k:'dirb',type:'choice',q:'Ar norėtumėte praktinių dirbtuvių „Susikurkite savo antrąsias smegenis"?',opts:['Taip, norėčiau','Gal','Ne']},
  {k:'f',type:'text',q:'Vienas klausimas ar pastaba (anonimiškai, be vardų)',ph:'Neprivaloma'}])}
};
var ACT_ORDER=['kas','tikslai','quiz1','lygis','klaida','recall','next'];
var PULSE=['✅ Supratau','❓ Nesupratau','🧗 Per sunku','🚀 Per lengva'];
/* Užklausų bankas: [lygis, pavadinimas, užklausa]. Naudoja join.html (telefonas) ir medziaga.html (mokytojo puslapis). */
var BANK=[
 ['l1','Užduotis iš BUP siekinio',PROMPT_L1],
 ['l1','Ta pati užduotis 3 lygiais','Esu [N] kl. informatikos mokytoja(-as). Tema: [pvz. ciklai Python kalboje].\nSukurk tą pačią praktinę užduotį 3 lygiais: A su pavyzdžiu ir užuominomis, B standartinė, C su išplėtimu greitesniems. Prie kiekvienos: dažniausia mokinio klaida ir kaip ją pastebėti. Atsakymus pateik atskirai.'],
 ['l1','Grįžtamasis ryšys pagal rubriką','Rubrika: [ĮKLIJUOKITE kriterijus].\nMokinio darbas be vardo ir be asmens duomenų: [ĮKLIJUOKITE].\nParašyk grįžtamąjį ryšį mokiniui: 2 stiprybės ir 1 kitas žingsnis, kiekvienas susietas su rubrikos kriterijumi. Pažymio nerašyk, jį dedu aš. Kalba paprasta ir draugiška.'],
 ['l1','„Rask DI klaidą" pamokai','Parašyk 6 teiginius [N] kl. informatikos pamokai tema [TEMA] su lygiai 2 sąmoningomis faktinėmis klaidomis. Atskirai, po linija, nurodyk klaidas ir teisingus faktus. Klaidos turi būti tikroviškos, ne absurdiškos.'],
 ['l1','Pamokos planas (45 min.)','Esu [N] kl. informatikos mokytoja(-as). BUP siekinys: [ĮKLIJUOKITE arba tema ir klasė savais žodžiais].\nSukurk 45 min. pamokos planą: įžanga (5 min.), naujas dalykas (10 min.), praktika poromis prie kompiuterių (20 min.), išėjimo bilietas (10 min.). Prie kiekvienos dalies: ką daro mokytojas, ką daro mokiniai. Vienas pritaikymas mokiniams, kuriems sunkiau. Pažymėk, ką turiu patikrinti.'],
 ['l1','Sokrato treneris (rodykite ekrane)','Esu [N] kl. mokinys. Tema: [pvz. sąlygos sakinys if Python kalboje]. Neduok atsakymo ir kodo. Užduok man po 1 klausimą, palauk atsakymo, pasakyk, ką supratau teisingai, ir paklausk kito. Kalbėk paprastai.'],
 ['l2','Interaktyvus testas ar žaidimas','Sukurk vieno HTML failo interaktyvų 8 klausimų testą tema [TEMA], [N] kl. Po neteisingo atsakymo rodyk užuominą, ne atsakymą. Pabaigoje parodyk, kurias temas kartoti. Viskas naršyklėje: jokių vardų, prisijungimų ar duomenų saugojimo. Kalba lietuvių, paprasta. Pateik visą kodą viename faile.'],
 ['l2','Simuliacija: sukčių žinutės','Sukurk vieno HTML failo simuliaciją [N] kl.: 6 telefono žinutės, 2 iš jų sukčių. Mokinys paspaudžia įtartinas vietas (skubinimas, keistas adresas, per geras pasiūlymas). Po pasirinkimo parodyk paaiškinimą. Naudok tik sugalvotus vardus ir adresus su .example. Jokių duomenų saugojimo.'],
 ['l2','Mokyklos DI taisyklių juodraštis','Esu informatikos mokytoja(-as). Parašyk 1 puslapio mokyklos DI naudojimo taisyklių juodraštį mokytojams ir mokiniams: kada galima, kada ne, ką daryti su vaikų duomenimis (vardai, pažymiai, nuotraukos niekada), kaip pažymėti DI pagalbą darbe. Pažymėk vietas, kurias turi patvirtinti direktorius. Nekurk teisės aktų pavadinimų ir numerių.'],
 ['l3','Agentas: susitikimas → užduotys','Čia susitikimo stenograma (visi dalyviai sutiko įrašyti, mokinių duomenų nėra): [ĮKLIJUOKITE].\nIštrauk: 1) sprendimai, 2) užduotys lentele (kas · ką · iki kada), 3) atviri klausimai, 4) trumpas laiško dalyviams juodraštis. Nieko nepridėk, ko nebuvo stenogramoje. Neaiškias vietas pažymėk klaustuku.'],
 ['l3','Antrosios smegenys: pirmas aplankas','Padėk man susikurti „antrųjų smegenų" aplanką iš paprastų tekstinių failų (Markdown). Esu [N] kl. informatikos mokytoja(-as). Pasiūlyk 5 failus (pvz. pamokos, idėjos, susitikimai, užduotys, ko išmokau), kiekvienam 3 eilučių šabloną. Vaikų vardų ir duomenų ten nebus. Tada paaiškink, kaip kas savaitę per 10 min. jį atnaujinti.']
];
var NEXT={
 l1:['L1 · Pradedu','Šią savaitę: laikmatis 10 min. → viena užklausa (užduotis iš BUP siekinio) → išspręskite ir patikrinkite patys → panaudokite pamokoje → užsirašykite, kas suveikė.',0],
 l2:['L2 · Kuriu','Šią savaitę: vienas interaktyvus testas ar simuliacija vienu HTML failu. Išbandykite patys, tada parodykite klasei ekrane. Jokių vardų ir duomenų saugojimo.',6],
 l3:['L3 · Automatizuoju','Šią savaitę: vienas aplankas „antrosios smegenys" ir vienas susitikimas → užduotys. Agentui atidarykite tik tą aplanką, mokinių duomenų ten nėra. Laikmatis 10 min. per dieną.',9]
};
if(typeof window!=='undefined'){window.ACTS=ACTS;window.NS=NS;window.BANK=BANK;window.NEXT=NEXT;}
