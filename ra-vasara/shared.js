/* RA Vasara 2027 · idėjų dirbtuvės · bendri duomenys (deck + telefono puslapis)
   Kiekvienas tekstas: [LT, EN]. Kainos = 🅰️ siūlymai diskusijai, ne sprendimai. v2 2026-11-15.
   Šis failas keliauja ir į viešą telefono puslapį: jokių vidinių pajamų, maržų ar tiekėjo sąlygų čia. */
var RV_ROOM = 'RA27';
var RV_CHANNEL = 'ravasara-' + RV_ROOM;
var RV_SB_URL = 'https://iiekmeylpppczicrsxho.supabase.co';
var RV_SB_KEY = 'sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF';
var RV_JOIN_URL = 'https://krisvas333.github.io/bc-day/ra-vasara/';

var RV_VERDICTS = [
  { k: 'go',   em: '❤️', t: ['Darom 2027', 'Do it in 2027'] },
  { k: 'test', em: '🧪', t: ['Testuojam mažai', 'Test small'] },
  { k: 'no',   em: '✋', t: ['Ne dabar', 'Not now'] }
];
var RV_TIERS = [
  { k: 'low',  t: ['Pigiau', 'Cheaper'] },
  { k: 'same', t: ['Tiek pat', 'Same price'] },
  { k: 'high', t: ['Brangiau', 'Premium'] }
];

var RV_CONCEPTS = [
  { id: 'mc', em: '⛏️', img: 'img/c-mc.jpg', fit: '#4372E8',
    n: ['Minecraft kūrėjai + vibe coding', 'Minecraft Makers + vibe coding'],
    one: ['Vaikas pasako DI, ką nori pastatyti. DI parašo kodą, vaikas tikrina ir taiso.', 'The child tells AI what to build. AI writes the code, the child tests and fixes it.'],
    age: ['3–4 kl. (9–10 m.)', 'Grades 3–4 (age 9–10)'], grp: ['14 vaikų', '14 kids'], ratio: ['1 mentorius : 7 vaikams', '1 mentor : 7 kids'],
    prices: [
      ['179', ['20 vaikų, mokyklos kompiuteriai, 1 mentorius + padėjėjas', '20 kids, school PCs, 1 mentor + helper']],
      ['219', ['14 vaikų, 2 mentoriai', '14 kids, 2 mentors']],
      ['299', ['10 vaikų + „mano pasaulis“ namo + 4 sav. online klubas', '10 kids + take-home world + 4-week online club']]
    ],
    acts: [
      ['Misija: Omikronas užgrobė pasaulį, komanda jį atstato', 'Mission: Omikronas hijacked the world, the team rebuilds it'],
      ['Vibe coding: aprašyk, paleisk, rask klaidą, pataisyk', 'Vibe coding: describe, run, find the bug, fix it'],
      ['Kasdien 90 min. lauke be ekranų', '90 minutes outdoors without screens every day'],
      ['Penktadienį: pasaulio turas tėvams', 'Friday: world tour for parents']
    ],
    day: [
      ['9:00', ['5 taisyklės + dienos misija', '5 rules + mission of the day']],
      ['9:30', ['Statom komandomis po 2', 'Build in pairs']],
      ['11:00', ['Lauko žaidimai', 'Outdoor games']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Vibe coding: prašau DI, tikrinu, taisau', 'Vibe coding: ask AI, test, fix']],
      ['14:30', ['Lauko iššūkis be ekranų', 'Screen-free outdoor challenge']],
      ['16:00', ['Parodau, ką sukūriau + 3 emoji', 'Show what I made + 3 emoji']]
    ],
    gear: ['Minecraft Education + DI asistentas per mentoriaus paskyrą', 'Minecraft Education + AI assistant through the mentor account'],
    test: ['Kūrėjų klubo testo paketas 7 mokykloms paruoštas: tas pats turinys', 'The Makers Club test package for 7 schools is ready: same content'] },

  { id: 'cup', em: '🏆', img: 'media/vincibot-1.jpg', vid: 'media/vincibot-intro-lt.mp4',
    n: ['VinciBot čempionatas', 'VinciBot Championship'],
    one: ['Visa savaitė ruošiasi penktadienio turnyrui: lenktynės, sumo, piešimas, futbolas.', 'The whole week builds up to a Friday tournament: racing, sumo, drawing, football.'],
    age: ['8–12 m.', 'Age 8–12'], grp: ['15 namų grupėje, iki 75 vietoje', '15 per home group, up to 75 per site'], ratio: ['1 : 15 + padėjėjas', '1 : 15 + helper'],
    prices: [
      ['149', ['masinė: 1 robotas 3 vaikams', 'mass: 1 robot per 3 kids']],
      ['199', ['1 robotas 2 vaikams', '1 robot per 2 kids']],
      ['259', ['+ Creator Kit statybos ir finalas su tėvais arenoje', '+ Creator Kit builds and an arena final with parents']]
    ],
    acts: [
      ['Kasdien nauja rungtis ir naujas jutiklis', 'A new event and a new sensor every day'],
      ['Komandos turi vardą, vėliavą ir kapitoną', 'Teams have a name, a flag and a captain'],
      ['Blokai jaunesniems, Python vyresniems', 'Blocks for younger kids, Python for older'],
      ['Penktadienį turnyras, tėvai tribūnoje', 'Friday tournament, parents in the stands']
    ],
    day: [
      ['9:00', ['Komandų ratas + dienos rungtis', 'Team circle + event of the day']],
      ['9:30', ['Treniruotė: programuojam', 'Practice: we program']],
      ['11:00', ['Sportas lauke', 'Outdoor sport']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Kvalifikacija: 3 bandymai', 'Qualifying: 3 attempts']],
      ['14:30', ['Tobulinam robotą', 'Improve the robot']],
      ['16:00', ['Dienos lentelė + 3 emoji', 'Daily leaderboard + 3 emoji']]
    ],
    gear: ['VinciBot (8 jutikliai, blokai + Python)', 'VinciBot (8 sensors, blocks + Python)'],
    test: ['Viena 8–12 m. grupė, 6 robotai, 4 savaitės', 'One group aged 8–12, 6 robots, 4 weeks'] },

  { id: 'vai', em: '🧠', img: 'media/ai-vision-1.jpg', vid: 'media/vincibot-ai-vision-lt.mp4',
    n: ['VinciBot + DI', 'VinciBot + AI'],
    one: ['Robotas mato: atpažįsta veidą, skaičių, katę. Vaikas pats jį apmoko ir patikrina, kur DI klysta.', 'The robot sees: it recognises a face, a digit, a cat. The child trains it and checks where AI gets it wrong.'],
    age: ['9–12 m.', 'Age 9–12'], grp: ['12 vaikų', '12 kids'], ratio: ['1 : 6', '1 : 6'],
    prices: [
      ['219', ['1 robotas + kamera 3 vaikams', '1 robot + camera per 3 kids']],
      ['269', ['1 robotas + kamera 2 vaikams', '1 robot + camera per 2 kids']],
      ['349', ['+ robotas keliauja namo', '+ the robot goes home']]
    ],
    acts: [
      ['Išmokiau robotą atpažinti savo veidą', 'I trained the robot to recognise my face'],
      ['„Rask klaidą“: kada DI apsirinka ir kodėl', '"Find the error": when AI gets it wrong and why'],
      ['Robotas sargas, robotas rūšiuotojas, robotas gidas', 'Guard robot, sorting robot, guide robot'],
      ['Penktadienį: DI mugė tėvams', 'Friday: AI fair for parents']
    ],
    day: [
      ['9:00', ['Dienos klausimas: ką mato robotas?', 'Question of the day: what does the robot see?']],
      ['9:30', ['Renkam duomenis, mokom modelį', 'Collect data, train the model']],
      ['11:00', ['Lauke: žmonių „algoritmų“ žaidimai', 'Outdoors: human "algorithm" games']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Projektas: robotas su užduotimi', 'Project: a robot with a job']],
      ['15:00', ['Rask klaidą: testuojam vieni kitų robotus', 'Find the error: we test each other\'s robots']],
      ['16:00', ['Parodau + 3 emoji', 'Show + 3 emoji']]
    ],
    gear: ['VinciBot + AI Vision Kit (kamera)', 'VinciBot + AI Vision Kit (camera)'],
    test: ['DI modulis 4 pamokos vienoje vyresnių grupėje', 'A 4-lesson AI module in one older group'] },

  { id: 'tale', em: '📖', img: 'media/talebot-1.jpg', vid: 'media/talebot-pro-intro-lt.mp4',
    n: ['Tale-Bot Pro: pasakų robotai', 'Tale-Bot Pro: story robots'],
    one: ['Be ekranų. Vaikas spaudo mygtukus ant roboto ir veda jį per pasaką ant žemėlapio.', 'No screens. The child presses buttons on the robot and leads it through a story on a map.'],
    age: ['4–6 m.', 'Age 4–6'], grp: ['10 vaikų', '10 kids'], ratio: ['1 : 5 (mentorius + padėjėjas)', '1 : 5 (mentor + helper)'],
    prices: [
      ['149', ['pusdienis 9:00–13:00', 'half day 9:00–13:00']],
      ['199', ['pilna diena', 'full day']],
      ['259', ['pilna diena + pasakų knyga ir žemėlapis namo', 'full day + story book and map to take home']]
    ],
    acts: [
      ['Kasdien nauja pasaka ir naujas žemėlapis', 'A new story and a new map every day'],
      ['Robotas piešia, vaikas spalvina', 'The robot draws, the child colours'],
      ['Įrašau savo balsą robotui (30 s)', 'I record my own voice for the robot (30 s)'],
      ['Penktadienį: spektaklis tėvams su robotais', 'Friday: a robot play for parents']
    ],
    day: [
      ['9:00', ['Ryto ratas + dienos pasaka', 'Morning circle + story of the day']],
      ['9:30', ['Robotas keliauja žemėlapiu', 'The robot travels the map']],
      ['10:30', ['Užkandis + lauko žaidimai', 'Snack + outdoor games']],
      ['11:30', ['Kuriam savo pasakos puslapį', 'We create our own story page']],
      ['12:30', ['Pietūs (pusdienis baigiasi 13:00)', 'Lunch (half day ends 13:00)']],
      ['13:30', ['Ramus laikas + piešimas', 'Quiet time + drawing']],
      ['15:00', ['Judesio žaidimai + 3 emoji', 'Movement games + 3 emoji']]
    ],
    gear: ['Tale-Bot Pro klasės rinkinys (6 robotai) + žemėlapiai', 'Tale-Bot Pro classroom set (6 robots) + maps'],
    test: ['Matata 3–4 m. grupės darželiuose jau planuojamos', 'Matata groups for age 3–4 in kindergartens are already planned'] },

  { id: 'life', em: '🧺', img: 'img/c-life.jpg',
    n: ['5 įgūdžiai: ProKid stovykla', '5 Skills: the ProKid camp'],
    one: ['5 dienos, 5 įgūdžiai: susitvarkyti kambarį, pasigaminti valgyti, sportuoti, mokytis, susirasti draugų.', '5 days, 5 skills: tidy your room, cook a meal, do sport, learn how to learn, make friends.'],
    age: ['6–10 m.', 'Age 6–10'], grp: ['50–100 vietoje, namų grupės po 12–15', '50–100 per site, home groups of 12–15'], ratio: ['1 : 15 + jaunieji mentoriai', '1 : 15 + junior mentors'],
    prices: [
      ['129', ['100 vaikų vietoje, pietūs atskirai', '100 kids per site, lunch separate']],
      ['149', ['75 vaikai, pietūs įskaičiuoti', '75 kids, lunch included']],
      ['179', ['50 vaikų + prailginta diena iki 18:00', '50 kids + extended day until 18:00']]
    ],
    acts: [
      ['Pr: mano kambarys · An: mano pietūs · Tr: mano kūnas', 'Mon: my room · Tue: my lunch · Wed: my body'],
      ['Kt: mano smegenys (kaip mokytis) · Pn: mano draugai', 'Thu: my brain (how to learn) · Fri: my friends'],
      ['Svečių būrelius kviečiam per ExoClass: atvira registracija visiems', 'Guest clubs are invited through ExoClass: open sign-up for all'],
      ['Namo: 5 įgūdžių pasas, tėvai pasirašo, kai vaikas pakartoja', 'Take-home: a 5-skill passport, parents sign when the child repeats it']
    ],
    day: [
      ['9:00', ['Namų grupės ratas + dienos įgūdis', 'Home group circle + skill of the day']],
      ['9:30', ['Dirbtuvės 1: mokomės darydami', 'Workshop 1: learning by doing']],
      ['11:00', ['Svečio valanda: kitas būrelis', 'Guest hour: another club']],
      ['12:00', ['Pietūs (antradienį gaminam patys)', 'Lunch (on Tuesday we cook it ourselves)']],
      ['13:00', ['Dirbtuvės 2: iššūkis komandomis', 'Workshop 2: team challenge']],
      ['14:30', ['Sportas lauke', 'Outdoor sport']],
      ['16:00', ['Paso antspaudas + 3 emoji', 'Passport stamp + 3 emoji']]
    ],
    gear: ['Robotas čia tik svečias: viena stotelė per savaitę', 'The robot is only a guest here: one station per week'],
    test: ['1 pilotinė savaitė, 1 vieta, 50 vaikų', '1 pilot week, 1 site, 50 kids'] },

  { id: 'detox', em: '🌲', img: 'img/c-detox.jpg',
    n: ['Tech Detox: nulis ekranų', 'Tech Detox: zero screens'],
    one: ['Tikras gyvenimas įdomesnis už žaidimą. Per savaitę vaikas išbando 7 būrelius ir randa savo.', 'Real life is more interesting than a video game. In one week the child tries 7 clubs and finds their own.'],
    age: ['7–12 m.', 'Age 7–12'], grp: ['50–75 vietoje, namų grupės po 12–15', '50–75 per site, home groups of 12–15'], ratio: ['1 : 15 + būrelių treneriai', '1 : 15 + club coaches'],
    prices: [
      ['149', ['75 vaikai, 5 būrelių degustacijos', '75 kids, 5 club tastings']],
      ['179', ['7 degustacijos + būrelių pasas tėvams', '7 tastings + a club passport for parents']],
      ['219', ['+ išvyka ir penktadienio mugė', '+ a field trip and a Friday market']]
    ],
    acts: [
      ['Kovos menai · muzika · tapyba · molis', 'Martial arts · music · painting · clay'],
      ['Viešas kalbėjimas · verslumas · burbulai ⚠️', 'Public speaking · entrepreneurship · bubbles ⚠️'],
      ['Telefonai ryte keliauja į „seifą“', 'Phones go into the "safe" in the morning'],
      ['Penktadienį: vaikų mugė, uždirbu pirmą eurą', 'Friday: kids\' market, I earn my first euro']
    ],
    day: [
      ['9:00', ['Telefonų seifas + ryto ratas', 'Phone safe + morning circle']],
      ['9:30', ['Degustacija 1 (pvz. kovos menai)', 'Tasting 1 (e.g. martial arts)']],
      ['11:00', ['Laisvas žaidimas lauke', 'Free play outdoors']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Degustacija 2 (pvz. molis)', 'Tasting 2 (e.g. clay)']],
      ['14:30', ['Verslumo projektas mugei', 'Entrepreneurship project for the market']],
      ['16:00', ['Paso antspaudas: kas patiko labiausiai?', 'Passport stamp: what did I like most?']]
    ],
    gear: ['Jokios technikos. Partnerių būreliai atsineša savo inventorių', 'No tech. Partner clubs bring their own equipment'],
    test: ['1 savaitė su 5 partnerių būreliais per ExoClass', '1 week with 5 partner clubs through ExoClass'] },

  { id: 'xr', em: '🥽', img: 'img/c-xr.jpg',
    n: ['BrainClub XR laboratorija', 'BrainClub XR Lab'],
    one: ['VR ir mišri realybė + DI + Minecraft. Trumpi VR blokai, daug kūrybos ir judesio tarp jų.', 'VR and mixed reality + AI + Minecraft. Short VR blocks, lots of making and movement in between.'],
    age: ['10–12 m.', 'Age 10–12'], grp: ['12 vaikų', '12 kids'], ratio: ['1 : 6', '1 : 6'],
    prices: [
      ['249', ['Vieni akiniai 2 vaikams', '1 headset per 2 kids']],
      ['299', ['Vieni akiniai vaikui', '1 headset per kid']],
      ['349', ['+ savo XR pasaulis, kurį parodau namie', '+ my own XR world that I show at home']]
    ],
    acts: [
      ['Smegenų dėlionė 3D ir „Gyvas dangus“', '3D Brain Puzzle and "Living Sky"'],
      ['Kuriu pasaulį Minecraft, apžiūriu jį VR', 'I build a world in Minecraft and walk through it in VR'],
      ['DI kaip kūrybos partneris', 'AI as a creative partner'],
      ['VR blokai iki 20–30 min. ⚠️, tarp jų judesys', 'VR blocks up to 20–30 min ⚠️, movement in between']
    ],
    day: [
      ['9:00', ['5 taisyklės + saugus VR', '5 rules + safe VR']],
      ['9:30', ['VR blokas 1 (25 min.) + aptarimas', 'VR block 1 (25 min) + debrief']],
      ['10:30', ['Kuriam: Minecraft arba DI', 'We make: Minecraft or AI']],
      ['12:00', ['Pietūs + laukas', 'Lunch + outdoors']],
      ['13:30', ['VR blokas 2: komandinė misija', 'VR block 2: team mission']],
      ['14:30', ['Projektas: mano pasaulis', 'Project: my world']],
      ['16:00', ['Parodau + 3 emoji', 'Show + 3 emoji']]
    ],
    gear: ['Meta Quest 3S parkas (BrainClub) + savi žaidimai', 'Meta Quest 3S fleet (BrainClub) + our own games'],
    test: ['1 savaitė Vilniuje su esamu Quest parku', '1 week in Vilnius with the existing Quest fleet'] },

  { id: 'box', em: '📦', img: 'img/c-box.jpg',
    n: ['DI inžinieriai: viena dėžė', 'AI Engineers: one box'],
    one: ['Pažangiausias informatikos ir DI rinkinys vaikui. Viena dėžė, viena savaitė, vienas tikras prietaisas.', 'The most advanced computer science and AI kit for a child. One box, one week, one real device.'],
    age: ['10–12 m.', 'Age 10–12'], grp: ['10 vaikų', '10 kids'], ratio: ['1 : 5', '1 : 5'],
    prices: [
      ['249', ['dėžė lieka RA, 1 dėžė 2 vaikams', 'the box stays with RA, 1 box per 2 kids']],
      ['299', ['dėžė lieka RA, 1 dėžė vaikui', 'the box stays with RA, 1 box per kid']],
      ['399', ['dėžė keliauja namo ❓ (priklauso nuo rinkinio kainos)', 'the box goes home ❓ (depends on the kit price)']]
    ],
    acts: [
      ['Surenku prietaisą: jutikliai, kamera, variklis', 'I assemble a device: sensors, camera, motor'],
      ['Apmokau modelį savo duomenimis', 'I train a model on my own data'],
      ['Sprendžiu tikrą problemą: namams, klasei, gamtai', 'I solve a real problem: for home, class, nature'],
      ['Penktadienį: išradimų paroda', 'Friday: invention fair']
    ],
    day: [
      ['9:00', ['Dienos problema', 'Problem of the day']],
      ['9:30', ['Renkam ir jungiam', 'Assemble and connect']],
      ['11:00', ['Laukas', 'Outdoors']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Programuojam ir mokom modelį', 'Program and train the model']],
      ['15:00', ['Testuojam su tikrais naudotojais', 'Test with real users']],
      ['16:00', ['Žurnalas: kas veikė, kas ne', 'Journal: what worked, what did not']]
    ],
    gear: ['Kandidatai: LEGO Education informatikos ir DI rinkinys, micro:bit, Arduino ir kiti', 'Candidates: LEGO Education CS & AI kit, micro:bit, Arduino and others'],
    test: ['2 rinkiniai mentoriams išbandyti iki sausio', '2 kits for mentors to try before January'] },

  { id: 'teen', em: '🎓', img: 'img/mentors.jpg',
    n: ['Jaunųjų mentorių akademija', 'Junior Mentor Academy'],
    one: ['13–16 m. paaugliai 2 dienas mokosi vesti, 3 dienas padeda tikram mentoriui masinėje stovykloje.', 'Teens aged 13–16 learn to lead for 2 days, then help a real mentor in a mass camp for 3 days.'],
    age: ['13–16 m.', 'Age 13–16'], grp: ['12 paauglių', '12 teens'], ratio: ['1 : 12 mokymuose', '1 : 12 in training'],
    prices: [
      ['99', ['2 mokymų dienos + 3 praktikos dienos', '2 training days + 3 practice days']],
      ['149', ['+ pirmosios pagalbos kursas ir pažymėjimas', '+ a first aid course and a certificate']],
      ['199', ['2 savaitės + rekomendacija ir vieta mentorių rezerve', '2 weeks + a reference and a place in the mentor reserve']]
    ],
    acts: [
      ['Kaip paaiškinti taisyklę 6-mečiui', 'How to explain a rule to a 6-year-old'],
      ['Kaip vesti žaidimą 15 vaikų', 'How to run a game for 15 kids'],
      ['Pirmoji pagalba ir saugumas', 'First aid and safety'],
      ['RA užauga iki 16 m. ir augina būsimus mentorius', 'RA grows up to age 16 and raises future mentors']
    ],
    day: [
      ['9:00', ['Ryto pasitarimas su mentoriumi', 'Morning briefing with the mentor']],
      ['9:30', ['Padedu namų grupei', 'I help a home group']],
      ['11:00', ['Vedu vieną žaidimą pats', 'I lead one game myself']],
      ['12:00', ['Pietūs su grupe', 'Lunch with the group']],
      ['13:00', ['Padedu dirbtuvėse', 'I help in the workshop']],
      ['15:00', ['Grįžtamasis ryšys iš mentoriaus', 'Feedback from the mentor']],
      ['16:00', ['Mano žurnalas: ką išmokau', 'My journal: what I learned']]
    ],
    gear: ['Jokios naujos įrangos. Praktikoje po 2 paauglius prie vieno mentoriaus. Paauglys lieka dalyvis ⚠️', 'No new equipment. In practice 2 teens per mentor. The teen stays a participant ⚠️'],
    test: ['6 paaugliai vienoje stovykloje 2027 birželį', '6 teens in one camp in June 2027'] },

  { id: 'dog', em: '🐕', img: 'img/dogs2.jpg', star: true,
    n: ['Robotų šunys ir humanoidas R1', 'Robot Dogs and the R1 Humanoid'],
    one: ['Mūsų bestseleris. Vaikai dresuoja robotus šunis, o humanoidas R1 yra savaitės žvaigždė: penktadienį jis šoka pagal vaikų sukurtą choreografiją.', 'Our bestseller. Kids train robot dogs, and the R1 humanoid is the star of the week: on Friday it dances to the choreography the kids designed.'],
    age: ['9–12 m.', 'Age 9–12'], grp: ['12 vaikų', '12 kids'], ratio: ['1 : 6', '1 : 6'],
    prices: [
      ['249', ['mažas šuo 3 vaikams + R1 pasirodymas', 'a small dog per 3 kids + the R1 show']],
      ['299', ['mažas šuo 2 vaikams + 2 susitikimai su R1', 'a small dog per 2 kids + 2 sessions with R1']],
      ['379', ['+ diena su dideliu šunimi ir R1 šou, kurį valdo mentorius', '+ a day with the big dog and an R1 show run by the mentor']]
    ],
    acts: [
      ['Šunų triukai: sėsk, duok leteną, šok', 'Dog tricks: sit, give a paw, dance'],
      ['Kliūčių ruožas ir šunų estafetė', 'Obstacle course and dog relay'],
      ['R1: vaikai kuria judesių seką, mentorius paleidžia', 'R1: kids design the move sequence, the mentor runs it'],
      ['Penktadienį: robotų šou tėvams', 'Friday: the robot show for parents']
    ],
    day: [
      ['9:00', ['Ryto ratas + dienos triukas', 'Morning circle + trick of the day']],
      ['9:30', ['Programuojam šuns judesį', 'We program a dog movement']],
      ['11:00', ['Lauke: šunų estafetė', 'Outdoors: dog relay']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['R1 valanda: stebim už linijos, kuriam choreografiją', 'R1 hour: we watch from behind the line and design the choreography']],
      ['14:30', ['Repetuojam šou', 'We rehearse the show']],
      ['16:00', ['Dienos triukas tėvams (video) + 3 emoji', 'Trick of the day for parents (video) + 3 emoji']]
    ],
    gear: ['Maži programuojami šunys + humanoidas R1, kurį RA jau turi; didelis šuo ❓', 'Small programmable dogs + the R1 humanoid RA already owns; a big dog ❓'],
    test: ['R1 ir šuo kaip „žvaigždės svečiai“ 3 būrelių grupėse iki pavasario', 'R1 and the dog as "guest stars" in 3 club groups before spring'] },

  { id: 'duck', em: '🦆', img: 'img/c-duck.jpg',
    n: ['Hugging Face robotai: antis ir Reachy Mini', 'Hugging Face robots: the duck and Reachy Mini'],
    one: ['Atviro kodo DI robotai paaugliams. Reachy Mini mato, girdi ir kalba, o vaikščiojanti antis Microduck yra savaitės talismanas.', 'Open-source AI robots for teens. Reachy Mini sees, hears and talks, and the walking Microduck is the mascot of the week.'],
    age: ['12–16 m.', 'Age 12–16'], grp: ['8 vaikai', '8 kids'], ratio: ['1 : 4', '1 : 4'],
    prices: [
      ['279', ['pigi: Reachy Mini Lite 3 vaikams', 'cheaper: a Reachy Mini Lite per 3 kids']],
      ['349', ['Reachy Mini 2 vaikams + antis Microduck', 'a Reachy Mini per 2 kids + the Microduck']],
      ['449', ['brangi: belaidis Reachy Mini 2 vaikams + antis Microduck porai', 'premium: a wireless Reachy Mini per 2 kids + a Microduck per pair']]
    ],
    acts: [
      ['Pr: surenkam robotą ir pirmas Python', 'Mon: assemble the robot and first Python'],
      ['An: kamera · Tr: balsas į tekstą', 'Tue: camera · Wed: speech to text'],
      ['Kt: suteikiam robotui asmenybę su DI', 'Thu: give the robot a personality with AI'],
      ['Penktadienį: robotų personažų šou', 'Friday: the robot character show']
    ],
    day: [
      ['9:00', ['Dienos iššūkis', 'Challenge of the day']],
      ['9:30', ['Programuojam poromis', 'We program in pairs']],
      ['11:00', ['Laukas', 'Outdoors']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Projektas: mano roboto personažas', 'Project: my robot character']],
      ['15:00', ['Testuojam vieni kitų robotus', 'We test each other\'s robots']],
      ['16:00', ['Demo + žurnalas', 'Demo + journal']]
    ],
    gear: ['Reachy Mini Lite arba belaidis + Microduck (Pollen Robotics, Hugging Face)', 'Reachy Mini Lite or Wireless + Microduck (Pollen Robotics, Hugging Face)'],
    test: ['1 Reachy Mini mentoriams iki sausio: ar 12-metis susitvarko su Python', '1 Reachy Mini for mentors by January: can a 12-year-old handle the Python'] },

  { id: 'creator', em: '🎬', img: 'img/c-creator.jpg',
    n: ['YouTuberių stovykla: turinio kūrėjai', 'YouTuber Camp: content creators'],
    one: ['Vaikai nori būti kūrėjais. Čia jie išmoksta filmuoti, montuoti ir pasakoti istoriją, ir sužino, kaip veikia algoritmas.', 'Kids want to be creators. Here they learn to film, edit and tell a story, and find out how the algorithm works.'],
    age: ['9–13 m.', 'Age 9–13'], grp: ['14 vaikų', '14 kids'], ratio: ['1 : 7', '1 : 7'],
    prices: [
      ['199', ['savi telefonai ar planšetės, komandos po 3', 'own phones or tablets, teams of 3']],
      ['249', ['RA įranga: mikrofonai, šviesos, stovai', 'RA equipment: microphones, lights, stands']],
      ['319', ['+ studijos diena ir kūrėjo svečio dirbtuvės', '+ a studio day and a guest creator workshop']]
    ],
    acts: [
      ['Vaidmuo: YouTuberis, Režisierius arba Efektų meistras', 'The role: YouTuber, Director or Effects Master'],
      ['1 diena: kanalo ženklas, intro ir trumpi video. 2 diena: savo video (vaidinimas, vlogas, pamoka)', 'Day 1: channel logo, intro and short videos. Day 2: your own video (skit, vlog, tutorial)'],
      ['3 diena: reklama ir apžvalga, tada „RA Oskarai“', 'Day 3: a commercial and a review, then the "RA Oscars"'],
      ['Kt–Pn: antras vaidmuo. Į internetą nekeliam nieko, video tik tėvams', 'Thu–Fri: a second role. Nothing goes online, videos go to parents only']
    ],
    day: [
      ['9:00', ['Dienos formatas: žiūrim ir ardom pavyzdį', 'Format of the day: we watch and take apart an example']],
      ['9:30', ['Scenarijus komandoje', 'Script in a team']],
      ['11:00', ['Filmuojam lauke', 'We film outdoors']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Montažas', 'Editing']],
      ['14:30', ['Judesio pertrauka + garso įrašai', 'Movement break + sound recording']],
      ['16:00', ['Peržiūra: 1 pagyrimas, 1 patarimas', 'Screening: 1 praise, 1 tip']]
    ],
    gear: ['Telefonai ar planšetės + 4 mikrofonų ir šviesų rinkiniai + nemokama montavimo programa', 'Phones or tablets + 4 microphone and light sets + a free editing app'],
    test: ['4 pamokų kūrėjo modulis vienoje 10–12 m. grupėje', 'A 4-lesson creator module in one group aged 10–12'] },

  { id: 'gamer', em: '🕹️', img: 'img/c-gamer.jpg',
    n: ['Žaidėjų stovykla: iš žaidėjo į YouTube kūrėją', 'Gamer Camp: from player to YouTube maker'],
    one: ['Vaikas žaidžia, filmuoja ir komentuoja savo žaidimą, o trečią dieną turi savo kanalo ženklą ir originalų video. Kasdien judam lauke.', 'The child plays, records and narrates their own gameplay, and by day three has a channel logo and an original video. We move outdoors every day.'],
    age: ['9–13 m.', 'Age 9–13'], grp: ['16 vaikų', '16 kids'], ratio: ['1 : 8', '1 : 8'],
    prices: [
      ['179', ['mokyklos kompiuteriai, 20 vaikų', 'school PCs, 20 kids']],
      ['229', ['16 vaikų, 2 mentoriai, turnyras', '16 kids, 2 mentors, a tournament']],
      ['289', ['+ žaidimų studijos ar arenos diena ir komandos marškinėliai', '+ a game studio or arena day and team jerseys']]
    ],
    acts: [
      ['Vaidmuo: Žaidimų YouTuberis. Filmuoji ir komentuoji savo žaidimą', 'The role: Gaming YouTuber. You record and narrate your own gameplay'],
      ['Logotipas, pirmas video, iššūkis su komentaru', 'A logo, the first video, a commented challenge'],
      ['3 diena: viršelio paveikslėlis ir originalus video', 'Day 3: a thumbnail and an original video'],
      ['Kasdien sportas lauke; video tik tėvams, nieko viešai', 'Outdoor sport every day; videos go to parents only, nothing public']
    ],
    day: [
      ['9:00', ['Komandos ratas + dienos taktika', 'Team circle + tactic of the day']],
      ['9:30', ['Treniruotė su treneriu', 'Practice with the coach']],
      ['11:00', ['Sportas lauke', 'Outdoor sport']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Kuriam savo lygį', 'We build our level']],
      ['14:30', ['Testuojam vieni kitų žaidimus', 'We test each other\'s games']],
      ['16:00', ['Dienos rungtynės + 3 emoji', 'Match of the day + 3 emoji']]
    ],
    gear: ['Kompiuterių klasė + amžių atitinkantys žaidimai, be šaudyklių', 'A computer room + age-appropriate games, no shooters'],
    test: ['Penktadienio turnyras Kūrėjų klubo grupėms', 'A Friday tournament for the Makers Club groups'] },

  { id: 'comp', em: '🚀', img: 'img/c-comp.jpg',
    n: ['Robotikos varžybų stovykla su Lituanica X', 'Robotics Competition Camp with Lituanica X'],
    one: ['Vyresniems. Per savaitę komanda pastato varžybų robotą ir penktadienį rungiasi pagal tikras tarptautinių varžybų taisykles.', 'For older students. In one week a team builds a competition robot and on Friday competes under real international competition rules.'],
    age: ['13–18 m.', 'Age 13–18'], grp: ['12 (2 komandos po 6)', '12 (2 teams of 6)'], ratio: ['1 : 6 + komandos narys treneris', '1 : 6 + a team member as coach'],
    prices: [
      ['249', ['RA rinkiniai, 3 komandos po 6', 'RA kits, 3 teams of 6']],
      ['329', ['varžybų rinkiniai + varžybų komandos treneris ❓', 'competition kits + a team coach ❓']],
      ['449', ['2 savaitės + dalyvavimas tikrose rungtynėse', '2 weeks + taking part in a real match']]
    ],
    acts: [
      ['Mechanika, programavimas, strategija, inžinieriaus žurnalas', 'Mechanics, programming, strategy, the engineering notebook'],
      ['Vaidmenys komandoje: vairuotojas, programuotojas, statytojas', 'Team roles: driver, programmer, builder'],
      ['Treneriai iš varžybų komandos (partnerystė dar derinama ❓)', 'Coaches from a competition team (to be agreed ❓)'],
      ['Penktadienį: rungtynės su teisėjais ir tribūna', 'Friday: matches with referees and a stand']
    ],
    day: [
      ['9:00', ['Komandos pasitarimas', 'Team stand-up']],
      ['9:30', ['Statom ir programuojam', 'We build and program']],
      ['11:00', ['Sportas', 'Sport']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Bandomosios rungtynės', 'Practice matches']],
      ['14:30', ['Taisom, kas sulūžo', 'We fix what broke']],
      ['16:00', ['Žurnalas + rytojaus planas', 'Notebook + plan for tomorrow']]
    ],
    gear: ['Varžybų robotų rinkiniai (FIRST Tech Challenge tipo) ir aikštelė', 'Competition robot kits (FIRST Tech Challenge type) and a field'],
    test: ['Viena 13+ komanda rudenį bandomosiose rungtynėse', 'One 13+ team at practice matches in autumn'] },

  { id: 'lego', em: '🧱', img: 'img/c-lego.jpg',
    n: ['Kaladėlių filmų kūrėjai', 'Brick Movie Makers'],
    one: ['Vaikas pastato sceną iš kaladėlių ir kadras po kadro paverčia ją filmu. Kasdien naujas filmukas, trečią dieną premjera.', 'A child builds a scene from bricks and turns it into a film, frame by frame. A new film every day, a premiere on day three.'],
    age: ['6–10 m.', 'Age 6–10'], grp: ['12 vaikų', '12 kids'], ratio: ['1 : 6', '1 : 6'],
    prices: [
      ['169', ['savo planšetė ar telefonas, poromis', 'own tablet or phone, in pairs']],
      ['219', ['RA planšetė, stovas ir kaladėlių rinkinys', 'RA tablet, stand and a brick set']],
      ['279', ['+ premjera kino salėje ir kaladėlių rinkinys namo', '+ a cinema premiere and a brick set to take home']]
    ],
    acts: [
      ['Vaidmuo: Animatorius. 3 dienos, 3 filmukai', 'The role: Animator. 3 days, 3 films'],
      ['1 diena: kadras po kadro. 2 diena: mano filmas. 3 diena: žalias ekranas ir garsai', 'Day 1: frame by frame. Day 2: my film. Day 3: green screen and sound'],
      ['Kt–Pn: antras vaidmuo, pvz. Žaidimų kūrėjas', 'Thu–Fri: a second role, e.g. Game Maker'],
      ['Trečiadienį: „RA Oskarai“ tėvams, filmukai tik privačia nuoroda', 'Wednesday: the "RA Oscars" for parents, films by private link only']
    ],
    day: [
      ['9:00', ['Dienos triukas: žiūrim 20 s pavyzdį', 'Trick of the day: we watch a 20 s example']],
      ['9:30', ['Istorija ir scena iš kaladėlių', 'The story and a set built from bricks']],
      ['11:00', ['Laukas be ekranų', 'Outdoors, no screens']],
      ['12:00', ['Pietūs', 'Lunch']],
      ['13:00', ['Filmuojam kadras po kadro', 'We shoot frame by frame']],
      ['14:30', ['Balsai, garsai ir muzika', 'Voices, sound effects and music']],
      ['16:00', ['Dienos premjera: 1 pagyrimas, 1 patarimas', 'Premiere of the day: 1 praise, 1 tip']]
    ],
    gear: ['Planšetė ar telefonas + stovas + kaladėlės + stop-motion programėlė', 'A tablet or phone + a stand + bricks + a stop-motion app'],
    test: ['3 dienų modulis per pavasario atostogas vienoje mokykloje, 16 vaikų', 'A 3-day module in the spring break at one school, 16 kids'] }
];

var RV_UPSELLS = [
  { id: 'u11', em: '🏠', n: ['Namų tęsinys', 'Home sequel'], d: ['4 sav. stovyklos temos turinio namams: video, misijos, žaidimo skyrius', '4 weeks of the camp theme at home: videos, missions, a game chapter'], p: ['10 % stovyklos kainos (€15–35) 🅰️', '10 % of the camp price (€15–35) 🅰️'] },
  { id: 'u2', em: '🎮', n: ['RA ProKid žaidimas', 'The RA ProKid game'], d: ['Aktyvi prenumerata namie: be roboto, be mentoriaus', 'An active subscription at home: no robot, no mentor'], p: ['10–15 €/mėn. 🅰️', '€10–15/month 🅰️'] },
  { id: 'u1', em: '🤖', n: ['Pasilik robotą', 'Keep the robot'], d: ['Penktadienį robotas keliauja namo + 2 metų turinys', 'On Friday the robot goes home + 2 years of content'], p: ['robotas + 10–15 €/mėn. 🅰️', 'robot + €10–15/month 🅰️'] },
  { id: 'u4', em: '📸', n: ['Atsiminimų paketas', 'Memory pack'], d: ['Kasdienės nuotraukos, savaitės filmukas, diplomas, komandos nuotrauka', 'Daily photos, a film of the week, a diploma, a team photo'], p: ['12–19 € 🅰️', '€12–19 🅰️'] },
  { id: 'u12', em: '👕', n: ['RA atributika ir žaislai', 'RA merch and toys'], d: ['Gertuvė, kepurė, marškinėliai, kuprinė, žurnalas, pliušinis Leo', 'Bottle, cap, T-shirt, backpack, journal, a plush Leo'], p: ['rinkiniai 19–59 € 🅰️', 'bundles €19–59 🅰️'] },
  { id: 'u3', em: '⏰', n: ['Prailginta diena', 'Extended day'], d: ['7:30–9:00 ir 17:00–18:00 dirbantiems tėvams', '7:30–9:00 and 17:00–18:00 for working parents'], p: ['+25–35 €/sav. 🅰️', '+€25–35/week 🅰️'] },
  { id: 'u5', em: '🍂', n: ['Rudens būrelio vieta', 'An autumn club seat'], d: ['Tik stovyklos penktadienį: vieta rudeniui su nuolaida', 'Only on camp Friday: a discounted seat for autumn'], p: ['−10 % už sezoną 🅰️', '−10 % for the season 🅰️'] },
  { id: 'u6', em: '👫', n: ['Antra savaitė ir brolis ar sesė', 'Second week and a sibling'], d: ['Kita tema kitą savaitę arba antras vaikas', 'Another theme next week or a second child'], p: ['−15–20 % 🅰️', '−15–20 % 🅰️'] },
  { id: 'u13', em: '🧑‍💻', n: ['1:1 online pamoka su mentoriumi', '1:1 online lesson with a mentor'], d: ['Po stovyklos: vaikas tęsia savo projektą su tuo pačiu mentoriumi', 'After camp: the child continues the project with the same mentor'], p: ['25–35 €/val. 🅰️', '€25–35/hour 🅰️'] },
  { id: 'u8', em: '🧩', n: ['Papildymų rinkiniai', 'Expansion packs'], d: ['Creator Kit, AI Vision Kit tiems, kas turi robotą', 'Creator Kit, AI Vision Kit for those who own a robot'], p: ['pagal kainoraštį', 'per price list'] },
  { id: 'u9', em: '🏅', n: ['Robotų lyga', 'Robot league'], d: ['Turnyrai rudenį ir pavasarį stovyklos komandoms', 'Autumn and spring tournaments for camp teams'], p: ['sezono bilietas 29–49 € 🅰️', 'season pass €29–49 🅰️'] },
  { id: 'u10', em: '🎂', n: ['Gimtadienis su robotais', 'Robot birthday party'], d: ['Kuponas gimtadieniui RA erdvėje su šunimi ar R1', 'A voucher for a birthday at an RA space with the dog or R1'], p: ['nuo 149 € 🅰️', 'from €149 🅰️'] }
];

var RV_GEAR = [
  { id: 'g-tale', n: ['Tale-Bot Pro', 'Tale-Bot Pro'] },
  { id: 'g-vinci', n: ['VinciBot', 'VinciBot'] },
  { id: 'g-creator', n: ['VinciBot Creator Kit', 'VinciBot Creator Kit'] },
  { id: 'g-vision', n: ['VinciBot AI Vision Kit', 'VinciBot AI Vision Kit'] },
  { id: 'g-dog', n: ['Robotas šuo', 'Robot dog'] },
  { id: 'g-r1', n: ['Humanoidas R1', 'R1 humanoid'] },
  { id: 'g-xr', n: ['VR / XR akiniai', 'VR / XR headset'] }
];

/* pristatymo tvarka: robotai → skaitmeninės → be ekranų → paaugliams */
(function () {
  var order = ['dog', 'cup', 'vai', 'tale', 'duck', 'box', 'mc', 'gamer', 'creator', 'lego', 'xr', 'life', 'detox', 'comp', 'teen'];
  var by = {}; RV_CONCEPTS.forEach(function (c) { by[c.id] = c; });
  RV_CONCEPTS = order.map(function (k) { return by[k]; }).filter(Boolean);
})();

/* ---------- v3 pataisos pagal Kris peržiūrą 2026-11-15 23:30 ---------- */
(function () {
  var by = {}; RV_CONCEPTS.forEach(function (c) { by[c.id] = c; });
  function set(id, o) { var c = by[id]; if (!c) return; for (var k in o) c[k] = o[k]; }
  RV_CONCEPTS = RV_CONCEPTS.filter(function (c) { return c.id !== 'box'; });
  set('dog', { star: false,
    n: ['Tikrų robotų stovykla: šunys ir humanoidas R1', 'Real Robots Camp: dogs and the R1 humanoid'],
    one: ['Svajonių stovykla vyresniems: programuojam tikrus RA robotus šunis ir lauke vykdom paieškos ir gelbėjimo misijas. R1 valdo mentorius.', 'An aspirational camp for older students: we program RA\'s real robot dogs and run search-and-rescue missions outdoors. The mentor drives R1.'],
    age: ['12–16 m.', 'Age 12–16'],
    acts: [
      ['Programuojam šunis: eisena, jutikliai, maršrutas', 'We program the dogs: gait, sensors, route'],
      ['Misija lauke: rask „dingusį“ daiktą, nunešk vaistinėlę', 'Outdoor mission: find the "lost" object, deliver a first-aid kit'],
      ['Kaip robotai padeda gelbėtojams ir kariams saugoti žmones', 'How robots help rescuers and soldiers keep people safe'],
      ['Penktadienį: misijos šou tėvams (video tik tėvams)', 'Friday: a mission show for parents (video for parents only)']
    ],
    day: [['9:00', ['Misijos brifingas', 'Mission briefing']], ['9:30', ['Programuojam šunų maršrutą', 'We program the dogs\' route']], ['11:00', ['Lauke: bandomoji misija', 'Outdoors: a trial mission']], ['12:00', ['Pietūs', 'Lunch']], ['13:00', ['R1 valanda: stebim už 2 m linijos', 'R1 hour: we watch from behind the 2 m line']], ['14:30', ['Taisom kodą, antras bandymas', 'We fix the code, second run']], ['16:00', ['Misijos video tėvams', 'Mission video for parents']]] });
  set('cup', { one: ['Visą savaitę ruošiamės varžyboms su VinciBot: lenktynės, sumo, piešimas, futbolas. Penktadienį čempionatas.', 'All week we prepare for a competition with VinciBot: racing, sumo, drawing, football. On Friday the championship.'] });
  set('tale', { one: ['Be ekranų. Vaikas veda robotą per pasaką ant žemėlapio ir per savaitę sukuria savo pasakų knygelę.', 'Screen-free. The child guides the robot through a story on a map and makes their own storybook during the week.'] });
  if (by.tale) by.tale.acts[3] = ['Penktadienį: spektaklis tėvams, o namo vaikas parsineša savo pasakų knygelę', 'Friday: a play for parents, and the child takes home their own storybook'];
  set('duck', { one: ['Svajonių stovykla paaugliams su atviro kodo DI robotais. Reachy Mini mato, girdi ir kalba, o vaikščiojanti antis Microduck yra savaitės talismanas.', 'An aspirational camp for teens with open-source AI robots. Reachy Mini sees, hears and talks, and the walking Microduck is the mascot of the week.'] });
  set('mc', { one: ['Minecraft Education + DI. Vaikas pasako, ką nori pastatyti, programuoja agentą, kuris stato už jį, tikrina ir taiso.', 'Minecraft Education + AI. The child says what to build, codes an agent that builds it, then checks and fixes.'] });
  if (by.mc) by.mc.acts[1] = ['Programuoju agentą: aprašyk, paleisk, rask klaidą, pataisyk', 'I code the agent: describe, run, find the bug, fix it'];
  if (by.gamer) { by.gamer.acts[2] = ['3–5 video ir savo kanalas saugioje aplinkoje', '3–5 videos and your own channel in a safe space'];
    by.gamer.acts[3] = ['RA KidsTube: uždara platforma vaikams ir tėvams', 'RA KidsTube: a closed platform for kids and parents']; }
  if (by.creator) by.creator.acts[1] = ['Žalias ekranas su planšetėmis; galima atsinešti savo telefoną ar planšetę. Kuriam mokomąjį turinį', 'Green screen with tablets; you may bring your own phone or tablet. We make educational content'];
  set('lego', { one: ['Vaikas pastato sceną iš kaladėlių ir kadras po kadro paverčia ją filmu. Savaitės gale turi savo filmą, kurį gali parodyti ir pasidalinti su šeima.', 'A child builds a scene from bricks and turns it into a film, frame by frame. By the end of the week they have their own film to show and share with family.'] });
  set('xr', { one: ['Vaikas pats sukuria WebXR programėlę: mokomąjį pasaulį, kuris veikia telefone, planšetėje ir VR akiniuose.', 'The child builds their own WebXR app: an educational world that runs on a phone, a tablet and a VR headset.'],
    acts: [
      ['Kuriu savo WebXR programėlę su DI pagalba', 'I build my own WebXR app with AI help'],
      ['Papildyta realybė: mano modelis ant stalo per telefoną ar planšetę', 'Augmented reality: my model on the table through a phone or tablet'],
      ['VR akiniai: įeinu į savo pasaulį. Blokai iki 20–30 min. ⚠️, tarp jų judesys', 'VR headset: I step into my world. Blocks up to 20–30 min ⚠️, movement in between'],
      ['Penktadienį: tėvai išbando programėlę savo telefone', 'Friday: parents try the app on their own phone']
    ] });
  set('detox', { n: ['Tech Detox: technologijų etiketas', 'Tech Detox: technology etiquette'],
    one: ['Vaikai mokosi sveiko santykio su technologijomis, parašo savo etiketą ir išmoko jo kitus. Tarp to išbando 7 būrelius.', 'Kids learn a healthy relationship with technology, write their own etiquette and teach it to others. In between they try 7 clubs.'],
    acts: [
      ['Rašom savo technologijų etiketą: kada, kur, kiek', 'We write our own tech etiquette: when, where, how much'],
      ['Kovos menai · muzika · tapyba · molis · viešas kalbėjimas · verslumas', 'Martial arts · music · painting · clay · public speaking · entrepreneurship'],
      ['Telefonai ryte keliauja į „seifą“', 'Phones go into the "safe" in the morning'],
      ['Penktadienį: vaikai moko tėvus, šeima pasirašo', 'Friday: kids teach parents, the family signs']
    ] });
  if (by.comp) by.comp.acts[2] = ['Kviečiam visų Lietuvos komandų narius: FLL, FTC ir kt. ❓', 'We invite members of all Lithuanian teams: FLL, FTC and others ❓'];
  if (by.teen) by.teen.acts[3] = ['Paauglys gauna socialines valandas ir tikrą darbo patirtį, RA augina būsimus mentorius', 'The teen earns social hours and real work experience, RA grows future mentors'];
  set('life', { one: ['5 įgūdžiai kiekvienam 6–10 m. vaikui: susivaldyti, sutarti, judėti, mokytis mokytis, kurti. Didelė grupė, daug svečių būrelių.', '5 skills for every child aged 6–10: self-control, getting along, moving, learning to learn, creating. A big group, many guest clubs.'],
    acts: [
      ['Pr: sustok, pagalvok, veik · An: jausmai ir komanda', 'Mon: pause, think, act · Tue: feelings and teamwork'],
      ['Tr: judu · Kt: mokausi mokytis · Pn: kuriu', 'Wed: I move · Thu: I learn to learn · Fri: I create'],
      ['Per tikrus darbus: kambarys, pietūs, draugai', 'Through real tasks: room, lunch, friends'],
      ['Svečių būreliai per ExoClass. Namo: 5 įgūdžių pasas', 'Guest clubs through ExoClass. To take home: the 5-skills passport']
    ] });
})();

/* ---------- v4 (Kris 2026-11-16 00:2x): Roblox 1–4 kl. + 5 žaidimų e. sporto stovykla ---------- */
(function () {
  var DAYR = [['9:00', ['Kūrėjų ratas + dienos iššūkis', 'Makers circle + challenge of the day']], ['9:30', ['Roblox Studio: statom savo žaidimą', 'Roblox Studio: we build our game']], ['11:00', ['Žaidimai lauke be ekranų', 'Outdoor games, no screens']], ['12:00', ['Pietūs', 'Lunch']], ['13:00', ['Taisyklės, taškai, kliūtys', 'Rules, points, obstacles']], ['14:30', ['Testuojam draugų žaidimus', 'We test friends\' games']], ['16:00', ['Parodau, ką sukūriau + 3 emoji', 'I show what I made + 3 emoji']]];
  var DAYE = [['9:00', ['Komandos ratas + dienos žaidimas', 'Team circle + game of the day']], ['9:30', ['Treniruotė: taktika ir komandos vaidmenys', 'Practice: tactics and team roles']], ['11:00', ['Sportas lauke: reakcija, ištvermė', 'Outdoor sport: reaction, stamina']], ['12:00', ['Pietūs', 'Lunch']], ['13:00', ['Profesijos: žaidėjas, treneris, komentatorius', 'Jobs: player, coach, caster']], ['14:30', ['Dienos turnyras su komentatoriumi', 'Tournament of the day with a caster']], ['16:00', ['Rungtynių analizė + 3 emoji', 'Match review + 3 emoji']]];
  var roblox = { id: 'roblox', em: '🧱', img: 'img/ai.jpg', fit: '#152039',
    n: ['Roblox kūrėjai: mano pirmas žaidimas', 'Roblox Makers: my first game'],
    one: ['1–4 klasių vaikai su savo kompiuteriais per savaitę sukuria savo Roblox žaidimą. Iš žaidėjo į kūrėją.', 'Grades 1–4 kids build their own Roblox game in a week on their own computers. From player to maker.'],
    age: ['1–4 kl. (7–10 m.)', 'Grades 1–4 (age 7–10)'], grp: ['14 vaikų', '14 kids'], ratio: ['1 : 7', '1 : 7'],
    prices: [['169', ['savas kompiuteris, 16 vaikų', 'own computer, 16 kids']], ['209', ['14 vaikų, 2 mentoriai', '14 kids, 2 mentors']], ['269', ['+ RA kompiuteris ir 4 sav. online klubas', '+ an RA computer and a 4-week online club']]],
    acts: [['Statau savo pasaulį Roblox Studio', 'I build my world in Roblox Studio'], ['Kliūčių ruožas, taškai, taisyklės: pirmas kodas', 'An obstacle course, points, rules: first code'], ['Kasdien 90 min. lauke be ekranų', '90 minutes outdoors without screens every day'], ['Penktadienį: tėvai žaidžia vaiko žaidimą', 'Friday: parents play the child\'s game']],
    day: DAYR, gear: ['Vaiko kompiuteris (Windows arba macOS) + Roblox Studio', 'The child\'s computer (Windows or macOS) + Roblox Studio'], test: ['Kūrėjų klubo grupė: 4 pamokos su savais kompiuteriais', 'A Makers Club group: 4 lessons on own computers'] };
  var esport = { id: 'esport', em: '🎮', img: 'img/football.jpg', fit: '#152039',
    n: ['E. sporto stovykla: 5 žaidimai', 'Esports Camp: 5 games'],
    one: ['Penki populiariausi žaidimai vienoje stovykloje, kasdien kitas. Vaikai sužino, kaip dirba profesionalus žaidėjas ir visa komanda aplink jį.', 'The five most popular games in one camp, a new one each day. Kids learn how a pro gamer and the whole team around them work.'],
    age: ['10–14 m.', 'Age 10–14'], grp: ['16 vaikų', '16 kids'], ratio: ['1 : 8', '1 : 8'],
    prices: [['189', ['mokyklos kompiuteriai, 20 vaikų', 'school PCs, 20 kids']], ['239', ['16 vaikų, 2 treneriai, finalas', '16 kids, 2 coaches, a final']], ['299', ['+ e. sporto arenos diena ir komandos marškinėliai', '+ an esports arena day and team jerseys']]],
    acts: [['Minecraft · Roblox · Brawl Stars · Clash Royale · Wild Rift', 'Minecraft · Roblox · Brawl Stars · Clash Royale · Wild Rift'], ['Profesijos: žaidėjas, treneris, komentatorius, organizatorius', 'Jobs: player, coach, caster, organiser'], ['Pusė dienos be ekrano: sportas, miegas, mityba, reakcija', 'Half the day off screen: sport, sleep, food, reaction'], ['Penktadienį: finalas su komentatoriumi, tėvai tribūnoje', 'Friday: a final with a caster, parents in the stands']],
    day: DAYE, gear: ['Kompiuterių klasė + planšetės; stovyklos paskyros su tėvų sutikimu', 'A computer room + tablets; camp accounts with parent consent'], test: ['Šeštadienio turnyras vienoje mokykloje, 16 vaikų', 'A Saturday tournament at one school, 16 kids'] };
  var out = [];
  RV_CONCEPTS.forEach(function (c) { out.push(c); if (c.id === 'mc') out.push(roblox); if (c.id === 'gamer') out.push(esport); });
  RV_CONCEPTS = out;
})();

/* v5 (Kris 2026-11-16 01:2x): Tech Detox = mokom technologijų etiketo */
(function () {
  RV_CONCEPTS.forEach(function (c) { if (c.id !== 'detox') return;
    c.img = 'img/c-te.jpg'; c.fit = '#FFFFFF';
    c.one = ['Mokom technologijų etiketo: kaip elgtis su telefonu, kad tikras gyvenimas būtų įdomesnis už ekraną. Tarp to vaikai išbando 7 būrelius.', 'We teach technology etiquette: how to behave with a phone so that real life beats the screen. In between kids try 7 clubs.'];
    c.acts = [
      ['Technologijų etiketas: 10 taisyklių, vaikai parašo savo', 'Technology etiquette: 10 rules, kids write their own'],
      ['10 didžiausių telefono problemų ir kaip jas išspręsti', 'The 10 biggest phone problems and how to fix them'],
      ['Kaip įveikti įprotį nuolat tikrinti telefoną ir ekraną', 'How to beat the habit of checking the phone and screen'],
      ['Tikras gyvenimas įdomesnis: 7 būreliai, o penktadienį vaikai moko tėvus', 'Real life is more fun: 7 clubs, and on Friday kids teach parents']
    ];
  });
})();

/* v5.1 (Kris 01:3x): mentorių akademija = praktika 16–20 m.; trumpesnės etiketo veiklos */
(function () {
  RV_CONCEPTS.forEach(function (c) {
    if (c.id === 'detox') { c.acts[2] = ['Kaip įveikti įprotį nuolat tikrinti ekraną', 'How to beat the habit of checking the screen']; c.acts[3] = ['Tikras gyvenimas įdomesnis: 7 būreliai', 'Real life is more fun: 7 clubs']; c.acts[0] = ['Technologijų etiketas: 10 taisyklių', 'Technology etiquette: 10 rules']; c.one = ['Mokom technologijų etiketo: kaip elgtis su telefonu, kad tikras gyvenimas būtų įdomesnis už ekraną. Vaikai išbando 7 būrelius.', 'We teach technology etiquette: how to behave with a phone so that real life beats the screen. Kids try 7 clubs.']; }
    if (c.id !== 'teen') return;
    c.one = ['Praktika 16–20 m. jaunuoliams: 2 dienas mokosi vesti, 3 dienas padeda tikram mentoriui masinėje stovykloje.', 'Work practice for ages 16–20: 2 days learning to lead, then 3 days helping a real mentor in a mass camp.'];
    c.age = ['16–20 m.', 'Age 16–20']; c.grp = ['12 praktikantų', '12 trainees'];
    c.acts[3] = ['Praktikantas gauna socialines valandas ir tikrą darbo patirtį, RA augina būsimus mentorius', 'The trainee earns social hours and real work experience, RA grows future mentors'];
    c.test = ['6 praktikantai vienoje stovykloje 2027 birželį', '6 trainees in one camp in June 2027'];
  });
})();

/* v6 (antro kritiko pataisos 2026-11-16) */
(function () {
  RV_CONCEPTS.forEach(function (c) {
    if (c.id === 'gamer') c.day = [['9:00', ['Kūrėjų ratas + dienos video tema', 'Makers circle + video topic of the day']], ['9:30', ['Žaidžiu ir įrašau savo žaidimą', 'I play and record my gameplay']], ['11:00', ['Sportas lauke', 'Outdoor sport']], ['12:00', ['Pietūs', 'Lunch']], ['13:00', ['Komentuoju ir montuoju video', 'I narrate and edit the video']], ['14:30', ['Viršelis, pavadinimas, kanalo ženklas', 'Thumbnail, title, channel logo']], ['16:00', ['Premjera uždarame RA KidsTube + 3 emoji', 'Premiere on the closed RA KidsTube + 3 emoji']]];
    if (c.id === 'esport') c.gear = ['Kompiuterių klasė + planšetės; RA paskyros, kurias valdo mentorius', 'A computer room + tablets; RA accounts run by the mentor'];
    if (c.id === 'teen') c.gear = ['Jokios naujos įrangos. Praktikoje po 2 praktikantus prie vieno mentoriaus', 'No new equipment. In practice 2 trainees per mentor'];
  });
})();

/* v8 (Kris 2026-11-16): galimas priedas šunų ir R1 stovyklai: dronai */
(function () {
  RV_CONCEPTS.forEach(function (c) {
    if (c.id === 'dog') c.acts[1] = ['Paieškos misija lauke. Galimas priedas: maži dronai ieško iš oro', 'Outdoor search mission. Possible add-on: small drones search from the air'];
  });
})();
