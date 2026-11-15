/* RA Vasara 2027 · tik deck'ui (NEkeliauja į telefono puslapį). [LT, EN].
   Šaltinis: research/ra-vasaros-stovyklos-2027/07-brainstorm-v2-palyginimai.md (patikrinta 2026-11-15). */

var RD_DEMO = [
  { u: 'https://claude.ai/artifact/P3CyVu41YfasyENx235oMW', n: ['ProKid: pirmoji pamoka', 'ProKid: the first lesson'], d: ['„Simuliacija 0“: 18 scenų nuotykis su Leo ir Spaikiu', '"Simulation 0": an 18-scene adventure with Leo and Spaikis'] },
  { u: 'https://claude.ai/artifact/HG3rMR5ee8Gsy5GkiUya3M', n: ['ProKid Pasaulis', 'ProKid World'], d: ['Žemėlapis, kova, namai, tėvų puslapis', 'The map, battles, home, the parent page'] },
  { u: 'https://claude.ai/artifact/G3DikehZfFPLurkC7WCeMD', n: ['Pamoka „Roboto ranka“', 'The "Robot Arm" lesson'], d: ['DR-E07, 5–6 m. neskaitantiems, ~10 min.', 'DR-E07, age 5–6 non-readers, ~10 min'] },
  { u: 'https://claude.ai/artifact/NvHVbYQMfmjdJCkL68LbmR', n: ['RA žaidimas: 13 žingsnių turas', 'The RA game: a 13-step tour'], d: ['Visa idėja nuo anonso iki kainų', 'The whole idea from trailer to pricing'] }
];

/* rizikos pastabos prie koncepcijų */
var RD_X = {
  dog: { risk: ['R1 gamintojo saugos lapas: ne arčiau kaip 1 m nuo žmonių, ne vaikams. Todėl R1 = šou už 2 m linijos, valdo tik mentorius. Mažas šuo (Petoi Bittle X) JAV ~$279, ES kaina ❓.', 'The R1 maker\'s safety sheet: no closer than 1 m to people, not for children. So R1 = a show behind a 2 m line, driven only by the mentor. Small dog (Petoi Bittle X) US ~$279, EU price ❓.'] },
  cup: { risk: ['VinciBot oficialiai 8+.', 'VinciBot is officially 8+.'] },
  vai: { risk: ['Kamera ir veidai: tik įrenginyje, tėvų sutikimas. Robotas kalba tik angliškai.', 'Camera and faces: on-device only, parent consent. The robot speaks English only.'] },
  tale: { risk: ['4–6 m. reikia ~1:6, ne 1:15. EN 71 dokumento neradom ⚠️. Lietuviško balso nėra.', 'Age 4–6 needs ~1:6, not 1:15. EN 71 document not found ⚠️. No Lithuanian voice.'] },
  duck: { risk: ['Reachy Mini: tik Python, pristatymas ~90 d. → užsakyti iki kovo. „Ankstyva versija“. Open Duck Mini neturi rinkinio: tai statybos projektas, ne 5 dienų stovykla.', 'Reachy Mini: Python only, delivery ~90 days → order by March. "Early version". Open Duck Mini has no kit: it is a build project, not a 5-day camp.'] },
  box: { risk: ['LEGO CS & AI rinkinys €339–519 (perpardavėjai), tad „dėžė namo“ už €399 gali neišeiti ❓.', 'LEGO CS & AI kit €339–519 (resellers), so "box goes home" at €399 may not work ❓.'] },
  mc: { risk: ['2026 m. serveris: 18 vaikų veikė, 14 strigo ⚠️. DI įrankių amžiaus taisyklės nepatikrintos.', '2026 server: 18 kids worked, 14 lagged ⚠️. AI tool age rules not checked.'] },
  gamer: { risk: ['Tėvų baimė „dar daugiau ekrano“: todėl kasdien sportas lauke, video tik tėvams. Žaidimų amžiaus žymos (PEGI) privalomos.', 'Parents fear "even more screen time": so outdoor sport every day, videos go to parents only. Game age ratings (PEGI) are a must.'] },
  creator: { risk: ['Vaikų atvaizdas: nieko viešai, tik tėvams. Platformų amžiaus riba 13 m.: paskyrų nekuriam. Pavadinimai „Oskarai“ ir „YouTuberių“ darbiniai: prieš pardavimą tikrina teisininkas ❓.', 'Children\'s image: nothing public, parents only. Platform age limit is 13: we create no accounts. The names "Oscars" and "YouTuber" are working titles: a lawyer checks before sale ❓.'] },
  xr: { risk: ['Meta paskyros nuo 10 m. su tėvų valdymu. Seanso trukmės rekomendacija ❓.', 'Meta accounts from age 10 with parent management. Session-length guidance ❓.'] },
  life: { risk: ['Maisto gaminimo su vaikais taisyklės LT ❓. Įrodymai silpni: nežadam „moksliškai įrodyta“.', 'LT rules for cooking with kids ❓. Evidence is thin: we do not promise "scientifically proven".'] },
  detox: { risk: ['Partnerių atranka turi būti atvira ir vienoda visiems. „Burbulai“ ⚠️ iš diktavimo: patikslinti.', 'Partner selection must be open and equal for all. "Bubbles" ⚠️ from dictation: confirm.'] },
  comp: { risk: ['Su Lituanica X dar nekalbėta ❓: tai pasiūlymas jiems, ne susitarimas. FIRST LEGO League keičia formatą ⚠️.', 'Not yet discussed with Lituanica X ❓: a proposal, no agreement yet. FIRST LEGO League is changing its format ⚠️.'] },
  lego: { risk: ['LEGO® yra prekės ženklas: stovyklos pavadinime rašom „kaladėlių“ ❓ teisininkas. 6–7 m. reikia 1 : 6 ir trumpesnių filmavimo blokų. Programėlės licencija ir kaina ❓.', 'LEGO® is a trademark: the camp name says "brick" ❓ lawyer. Age 6–7 needs 1 : 6 and shorter filming blocks. App licence and price ❓.'] },
  teen: { risk: ['Paauglys niekada neskaičiuojamas į mentorių santykį. Teistumo patikra galioja tik suaugusiems ❓ teisininkas.', 'A teen is never counted in the mentor ratio. Background checks apply to adults only ❓ lawyer.'] }
};

/* kur tai jau veikia: vienas įrodymas kiekvienai */
var RD_CMP = {
  dog: ['iCode (JAV franšizė) 2026 m. atnešė Unitree R1 į stovyklas. Su Unitree ar Petoi šunimis stovyklų neradom: LT konkurentų sąraše nėra.', 'iCode (US franchise) brought the Unitree R1 into camps in 2026. No camps with Unitree or Petoi dogs found: none on our LT competitor list.'],
  cup: ['iD Tech „BattleBots with VEX Robotics“ (iD Tech bazė nuo $949/sav. ⚠️), Brooklyn Robot Foundry $540/sav. LT konkurentų sąraše čempionato stovyklos nėra.', 'iD Tech "BattleBots with VEX Robotics" (iD Tech base from $949/week ⚠️), Brooklyn Robot Foundry $540/week. No championship camp on our LT competitor list.'],
  vai: ['Lavner (UCLA) „Robotics with AI Take-Home Robot“: $1 039/sav., 6–14 m., robotas lieka vaikui. LT konkurentų sąraše nėra.', 'Lavner (UCLA) "Robotics with AI Take-Home Robot": $1,039/week, age 6–14, the child keeps the robot. None on our LT list.'],
  tale: ['JAV: „Coding Fun with Bee-Bots“ $300/sav. (pusdienis), iSPACE Blue-Bots $340, 5–7 m. LT artimiausias: Bricks 4 Kidz €249.', 'US: "Coding Fun with Bee-Bots" $300/week (half day), iSPACE Blue-Bots $340, age 5–7. Closest in LT: Bricks 4 Kidz €249.'],
  duck: ['Ilinojaus universiteto MakerLab 2026: „AI Robotics with Reachy Mini“, 12+, $250/sav., iki 6 vaikų. LT konkurentų sąraše nėra.', 'University of Illinois MakerLab 2026: "AI Robotics with Reachy Mini", 12+, $250/week, up to 6 kids. None on our LT list.'],
  box: ['FIRST LEGO League „Future Edition“ nuo 2026 m. remiasi LEGO informatikos ir DI rinkiniais. LT konkurentų sąraše nėra.', 'FIRST LEGO League "Future Edition" is built on LEGO CS & AI kits from 2026. None on our LT list.'],
  mc: ['iD Tech „Minecraft Camp“: nuo $979/sav., 7–9 m. LT: Code Academy Kids turi Minecraft, bet vibe coding su DI LT sąraše nėra.', 'iD Tech "Minecraft Camp": from $979/week, age 7–9. LT: Code Academy Kids has Minecraft, but vibe coding with AI is not on the LT list.'],
  gamer: ['Creator Camp „YouTube Gamers“: 3 d. nuo $278 (A): vaikas filmuoja ir komentuoja savo žaidimą. Seton Hall e. sporto stovykla $600/sav. LT sąraše nėra.', 'Creator Camp "YouTube Gamers": 3 days from $278 (A): the child records and narrates their own gameplay. Seton Hall esports camp $600/week. None on our LT list.'],
  creator: ['Creator Camp „YouTube Creators“: 3 d. nuo $278, 8–13 m. (A). Į YouTube stovykloje nekeliama nieko: video tėvams el. paštu, sprendžia tėvai (A).', 'Creator Camp "YouTube Creators": 3 days from $278, age 8–13 (A). Nothing is uploaded to YouTube at camp: videos go to parents by email, parents decide (A).'],
  xr: ['iD Tech „VR Camp: Roblox and Meta Quest“: $1 249/sav., 10–12 m. Kopernik $285–345. LT konkurentų sąraše nėra.', 'iD Tech "VR Camp: Roblox and Meta Quest": $1,249/week, age 10–12. Kopernik $285–345. None on our LT list.'],
  life: ['Tokio pat neradom niekur: tik dalys. Kulinarijos savaitė $280, verslo stovykla $360–445 (JAV). LT: Niam Niam nuo €250. Čia galim būti pirmi.', 'We found no exact match anywhere: only parts. A cooking week $280, a business camp $360–445 (US). LT: Niam Niam from €250. We can be first here.'],
  detox: ['STEAMCamp (JAV): „100 % be ekranų“, $195 už 4 d., 5–14 m. Būrelių degustacijų viename neradom. LT sąraše „detox“ ženklo nėra.', 'STEAMCamp (US): "100 % screen-free", $195 for 4 days, age 5–14. No club-tasting format found. No "detox" brand on our LT list.'],
  comp: ['Lituanica X (LT komanda): FIRST Global auksas 2022, sidabras Panamoje. LT FTC čempionatas 2026-03 Vilniuje, 20 komandų. Stovyklos tam LT nėra.', 'Lituanica X: FIRST Global gold 2022, silver in Panama. LT FTC championship 2026-03 in Vilnius, 20 teams. No camp for it in LT.'],
  lego: ['Creator Camp (JAV) „Lego Animators“: 3 d. nuo $268, 8–13 m.; jaunių 5–7 m. versija $254. Kasdien naujas filmukas, 3 dieną finalas (A). LT sąraše nėra.', 'Creator Camp (US) "Lego Animators": 3 days from $268, age 8–13; a junior 5–7 version at $254. A new film every day, a finale on day 3 (A). None on our LT list.'],
  teen: ['Camp Invention: paaugliai moka $210 už lyderystės praktiką. Sudbury (Kanada) $215 už 4 sav., 13–16 m. iD Tech to nedaro. LT sąraše nėra.', 'Camp Invention: teens pay $210 for a leadership internship. Sudbury (Canada) $215 for 4 weeks, age 13–16. iD Tech does not do it. None on our LT list.']
};

var RD_WORLD = [
  { n: ['Camp Invention (JAV)', 'Camp Invention (US)'], sc: ['140 000+ vaikų per metus, 2 600 mokyklų', '140,000+ kids a year, 2,600 schools'], p: ['$310', '$310'], g: ['❓', '❓'], w: ['Vyksta mokyklose, veda mokytojai + paaugliai padėjėjai, vienas turinys visiems', 'Runs in schools, led by teachers + teen helpers, one curriculum for all'] },
  { n: ['Galileo (JAV)', 'Galileo (US)'], sc: ['570 000+ vaikų iš viso, 60+ vietų', '570,000+ kids in total, 60+ sites'], p: ['$450–620', '$450–620'], g: ['❓', '❓'], w: ['Savaitės temos, prailginta diena $45–110, nuolaida už kiekvieną kitą savaitę', 'Weekly themes, extended day $45–110, a discount for every extra week'] },
  { n: ['iD Tech (JAV)', 'iD Tech (US)'], sc: ['„50 000 per metus“ (jų teiginys ⚠️)', '"50,000 a year" (their claim ⚠️)'], p: ['$949–1 249', '$949–1,249'], g: ['8 : 1 ⚠️', '8 : 1 ⚠️'], w: ['Universitetų miesteliai, kursai pagal tai, ką vaikai myli, kopėčios: stovykla → nakvynė → 1:1 online', 'University campuses, courses named after what kids love, a ladder: camp → overnight → 1:1 online'] },
  { n: ['Steve & Kate\'s (JAV)', 'Steve & Kate\'s (US)'], sc: ['❓', '❓'], p: ['$570–700', '$570–700'], g: ['❓', '❓'], w: ['Vaikas pats renkasi veiklą, 8:00–18:00, dienos bilietas $129', 'The child chooses the activity, 8:00–18:00, a day pass at $129'] },
  { n: ['Code Ninjas (JAV)', 'Code Ninjas (US)'], sc: ['308 centrai', '308 centres'], p: ['~$250 pusd.', '~$250 half day'], g: ['❓', '❓'], w: ['Franšizė: metų klubas + stovyklos + gimtadieniai toje pačioje erdvėje', 'A franchise: a year-round club + camps + birthdays in the same space'] },
  { n:['Creator Camp (JAV)','Creator Camp (US)'], sc:['30+ vietų, nuo 2021 m. (B)','30+ sites, since 2021 (B)'], p:['3 d. $268–278 · 2 d. $176–186 (A)','3 days $268–278 · 2 days $176–186 (A)'], g:['6–30 klasėje, 5–13 m. (A)','6–30 per class, age 5–13 (A)'], w:['Parduoda vaidmenį („Holivudo režisierius“), 2–3 d. modulis, finalas „Oskarai“, savas iPad arba nuoma','Sells a role ("Hollywood Filmmaker"), 2–3 day module, an "Oscars" finale, own iPad or rental'] },
  { ra: 1, n: ['Robotikos akademija', 'Robotikos akademija'], sc: ['3 682 pardavimai 2026 m.', '3,682 sales in 2026'], p: ['€199–299', '€199–299'], g: ['iki 1 : 15', 'up to 1 : 15'], w: ['Sava visata ir personažai, NPS +86, būreliai ištisus metus, robotai perpardavėjo kaina', 'Our own universe and characters, NPS +86, year-round clubs, robots at the reseller price'] }
];
var RD_WORLD_NOTE = ['Kainos už savaitę, dieninė stovykla. Santykių ir pajamų dauguma neskelbia ❓; iD Tech pajamų įverčiai prieštarauja vienas kitam, todėl jų nerodom. Šaltiniai: 07 palyginimų lapas.', 'Prices per week, day camp. Most publish no ratios or revenue ❓. Sources: research sheet 07.'];
var RD_WORLD_SO = [
  ['Didžiausi auga per mokyklas ir vieną pakartojamą turinį, ne per brangią įrangą', 'The biggest grow through schools and one repeatable curriculum, not through expensive equipment'],
  ['Visi uždirba iš priedų: prailginta diena, pietūs, antra savaitė', 'All of them earn from add-ons: extended day, lunch, a second week'],
  ['Paauglių padėjėjų modelis veikia masiškai (Camp Invention)', 'The teen-helper model works at scale (Camp Invention)'],
  ['Mes kainuojam 3–5 kartus pigiau už JAV: lyginam idėjas', 'We cost 3–5 times less than the US: we compare ideas'],
  ['Savos visatos ir žaidimo neturi nė vienas iš jų', 'None of them has its own universe and game']
];

/* Kodėl kūrėjų stovykla: duomenys. Šaltinis: 09-creator-camp + duomenų paieška 2026-11-15.
   (B) = institucijos ataskaita, puslapis atidarytas · ⚠️ = matyta tik paieškos santraukoje, neatidaryta. */
var RD_WHY_URL = 'https://www.youtube.com/watch?v=NIA5fO9ja1Y';
var RD_WHY_STORY = ['<b>Jų istorija (1:45, anglų k.):</b> penki draugai vaikystėje norėjo kurti filmus, bet neturėjo priemonių, o mokykloje nebuvo praktinių kūrybos pamokų su technologijomis. Užaugę sukūrė 3 dienų stovyklą. Per 2 metus: 600+ vaikų ir 2 000+ filmų (jų teiginys). Vaikas pereina visą kelią: scenarijus, filmavimas, montažas, premjera per „Oskarus“.', '<b>Their story (1:45, English):</b> five friends wanted to make movies as kids but lacked the resources, and school had no hands-on creative classes with technology. As adults they built a 3-day camp. In 2 years: 600+ kids and 2,000+ movies (their claim). A child goes the whole way: storyboard, filming, editing, a premiere at the "Oscars".'];
var RD_WHY = [
  [['3 iš 4 JAV paauglių YouTube naudoja kasdien, TikTok 61 %', '3 in 4 US teens use YouTube daily, TikTok 61 %'], ['Pew 2025, n = 1 458 (B)', 'Pew 2025, n = 1,458 (B)']],
  [['8–12 m. vaikai „YouTuberį“ renkasi ~3 kartus dažniau nei „astronautą“: ~30 % ir ~11 %', 'Kids age 8–12 pick "YouTuber" ~3 times more often than "astronaut": ~30 % vs ~11 %'], ['LEGO / Harris 2019, JAV ir JK ⚠️', 'LEGO / Harris 2019, US and UK ⚠️']],
  [['0–8 m.: apie 2,5 val. ekrano per dieną, žaidimai +65 % per 4 metus', 'Age 0–8: about 2.5 h of screen a day, gaming +65 % in 4 years'], ['Common Sense 2025 (B)', 'Common Sense 2025 (B)']],
  [['Tik 29 % 8–17 m. patys aktyviai skelbia: dauguma žiūri, ne kuria', 'Only 29 % of 8–17s actively post: most watch, they do not create'], ['Ofcom 2025, JK (B)', 'Ofcom 2025, UK (B)']],
  [['Tinka ir mergaitėms: savo video skelbė 52 % mergaičių ir 41 % berniukų (12–17 m.)', 'It fits girls too: 52 % of girls and 41 % of boys have posted own videos (age 12–17)'], ['Ofcom 2023, JK ⚠️', 'Ofcom 2023, UK ⚠️']],
  [['MrBeast 513 mln., IShowSpeed 60,8 mln. prenumeratorių', 'MrBeast 513M, IShowSpeed 60.8M subscribers'], ['Tubefilter 2026-08 (B)', 'Tubefilter 2026-08 (B)']],
  [['Lietuva: YouTube ir TikTok minučių neradom', 'Lithuania: no YouTube or TikTok minutes found'], ['❓', '❓']]
];
var RD_WHY_RA = [
  ['<b>Masinė ir pigesnė:</b> 2, 3 ar 5 dienos arba 2 savaitės. Kaskart kitas filmas, tie patys įrankiai', '<b>Mass and cheaper:</b> 2, 3 or 5 days, or 2 weeks. A different movie every time, the same tools'],
  ['<b>Įranga:</b> šeima nuomojasi mūsų planšetę, naudojam tą patį LEGO ir žalią ekraną. Papildomus rinkinius galima pirkti', '<b>Equipment:</b> the family rents our tablet, we reuse the same LEGO and green screen. Extra kits can be bought'],
  ['<b>Įgūdžiai:</b> papasakoti istoriją, parduoti idėją, dirbti komandoje', '<b>Skills:</b> telling a story, selling an idea, working in a team'],
  ['<b>Žinomi YouTube kūrėjai</b> kaip mentoriai ir ambasadoriai. Kaina ir vaikų apsaugos taisyklės ❓', '<b>Well-known YouTube creators</b> as mentors and ambassadors. Cost and child-safety rules ❓'],
  ['<b>„RA Oskarai“</b> = tai, ką tėvai pamato ir kuo dalinasi. Tik su tėvų sutikimu', '<b>"RA Oscars"</b> = what parents see and share. Only with parent consent']
];
var RD_WHY_FLAG = ['Sąžiningai: „visi vaikai nori būti YouTuberiais“ duomenys nepatvirtina, tai ~30 % (2019). Platformos nuo 13 m.: vaikų paskyrų nekuriam, šlovės nežadam. Kad stovykla ugdo komandinį darbą, tvirtų įrodymų neturim.', 'Honestly: the data does not support "all kids want to be YouTubers", it is ~30 % (2019). Platforms are 13+: we create no child accounts and promise no fame. We have no solid evidence that a camp builds teamwork.'];

var RD_GAPS = [
  { f: ['1:1 online pamokos', '1:1 online lessons'], w: ['iD Tech: $79/val., 12 pamokų $816', 'iD Tech: $79/hour, 12 lessons $816'], ra: ['Mentorius tęsia vaiko projektą po stovyklos: 25–35 €/val.', 'The mentor continues the child\'s project after camp: €25–35/hour'] },
  { f: ['Prailginta diena', 'Extended day'], w: ['Galileo $45–110/sav., Code Ninjas $60 + $60', 'Galileo $45–110/week, Code Ninjas $60 + $60'], ra: ['7:30–9:00 ir 17:00–18:00: +25–35 €/sav.', '7:30–9:00 and 17:00–18:00: +€25–35/week'] },
  { f: ['Nakvynės stovykla', 'Overnight camp'], w: ['iD Tech nuo $679/sav. už nakvynę ir maistą; Camp Computer $1 795', 'iD Tech from $679/week for room and board; Camp Computer $1,795'], ra: ['1 pamaina 11–14 m. su partnerio baze: testas 2028', '1 session for age 11–14 at a partner site: a 2028 test'] },
  { f: ['Paauglių akademija', 'Teen academy'], w: ['iD Tech universitete: 2 sav. nuo $1 229 ⚠️', 'iD Tech on campus: 2 weeks from $1,229 ⚠️'], ra: ['2 sav. 13–18 m. universitete: varžybų robotai, DI, kūrėjai', '2 weeks for age 13–18 on a campus: competition robots, AI, creators'] },
  { f: ['Robotas keliauja namo', 'The robot goes home'], w: ['Lavner: $1 039/sav. su robotu', 'Lavner: $1,039/week with the robot'], ra: ['Mūsų stiprybė: robotą perkam pigiau nei kiti', 'Our strength: we buy the robot cheaper than others'] },
  { f: ['Foto ir video paketas', 'Photo and video pack'], w: ['Miniyowe (Kanada) $100; kitur $25', 'Miniyowe (Canada) $100; elsewhere $25'], ra: ['Atsiminimų paketas 12–19 €', 'The memory pack €12–19'] },
  { f: ['Mokama jaunimo praktika', 'Paid youth internship'], w: ['Camp Invention $210; Camp Computer $1 395 / 2 sav.', 'Camp Invention $210; Camp Computer $1,395 / 2 weeks'], ra: ['Jaunųjų mentorių akademija 99–199 €', 'The Junior Mentor Academy €99–199'] },
  { f: ['Pusdienis × 2', 'Half day × 2'], w: ['Code Ninjas: pusdienis $250, du kartu $450', 'Code Ninjas: half day $250, two together $450'], ra: ['Rytas viena tema, popietė kita: dvi stovyklos per dieną', 'One theme in the morning, another after lunch: two camps a day'] },
  { f: ['Atributikos rinkinys', 'Merch kit'], w: ['Camp Beaumont (JK) £35: marškinėliai, kuprinė, kepurė, gertuvė', 'Camp Beaumont (UK) £35: T-shirt, backpack, cap, bottle'], ra: ['RA rinkiniai 19–59 €', 'RA bundles €19–59'] },
  { f: ['Licencija ar franšizė', 'Licence or franchise'], w: ['Code Ninjas: mokestis ~$45 000 ⚠️, 308 centrai', 'Code Ninjas: fee ~$45,000 ⚠️, 308 centres'], ra: ['Mūsų stovyklos turinys kitiems būreliams per ExoClass', 'Our camp curriculum licensed to other clubs through ExoClass'] }
];
var RD_GAPS_NOTE = ['RA versijos ir kainos 🅰️ siūlymai. Kiek tėvų perka priedus: viešų skaičių nėra ❓. Gimtadienių ir įmonių dienų kainų neradom.', 'RA versions and prices are 🅰️ proposals. How many parents buy add-ons: no public numbers ❓. Birthday and corporate-day prices not found.'];

var RD_PRICE_EXTRA = [
  ['<b>Šuo, pigi:</b> Petoi Bittle X ~$279 (JAV), 10+. ES kaina ❓', '<b>Dog, cheaper:</b> Petoi Bittle X ~$279 (US), 10+. EU price ❓'],
  ['<b>Šuo, vidutinė:</b> XGO-Mini2 €1 151', '<b>Dog, mid:</b> XGO-Mini2 €1,151'],
  ['<b>Šuo, brangi:</b> Unitree Go2 Air €2 699, demonstracijai', '<b>Dog, premium:</b> Unitree Go2 Air €2,699, for demos'],
  ['<b>Antis Microduck</b> (Pollen, Hugging Face): $399, surinkta', '<b>Microduck</b> (Pollen, Hugging Face): $399, assembled'],
  ['<b>Reachy Mini:</b> Lite $399, belaidis $499, pristatymas ~90 d.', '<b>Reachy Mini:</b> Lite $399, Wireless $499, delivery ~90 days'],
  ['<b>Open Duck Mini:</b> dalys < $400 ⚠️, rinkinio nėra, reikia 3D spausdinti', '<b>Open Duck Mini:</b> parts < $400 ⚠️, no kit, needs 3D printing'],
  ['<b>Humanoidas R1:</b> Air $4 900, R1 $5 900, EDU £14 160 (JK). RA jau turi', '<b>R1 humanoid:</b> Air $4,900, R1 $5,900, EDU £14,160 (UK). RA already owns one'],
  ['<b>DI dėžė:</b> LEGO CS &amp; AI €339–519 ⚠️ · mBot2 ~€200 · HuskyLens 2 ~€90', '<b>AI box:</b> LEGO CS &amp; AI €339–519 ⚠️ · mBot2 ~€200 · HuskyLens 2 ~€90']
];

var RD_PACK_HOME = [
  ['Kiekvienai stovyklai savas: 4 savaitės × 3 misijos ta pačia tema', 'One per camp: 4 weeks × 3 missions on the same theme'],
  ['Trumpi mentoriaus video, užduotys su daiktais iš namų, spausdinami lapai', 'Short mentor videos, tasks with things from home, printable sheets'],
  ['Skyrius RA ProKid žaidime su tos stovyklos personažais', 'A chapter in the RA ProKid game with that camp\'s characters'],
  ['Sukuriam vieną kartą, parduodam kiekvienam vaikui, kiekvienais metais', 'We make it once and sell it to every child, every year'],
  ['Galima parduoti ir tiems, kas stovykloje nebuvo', 'It can also be sold to those who were not at camp'],
  ['Kaina: 10 % stovyklos kainos, t. y. €15–35', 'Price: 10 % of the camp price, that is €15–35']
];
var RD_PACK_HOME_MATH = ['🤖 Jei perka 20 % iš 3 682 pirkėjų po ~€21: ≈ €15 500 per vasarą, beveik be sąnaudų. Kiek pirks iš tikrųjų: ❓. Testas: viena tema, viena pamaina.', '🤖 If 20 % of 3,682 buyers take it at ~€21: ≈ €15,500 per summer, at almost no cost. How many will really buy: ❓. Test: one theme, one session.'];
var RD_PACK_MEM = [
  ['Kasdien 5 nuotraukos tėvams į telefoną', '5 photos a day to the parents\' phone'],
  ['Penktadienį: 60 s vaiko savaitės filmukas', 'On Friday: a 60 s film of the child\'s week'],
  ['Spausdintas diplomas su RA personažu', 'A printed diploma with an RA character'],
  ['Komandos nuotrauka su robotu, skaitmeninis albumas', 'A team photo with the robot, a digital album'],
  ['Brangesnė versija: spausdinta nuotraukų knygelė', 'Premium version: a printed photo book']
];
var RD_PACK_MEM_NOTE = ['Atskaitos: Miniyowe (Kanada) $100, kitur $25. Reikia tėvų sutikimo fotografuoti ir žmogaus, kuris filmuoja: jaunieji mentoriai.', 'Anchors: Miniyowe (Canada) $100, elsewhere $25. Needs parent consent for photos and someone to film: the junior mentors.'];

var RD_MERCH = [
  { e: '🥤', n: ['Gertuvė', 'Water bottle'], p: '€12–15', d: ['su savo vardu', 'with the child\'s name'] },
  { e: '🧢', n: ['Kepurė', 'Cap'], p: '€10–12', d: ['stovyklos spalva', 'in the camp colour'] },
  { e: '👕', n: ['Marškinėliai', 'T-shirt'], p: '€15–18', d: ['Leo, Maja, Neo, Vėtra', 'Leo, Maja, Neo, Vėtra'] },
  { e: '🎒', n: ['Kuprinė', 'Backpack'], p: '€25–35', d: ['arba maišelis €8–10', 'or a drawstring bag €8–10'] },
  { e: '📓', n: ['Išradėjo žurnalas', 'Inventor\'s journal'], p: '€6–9', d: ['užrašams ir brėžiniams', 'for notes and sketches'] },
  { e: '✏️', n: ['Pieštukai ir rašikliai', 'Pencils and pens'], p: '€3–6', d: ['rinkinys su personažais', 'a set with the characters'] },
  { e: '🏷️', n: ['Lipdukai ir ženkliukai', 'Stickers and badges'], p: '€2–4', d: ['už kiekvieną įgūdį', 'one per skill earned'] },
  { e: '🧸', n: ['Pliušinis Leo ar robotas', 'Plush Leo or robot'], p: '€15–22', d: ['mažiesiems 4–7 m.', 'for ages 4–7'] },
  { e: '🖍️', n: ['Spalvinimo ir užduočių knyga', 'Colouring and activity book'], p: '€5–8', d: ['su Tale-Bot pasakomis', 'with the Tale-Bot stories'] },
  { e: '🃏', n: ['Personažų kortelės', 'Character cards'], p: '€5–9', d: ['kolekcinės, mainams', 'collectible, for trading'] },
  { e: '🧥', n: ['Džemperis', 'Hoodie'], p: '€29–35', d: ['paaugliams ir mentoriams', 'for teens and mentors'] },
  { e: '🍱', n: ['Pietų dėžutė', 'Lunch box'], p: '€9–12', d: ['stovyklai ir mokyklai', 'for camp and school'] }
];
var RD_MERCH_NOTE = ['Kainos 🅰️. Atskaitos: JAV stovyklų marškinėliai $12–18, gertuvė $10–20, džemperis $35; savikaina ~$8–10, t. y. apie pusę kainos. Kiek tėvų perka: skaičių nėra ❓.', 'Prices 🅰️. Anchors: US camp T-shirt $12–18, bottle $10–20, hoodie $35; unit cost ~$8–10, about half the price. How many parents buy: no numbers ❓.'];
var RD_MERCH_AGE = [
  ['<b>4–6 m.:</b> pliušinis, spalvinimo knyga, lipdukai', '<b>Age 4–6:</b> plush, colouring book, stickers'],
  ['<b>7–9 m.:</b> gertuvė, kepurė, kortelės, žurnalas', '<b>Age 7–9:</b> bottle, cap, cards, journal'],
  ['<b>10–12 m.:</b> marškinėliai, kuprinė, žurnalas', '<b>Age 10–12:</b> T-shirt, backpack, journal'],
  ['<b>13 m. ir vyresni:</b> džemperis, be vaikiškų piešinių', '<b>Age 13 and up:</b> hoodie, no childish artwork'],
  ['<b>Starto rinkinys €19:</b> marškinėliai + gertuvė', '<b>Starter kit €19:</b> T-shirt + bottle'],
  ['<b>Stovyklautojo rinkinys €35:</b> + kepurė + maišelis + žurnalas', '<b>Camper kit €35:</b> + cap + bag + journal'],
  ['<b>Pilnas rinkinys €59:</b> + kuprinė + pliušinis ar džemperis', '<b>Full kit €59:</b> + backpack + plush or hoodie'],
  ['Užsakoma registruojantis: gaminam tik tiek, kiek nupirkta', 'Ordered at sign-up: we produce only what was bought']
];

var RD_CHECKS = [
  ['Rašytinis Matata kainoraštis RA: 100 ir 1 000 vnt.', 'A written Matata price list for RA: 100 and 1,000 units'],
  ['2 patalpų pasiūlymai 50–100 vaikų + valgykla', '2 venue quotes for 50–100 kids + canteen'],
  ['Higienos normos ir Vilniaus 2027 konkurso taisyklės', 'Hygiene norms and Vilnius 2027 tender rules'],
  ['2026 vasaros P&L pagal temą ir miestą', 'Summer 2026 P&L by theme and city'],
  ['R1 ir šunų saugos taisyklės darbui šalia vaikų', 'R1 and dog safety rules for working near children'],
  ['Pokalbis su Lituanica X dėl varžybų stovyklos', 'A talk with Lituanica X about the competition camp'],
  ['3 gamintojų atributikos kainos ir mažiausias tiražas', 'Merch prices from 3 makers and the minimum run'],
  ['€20 depozito puslapis koncepcijoms laimėtojoms', 'A €20 deposit page for the winning concepts']
];

/* iš sintetinės vadovų panelės (research 08): hipotezė, ne tikri atsakymai */
var RD_QA = [
  { q: ['Kiek uždirbam iš kiekvienos koncepcijos?', 'How much do we earn on each concept?'],
    a: ['Maržos pagal koncepciją dar nėra ❓. Tik masinė: €179 × 75 vaikai ≈ 45 % įnašo 🤖 ant prielaidų.', 'No margin per concept yet ❓. Only the mass camp: €179 × 75 kids ≈ 45 % contribution 🤖, on assumptions.'] },
  { q: ['Ar tai gerina pelningumą, ne tik pajamas?', 'Does this improve profit, not only revenue?'],
    a: ['€676,5K yra pajamos. P&L pagal temą ir miestą neturim ❓: tai pirmas patikrinimas iki 12-01.', '€676.5K is revenue. We have no P&L by theme and city ❓: that is the first check by 12-01.'] },
  { q: ['Sutarėm: inovacija = kaina ir formatas. Kodėl 14 temų?', 'We agreed: innovation = price and format. Why 14 themes?'],
    a: ['Tą sprendimą atitinka masinės koncepcijos, kitos yra eksperimentai. Prašom išrinkti 3–4, ne tvirtinti 14.', 'The mass concepts fit that decision, the rest are experiments. We ask you to pick 3–4, not approve 14.'] },
  { q: ['Kas tiekia robotus ir už kiek?', 'Who supplies the robots and at what price?'],
    a: ['Baltic Orbis, oficialus Matata atstovas. RA perka perpardavėjo kaina; kainoraštis raštu iki 12-01 ❓.', 'Baltic Orbis, the official Matata representative. RA buys at the reseller price; written list by 12-01 ❓.'] },
  { q: ['Kur telpa 50–100 vaikų ir kiek reikia mentorių?', 'Where do 50–100 kids fit and how many mentors do we need?'],
    a: ['Vietų ir datų dar nėra ❓. 100 vaikų: 7 mentoriai prie 1:15, 13 prie 1:8. 2 patalpų pasiūlymai iki 12-01.', 'No venues or dates yet ❓. 100 kids: 7 mentors at 1:15, 13 at 1:8. 2 venue quotes by 12-01.'] },
  { q: ['Ar 1:15 ir R1 saugu šalia vaikų?', 'Are 1:15 and the R1 safe around children?'],
    a: ['1:15 tik 7–12 m.; 4–6 m. reikia ~1:6. R1 tik šou už 2 m linijos. Higienos norma ❓ iki 12-01.', '1:15 only for age 7–12; age 4–6 needs ~1:6. R1 is a show behind a 2 m line. Hygiene norm ❓ by 12-01.'] },
  { q: ['Ar pigi stovykla nesuvalgys €299 stovyklų?', 'Will a cheap camp eat our €299 camps?'],
    a: ['Jei 20 % pereina į €179: ≈ −€85K; viena 75 vaikų vieta per 8 sav. ≈ +€48K 🤖. Todėl testuojam vienoje vietoje.', 'If 20 % switch to €179: ≈ −€85K; one 75-kid site over 8 weeks ≈ +€48K 🤖. So we test at one site.'] },
  { q: ['Ar tėvai pirks priedus ir kas sukurs turinį?', 'Will parents buy add-ons and who builds the content?'],
    a: ['Kiek perka priedus: skaičių nėra ❓, testas €20 depozitu. Paruoštos tik 4 Minecraft pamokos.', 'Add-on buy rates: no numbers ❓, test with a €20 deposit. Only 4 Minecraft lessons are ready.'] }
];
var RD_MISSING = [
  ['Marža kiekvienai koncepcijai: įranga, mentoriai, patalpos', 'Margin per concept: equipment, mentors, venue'],
  ['2026 vasaros P&L pagal temą ir miestą', 'Summer 2026 P&L by theme and city'],
  ['2027 vietos, datos, talpa ir kiek mentorių samdom', '2027 venues, dates, capacity and how many mentors we hire'],
  ['Rašytinis robotų kainoraštis 100 ir 1 000 vnt.', 'A written robot price list for 100 and 1,000 units'],
  ['5 dienų programa ir pamokų planai: kas kuria, iki kada', '5-day programme and lesson plans: who builds them, by when'],
  ['Tėvų paklausa: €20 depozito testas kiekvienam miestui', 'Parent demand: a €20 deposit test in each city']
];

/* Creator Camp video: jų autorių teisės, jų stovyklautojai kadre. TIK vidiniam rodymui kambaryje, niekada telefono puslapyje. */
var RD_VID = {
  creator: { s: 'media/cc-overview-lt.mp4', t: ['Creator Camp video (DI įgarsinimas) · tik vidiniam rodymui', 'Creator Camp video (AI dub) · internal screening only'] },
  lego: { s: 'media/cc-kids-animations.mp4', t: ['Creator Camp vaikų animacijos · tik vidiniam rodymui', 'Creator Camp kid-made animations · internal screening only'] }
};

/* ---------- v3 (Kris peržiūra 2026-11-15 23:30) ---------- */
RD_X.dog = { risk: ['Idėja, ne bestseleris: visi RA šunys vienoje vietoje, viena pamaina. R1 gamintojas: ne arčiau kaip 1 m nuo žmonių, todėl valdo tik mentorius už 2 m linijos.', 'An idea, not a bestseller: all RA dogs in one place, one session. The R1 maker: no closer than 1 m to people, so only the mentor drives it behind a 2 m line.'] };
RD_X.gamer = { risk: ['RA KidsTube = vaikų video ir asmens duomenys: uždara platforma, rašytinis tėvų sutikimas ❓ teisininkas. PEGI žymos privalomos.', 'RA KidsTube = children\'s videos and personal data: a closed platform, written parent consent ❓ lawyer. PEGI ratings are a must.'] };
RD_X.lego.risk = ['Papildomi kaladėlių rinkiniai namams per partnerį perpardavėją: partnerio dar nėra ❓. LEGO® yra prekės ženklas: pavadinime rašom „kaladėlių“. 6–7 m. reikia 1 : 6.', 'Extra brick kits for home through a reseller partner: no partner yet ❓. LEGO® is a trademark: the name says "brick". Age 6–7 needs 1 : 6.'];
RD_X.duck.risk = ['Kainos: Reachy Mini Lite €350, belaidis €435, Microduck €340. Tik Python, pristatymas ~90 d. → užsakyti iki kovo. Open Duck Mini neturi rinkinio.', 'Prices: Reachy Mini Lite €350, Wireless €435, Microduck €340. Python only, delivery ~90 days → order by March. Open Duck Mini has no kit.'];
RD_X.xr = { risk: ['WebXR veikia naršyklėje: nereikia parduotuvės ir diegimo. Meta paskyros nuo 10 m. su tėvų valdymu. VR seanso trukmės rekomendacija ❓.', 'WebXR runs in the browser: no store and no install. Meta accounts from age 10 with parent management. VR session-length guidance ❓.'] };
RD_X.detox = { risk: ['Technologijų etiketo pagrindas jau yra (RA / Kris projektas). Partnerių būrelių atranka atvira ir vienoda visiems.', 'The technology etiquette base already exists (an RA / Kris project). Partner club selection is open and equal for all.'] };
RD_X.teen = { risk: ['Mažina mentorių sąnaudas, bet paauglys niekada neskaičiuojamas į mentorių santykį. Socialinių valandų įskaitymas ir darbo teisė ❓ teisininkas.', 'It lowers mentor cost, but a teen is never counted in the mentor ratio. Social-hours credit and labour law ❓ lawyer.'] };

/* nuorodos, kurias galima atidaryti iš koncepcijos skaidrės (naujame lange) */
var RD_LINKS = {
  mc: [{ u: 'https://krisvas333.github.io/ra-minecraft/', n: ['Mūsų Minecraft puslapis', 'Our Minecraft page'] }],
  cup: [], dog: [], duck: [], comp: []
};

var RD_PROBLEM = ['Premium stovyklos lubas jau pasiekėm. Reikia inovacijų grupių dydyje, formatuose, įrankiuose, vertės pasiūlyme ir kainodaroje.', 'We already reach the limits of our premium summer camp. We need to innovate in group sizes, formats, tools, the value offer and pricing.'];

/* piktogramos įkvėpimo skaidrėms: eilės tvarka pagal <li> */
var RD_PIC = {
  alpha: ['🌅', '🧸', '📱', '🎯', '💵', '🎯', '🎤', '👏', '🧭', '🛠️'],
  idtech: ['🏛️', '📦', '🍽️', '🤝', '🎓'],
  creatorcamp: ['🎭', '📅', '🏆', '📱', '✉️', '🏷️', '🧪', '🏆', '🧱', '🏫'],
  ccgaps: ['🗓️', '🏆', '🧒', '📱', '🧢', '🎟️', '✅', '🔁', '🍎', '📋']
};
var RD_PIC_TR = { idtech: ['🏛️', '🪜', '📜', '💸', '🍽️', '💳', '❤️', '💵'], ccprice: ['3️⃣', '2️⃣', '🧒', '📦', '🎟️', '👨‍👩‍👧', '✅', '🔁'] };

/* potencialas 🤖: pajamos, ne pelnas; bazė = 3 682 pirkėjai 2026 m. */
var RD_UPSIDE = [
  { n: ['Atributikos rinkinys €35', 'Merch kit €35'], v: ['€12,9K', '€25,8K', '€38,7K'] },
  { n: ['Prailginta diena €30/sav.', 'Extended day €30/week'], v: ['€11,0K', '€22,1K', '€33,1K'] },
  { n: ['Namų tęsinys ~€21', 'Home sequel ~€21'], v: ['€7,7K', '€15,5K', '€23,2K'] },
  { n: ['Atsiminimų paketas €15', 'Memory pack €15'], v: ['€5,5K', '€11,0K', '€16,6K'] },
  { n: ['Iš viso 4 priedai', 'All 4 add-ons'], v: ['€37K', '€74K', '€112K'], sum: 1 }
];
var RD_UPSIDE_NOTE = ['🤖 Jei perka 10 / 20 / 30 % iš 3 682 pardavimų (unikalių šeimų mažiau ⚠️). Tai pajamos, ne pelnas; kiek pirks iš tikrųjų: ❓. Atskirai: ProKid žaidimas ~€9K / €39K / €115K per metus, viena masinė 75 vaikų vieta per 8 sav. ≈ +€48K įnašo.', '🤖 If 10 / 20 / 30 % of 3,682 sales take it (unique families are fewer ⚠️). This is revenue, not profit; real uptake: ❓. Separately: the ProKid game ~€9K / €39K / €115K a year, one 75-kid mass site over 8 weeks ≈ +€48K contribution.'];
var RD_MERCH_30 = ['🤖 Jei 30 % stovyklų pirkėjų (1 105 iš 3 682 pardavimų; unikalių šeimų mažiau ⚠️) nuperka rinkinį: Starto €19 ≈ €21K · Stovyklautojo €35 ≈ €38,7K · Pilnas €59 ≈ €65K pajamų. Savikaina apie pusę ⚠️.', '🤖 If 30 % of camp buyers (1,105 of 3,682 sales; unique families are fewer ⚠️) buy a kit: Starter €19 ≈ €21K · Camper €35 ≈ €38.7K · Full €59 ≈ €65K revenue. Unit cost about half ⚠️.'];
var RD_SRC = [
  ['matatastudio.lt', 'https://matatastudio.lt'], ['baltic-orbis.lt', 'https://baltic-orbis.lt'], ['shop.matatastudio.com', 'https://shop.matatastudio.com'],
  ['idtech.com', 'https://www.idtech.com'], ['alpha.school', 'https://alpha.school'], ['creatorcamp.org', 'https://creatorcamp.org'],
  ['pollen-robotics.com', 'https://www.pollen-robotics.com'], ['Open Duck Mini', 'https://github.com/apirrone/Open_Duck_Mini'],
  ['RA Minecraft', 'https://krisvas333.github.io/ra-minecraft/']
];

/* v3: tyrimų drop-in 2026-11-15 23:55 (kita sesija; ⚠️ = neatidarytas šaltinis) */
RD_X.life = { risk: ['Pagrindas: PSO 2020; Diamond ir Lee 2011, Durlak 2011, EEF ⚠️. Savaitė duoda praktiką, ne įrodytą pokytį.', 'Basis: WHO 2020; Diamond and Lee 2011, Durlak 2011, EEF ⚠️. A week gives practice, not proven change.'] };
RD_X.duck.risk = ['Kainos: Reachy Mini Lite $399, belaidis $499 (oficialus puslapis 11-15, be mokesčių ir siuntimo); ES ~€350 / €435 ⚠️; Microduck €340. Tik Python, pristatymas ~90 d. Open Duck Mini neturi rinkinio.', 'Prices: Reachy Mini Lite $399, Wireless $499 (official page 11-15, before tax and shipping); EU ~€350 / €435 ⚠️; Microduck €340. Python only, delivery ~90 days. Open Duck Mini has no kit.'];
RD_LINKS.dog = [{ u: 'https://www.youtube.com/watch?v=6zPvT0ig1VM', n: ['Unitree Go2 (oficialus)', 'Unitree Go2 (official)'] }, { u: 'https://www.youtube.com/@UnitreeRobotics', n: ['R1 video: Unitree kanalas', 'R1 videos: Unitree channel'] }];
RD_LINKS.cup = [{ u: 'https://www.youtube.com/watch?v=6cgJyVzgHWk', n: ['VinciBot lenktynės', 'VinciBot race'] }, { u: 'https://www.youtube.com/watch?v=xAn9az7MhHA', n: ['VinciBot kovos', 'VinciBot warrior'] }];
RD_LINKS.duck = [{ u: 'https://www.youtube.com/watch?v=yvBbcLCZIhg', n: ['Reachy Mini apžvalga', 'Reachy Mini review'] }, { u: 'https://pollen-robotics.com/reachy-mini/', n: ['Kaina', 'Price'] }];
RD_LINKS.mc = [{ u: 'https://www.youtube.com/watch?v=i2elgg8Q4r8', n: ['Minecraft Education: DI', 'Minecraft Education: AI'] }, { u: 'https://krisvas333.github.io/ra-minecraft/', n: ['Mūsų puslapis', 'Our page'] }];
RD_LINKS.comp = [{ u: 'https://www.youtube.com/watch?v=e_SAsfe8IkA', n: ['Lietuvos Robot Games', 'Lietuvos Robot Games'] }, { u: 'https://www.youtube.com/watch?v=efoZvGroFb4', n: ['Lituanica X per LRT', 'Lituanica X on LRT'] }];

RD_WORLD = [
  { n: ['Camp Invention (JAV)', 'Camp Invention (US)'], sc: ['140 000+ vaikų per metus, 2 600 mokyklų', '140,000+ kids a year, 2,600 schools'], p: ['$310', '$310'], g: ['1 : 8 ⚠️', '1 : 8 ⚠️'], gs: ['~16–24', '~16–24'], w: ['Mokyklose, veda mokytojai + paaugliai padėjėjai, vienas turinys visiems', 'In schools, teachers + teen helpers, one curriculum for all'] },
  { n: ['Galileo (JAV)', 'Galileo (US)'], sc: ['570 000+ vaikų iš viso, 60+ vietų', '570,000+ kids in total, 60+ sites'], p: ['$450–620', '$450–620'], g: ['1 : 12, mažiesiems 1 : 10 ⚠️', '1 : 12, youngest 1 : 10 ⚠️'], gs: ['~20–24', '~20–24'], w: ['Savaitės temos, prailginta diena, nuolaida už kitą savaitę', 'Weekly themes, extended day, a discount for the next week'] },
  { n: ['iD Tech (JAV)', 'iD Tech (US)'], sc: ['„50 000 per metus“ ⚠️, universitetai', '"50,000 a year" ⚠️, campuses'], p: ['$949–1 249', '$949–1,249'], g: ['1 : 8 (jų reklama) 🤖', '1 : 8 (their marketing) 🤖'], gs: ['~8–16', '~8–16'], w: ['Universitetai, kopėčios: stovykla → nakvynė → 1:1 online', 'Campuses, a ladder: camp → overnight → 1:1 online'] },
  { n: ['Steve & Kate\'s (JAV)', 'Steve & Kate\'s (US)'], sc: ['4–12 m., 8:00–18:00', 'Age 4–12, 8:00–18:00'], p: ['$570–700', '$570–700'], g: ['~1 : 8 ⚠️', '~1 : 8 ⚠️'], w: ['Vaikas pats renkasi veiklą, dienos bilietas $129', 'The child picks the activity, a day pass at $129'] },
  { n: ['Code Ninjas (JAV)', 'Code Ninjas (US)'], sc: ['308 centrai', '308 centres'], p: ['~$250 pusd.', '~$250 half day'], g: ['~1 : 6 🤖', '~1 : 6 🤖'], gs: ['~6–12', '~6–12'], w: ['Franšizė: klubas + stovyklos + gimtadieniai vienoje erdvėje', 'A franchise: club + camps + birthdays in one space'] },
  { n: ['Creator Camp (JAV)', 'Creator Camp (US)'], sc: ['30+ vietų, nuo 2021 m. (B)', '30+ sites, since 2021 (B)'], p: ['3 d. $268–278', '3 days $268–278'], g: ['❓', '❓'], gs: ['6–30 (A)', '6–30 (A)'], w: ['Parduoda vaidmenį, 2–3 d. modulis, finalas „Oskarai“', 'Sells a role, a 2–3 day module, an "Oscars" finale'] },
  { lt: 1, n: ['VU Konfucijaus institutas (LT)', 'VU Confucius Institute (LT)'], sc: ['universiteto patalpos', 'university premises'], p: ['€210 ⚠️', '€210 ⚠️'], g: ['❓', '❓'], gs: ['iki 20 ⚠️', 'up to 20 ⚠️'], w: ['Maistas ir draudimas įskaičiuoti', 'Food and insurance included'] },
  { lt: 1, n: ['Niam Niam, Kaunas (LT)', 'Niam Niam, Kaunas (LT)'], sc: ['kulinarijos stovykla', 'cooking camp'], p: ['nuo €250 ⚠️', 'from €250 ⚠️'], g: ['❓', '❓'], w: ['Praktinis įgūdis be ekranų', 'A hands-on skill, no screens'] },
  { lt: 1, n: ['Zigzag / Bricks4Kidz (LT)', 'Zigzag / Bricks4Kidz (LT)'], sc: ['6–12 m., 3 miestai', 'Age 6–12, 3 cities'], p: ['€40–45/d. (2022 ⚠️)', '€40–45/day (2022 ⚠️)'], g: ['❓', '❓'], w: ['3 maitinimai ir medžiagos įskaičiuoti', '3 meals and materials included'] },
  { lt: 1, n: ['LT dienos stovykla tipiškai', 'Typical LT day camp'], sc: ['LRT 2026-05', 'LRT 2026-05'], p: ['€200–250', '€200–250'], g: ['finansuojamose 1 : 15 (B)', 'funded camps 1 : 15 (B)'], w: ['Vilniaus konkurso taisyklė: 1 vadovas 15 vaikų', 'Vilnius tender rule: 1 leader per 15 kids'] },
  { ra: 1, n: ['Robotikos akademija', 'Robotikos akademija'], sc: ['3 682 pardavimai 2026 m.', '3,682 sales in 2026'], p: ['€199–299', '€199–299'], g: ['iki 1 : 15', 'up to 1 : 15'], gs: ['12–15', '12–15'], w: ['Sava visata ir personažai, NPS +86, būreliai ištisus metus', 'Our own universe and characters, NPS +86, year-round clubs'] }
];
RD_WORLD_NOTE = ['Kainos už savaitę. JAV grupių dydžių niekas neskelbia: 🤖 spėjimas = 2 suaugę × santykis; ⚠️ = iš paieškos santraukos, neatidaryta. LT kainos senos arba dalinės ⚠️: Robotikos mokyklos, Kodų klubo, Code Academy Kids 2026 m. kainų neradom.', 'Prices per week. No US camp publishes group size: 🤖 our guess = 2 adults × the ratio; ⚠️ = from a search summary, not opened. LT prices are old or partial ⚠️: no 2026 prices found for Robotikos mokykla, Kodų klubas, Code Academy Kids.'];
RD_SRC = RD_SRC.concat([['Camp Invention', 'https://www.invent.org/programs/faqs-for-parents'], ['Galileo', 'https://galileo-camps.com/about-us/'], ['Steve & Kate\'s', 'https://steveandkatescamp.com/austin/'], ['Pew 2025', 'https://www.pewresearch.org/internet/2025/12/09/teens-social-media-and-ai-chatbots-2025/'], ['Common Sense 2025', 'https://www.commonsensemedia.org/research/the-2025-common-sense-census-media-use-by-kids-zero-to-eight'], ['Ofcom 2025', 'https://www.ofcom.org.uk/media-use-and-attitudes/media-habits-children/children-and-parents-media-use-and-attitudes-report-2025'], ['LEGO / Harris 2019', 'https://www.cnbc.com/2019/07/19/more-children-dream-of-being-youtubers-than-astronauts-lego-says.html'], ['PSO 2020', 'https://www.who.int/publications/i/item/9789240015128'], ['Lituanica X', 'https://www.youtube.com/channel/UCDhAuyXQicQlXtyMGRMpFtg']]);

/* v3.1: Kris'o paties 4 video nuorodos (2026-11-16 00:0x), pakeičia ankstesnius pasirinkimus */
RD_LINKS.dog = [{ u: 'https://www.youtube.com/watch?v=mTMYfVD4zCw', n: ['Unitree R1 (oficialus)', 'Unitree R1 (official)'] }, { u: 'https://www.youtube.com/watch?v=6zPvT0ig1VM', n: ['Unitree Go2', 'Unitree Go2'] }];
RD_LINKS.cup = [{ u: 'https://www.youtube.com/watch?v=msfL8kgjvuI', n: ['MWRC 2026 čempionatas', 'MWRC 2026 championship'] }, { u: 'https://www.youtube.com/watch?v=6cgJyVzgHWk', n: ['VinciBot lenktynės', 'VinciBot race'] }];
RD_LINKS.duck = [{ u: 'https://www.youtube.com/watch?v=reiTh7K4KSc', n: ['Microduck, $399 (oficialus)', 'Microduck, $399 (official)'] }, { u: 'https://pollen-robotics.com/reachy-mini/', n: ['Reachy Mini kaina', 'Reachy Mini price'] }];
RD_LINKS.mc = [{ u: 'https://www.youtube.com/watch?v=AZ7AcvbebKo', n: ['Minecraft Education', 'Minecraft Education'] }, { u: 'https://krisvas333.github.io/ra-minecraft/', n: ['Mūsų puslapis', 'Our page'] }];
RD_X.duck.risk = ['Svajonių lygis. Kainos (oficialios, be mokesčių ir siuntimo): Microduck $399, Reachy Mini Lite $399, belaidis $499; kaina eurais ❓. Tik Python, pristatymas ~90 d.', 'Aspirational. Prices (official, before tax and shipping): Microduck $399, Reachy Mini Lite $399, Wireless $499; euro price ❓. Python only, delivery ~90 days.'];

/* v4: Roblox + e. sportas (⚠️ amžiaus taisyklės iš atminties, patikrinti prieš parduodant) */
RD_X.roblox = { risk: ['Roblox Studio veikia tik Windows ir macOS (ne planšetėse ir Chromebook) ⚠️: tėvams iš anksto nurodom minimalų kompiuterį. Paskyra iki 13 m.: tik su tėvų sutikimu, ribotas pokalbis ⚠️.', 'Roblox Studio runs on Windows and macOS only (no tablets or Chromebooks) ⚠️: we tell parents the minimum computer in advance. Accounts under 13: parent consent only, restricted chat ⚠️.'] };
RD_X.esport = { risk: ['Amžius ⚠️: Wild Rift PEGI 12, Riot ir Supercell paskyros nuo 13 m.: todėl 10–14 m., stovyklos paskyros, rašytinis tėvų sutikimas ❓ teisininkas. Rodom, kaip veikia industrija; karjeros nežadam.', 'Age ⚠️: Wild Rift is PEGI 12, Riot and Supercell accounts are 13+: so age 10–14, camp accounts, written parent consent ❓ lawyer. We show how the industry works; we promise no career.'] };
RD_CMP.roblox = ['iD Tech „Roblox“ kursai nuo $949/sav. ⚠️ (A, bazinė kaina). LT: Roblox kūrimo stovyklos 1–4 kl. konkurentų sąraše neradom.', 'iD Tech "Roblox" courses from $949/week ⚠️ (A, base price). LT: no Roblox-making camp for grades 1–4 found in the competitor list.'];
RD_CMP.esport = ['Seton Hall e. sporto stovykla $600/sav. (iš ankstesnio tyrimo). LT konkurentų sąraše e. sporto dienos stovyklos nėra.', 'Seton Hall esports camp $600/week (from earlier research). No esports day camp in the LT competitor list.'];
RD_PIC.alpha = RD_PIC.alpha;

/* v5: Technologijų etiketas Tech Detox skaidrėje */
RD_X.detox = { risk: ['Tėvų susidomėjimas: technologijų etiketo testą užpildė 123 tėvai (mūsų duomenys). „Priklausomybė“ čia reiškia įpročius, ne diagnozę. Partnerių būrelių atranka atvira visiems.', 'Parent interest: 123 parents filled the technology etiquette test (our own data). "Addiction" here means habits, no diagnosis. Partner club selection is open to all.'] };
RD_LINKS.detox = [{ u: 'https://krisvas333.github.io/neuron-ar/te/apie/', n: ['Technologijų etiketas', 'Technology etiquette'] }, { u: 'https://krisvas333.github.io/neuron-ar/te/vaikams/', n: ['Vaikams 7–12 m.', 'For kids 7–12'] }];

/* v5.1: mentorių akademija 16–20 m. */
RD_X.teen = { risk: ['Mažina mentorių sąnaudas, bet praktikantas neskaičiuojamas į mentorių santykį. Nuo 18 m. reikia teistumo patikros; socialinės valandos tik moksleiviams; darbo teisė ❓ teisininkas.', 'It lowers mentor cost, but a trainee is not counted in the mentor ratio. From 18 a background check is needed; social hours apply to school pupils only; labour law ❓ lawyer.'] };
RD_CMP.teen = ['Camp Invention: paaugliai moka $210 už lyderystės praktiką. Sudbury (Kanada) $215 už 4 sav. (ten 13–16 m., pas mus 16–20 m.). LT sąraše nėra.', 'Camp Invention: teens pay $210 for a leadership internship. Sudbury (Canada) $215 for 4 weeks (age 13–16 there, 16–20 here). None on our LT list.'];

/* v6 (Kris 2026-11-16): Baltic Orbis išankstinė sąskaita BOISF3508, 2026-11-14 (A, mūsų dokumentas); PVM 21 % perskaičiuota */
var RD_PL = [
  { i: 'media/talebot-1.jpg', n: ['Tale-Bot Pro (3+)', 'Tale-Bot Pro (3+)'], a: '€123,14', b: '€149,00', eu: ['€81–135 ⚠️', '€81–135 ⚠️'], us: '$99,99' },
  { i: 'media/talebot-2.jpg', n: ['Tale-Bot Pro papildymas (Activity Box)', 'Tale-Bot Pro add-on (Activity Box)'], a: '€40,50', b: '€49,01', eu: ['❓', '❓'], us: '❓' },
  { i: 'media/vincibot-1.jpg', n: ['VinciBot (8+)', 'VinciBot (8+)'], a: '€150,00', b: '€181,50', eu: ['€86 be PVM (DE B2B)', '€86 ex VAT (DE B2B)'], us: '$99,99' },
  { i: 'media/ai-vision-1.jpg', n: ['DI plėtinys (AI Vision Kit)', 'AI Vision Kit'], a: '€62,81', b: '€76,00', eu: ['€45,90 be PVM', '€45.90 ex VAT'], us: '$49,99' },
  { i: 'media/creator-kit-2.jpg', n: ['Išradėjo rinkinys (Inventor Kit)', 'Inventor Kit'], a: '€62,81', b: '€76,00', eu: ['€55,66 be PVM', '€55.66 ex VAT'], us: '$49,99' },
  { i: 'media/creator-kit-1.jpg', n: ['Kūrėjo rinkinys (Creator Kit)', 'Creator Kit'], a: '€61,16', b: '€74,00', eu: ['€55,66 be PVM', '€55.66 ex VAT'], us: '$49,99' },
  { i: 'media/vincibot-2.jpg', n: ['MatataController valdiklis', 'MatataController'], a: '€62,81', b: '€76,00', eu: ['❓', '❓'], us: '❓' },
  { i: '', n: ['Klasės rinkiniai (6 vnt.)', 'Classroom sets (6 units)'], a: '❓', b: '❓', eu: ['Tale €699 (PT) · Vinci €413,80 be PVM ⚠️', 'Tale €699 (PT) · Vinci €413.80 ex VAT ⚠️'], us: '$649,99 · $549,99' }
];
var RD_PL_NOTE = ['Kainos RA už 1 vnt.: Baltic Orbis išankstinė sąskaita 2026-11-14 (A). Klasės rinkinių ir kainų už 100 / 1 000 vnt. sąskaitoje nėra ❓.', 'RA prices per unit: the Baltic Orbis pro forma invoice of 2026-11-14 (A). Classroom sets and prices for 100 / 1,000 units are not on the invoice ❓.'];
var RD_PL_FLAG = ['<b>⚠️ Ką rodo sąskaita:</b> Tale-Bot Pro su PVM = €149, tiek pat kiek LT mažmena. VinciBot €181,50 su PVM, o svetainėje €159. Perpardavėjo nuolaidos šioje sąskaitoje nematyti: ją reikia gauti raštu iki 12-01 ❓.', '<b>⚠️ What the invoice shows:</b> Tale-Bot Pro incl VAT = €149, the same as LT retail. VinciBot €181.50 incl VAT, while the site says €159. No reseller discount is visible on this invoice: get it in writing by 12-01 ❓.'];
var RD_OTHER = [
  { i: '', t: ['<b>Šuo, pigi:</b> Petoi Bittle X ~$279 (JAV), 10+. ES kaina ❓', '<b>Dog, cheaper:</b> Petoi Bittle X ~$279 (US), 10+. EU price ❓'], u: 'https://www.petoi.com', l: 'petoi.com' },
  { i: '', t: ['<b>Šuo, vidutinė:</b> XGO-Mini2 €1 151', '<b>Dog, mid:</b> XGO-Mini2 €1,151'], u: 'https://www.xgorobot.com', l: 'xgorobot.com' },
  { i: 'img/dogs1.jpg', t: ['<b>Šuo, brangi:</b> Unitree Go2 Air €2 699', '<b>Dog, premium:</b> Unitree Go2 Air €2,699'], u: 'https://www.unitree.com/go2', l: 'unitree.com/go2' },
  { i: 'img/c-humanoid.jpg', t: ['<b>Humanoidas R1:</b> Air $4 900, R1 $5 900. RA jau turi', '<b>R1 humanoid:</b> Air $4,900, R1 $5,900. RA owns one'], u: 'https://www.unitree.com/R1', l: 'unitree.com/R1' },
  { i: 'img/c-duck.jpg', t: ['<b>Antis Microduck:</b> $399, surinkta', '<b>Microduck:</b> $399, assembled'], u: 'https://www.youtube.com/watch?v=reiTh7K4KSc', l: 'video' },
  { i: 'img/c-reachy.jpg', t: ['<b>Reachy Mini:</b> Lite $399, belaidis $499, ~90 d.', '<b>Reachy Mini:</b> Lite $399, Wireless $499, ~90 days'], u: 'https://pollen-robotics.com/reachy-mini/', l: 'pollen-robotics.com' },
  { i: '', t: ['<b>Open Duck Mini:</b> dalys < $400 ⚠️, rinkinio nėra', '<b>Open Duck Mini:</b> parts < $400 ⚠️, no kit'], u: 'https://github.com/apirrone/Open_Duck_Mini', l: 'github' }
];
var RD_MERCH6 = [
  { n: ['Marškinėliai', 'T-shirt'], p: '€15–18' }, { n: ['Džemperis', 'Hoodie'], p: '€29–35' },
  { n: ['Gertuvė · pietų dėžutė', 'Bottle · lunch box'], p: '€12–15 · €9–12' }, { n: ['Kuprinė · kepurė', 'Backpack · cap'], p: '€25–35 · €10–12' },
  { n: ['Lipdukai, ženkliukai, kortelės', 'Stickers, pins, cards'], p: '€2–9' }, { n: ['Pliušiniai žaislai', 'Plush toys'], p: '€15–22' }
];
var RD_MERCH6_NOTE = ['DI vizualizacija, ne tikras produktas. Dar: išradėjo žurnalas €6–9, pieštukai €3–6, spalvinimo knyga €5–8. Kainos 🅰️; savikaina ~pusė ⚠️; kiek tėvų perka: ❓.', 'AI mock-up, not a real product. Also: an inventor\'s journal €6–9, pencils €3–6, a colouring book €5–8. Prices 🅰️; unit cost ~half ⚠️; how many parents buy: ❓.'];
