/* MENTOR: papildoma medžiaga mentoriams kiekvienai salės skaidrei. Raktas = data-label. f = faktai {t,s,g}, e = pavyzdžiai klasėje {t,d,p}. Šaltinių lygiai: A pakartota/RCT/meta · B vienas geras tyrimas ar oficialus dok. · C preprint, įmonės duomenys, žiniasklaida. Kur g tuščias, tai praktinis patarimas be šaltinio. */
var MENTOR={
 "Prisijunkite":{f:[
  {t:"Atsakymai keliauja tik į salės ekraną. Serveryje jie nesaugomi, vardų nereikia.",s:"Šio puslapio sąranga",g:""},
  {t:"Lietuvoje apie 70 % mokytojų jau naudoja DI. Salėje greičiausiai sėdi ir pradedantys, ir pažengę.",s:"LRT 2026-01-27",g:"B"},
  {t:"Pradėti užduotimi verta: kai žmogus pirmą minutę pats atsako, jis toliau klausosi aktyviau.",s:"",g:""},
  {t:"Jei kaimynas be telefono, dirbkite poroje. Vienas telefonas dviem visiškai tinka.",s:"",g:""}],
 e:[{t:"Bet kuri klasė",d:"Pamokos pradžioje vienas klausimas lentoje, vaikai atsako kortelėmis A/B/C/D. Tas pats principas kaip šis QR: pirmiausia klausimas, tada tema.",p:""},
  {t:"5 kl. bet kuris dalykas",d:"Išėjimo bilietas per Google Forms ar popieriuje: 1 klausimas, be vardų. Kitą rytą pradedate nuo dažniausios klaidos.",p:"Esu 5 kl. [DALYKO] mokytoja. Tema: [TEMA]. Sukurk 3 išėjimo bilieto klausimus: 1 prisiminti, 1 pritaikyti, 1 paaiškinti savais žodžiais. Prie kiekvieno trumpas teisingas atsakymas ir dažniausia klaida."}]},

 "Kas jūs?":{f:[
  {t:"Atsakymai be vardų. Ekrane matosi tik suma, todėl sąžiningai atsakyti saugu.",s:"Šio puslapio sąranga",g:""},
  {t:"Mokytojų mokymai veikia geriau, kai prisiriša prie konkretaus dalyko turinio. Todėl klausiame, ką dėstote.",s:"Desimone 2009; Darling-Hammond ir kt. 2017",g:"A"},
  {t:"Iki 13 m. vaikams DI įrankį valdo mokytojas. Pradinių klasių mokytojams tai svarbiausia šios dienos taisyklė.",s:"Įrankių sąlygos; Kinijos gairės 2025",g:"B"},
  {t:"Skirtingiems dalykams tinka ta pati užklausos formulė: kas aš, siekinys, koks rezultatas.",s:"",g:""}],
 e:[{t:"Mentoriui praktikoje",d:"Pažiūrėkite didžiausią stulpelį. Praktikoje pirmiausia eikite pas tų dalykų mokytojus, kurie salėje mažumoje: jiems pavyzdžių bus mažiausiai.",p:""},
  {t:"Pradinis ugdymas",d:"Klasės mokytoja gali naudoti tą pačią užklausą visiems dalykams: pakeičia tik siekinį ir temą.",p:"Esu [N] kl. mokytoja. Siekinys iš BUP: [ĮKLIJUOTI arba tema savais žodžiais]. Sukurk 5 klausimų testą: 2 lengvi, 2 vidutiniai, 1 sunkus. Prie kiekvieno teisingas atsakymas ir dažniausia vaikų klaida."}]},

 "Ko tikitės?":{f:[
  {t:"Dažniausias mokytojų lūkestis yra laikas. Anglijos tyrime ChatGPT su gairėmis sutrumpino pamokų planavimą 31 %.",s:"EEF/NFER 2024, 259 mokytojai",g:"A"},
  {t:"Tame tyrime planų kokybė nenukrito. Ją vertino ekspertai, nežinodami, kuris planas su DI.",s:"EEF/NFER 2024",g:"B"},
  {t:"Svarbu: EEF matavo mokytojo laiką ir medžiagą. Mokinių rezultatų tas tyrimas nematavo.",s:"EEF/NFER 2024",g:"B"},
  {t:"Jei salėje skamba „sukčiavimas“, atsakymas bus 13 skaidrėje: šviesoforas užduotims.",s:"",g:""}],
 e:[{t:"Lietuvių k. 6 kl.",d:"Klasės „lūkesčių debesis“ naujo skyriaus pradžioje: vaikai rašo 1–3 žodžius, ką jau žino. Pabaigoje grįžtate prie to paties debesies.",p:""},
  {t:"Mokytojui sau",d:"Užsirašykite vieną savo lūkestį. Pabaigoje patikrinkite, ar jis išsipildė, ir pasakykite Kris'ui atvirai.",p:""}]},

 "Ko išmoksite":{f:[
  {t:"Tie patys 3 klausimai bus užduoti pabaigoje. Taip matome pokytį salėje, ne tik nuotaiką.",s:"Mokymų matavimo planas",g:""},
  {t:"Savęs įvertinimas 1–5 yra subjektyvus. Jis rodo pasitikėjimą, ne įgūdį. Įgūdį parodys jūsų testas klasėje.",s:"",g:""},
  {t:"BUP nuo 2022 m. kiekvienam dalykui turi pasiekimų lygių požymius. Būtent juos verta įklijuoti į DI.",s:"SMSM įsakymas V-1541 (2022)",g:"B"},
  {t:"Atnaujintos programos įvestos etapais: 1, 3, 5, 7, 9 kl. nuo 2023-09, kitos klasės nuo 2024-09.",s:"e-seimas, BUP įsakymas",g:"B"}],
 e:[{t:"Matematika 7 kl.",d:"Pamokos pradžioje 3 „galėsiu“ sakiniai lentoje. Pabaigoje vaikai pakelia 1–5 pirštus prie kiekvieno. Tai greitas savęs vertinimas be pažymio.",p:""},
  {t:"Bet kuris dalykas",d:"Paprašykite DI suformuluoti pamokos tikslus kaip „mokinys gali…“ sakinius pagal jūsų siekinį.",p:"Esu [N] kl. [DALYKO] mokytoja. Siekinys: [ĮKLIJUOTI]. Parašyk 3 pamokos tikslus sakiniais „Po pamokos mokinys gali…“. Kiekvienas turi būti patikrinamas per 2 min."}]},

 "Kas aš":{f:[
  {t:"Kris yra Robotikos Akademijos ir ExoClass bendraįkūrėjas. Šiandien nieko neparduodama, interesai pasakomi atvirai.",s:"Skaidrė „Kas aš“",g:""},
  {t:"Vaiko mokymosi žemėlapis: 2 129 temos, 2 747 ryšiai, 20 dalykų. Sukurtas su DI, nemokamas.",s:"krisvas333.github.io/vaiko-zemelapis",g:""},
  {t:"Teksto supaprastinimas padeda tiems, kam skaityti sunku. Tai viena iš DI stiprybių prieinamumui.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Tas pats įrankis gali padėti ir pakenkti: kai DI daro už mus, mąstymas silpnėja. Apie tai 11 skaidrė.",s:"Bastani ir kt. 2025",g:"B"}],
 e:[{t:"Mokiniams su skaitymo sunkumais",d:"Mokytoja įklijuoja vadovėlio pastraipą ir gauna trumpesnę versiją su žodynėliu. Faktus palygina su originalu.",p:"Perrašyk šį tekstą dviem versijomis [N] klasei: A) lengvesnė (trumpi sakiniai, paprasti žodžiai), B) kaip yra, su 5 sunkių žodžių paaiškinimu. Nekeisk faktų. Pabaigoje 3 supratimo klausimai. Tekstas: [ĮKLIJUOTI]"},
  {t:"Mokytojui sau",d:"Užrašai po pamokos balsu: diktuojate telefonui, DI sutvarko į 3 eilutes. Be vaikų vardų.",p:""}]},

 "Pulsas":{f:[
  {t:"Pulso mygtukai veikia visą laiką. Kris mato paskutinių 3 min. sumą viršuje dešinėje.",s:"Šio puslapio sąranga",g:""},
  {t:"Jei 3 ar daugiau žmonių per 3 min. paspaudžia „Nesupratau“ ar „Per sunku“, indikatorius parausta.",s:"Šio puslapio sąranga",g:""},
  {t:"Klasėje tą patį galima daryti be technologijų: spalvoti puodeliai ar kortelės ant suolo.",s:"",g:""},
  {t:"Anoniminis signalas drąsina tylius. Pakelti ranką „nesupratau“ prieš visą klasę sunku.",s:"",g:""}],
 e:[{t:"3 kl. matematika",d:"Žalia, geltona, raudona kortelė ant suolo. Mokytoja per uždavinius pirmiausia eina prie raudonų.",p:""},
  {t:"8 kl. fizika",d:"Po naujos temos 1 min. „pulsas“: vaikai rašo ant lapelio vieną žodį, kas neaišku. DI sugrupuoja lapelių žodžius į 3 temas.",p:"Čia mokinių anoniminiai žodžiai, kas buvo neaišku pamokoje apie [TEMA]: [ĮKLIJUOTI]. Sugrupuok į 3 temas ir kiekvienai pasiūlyk 1 trumpą paaiškinimą kitos pamokos pradžiai."}]},

 "3 lygiai":{f:[
  {t:"L1 pakanka nemokamos paskyros ir vienos užklausos. Tai realu jau rytoj.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Daugeliui mokytojų įrankis jau yra: SMSM skyrė Copilot licencijas daugiau nei 30 000 mokytojų.",s:"LRT 2026-01-27",g:"B"},
  {t:"Pietų Korėja įvedė DI vadovėlius 2025 m. Po ~4 mėn. jie nebebuvo privalomi. Mokytojai nebuvo paruošti.",s:"Privacy International; Korea Times 2025-06",g:"C"},
  {t:"Todėl laipteliai: pirma įprotis su L1, tik paskui projektai ir agentai.",s:"",g:""}],
 e:[{t:"L1 · 4 kl. lietuvių k.",d:"Viena užklausa: tekstas 3 lygiais. Ta pati pamoka, bet kiekvienas vaikas skaito savo lygiu.",p:"Esu 4 kl. mokytoja. Tekstas: [ĮKLIJUOTI]. Perrašyk 3 lygiais: trumpesnis ir paprastesnis, toks pat, sudėtingesnis. Išlaikyk prasmę. Pridėk 3 supratimo klausimus kiekvienam."},
  {t:"L2 · 9 kl. biologija",d:"Projektas „9b biologija“ su įkelta BUP ištrauka ir vadovėlio skyriumi. Kiekvieną savaitę iš jo testas, nereikia aiškinti iš naujo.",p:""}]},

 "Kas yra DI?":{f:[
  {t:"Kalbos modelis tekstą skaido į dalis (tokenus) ir apskaičiuoja kito žodžio tikimybes. Prasmės ten nėra, yra skaičiai.",s:"3Blue1Brown, LLM explained briefly",g:""},
  {t:"Slankiklis „atsitiktinumas“ demonstracijoje atitinka modelio parametrą temperature. Tikimybės skaidrėje sugalvotos iliustracijai.",s:"Skaidrės pastaba",g:""},
  {t:"Todėl DI rašo sklandžiai ir gali užtikrintai sakyti netiesą. Sklandumas nėra tiesos ženklas.",s:"",g:""},
  {t:"DI kūrėjus įkvėpė smegenys, bet jis veikia kitaip nei smegenys. Jis nežino, ko nežino.",s:"",g:""}],
 e:[{t:"6 kl. lietuvių k.",d:"„Spėk kitą žodį“ žaidimas lentoje: mokytoja rašo sakinio pradžią, vaikai siūlo tęsinį, balsuoja. Taip vaikai pajunta, kaip DI „galvoja“.",p:""},
  {t:"10 kl. informatika",d:"Mokiniai uždavinį pateikia 2 kartus ir lygina atsakymus. Kodėl jie skiriasi? Diskusija apie tikimybes.",p:"Paaiškink [N] kl. mokiniams 5 sakiniais, kodėl tas pats klausimas DI gali duoti skirtingus atsakymus. Paprastai, su vienu pavyzdžiu iš kasdienybės."}]},

 "Stiprybės ir silpnybės":{f:[
  {t:"Anglijos Oak „Aila“ mokytojai nurodė ~3,5 val. per savaitę sutaupyto laiko. Tai paties Oak duomenys.",s:"Schools Week; Oak",g:"C"},
  {t:"DI linkęs pritarti (sycophancy): sutinka su jumis ir su vaiku, net kai klystate. Prašykite „rask mano klaidą“.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Išgalvoti faktai, datos ir šaltiniai vadinami haliucinacijomis. Tikrinkite antru šaltiniu.",s:"",g:""},
  {t:"Kai DI daro už mus, mažiau mokomės. Mažame EEG tyrime LLM grupės smegenų ryšiai buvo silpnesni.",s:"Kosmyna ir kt. 2025, n=54 suaugusieji, preprint",g:"C"},
  {t:"Lietuvių kalba silpnesnė nei anglų: linksniai, stilius. Tai Kris'o pastebėjimas, tyrimo nėra.",s:"Pastebėjimas",g:""}],
 e:[{t:"7 kl. istorija",d:"DI pateikia 2 priešingas nuomones apie įvykį. Vaikai sprendžia, kuo tikėti, ir ieško patvirtinimo vadovėlyje.",p:"Esu 7 kl. istorijos mokytoja. Siekinys: [SIEKINYS]. Duok 2 priešingas nuomones apie [ĮVYKĮ] trumpais tekstais ir 3 klausimus, kaip mokiniai gali nuspręsti, kuria tikėti. Nurodyk, kur tu gali klysti."},
  {t:"Mokytojui sau",d:"Prieš naudodami DI planą, paprašykite jo kritikuoti patį save: „Kur šiame plane gali būti klaida?“",p:"Štai mano pamokos planas: [ĮKLIJUOTI]. Užduok man 5 klausimus, kurie parodytų jo silpnas vietas. Neperrašyk plano."}]},

 "Testas: kaip veikia DI":{f:[
  {t:"Bandymas prisiminti stiprina atmintį labiau nei pakartotinis skaitymas. Tai vadinama testavimo efektu.",s:"Roediger, Karpicke 2006, Psychological Science 17(3)",g:"A"},
  {t:"Klaidingas atsakymas taip pat moko, jei po jo greitai matomas teisingas.",s:"Bjork, Bjork 2011, norimi sunkumai",g:"B"},
  {t:"Svarbu bandyti. Pataikyti nebūtina, todėl tokiems klausimams pažymio nerašome.",s:"",g:""},
  {t:"Teisingas B: DI spėja tikėtiniausią tęsinį pagal išmoktus pavyzdžius. Jis neieško internete, jei ten nėra paieškos funkcijos.",s:"Skaidrė „Kas yra DI?“",g:""}],
 e:[{t:"5 kl. gamtos mokslai",d:"Pamokos pradžioje 3 klausimai iš praėjusios savaitės, be vadovėlio. Atsakymai ant lapelio, aptariami iškart.",p:"Esu 5 kl. gamtos mokslų mokytoja. Praėjusios savaitės tema: [TEMA]. Sukurk 3 trumpus prisiminimo klausimus pamokos pradžiai (be pasirinkimų) ir teisingus atsakymus atskirai."},
  {t:"II g. anglų k.",d:"Žodžių kortelės: mokinys pirma bando pasakyti reikšmę, tik tada apverčia kortelę.",p:""}]},

 "Kada DI padeda mokytis":{f:[
  {t:"Turkijoje ~1 000 gimnazistų: su atsakymus duodančiu DI pratybose +48 %, bet egzamine be DI −17 %.",s:"Bastani ir kt. 2025, PNAS 122(26)",g:"B"},
  {t:"Tame pačiame tyrime DI su užuominomis pratybose davė +127 %, o egzamine žalos beveik neliko.",s:"Bastani ir kt. 2025",g:"B"},
  {t:"Tutor CoPilot: 900 tutorių, 1 800 mokinių. DI siūlė tutoriui klausimą. +4 p. p. įvaldymo, silpnesnių tutorių mokiniams +9 p. p.",s:"Wang ir kt. 2024, arXiv 2410.03017",g:"B"},
  {t:"Harvardo fizikos tutorius, sukurtas pagal pedagogiką, davė daugiau nei dvigubai didesnį mokymosi prieaugį, 194 studentai.",s:"Kestin ir kt. 2025, Scientific Reports",g:"B"},
  {t:"Stiprių tyrimų su 4–5 kl. vaikais ir DI pokalbių robotais beveik nėra. Mažiems elgiamės atsargiai.",s:"Tyrimų apžvalga 2026-10-19",g:""}],
 e:[{t:"4 kl. matematika (ekrane)",d:"Mokytoja projektoriuje veda DI kaip Sokrato tutorių. Vaikai atsako balsu, mokytoja įrašo klasės atsakymą.",p:"Tu esi kantrus 4 klasės mokytojo padėjėjas. Tema: [pvz. trupmenos 1/2 ir 2/4]. Neduok atsakymo. Užduok VIENĄ klausimą, palauk klasės atsakymo, pasakyk, kas teisinga, ir užduok kitą. Jei klysta, duok užuominą."},
  {t:"Mokytojui prieš pamoką",d:"DI padeda rasti nukreipiančius klausimus, kai vaikas užstringa. Taip veikė Tutor CoPilot.",p:"Dėstau [TEMA] [N] klasei. Išvardyk 3 dažniausias vaikų klaidas ir kiekvienai: kodėl taip galvoja ir VIENĄ nukreipiantį klausimą (be atsakymo). Pateik lentele."}]},

 "Pasaulis":{f:[
  {t:"Alpha School (JAV): ~2 val. akademinis blokas, toliau eina tik įvaldęs temą. „Top 1 %“ yra jų pačių teiginys, audito nėra.",s:"Alpha, The Program; TechTimes 2026-07",g:"C"},
  {t:"Alpha kainuoja ~10 000–75 000 $ per metus. Kritikai mini atrankos efektą: mokosi pasiturinčių šeimų vaikai.",s:"Alpha faktai; TechTimes 2026-07",g:"C"},
  {t:"Nigerijoje GPT-4 su mokytojo vedimu 6 savaites: anglų k. +0,23 SD. Sėkmė priklausė nuo mokytojo.",s:"Pasaulio bankas WP 11125, 2025 (skaičiai iš santraukos)",g:"B"},
  {t:"Kinijos 2025-05-12 gairės: pradinukai generatyvų DI naudoja tik su mokytoju. Rezultatų duomenų dar nėra.",s:"Kinijos ŠM gairės, CSET vertimas",g:"B"},
  {t:"Estijos „AI Leap“: 10–11 kl., ~20 000 mokinių ir 3 000 mokytojų nuo 2025. Tai planas, rezultatų dar nėra.",s:"hm.ee 2025",g:"C"}],
 e:[{t:"4 kl. matematika · meistriškumas",d:"Išėjimo bilietas 3 lygiais. Praėjęs lygį eina toliau, kiti kartoja. Alpha idėja be programinės įrangos.",p:"Sukurk išėjimo bilietą 4 klasei. Tema: [TEMA]. 3 klausimai: A (prisiminti), B (pritaikyti), C (paaiškinti savais žodžiais). Prie kiekvieno trumpas teisingas atsakymas ir dažniausia vaikų klaida."},
  {t:"Klasės siena · 3–5 kl.",d:"Progreso žemėlapis: 6 stotelės temai, vaikas pats pažymi „aš moku“. Be reitingų ir be prizų.",p:"Padaryk [N] klasės progreso žemėlapį temai „[TEMA]“: 6 stotelės nuo paprasčiausios iki sunkiausios, kiekviena su fraze „aš moku…“. Spausdinama A3, be varžybų tarp vaikų."}]},

 "Etika":{f:[
  {t:"Šviesoforas remiasi AI Assessment Scale idėja: kiekvienai užduočiai iš anksto nurodomas leidžiamas DI lygis.",s:"Perkins, Furze, Roe, MacVaugh 2024 ⚠️ iš atminties",g:"B"},
  {t:"SMSM gairės: DI naudoti, kai jis duoda realią pridėtinę vertę. Ar naudoti, sprendžia mokytojas.",s:"LRT 2026-01-27 (pirminio dokumento neradome)",g:"B"},
  {t:"UNESCO rekomenduoja nustatyti amžiaus ribą savarankiškiems pokalbiams su DI. Konkretaus skaičiaus gairėse nėra.",s:"Miao, Holmes 2023, UNESCO",g:"A"},
  {t:"Gen Alpha (g. 2010–2024) ir Gen Beta (nuo 2025) ribos yra žiniasklaidos susitarimas, mokslinio pagrindo neturi.",s:"McCrindle",g:"C"},
  {t:"Skaidrumas mažina konfliktus: pasakykite vaikams ir tėvams, kada DI naudojote jūs.",s:"",g:""}],
 e:[{t:"8 kl. lietuvių k. rašinys",d:"🟢 idėjų sąrašas su DI, 🟡 plano taisymas su deklaracija, 🔴 pirmas juodraštis klasėje be DI. Spalvą pasakykite prieš užduotį.",p:""},
  {t:"Tėvų susirinkimas",d:"Trumpas laiškas tėvams, kaip klasė naudos DI šį pusmetį.",p:"Esu [N] kl. mokytoja. Parašyk trumpą (iki 120 žodžių), šiltą laišką tėvams: kaip mūsų klasė naudos DI šį pusmetį. Paminėk: DI naudoja mokytoja, vaikų duomenų į DI nededame, vaikai pirma galvoja patys, kontroliniai be DI."},
  {t:"Vaikas atnešė DI parašytą darbą",d:"Paprašykite paaiškinti žodžiu 2–3 sakiniais, kaip jis priėjo prie atsakymo. Kitą kartą šviesoforą nurodykite iš anksto.",p:""}]},

 "Pasirinkite lygį":{f:[
  {t:"L1 yra visiškai normalus atsakymas. Šiandien visi kartu darome L1 praktiką.",s:"",g:""},
  {t:"Pasirinktas lygis lieka telefone. Pabaigoje telefonas parodys jūsų lygio kitą žingsnį.",s:"Šio puslapio sąranga",g:""},
  {t:"Mokymai, kurie tęsiasi laike ir turi grįžtamąjį ryšį, keičia praktiką labiau nei vienkartiniai.",s:"Darling-Hammond ir kt. 2017",g:"A"},
  {t:"Mentoriams: praktikoje pirmiausia eikite pas pasirinkusius L1.",s:"Skaidrės pastaba",g:""}],
 e:[{t:"Kolegų pora",d:"L1 ir L2 mokytojai susėda poromis. L2 parodo savo projektą, L1 išbando pirmą užklausą.",p:""},
  {t:"Metodinė grupė",d:"Kiekvienas atsineša po vieną DI užduotį, kuri suveikė. Per 3 savaites susidaro dalyko užklausų bankas.",p:""}]},

 "Įrankiai":{f:[
  {t:"Claude galima naudoti nuo 18 m. Mokinių akyse jį valdo tik mokytojas.",s:"Anthropic vartotojo sąlygos",g:"B"},
  {t:"ChatGPT: nuo 13 m., iki 18 m. reikia tėvų sutikimo. Patikrinta per antrinius šaltinius.",s:"OpenAI sąlygos per Jisc santrauką ⚠️",g:"C"},
  {t:"NotebookLM per Google Workspace for Education leidžiamas ir jaunesniems nei 18, jei mokykla įjungė.",s:"Google Workspace Updates 2025-10",g:"B"},
  {t:"NotebookLM vaizdo apžvalgos palaiko lietuvių kalbą. Prieš rodydami klasei, paklausykite patys.",s:"NotebookLM pagalbos puslapis",g:"B"},
  {t:"Microsoft 365 Copilot Chat su mokyklos paskyra nemokamas EDU vartotojams nuo 13 m., jei įjungė administratorius.",s:"Microsoft roadmap (antrinis)",g:"C"}],
 e:[{t:"7 kl. istorija · NotebookLM",d:"Įkelkite vadovėlio skyrių ir 2 šaltinius. Klausimai bus tik iš jų, su citatomis.",p:"Sukurk 10 klausimų pagal siekinį [ĮKLIJUOTI arba temą] tik iš įkeltų šaltinių. Prie kiekvieno parodyk citatą iš šaltinio. Jei šaltiniuose atsakymo nėra, taip ir parašyk."},
  {t:"Jungtys (L2)",d:"Prijunkite tik aplanką „Pamokų medžiaga“: BUP, vadovėliai, savi konspektai. Niekada aplanko su pažymiais, sąrašais ar laiškais.",p:""},
  {t:"Privatumas",d:"ChatGPT ir Claude nustatymuose galima išjungti pokalbių naudojimą modeliams mokyti. Meniu keičiasi, tikrinkite gyvai.",p:""}]},

 "L1 demo":{f:[
  {t:"Gera užklausa turi 3 dalis: kas aš, BUP siekinys, koks rezultatas reikalingas.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Be siekinio DI rašo „bendrai gerai“. Su siekiniu jis laikosi programos.",s:"",g:""},
  {t:"Atsakymų raktas kartais klysta. Išspręskite bent 2 uždavinius patys.",s:"Pastebėjimas",g:""},
  {t:"EEF tyrime mokytojai DI dažniausiai naudojo vienai veiklai, ne visai pamokai.",s:"EEF/NFER 2024",g:"B"}],
 e:[{t:"4 kl. matematika",d:"Trupmenų testas iš skaidrės: tipiška klaida „4 didesnis, tai 1/4 didesnė“. Aptarkite ją su klase prieš testą.",p:"Esu 4 kl. mat. mokytoja. Tema: trupmenos. Išvardyk 3 dažniausias vaikų klaidas ir kiekvienai VIENĄ nukreipiantį klausimą, kuris neatskleidžia atsakymo."},
  {t:"Muzika 5 kl.",d:"Ta pati formulė: siekinys + 15 min. klausymo veikla. Kūrinį DI pasiūlo, jūs patikrinate.",p:"Esu 5 kl. muzikos mokytoja. BUP siekinys: [ĮKLIJUOTI]. Sukurk 15 min. klausymo veiklą: 1 plačiai žinomas kūrinys, 3 klausimai „ką girdžiu“ ir 1 kūrybinė užduotis grupėse. Kūrinį pasiūlyk, aš patikrinsiu."}]},

 "Praktika L1":{f:[
  {t:"Žalgirio mūšis įvyko 1410-07-15. 1401 m. yra Vilniaus ir Radomo aktas. DI sumaišė panašius skaičius.",s:"Skaidrė „Praktika L1“",g:""},
  {t:"Tikrinti yra svarbiausias įgūdis. DI klaidą pasako tokiu pat užtikrintu tonu kaip tiesą.",s:"",g:""},
  {t:"Tikrinimas yra metodo dalis: EEF tyrime mokytojai DI medžiagą peržiūrėjo ir taisė.",s:"EEF/NFER 2024",g:"B"},
  {t:"Neturite paskyros? Dirbkite poroje. Neturite siekinio? Parašykite temą ir klasę savais žodžiais.",s:"",g:""}],
 e:[{t:"6 kl. istorija · rask klaidą",d:"Vaikai porose ieško 3 paslėptų klaidų DI tekste ir tikrina vadovėlyje.",p:"Parašyk 6 sakinių tekstą 6 klasei apie [TEMA] su lygiai 3 sąmoningomis faktinėmis klaidomis. Atskirai, po linija, nurodyk klaidas ir teisingus faktus. Klaidos turi būti tikroviškos."},
  {t:"8 kl. matematika",d:"5 uždaviniai su „užstatytomis“ klaidomis sprendimuose. Mokiniai randa ir paaiškina.",p:"Esu 8 kl. mat. mokytoja. Siekinys: [SIEKINYS]. Sukurk 5 uždavinius su 3 skirtingomis „užstatytomis“ klaidomis sprendimuose, kad mokiniai jas surastų. Teisingus sprendimus pateik atskirai."}]},

 "Ką sukūrėte":{f:[
  {t:"Dažniausiai žemiausias vidurkis yra „faktai teisingi“. Todėl mokytojas lieka kilpoje.",s:"Skaidrės pastaba",g:""},
  {t:"Prieš skaitydami klausimą garsiai, patikrinkite, ar jame nėra vaiko vardo. Spustelėta kortelė paslepiama.",s:"",g:""},
  {t:"Rubrika su 4 kriterijais padeda vertinti DI medžiagą taip pat, kaip mokinių darbus.",s:"",g:""},
  {t:"Projektas su įkelta BUP ištrauka padeda išvengti „bendrai gerai“ atsakymų.",s:"",g:""}],
 e:[{t:"Metodinė grupė",d:"Kiekvienas mokytojas įvertina kolegos DI testą pagal tuos pačius 4 kriterijus. Aptariate, kas dažniausiai kliūva.",p:""},
  {t:"Bet kuris dalykas",d:"Paprašykite DI patobulinti silpniausią klausimą pagal jūsų pastabą.",p:"Štai mano testo klausimas: [ĮKLIJUOTI]. Jis per lengvas [N] klasei. Perrašyk jį taip, kad mokinys turėtų paaiškinti savais žodžiais. Pateik 2 variantus ir pažymėk, ką turiu patikrinti."}]},

 "Mokymosi mokslas":{f:[
  {t:"Aktyvus prisiminimas: bandymas atsakyti įsimena geriau nei pakartotinis skaitymas.",s:"Roediger, Karpicke 2006",g:"A"},
  {t:"Kartojimas tarpais: tas pats kiekis kartojimo, išskaidytas laike, įsimenamas ilgiau.",s:"Cepeda ir kt. 2006, meta-analizė, Psychological Bulletin 132(3)",g:"A"},
  {t:"Norimi sunkumai: kai mokytis šiek tiek sunkiau, žinios išlieka ilgiau.",s:"Bjork, Bjork 2011",g:"B"},
  {t:"Iki 13 m. vaikai DI patys nenaudoja. Mokytojas rodo trenerio užklausą ekrane, vaikai atsako balsu.",s:"Įrankių sąlygos",g:""}],
 e:[{t:"6 kl. gamtos mokslai · treneris",d:"Mokytoja projektoriuje paleidžia trenerio užklausą, klasė atsako balsu.",p:"Esu 6 kl. mokinys. Tema: [TEMA]. Neduok atsakymo. Užduok 1 klausimą, palauk mano atsakymo, tada pasakyk, ką supratau teisingai, ir paklausk kito. Kalbėk paprastai."},
  {t:"3 kl. lietuvių k.",d:"Kartojimo kalendorius: tema grįžta po dienos, po savaitės ir po mėnesio, po 3 trumpus klausimus.",p:"Esu 3 kl. mokytoja. Tema: [TEMA]. Sukurk 3 trumpų klausimų rinkinius kartojimui: po 1 dienos, po 1 savaitės, po 1 mėnesio. Kiekvienas rinkinys šiek tiek sunkesnis."}]},

 "Dalykai ir testai":{f:[
  {t:"BUP programoje yra pasiekimų sritys ir lygių požymiai. Įklijuokite oficialų tekstą iš emokykla.lt.",s:"SMSM įsakymas V-1541 (2022)",g:"B"},
  {t:"Muzikos programoje 4 pasiekimų lygiai, sustiprinta kūryba.",s:"NŠA, Muzikos programa 2022",g:"B"},
  {t:"Istorijos programos pagrindas yra istorinis mąstymas. Todėl klausimai apie šaltinio vertinimą tinka geriau nei datos.",s:"emokykla.lt, Istorijos BP projektas 2022",g:"B"},
  {t:"Reiškiniais grįstas mokymasis (PhenoBL) jungia kelis dalykus apie vieną realų reiškinį. DI padeda planuoti, tyrinėja vaikai.",s:"",g:""}],
 e:[{t:"9 kl. lietuvių k.",d:"Rubrika 4 kriterijais ir 4 lygiais rašiniui. Mokiniai vertina savo juodraštį prieš atiduodami.",p:"Esu 9 kl. mokytoja. Siekinys: [SIEKINYS]. Sukurk 4 kriterijų rubriką (turinys, struktūra, kalba, raštingumas) su 4 lygiais ir 1 sakinio aprašu kiekvienam. Kalba aiški mokiniui."},
  {t:"5 kl. reiškinys „Vanduo mūsų mieste“",d:"Gamtos mokslai, matematika, lietuvių k. ir dailė vienai temai. Šaltiniai: miesto vandens tiekėjo vieša ataskaita.",p:""},
  {t:"10 kl. istorija",d:"6 klausimai: 2 žinių, 2 priežasčių ir pasekmių, 2 šaltinio vertinimo.",p:"Esu 10 kl. istorijos mokytoja. Siekinys: [SIEKINYS]. Sukurk 6 klausimus apie [TEMĄ]: 2 žinių, 2 priežasčių ir pasekmių, 2 šaltinio vertinimo. Pridėk vertinimo kriterijus."}]},

 "Klasių žemėlapis":{f:[
  {t:"Patikrintų pasaulio pavyzdžių pagal klases mažai. Darželiui, 1, 2, 5, 6, 8 kl. jų neradome, ten „mūsų pasiūlymas“.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Oak „Aila“ skirta 2–6 kl. mokytojams. ~3,5 val./sav. sutaupyta yra paties Oak duomenys.",s:"Schools Week",g:"C"},
  {t:"Bastani tyrimas atliktas su gimnazistais. Jo išvadų tiesiogiai pradinukams neperkeliame.",s:"Bastani ir kt. 2025",g:"B"},
  {t:"Kinijos gairės: kuo jaunesnis vaikas, tuo daugiau mokytojo kontrolės. Pradinėje svarbiausia susidomėjimas ir supratimas.",s:"Kinijos ŠM gairės 2025; Henan.gov.cn",g:"B"}],
 e:[{t:"Priešmokyklinė grupė",d:"Dainelė apie savaitės temą su priedainiu. Vaikai DI neliečia.",p:"Esu priešmokyklinės grupės auklėtoja. Parašyk 4 eilučių dainelę apie [TEMA], su pasikartojančiu priedainiu, vaikams 5–6 m. Paprasti žodžiai."},
  {t:"11 kl. matematika",d:"Sokrato tutorius VBE pasiruošimui. Mokinys sprendžia pats, DI tik klausia.",p:"Esu 11 kl. mat. mokytoja. Siekinys: [SIEKINYS]. Neduok sprendimo. Klausk po vieną klausimą (Sokrato metodu), kol mokinys pats suras sprendimą: [UŽDAVINYS]. Parašyk man 3 tipiškas klaidas."}]},

 "Mokymosi žemėlapis":{f:[
  {t:"Žemėlapyje 2 129 temos, 2 747 ryšiai ir 20 dalykų nuo darželio iki 12 klasės, pagal bendrąsias programas.",s:"Vaiko mokymosi žemėlapis",g:""},
  {t:"Projektas eksperimentinis ir sukurtas su DI. Jame gali būti klaidų, jas galima pranešti per krisvas.lt.",s:"",g:""},
  {t:"Ryšiai tarp temų padeda planuoti kartojimą: prieš naują temą verta prisiminti tą, ant kurios ji remiasi.",s:"",g:""},
  {t:"Tai L3 pavyzdys. Mokytojui to daryti nebūtina, užtenka žinoti, kad galima.",s:"",g:""}],
 e:[{t:"7 kl. matematika",d:"Prieš lygtis pažiūrėkite, kurios ankstesnės temos su jomis susijusios. Pamokos pradžioje 3 klausimai iš jų.",p:"Mokysiu [N] kl. temą [TEMA]. Kokios 3 ankstesnių klasių temos yra būtinos jai suprasti? Kiekvienai sukurk 1 trumpą prisiminimo klausimą pamokos pradžiai."},
  {t:"Klasės auklėtojas",d:"Su klase pažiūrėkite, kaip dalykai susiję tarpusavyje. Tai gera pradžia reiškinio projektui.",p:""}]},

 "L2 kuriu":{f:[
  {t:"Projektas (Claude Project, savas GPT, NotebookLM sąsiuvinis) atsimena jūsų instrukciją ir failus. Nereikia aiškinti kaskart.",s:"",g:""},
  {t:"Interaktyvus testas, kuris po klaidos duoda užuominą, atitinka Bastani „tutoriaus“ sąlygą, kur žalos beveik neliko.",s:"Bastani ir kt. 2025",g:"B"},
  {t:"Eedi ir Google DeepMind tyrime žmogaus prižiūrimas DI tutorius ištaisė klaidas panašiai kaip žmogus: 93,0 % ir 91,2 %.",s:"Eedi, LearnLM 2025, n=165, preprint",g:"C"},
  {t:"NotebookLM vaizdo apžvalgos lietuvių kalbą palaiko, bet skambesį patikrinkite prieš rodydami.",s:"NotebookLM pagalbos puslapis",g:"B"}],
 e:[{t:"5 kl. matematika · projektas",d:"„5b matematika“: BUP ištrauka, jūsų planas, vadovėlio skyrius. Be vaikų duomenų.",p:"Tu esi mano [N] kl. [DALYKO] asistentas. Visada: 1) paklausk, kokiam lygiui, 2) laikykis įkeltų BUP ištraukų, 3) pažymėk faktus, kuriuos turiu patikrinti, 4) niekada neprašyk ir nesaugok vaikų vardų."},
  {t:"Bet kuris dalykas · video",d:"1 min. mokomasis video telefonu pagal DI scenarijų. Be vaikų veidų kadre.",p:"Esu [N] kl. [DALYKO] mokytoja. Tema: [TEMA]. Parašyk 1 minutės mokomojo video scenarijų: kabliukas (5 s), vienas paaiškinimas su pavyzdžiu, klausimas vaikams. Pateik lentelę: sekundės · ką sakau · ką rodo kamera."}]},

 "L3 antros smegenys":{f:[
  {t:"Vaiko vardas, pažymiai, elgesys, diagnozė yra asmens duomenys. Juos naudoti galima tik su teisiniu pagrindu.",s:"BDAR",g:"A"},
  {t:"ES DI aktas švietimą (priėmimą, vertinimą, stebėseną) priskiria didelės rizikos sričiai.",s:"Reglamentas (ES) 2024/1689, III priedas ⚠️ tikrinti",g:"A"},
  {t:"Praktiškai: pažymio DI nededa. Sprendimą priima mokytojas.",s:"",g:""},
  {t:"Klausimams apie duomenis kreipkitės į mokyklos duomenų apsaugos pareigūną.",s:"",g:""}],
 e:[{t:"6 kl. matematika · klasės modeliai",d:"Po kontrolinio užrašas be vardų: „7 iš 28 nesuprato liekanos prasmės“. Kas savaitę 3 eilutės: pasiekė, strigo, hipotezė.",p:"Čia mano 6 savaičių užrašai apie klasės klaidų tipus (be vardų): [ĮKLIJUOTI]. Kokias 2 temas kartoti kitą savaitę ir kokiu intervalu? Pasiūlyk po vieną 5 min. kartojimo veiklą kiekvienai."},
  {t:"Maža grupė",d:"Jei grupėje 3 vaikai, net „2 iš 3“ gali atskleisti, apie ką kalbama. Tokių užrašų į DI nekelkite.",p:""}]},

 "Ką išbandysite?":{f:[
  {t:"Vienas aiškus planas „kada ir ką“ padidina tikimybę, kad tai padarysite. Užsirašykite dieną ir pamoką.",s:"",g:""},
  {t:"Mokytojų mokymai keičia praktiką, kai mokytojas išbando idėją savo klasėje ir gauna grįžtamąjį ryšį.",s:"Darling-Hammond ir kt. 2017",g:"A"},
  {t:"Viena užduotis per savaitę užtenka. Penkios iš karto dažniausiai neįvyksta.",s:"",g:""},
  {t:"Pulsas per visą popietę rodo, kiek kartų salė spaudė kiekvieną mygtuką.",s:"Šio puslapio sąranga",g:""}],
 e:[{t:"L1 · 2 kl. lietuvių k.",d:"Trečiadienį: tekstas 3 lygiais skaitymo pamokai. Penktadienį: užrašas, kas suveikė.",p:""},
  {t:"L2 · 8 kl. chemija",d:"Interaktyvus 5 klausimų testas ekrane, klasė atsako kartu.",p:"Sukurk vieno HTML failo interaktyvų 5 klausimų testą tema [TEMA], [N] kl. Po neteisingo atsakymo rodyk užuominą, ne atsakymą. Pabaigoje parodyk, kurias temas kartoti. Jokių duomenų saugojimo."}]},

 "3 partneriai":{f:[
  {t:"Mąstymo partneris klausia. Toks DI vaidmuo sutampa su stipriausiais tyrimais: užuominos, klausimai, mokytojas šalia.",s:"Bastani ir kt. 2025; Wang ir kt. 2024",g:"B"},
  {t:"Tyrimo partneris randa, jūs tikrinate. NotebookLM atsakymus remia tik jūsų įkeltais šaltiniais ir rodo citatas.",s:"",g:""},
  {t:"Kūrimo partneris taupo laiką. EEF tyrime planavimas sutrumpėjo 31 %.",s:"EEF/NFER 2024",g:"A"},
  {t:"Visais trim atvejais darbą daro žmogus. Pažymį ir sprendimą priima mokytojas.",s:"",g:""}],
 e:[{t:"Mąstymo partneris · bet kuris dalykas",d:"DI kritikuoja jūsų planą ir neperrašo jo.",p:"Štai mano pamokos planas: [ĮKLIJUOTI]. Užduok man 5 klausimus, kurie parodytų jo silpnas vietas. Neperrašyk plano."},
  {t:"Tyrimo partneris · 10 kl. geografija",d:"NotebookLM su 3 įkeltais šaltiniais apie klimatą. Kiekvienas teiginys su citata.",p:"Atsakyk tik iš šių šaltinių ir prie kiekvieno teiginio parodyk citatą. Jei atsakymo šaltiniuose nėra, taip ir parašyk."}]},

 "Kitas žingsnis":{f:[
  {t:"Ilgiau trunkantys mokymai su pakartotiniais susitikimais keičia mokytojo praktiką labiau nei viena popietė.",s:"Desimone 2009, Educational Researcher 38(3)",g:"A"},
  {t:"Kolektyvinis dalyvavimas (kolegos iš tos pačios mokyklos kartu) yra vienas iš veiksmingų mokymų požymių.",s:"Desimone 2009",g:"A"},
  {t:"Prieš ir po vidurkiai rodo pasitikėjimo pokytį. Tikrasis testas yra jūsų pamoka per 2 savaites.",s:"",g:""},
  {t:"Atsiliepimas anoniminis. Vaikų vardų nerašykite.",s:"",g:""}],
 e:[{t:"Po 2 savaičių",d:"Atsineškite vieną DI testą, kurį panaudojote klasėje, ir 1 sakinį: kas suveikė, kas ne.",p:""},
  {t:"L1 · 4 kl. pasaulio pažinimas",d:"5 klausimų testas pagal siekinį, 2 atsakymus patikrinate patys, testas pamokoje.",p:"Esu 4 kl. pasaulio pažinimo mokytoja. Siekinys: [ĮKLIJUOTI]. Sukurk 5 klausimų testą: 2 lengvi, 2 vidutiniai, 1 sunkus. Prie kiekvieno teisingas atsakymas ir dažniausia vaikų klaida. Pažymėk, ką turiu patikrinti."}]},

 "Ačiū":{f:[
  {t:"Viena mintis išsinešti: DI padeda, kai neatiduoda atsakymo iš karto, o šalia lieka mokytojas.",s:"Bastani ir kt. 2025; Wang ir kt. 2024",g:"B"},
  {t:"Užklausų bankas lieka jūsų telefone ir po mokymų.",s:"",g:""},
  {t:"Kartą per savaitę verta palikti užduotį visai be DI, kad vaikai treniruotų savo mąstymą.",s:"Klasių žemėlapio tyrimas 2026-10-19",g:""},
  {t:"Medžiaga ruošta su DI. Radote klaidą? Parašykite per krisvas.lt.",s:"",g:""}],
 e:[{t:"Dažnas klausimas: kurį įrankį rinktis?",d:"Tą, kurį leidžia mokykla. Copilot licencijos daugeliui mokytojų jau yra.",p:""},
  {t:"Dažnas klausimas: ką sakyti tėvams?",d:"Trumpas laiškas: DI naudoja mokytoja, vaikų duomenų nededame, vaikai pirma galvoja patys, kontroliniai be DI.",p:""}]},

 "Antros smegenys (papildomai)":{f:[
  {t:"Antrųjų smegenų idėja: užrašai, idėjos ir šaltiniai vienoje vietoje už galvos ribų, sujungti tarpusavyje.",s:"Tiago Forte, Building a Second Brain, 2022",g:""},
  {t:"CODE metodas: užfiksuoju, sutvarkau, išgryninu, kuriu.",s:"Tiago Forte 2022",g:""},
  {t:"Obsidian nemokamas. Claude Pro apie 20 $/mėn. Kainos keičiasi, tikrinkite claude.com/pricing.",s:"claude.com/pricing, tikrinta 2026-10-20",g:""},
  {t:"Vaikų duomenų, vardų ir slaptažodžių antrosiose smegenyse nebūna.",s:"",g:""}],
 e:[{t:"Mokytojui · dalyko aplankas",d:"Vienas aplankas „Mano pamokos“: konspektai, BUP ištraukos, geriausios užklausos. Kas savaitę 5 min. tvarkymo.",p:""},
  {t:"Metodinė grupė",d:"Bendras Google Drive aplankas su patikrintomis užklausomis pagal klases. Kiekviena su pastaba „kas suveikė“.",p:""}]},

 "Šaltiniai (priedas)":{f:[
  {t:"A: pakartota, RCT ar meta-analizė. B: vienas geras tyrimas ar oficialus dokumentas. C: preprint, įmonės duomenys, žiniasklaida.",s:"Skaidrės legenda",g:""},
  {t:"Pirmiausia verta perskaityti Bastani ir kt. 2025 (PNAS). Jis tiesiausiai atsako, kada DI kenkia ir kada ne.",s:"Bastani ir kt. 2025",g:"B"},
  {t:"Mokytojo laikui stipriausias įrodymas yra EEF/NFER 2024 RCT su 259 mokytojais.",s:"EEF/NFER 2024",g:"A"},
  {t:"„⚠️ iš atminties“ reiškia, kad nuoroda dar nepatikrinta šiai sesijai. Prieš cituodami raskite originalą.",s:"",g:""},
  {t:"Įmonės pačios skelbiami skaičiai (Alpha, Oak) yra C. Jie įdomūs, bet nepatikrinti nepriklausomai.",s:"",g:""}],
 e:[{t:"9–10 kl. bet kuris dalykas",d:"Mokiniai įvertina 3 šaltinius pagal A/B/C skalę ir pagrindžia vienu sakiniu.",p:"Esu [N] kl. mokytoja. Tema: [TEMA]. Pasiūlyk 3 skirtingo patikimumo šaltinių tipus šia tema ir paaiškink mokiniams, kaip juos įvertinti A/B/C skale. Pažymėk, ką turiu patikrinti."},
  {t:"Mokytojui sau",d:"Kai DI pateikia šaltinį, paprašykite tikslios nuorodos ir atsidarykite ją patys. Išgalvoti šaltiniai pasitaiko dažnai.",p:""}]}
};
if(typeof window!=='undefined')window.MENTOR=MENTOR;
