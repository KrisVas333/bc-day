# RUN-OF-SHOW · DI mokytojams · KŠIC Zoom · 2026-11-10

**Kada:** antradienis 2026-11-10 · techninis patikrinimas **15:25** · pradžia **15:30** · langas 60 min.
**Kas:** Kauno švietimo inovacijų centras (KŠIC), organizatorius Tomas Stasiukaitis · 100-500 mokytojų Zoom'e · pažymėjimai · be mokesčio.
**Kelias:** 30 min. pristatymas (15:30-16:00) + klausimai (16:00-16:30). Atsarginis kelias: 20 min.

## 5 prielaidos (patikrinkite rytą)

1. **Auditorija:** IT ir kiti mokytojai, labai skirtingas DI lygis (nuo „nenaudoju" iki „kasdien"). Kalbam „jūs" forma.
2. **Forma:** Kris dalijasi naršyklės langu. Telefonai jungiasi per QR arba kodą **KAUN**. Kas be telefono, atsako Zoom pokalbyje.
3. **Skaičiai:** tik iš `facts.md` eilučių be ⚠️. Ant skaidrės: grade (A/B) + trumpas šaltinis. Pilni URL užrašuose ir „Šaltiniai" priede.
4. **Ne apimtyje:** įrankių reitingas, vaikų veidai ir vardai, nauji DB stulpeliai ar MailerLite grupės, automatinis laiškas, publikavimas be Kris'o GO.
5. **Baigta, kai:** deck + telefonai + pultas + medžiaga veikia su 0 JS klaidų, QA be kritinių klaidų, ilgų brūkšnių ir draudžiamų pareigų žodžių 0 (tik „bendrasavininkas ir kūrybos direktorius"), lokalus commit. **Push tik po Kris'o GO.**

⚠️ **Prielaida, kuri gali viską pakeisti:** Supabase rado 12 QA eilučių iš 2026-11-09 kitam to paties renginio deck'ui (`mokymai = it-mokytojai-antros-smegenys`, „IT mokytojai · Kauno ŠIC (online)"). To deck'o nėra nei `bc-day` main, nei šiame PC. Jei jis yra Mac'e, Kris renkasi vieną.

## 5 eilučių planas

- **Tikslas:** 7 Kris'o klausimai (DI · agentas · LLM · švietimui · rizikos · nauda · kaina) per 30 min., su telefonų kambariu ir medžiagos QR pabaigoje.
- **Baigta:** žr. 5 prielaidą.
- **Kas gali lūžti:** Supabase Free limitas (~200 jungčių) · Zoom pokalbis vietoj telefonų · per daug teksto ekrane · neteisingas skaičius.
- **Failai:** `index.html` · `join.html` · `pultas.html` · `medziaga.html` · `acts.js` · `mentor.js` · `ml-form.js` · `assets/img/`.
- **Testas:** `qa.js` (mokymai variklis) · ekrano nuotraukos 1280×720 ir 360 px · apkrovos testas 320 atsakymų.

## Minutės · 30 min. kelias (numatytas)

| # | Skaidrė | Min. | Laikas | Telefone |
|---|---|---|---|---|
| 1 | Prisijunkite | 0 | 15:30 | QR + kodas KAUN |
| 2 | Kas jūs? | 1 | 15:31 | dalykas, įrankiai, pulsas |
| 3 | Kas aš (+ interesai) | 2 | 15:32 | |
| 4 | 7 klausimai | 3 | 15:33 | pasitikėjimas „prieš" |
| 5 | Spėkite | 4 | 15:34 | viktorina, 45 s |
| 6 | 1 · Kas yra DI? | 5 | 15:35 | |
| 7 | 2 · Kas yra LLM? | 7 | 15:37 | (demo „Spėk žodį" ekrane) |
| 8 | 3 · Kas yra agentas? | 9 | 15:39 | |
| 9 | Antrosios smegenys | 11 | 15:41 | |
| 10 | 3 lygiai | 14 | 15:44 | L1 / L2 / L3 |
| 11 | 4 · 5 darbai šią savaitę | 15 | 15:45 | užklausų bankas |
| 12 | Info Gynėjai | 18 | 15:48 | |
| 13 | Rask DI klaidą | 19 | 15:49 | 1-5, 60 s |
| 14 | 5 · Nauda | 21 | 15:51 | |
| 15 | Prisiminkite | 24 | 15:54 | viktorina, 30 s |
| 16 | 6 · Rizikos | 25 | 15:55 | |
| 17 | 7 · Kaina (+ interesai) | 27 | 15:57 | |
| 18 | Kitas žingsnis | 29 | 15:59 | naudingumas, dirbtuvės, „po" |
| 19 | Ačiū + medžiagos QR | 30 | 16:00 | → klausimai iki 16:30 |
| 20 | Šaltiniai (priedas) | 32 | tik jei klausia | |

## Minutės · 20 min. kelias

Atidarykite su `&trukme=20`. Praleidžiamos 5 skaidrės: **Kas jūs? · Spėkite · 3 lygiai · Info Gynėjai · Prisiminkite** (rodyklė jas praleidžia, skaičius + Enter vis tiek atidaro).

| Skaidrė | Min. | Laikas |
|---|---|---|
| Prisijunkite | 0 | 15:30 |
| Kas aš | 1 | 15:31 |
| 7 klausimai | 2 | 15:32 |
| Kas yra DI? | 3 | 15:33 |
| Kas yra LLM? | 4 | 15:34 |
| Kas yra agentas? | 6 | 15:36 |
| Antrosios smegenys | 8 | 15:38 |
| 5 darbai šią savaitę | 10 | 15:40 |
| Rask DI klaidą | 13 | 15:43 |
| Nauda | 15 | 15:45 |
| Rizikos | 16 | 15:46 |
| Kaina | 17 | 15:47 |
| Kitas žingsnis | 18 | 15:48 |
| Ačiū | 19 | 15:49 |
| Šaltiniai (priedas) | 21 | tik jei klausia |

Grįžti į 30 min.: `&trukme=30` (naršyklė prisimena paskutinį pasirinkimą).

## Ką įklijuoti į Zoom pokalbį

**15:30, iškart:**
```
Telefonu (be vardų, be registracijos): https://krisvas333.github.io/bc-day/it-mokytojai-di/join.html?r=KAUN
Kodas: KAUN. Be telefono? Atsakykite čia, pokalbyje.
```

**16:00, Ačiū skaidrėje:**
```
Visa medžiaga, 11 užklausų ir šaltiniai: https://krisvas333.github.io/bc-day/it-mokytojai-di/medziaga.html?src=it-mokytojai-1110
```

## Zoom pokalbio atsarginis scenarijus (kiekviena klausimo skaidrė)

| Skaidrė | Ekrane parašyta | Ką sakote |
|---|---|---|
| Prisijunkite | „Be telefono? Atsakykite Zoom pokalbyje." | „Telefonas nebūtinas. Pokalbis veikia lygiai taip pat." |
| Kas jūs? | „Zoom pokalbyje: ką dėstote ir kurį DI naudojate" | „Parašykite dalyką ir vieną įrankį." |
| 7 klausimai | „Pabaigoje paklausiu to paties." | „Kiek dabar galite paaiškinti, 1-5?" |
| Spėkite | „Zoom pokalbyje: A, B, C ar D" | „Viena raidė pokalbyje." |
| 3 lygiai | „Zoom pokalbyje: L1, L2 ar L3" | „Kur esate šiandien?" |
| Rask DI klaidą | „Zoom pokalbyje: numeris 1-5" | „Kuris teiginys klaidingas? Numeris." |
| Prisiminkite | „Zoom pokalbyje: A, B, C ar D" | „Be žvilgsnio atgal. Raidė." |
| Kitas žingsnis | „Zoom pokalbyje: kiek naudinga, 1-5" | „Ir „+" jei norite dirbtuvių." |

Pokalbio skaičius galite įvesti rankiniu būdu: klavišas **M**.

## Jei telefonų kambarys neveikia

1. **Viršuje ženklelis raudonas** („ryšio nėra (M)"): sakykite *„Telefonų kambarys šiandien užstrigo, todėl atsakome Zoom pokalbyje."* Toliau tik pokalbis, skaičius įveskite su **M**.
2. **Labai daug žmonių** (virš ~200 telefonų Supabase Free limitas): telefonai, kurie neprisijungė, po 12 s patys rodo klausimų sąrašą. Atsakymai vis tiek ateina į ekraną (testuota: 320 iš 320). Sakykite *„Jei telefonas rodo sąrašą, pasirinkite tą klausimą, kurį matote ekrane."*
3. **Neveikia nei telefonai, nei pokalbis:** tiesiog kalbate. Kiekviena skaidrė veikia ir be atsakymų.
4. **Visai nėra interneto pas Kris'ą:** deck'as veikia iš atidaryto lango klaviatūra. Medžiagos nuorodą įklijuokite vėliau.

## Kanono išimtys (sąmoningos)

- **Praktika ≥ 20 % laiko: FAIL (0/32 min.).** Tai 30 min. Zoom paskaita 100-500 žmonių, ne dirbtuvės. Praktika perkelta į telefoną (11 užklausų su „Kopijuoti") ir į siūlomas praktines dirbtuves (varnelė medžiagos puslapyje).
- **Judėjimo pertraukos priminimas** įsijungia 30 min. Ačiū skaidrėje: spauskite **Esc** (paslepia 60 min.).
- **Užrašai (N) Zoom'e matosi visiems.** Užrašus skaitykite **pulte telefone**.

## ⚠️ Atviri klausimai

- ⚠️ Galimas dublis: deck `it-mokytojai-antros-smegenys` (2026-11-09). Kuris rodomas?
- ⚠️ **Be push QR ir nuorodos rodo 404.** Reikia GO.
- ⚠️ Supabase Free: ~200 vienu metu prijungtų telefonų. Virš to veikia atsarginis sąrašas (testuota tik su 320 REST atsakymų, ne su 300 tikrų telefonų).
- ⚠️ Patvirtinkite sakinius: „Nė vienas šių DI įrankių man nemoka." ir „Pokalbis su Tomu spalio 16 d. → 7 klausimai → agentai surinko medžiagą" (Antrosios smegenys skaidrė).
- ⚠️ Info Gynėjai skaidrės formuluotė (pilotas mokykloms) laukia Kris'o žodžio.
- ⚠️ Dirbtuvių noras keliauja `src` lauke (`it-mokytojai-1110+dirbtuves`), nes lentelėje nėra stulpelio. Naujo stulpelio nekūrėm.
- ⚠️ Laiškas automatiškai nesiunčiamas. Forma žada „per kelias dienas": kas nors turi išsiųsti rankiniu būdu per MailerLite.
- ⚠️ 11 užklausų neišbandytos gyvai su ChatGPT/Claude/Gemini.
- ⚠️ Kaina: Copilot ir Gemini amžius ir Copilot kaina skaidrėje „tikrinkite su administratoriumi" / „pagal šalį", nes `facts.md` eilutės turi ⚠️ (šaltinis 2025-10, LT skaičius netikrintas).
- ⚠️ ES DI akto data 2027-12-02 iš advokatų kontoros santraukos; EUR-Lex neatidarytas.
- ⚠️ LT „~70 % mokytojų naudoja DI" (LRT 2026-01), TALIS 39 % ir Aila tik užrašuose, ne skaidrėse.
- ⚠️ `di_rastingumas` neturi kodo „informatika", todėl IT pažymima kaip „kita".
- ⚠️ Išorinio sekiklio (`neuron-ar/track.js`, umami) klaida localhost'e. Yra ir siaures-ai-90. Ne šio deck'o kodas.
- ⚠️ Tomas laukia atsakymo (bio + QR → pilotas), pagal `wiki/meta/handoff.md`.
- ⚠️ Įrankiai vardijami kaip pavyzdžiai, abėcėlės tvarka. Prieš paleidimą: `bias` vartai (kainos skaidrė + medžiagos puslapis).

## Realaus pasaulio testas (eilutė į `wiki/meta/real-world-tests.md`)

```
| 2026-11-10 | DI mokytojams · KŠIC Zoom | Zoom dalyviai: ? · telefonų (ženklelis): ? · atsakymų per klausimą: ? · el. paštų (mokymai=it-mokytojai-di): ? · iš jų +dirbtuves: ? | 14 d. matavimas 2026-11-24 | KEEP / FIX / KILL |
```

El. paštų skaičius (Supabase SQL, tik skaityti):
```
select count(*) as viso, count(*) filter (where src like '%+dirbtuves') as dirbtuves from mokytojai_el_pastai where mokymai = 'it-mokytojai-di';
```

Kalbų vartai (taisyklė 17): honoraras 0 € · pirkėjai salėje: mokytojai ir galbūt direktoriai · nuosavas sąrašas: tikslas ≥ 30 el. paštų per medžiagos QR.
