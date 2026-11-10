/* MENTOR: papildoma medžiaga kiekvienai skaidrei (K ekrane, „Mentoriui“ telefone). Raktas = data-label. f = faktai {t,s,g}, e = pavyzdžiai {t,d,p}.
   Šaltinių lygiai: A recenzuotas tyrimas ar teisės aktas · B oficialus puslapis, didelė apklausa, darbo dokumentas · C spauda, preprint.
   Kur g tuščias, tai praktinis patarimas be šaltinio. Skaičiai tik iš facts.md eilučių be ⚠️ (tikrinta 2026-11-10). */
var MENTOR={
 "Prisijunkite":{f:[
  {t:"Atsakymai keliauja tik į Kris'o ekraną. Vardų nereikia, registracijos nėra.",s:"",g:""},
  {t:"Be telefono galima dalyvauti: tie patys klausimai atsakomi Zoom pokalbyje.",s:"",g:""},
  {t:"Pradėti klausimu verta: kai žmogus pirmą minutę pats atsako, jis toliau klausosi aktyviau.",s:"",g:""}],
 e:[{t:"Informatikos pamoka",d:"Pamokos pradžioje vienas klausimas ekrane, mokiniai atsako kortelėmis A/B/C/D arba Google Forms. Pirmiausia klausimas, tada tema.",p:""}]},

 "Kas jūs?":{f:[
  {t:"Atsakymai be vardų. Ekrane matosi tik suma.",s:"",g:""},
  {t:"Mokytojų mokymai veikia geriau, kai prisiriša prie konkretaus dalyko turinio. Todėl klausiame, ką dėstote.",s:"Desimone 2009; Darling-Hammond ir kt. 2017",g:"A"},
  {t:"Vienas klausimas (DI raštingumo pulsas) įrašomas anonimiškai į bendrą Lietuvos mokytojų suvestinę.",s:"",g:""}],
 e:[{t:"Mokyklos DI taisyklės",d:"Jei daug „Nežinau“ apie mokyklos DI taisykles, tai pirma IT mokytojo užduotis: paklausti direktoriaus ir pasiūlyti juodraštį.",p:"Esu informatikos mokytoja(-as). Parašyk 1 puslapio mokyklos DI naudojimo taisyklių juodraštį: kada galima, kada ne, ką daryti su vaikų duomenimis. Pažymėk vietas, kurias turi patvirtinti direktorius."}]},

 "Kas aš":{f:[
  {t:"Kristijonas Vasiliauskas yra Robotikos Akademijos bendrasavininkas ir kūrybos direktorius.",s:"",g:""},
  {t:"Robotikos Akademija: 12 000+ vaikų per metus.",s:"RA kanoniniai skaičiai",g:""},
  {t:"Dirba su ExoClass. Info Gynėjai yra jo informacinio raštingumo programa.",s:"",g:""},
  {t:"Šiandien nieko neparduoda; įrankiai minimi kaip pavyzdžiai.",s:"",g:""}],
 e:[{t:"Disleksija ir DI",d:"DI padeda Kris'ui rašyti ir struktūruoti mintis. Mokiniams su disleksija tas pats: diktavimas, teksto skaitymas balsu, trumpesnės versijos.",p:""}]},

 "7 klausimai":{f:[
  {t:"Septyni klausimai paimti iš spalio 16 d. pokalbio su KŠIC: DI, LLM, agentas, ugdymas, nauda, rizikos, kaina.",s:"",g:""},
  {t:"Trys rezultatai įvertinami telefone prieš ir po. Taip matome, ar paskaita ką nors pakeitė.",s:"",g:""},
  {t:"Efektyvūs mokytojų mokymai turi aiškų tikslą, aktyvų mokymąsi ir grįžtamąjį ryšį.",s:"Darling-Hammond ir kt. 2017",g:"A"}],
 e:[{t:"Pamokos tikslas vaiko kalba",d:"Pamokos pradžioje: „Po pamokos galėsite…“ ir trys punktai. Pabaigoje mokiniai patys įsivertina 1-5.",p:"Tema: [TEMA], [N] kl. Parašyk 3 pamokos tikslus vaiko kalba, pradedant „Po pamokos galėsiu…“. Kiekvienam: kaip mokinys parodys, kad pavyko."}]},

 "Spėkite":{f:[
  {t:"Teisingas atsakymas B: modelis spėja tikėtiniausią tęsinį pagal išmoktus pavyzdžius.",s:"Google ML Crash Course: LLM",g:"B"},
  {t:"Kai kurie įrankiai papildomai ieško internete, bet atsakymą vis tiek sudeda spėdami žodį po žodžio.",s:"",g:""},
  {t:"Spėjimas prieš paaiškinimą sukuria klausimą galvoje, todėl paaiškinimas „prilimpa“ geriau.",s:"",g:""}],
 e:[{t:"Informatikos pamoka",d:"Prieš naują temą: 1 klausimas su 4 atsakymais, mokiniai spėja. Paskui temą aiškinate atsakydami į tą klausimą.",p:""}]},

 "Kas yra DI?":{f:[
  {t:"ES DI aktas: DI sistema iš gautų duomenų išveda prognozes, turinį, rekomendacijas ar sprendimus, veikia su tam tikru autonomijos lygiu.",s:"ES DI aktas, 3 str. 1 p.",g:"A"},
  {t:"Įprasta programa: taisykles parašo žmogus. Mašininis mokymasis: taisykles sistema randa iš pavyzdžių.",s:"",g:""},
  {t:"Todėl DI gali tai, ko niekas neužprogramavo, ir todėl klysta: rasta taisyklė ne visada teisinga.",s:"",g:""}],
 e:[{t:"7-8 kl. užduotis be kompiuterio",d:"Mokiniai gauna 10 kortelių su gyvūnais ir patys sugalvoja taisyklę „šuo ar ne šuo“. Paskui randa kortelę, kurią jų taisyklė klaidingai priskiria. Taip atrodo mašininis mokymasis ir jo klaida.",p:""}]},

 "Kas yra LLM?":{f:[
  {t:"Kalbos modelis vertina, kokia tikimybė, kad tam tikra teksto dalis (žymė) pasirodys ilgesnėje sekoje.",s:"Google ML Crash Course: LLM",g:"B"},
  {t:"Atsitiktinumo slankiklis demonstracijoje atitinka „temperatūrą“: mažai = visada tas pats žodis, daug = keisti žodžiai.",s:"",g:""},
  {t:"Tikimybės demonstracijoje sugalvotos iliustracijai, ne iš tikro modelio.",s:"",g:""}],
 e:[{t:"9-10 kl. Python",d:"Mokiniai parašo mažą „kito žodžio“ programą: suskaičiuoja, kuris žodis dažniausiai eina po kito žodžio trumpame tekste, ir generuoja sakinį. Tai mažas kalbos modelis.",p:"Parašyk trumpą Python programą 9 kl. mokiniams: ji perskaito tekstą, suskaičiuoja, kuris žodis dažniausiai eina po kiekvieno žodžio, ir sugeneruoja 10 žodžių sakinį. Paaiškink kodą komentarais lietuviškai."}]},

 "Kas yra agentas?":{f:[
  {t:"Anthropic skiria darbo eigas (žingsniai nubrėžti iš anksto) ir agentus (modelis pats nusprendžia žingsnius ir įrankius).",s:"Anthropic, Building effective agents, 2024-12-19",g:"B"},
  {t:"Agentas veikia cikle: planuoja, daro su įrankiais, tikrina rezultatą, praneša.",s:"",g:""},
  {t:"Saugumo taisyklė: agentui duodate tik tą aplanką ir tuos įrankius, kurių reikia užduočiai.",s:"",g:""}],
 e:[{t:"Mokytojo darbas",d:"Agentas iš susirinkimo stenogramos padaro užduočių lentelę ir laiško juodraštį. Jūs peržiūrite ir siunčiate.",p:""}]},

 "Antrosios smegenys":{f:[
  {t:"Kris'o antrosios smegenys yra paprasti tekstiniai failai (Markdown) ir keli agentai prie jų.",s:"",g:""},
  {t:"Failai nepririšti prie vieno modelio: modelį galima pakeisti, užrašai lieka jūsų.",s:"",g:""},
  {t:"Susitikimai įrašomi tik visiems žinant ir sutinkant. Mokinių vardų ir duomenų ten nėra.",s:"",g:""},
  {t:"Šio pristatymo turinys surinktas iš spalio 16 d. pokalbio užrašų; faktus ir šaltinius tikrino agentas, peržiūrėjo Kris.",s:"",g:""}],
 e:[{t:"Pradžia per 10 min.",d:"Vienas aplankas, 5 failai: pamokos, idėjos, susitikimai, užduotys, ko išmokau. Kas penktadienį 10 min. atnaujinimas.",p:"Padėk man susikurti „antrųjų smegenų“ aplanką iš paprastų tekstinių failų. Pasiūlyk 5 failus ir kiekvienam 3 eilučių šabloną. Vaikų duomenų ten nebus."}]},

 "3 lygiai":{f:[
  {t:"L1 · Pradedu: viena užklausa pokalbyje, 5 min., nemokamai.",s:"",g:""},
  {t:"L2 · Kuriu: interaktyvus testas, žaidimas ar simuliacija vienu HTML failu.",s:"",g:""},
  {t:"L3 · Automatizuoju: agentai dirba su jūsų aplanku. Pradėti verta nuo L1 net pažengusiems.",s:"",g:""}],
 e:[{t:"Diferencijavimas klasėje",d:"Tą pačią logiką galima taikyti mokiniams: trys laipteliai tai pačiai temai, kiekvienas pasirenka, nuo kurio pradėti.",p:""}]},

 "5 darbai šią savaitę":{f:[
  {t:"Įklijuotas BUP siekinys iš emokykla.lt priverčia DI laikytis programos, o ne savo nuomonės.",s:"",g:""},
  {t:"Visada išspręskite bent 2 DI sukurtas užduotis patys: atsakymų raktas kartais klysta.",s:"",g:""},
  {t:"Grįžtamajam ryšiui naudokite tik nuasmenintą darbą; pažymį deda mokytojas.",s:"",g:""},
  {t:"Meniu pavadinimai (Canvas, Artifacts) keičiasi; svarbu prašyti „vieno HTML failo“.",s:"",g:""}],
 e:[{t:"5-6 kl. Scratch",d:"Ta pati užduotis 3 lygiais: A su paruoštais blokais, B standartinė, C su papildoma sąlyga.",p:"Tema: ciklai Scratch, 5 kl. Sukurk tą pačią užduotį 3 lygiais: A su paruoštų blokų sąrašu, B standartinė, C su papildoma sąlyga. Prie kiekvienos: dažniausia klaida."},
  {t:"11 kl. Python",d:"Interaktyvus testas apie sąrašus vienu HTML failu, rodomas ekrane visai klasei.",p:""}]},

 "Info Gynėjai":{f:[
  {t:"Info Gynėjai yra Kris'o informacinio raštingumo programa (pilotas Šiaurės licėjuje).",s:"",g:""},
  {t:"Simuliacijos kuriamos su DI, tikrinamos žmonių. Žinutė skaidrėje sugalvota, adresas neegzistuoja.",s:"",g:""},
  {t:"Sukčiavimo požymiai: skubinimas, keistas adresas, per geras pasiūlymas, prašymas slaptažodžio ar kodo.",s:"",g:""}],
 e:[{t:"7-8 kl. pamoka",d:"Mokiniai gauna 6 žinutes ir pažymi įtartinas vietas, po to aptariate. Paskui patys sukuria vieną „sukčiaus“ žinutę kitai grupei.",p:"Sukurk vieno HTML failo simuliaciją 7 kl.: 6 telefono žinutės, 2 iš jų sukčių. Mokinys paspaudžia įtartinas vietas. Naudok tik sugalvotus vardus ir adresus su .example."}]},

 "Rask DI klaidą":{f:[
  {t:"Klaida 4 teiginyje: RAM yra laikina atmintis, išjungus kompiuterį duomenys dingsta.",s:"",g:""},
  {t:"Kiti teiginiai teisingi: 1 baitas = 8 bitai; 1010 dvejetainėje = 10; https šifruoja ryšį; print(\"Labas\") parodo Labas.",s:"",g:""},
  {t:"Klaida įdėta sąmoningai, kad pavyzdys būtų aiškus.",s:"",g:""}],
 e:[{t:"Kritinio mąstymo pamoka",d:"DI sugeneruoja 6 teiginius su 2 klaidomis, mokiniai poromis ieško ir pagrindžia šaltiniu.",p:"Parašyk 6 teiginius 8 kl. informatikos pamokai tema [TEMA] su lygiai 2 sąmoningomis faktinėmis klaidomis. Atskirai nurodyk klaidas ir teisingus faktus."}]},

 "Nauda":{f:[
  {t:"Mokytojai, kurie DI naudoja kas savaitę, sako sutaupantys vidutiniškai 5,9 val. per savaitę (JAV, 2 232 mokytojai, jų pačių vertinimas).",s:"Gallup ir Walton Family Foundation, 2025-06",g:"B"},
  {t:"Turkija, ~1 000 gimnazistų: DI su užuominomis pratybose +127 %, egzamine be DI rezultatas nenukrito.",s:"Bastani ir kt., PNAS 2025",g:"B"},
  {t:"Harvardo fizika, 194 studentai: specialiai sukurtas DI tutorius, mokymosi prieaugis daugiau nei 2 kartus didesnis nei aktyvaus mokymosi paskaitoje.",s:"Kestin ir kt., Scientific Reports 2025",g:"A"},
  {t:"Nigerija: DI tutoriaus programa po pamokų, apie 0,3 standartinio nuokrypio prieaugis (darbo dokumentas).",s:"Pasaulio bankas, 2025",g:"B"}],
 e:[{t:"Ką daryti rytoj",d:"Sutaupytą laiką skirkite grįžtamajam ryšiui mokiniams, ne naujiems failams.",p:""}]},

 "Prisiminkite":{f:[
  {t:"Teisingas atsakymas B: modelis spėja žodžius ir pats faktų netikrina.",s:"",g:""},
  {t:"Prisiminimas be užrašų po pertraukos yra vienas tvirčiausių mokymosi būdų.",s:"",g:""},
  {t:"DI gali organizuoti kartojimą: prašykite klausimų, ne atsakymų.",s:"",g:""}],
 e:[{t:"Kartojimas tarpais",d:"Pamokos pradžioje 3 klausimai iš praeitos savaitės, be užrašų.",p:"Tema: [TEMA], [N] kl. Sukurk 3 kartojimo klausimus be atsakymų variantų, mokiniai atsako savais žodžiais. Atsakymus pateik atskirai."}]},

 "Rizikos":{f:[
  {t:"Turkijos tyrime mokiniai, kuriems DI tiesiog davė atsakymus, egzamine be DI surinko 17 % mažiau.",s:"Bastani ir kt., PNAS 2025",g:"B"},
  {t:"Švietimas pagal ES DI aktą yra didelės rizikos sritis (priėmimas, vertinimas, egzaminų stebėsena).",s:"ES DI aktas, III priedas, 3 p.",g:"A"},
  {t:"Didelės rizikos prievolės taikomos nuo 2027-12-02 (Digital Omnibus).",s:"Reglamentas (ES) 2026/1744",g:"B"},
  {t:"Claude naudotojai turi būti 18+. Gemini: Google nurodo „13 arba jūsų šalies amžiaus riba“, Lietuvos skaičiaus atskirai netikrinome; Workspace for Education paskyroje jį įjungia administratorius, jaunesniems nei 18 taikoma griežtesnė turinio politika.",s:"Anthropic sąlygos; Google Gemini pagalba ir Workspace for Education gidas, tikrinta 2026-11-10",g:"B"},
  {t:"BDAR: vaiko sutikimo riba 16 m., šalys gali ją sumažinti, bet ne žemiau 13.",s:"BDAR 8 str.",g:"A"}],
 e:[{t:"Duomenų šviesoforas",d:"Žalia: bendra medžiaga. Geltona: nuasmeninti darbai. Raudona: vardai, pažymiai, sveikata, nuotraukos niekada.",p:""}]},

 "Kaina":{f:[
  {t:"Claude: nemokamas planas; Pro 17 $/mėn. metinis arba 20 $ mėnesinis; Max nuo 100 $.",s:"claude.com/pricing, 2026-11-10",g:"B"},
  {t:"Gemini ir NotebookLM įskaičiuoti visose Google Workspace for Education versijose.",s:"Google Workspace for Education gidas",g:"B"},
  {t:"Microsoft: Copilot Chat su mokyklos A1/A3/A5 paskyra. Kainą ir amžiaus sąlygas tikrinkite oficialiame Microsoft Education puslapyje (mūsų šaltinis 2025-10).",s:"Microsoft Copilot in Education",g:"B"},
  {t:"„ChatGPT for Teachers“ skirtas JAV mokytojams, Lietuvoje neprieinamas. ChatGPT kainos rodomos pagal šalį.",s:"openai.com, chatgpt.com/pricing",g:"B"}],
 e:[{t:"Nemokamas kelias",d:"Jei mokykla turi Google Workspace for Education: Gemini ir NotebookLM per mokyklos paskyrą. Jei Microsoft: Copilot Chat. Asmeninės paskyros nereikia.",p:""}]},

 "Kitas žingsnis":{f:[
  {t:"Pradėkite nuo 5-10 min. bloko su laikmačiu, ne nuo sistemos.",s:"",g:""},
  {t:"Kris'o pamoka: didžiausia klaida buvo tobulinti sistemą vietoj darbo.",s:"",g:""},
  {t:"Telefone kiekvienas mato savo lygio kitą žingsnį ir užklausą.",s:"",g:""}],
 e:[{t:"Savaitės planas",d:"Pirmadienį 10 min.: viena užduotis iš BUP siekinio. Trečiadienį: panaudojate pamokoje. Penktadienį: 3 eilutės, kas suveikė.",p:""}]},

 "Ačiū":{f:[
  {t:"Medžiaga: skaidrės, 11 užklausų, šaltiniai su nuorodomis.",s:"",g:""},
  {t:"El. paštas renkamas tik su sutikimu; dirbtuvių varnelė nieko neįpareigoja.",s:"",g:""},
  {t:"Telefonuose šioje skaidrėje lieka atsiliepimo forma.",s:"",g:""}],
 e:[{t:"Kolegoms",d:"Pasidalinkite medžiagos nuoroda mokyklos IT mokytojų grupėje.",p:""}]},

 "Šaltiniai (priedas)":{f:[
  {t:"A: recenzuotas tyrimas ar teisės aktas. B: oficialus puslapis, didelė apklausa, darbo dokumentas. C: spauda, preprint.",s:"",g:""},
  {t:"Mokymų dizainas remiasi efektyvių mokytojų mokymų požymiais.",s:"Darling-Hammond ir kt. 2017; Desimone 2009",g:"A"},
  {t:"Kosmyna ir kt. 2025 (n = 54) yra preprint: įdomu, bet išvadų nedaryti.",s:"arXiv:2506.08872",g:"C"}],
 e:[{t:"Mokiniams",d:"Šaltinių lygius A/B/C galima naudoti ir klasėje, kai mokiniai vertina DI pateiktus šaltinius.",p:""}]}
};
if(typeof window!=='undefined')window.MENTOR=MENTOR;
