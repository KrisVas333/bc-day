# GIF gamybos sąrašas (Higgsfield / komerciniai / mūsų įrašai)

Kiekvienas `gifslot` puslapyje turi `data-brief`. Įkėlimas: pakeisti div'ą į `<img src="assets/<failas>.gif">`.

## Higgsfield generuojami (9)
1. **S1 gyvenimo ciklas** — baby crawling → child running POV through playground → teenager studying → adult working with holograms/future tech → astronaut in space → glowing question mark. One continuous cinematic loop, documentary color grade.
2. S2 ugnis — prehistoric campfire at night, faces lit, cinematic
3. S2 ratas — ancient wooden cart wheel turning, dusty road
4. S2 raštas — clay tablet → quill → book pages turning
5. S2 elektra — first light bulbs flickering on in a dark street (Edison era)
6. S2 kosmosas — rocket launch rising through clouds to stars
7. **S5 neuronų tinklas** — glowing neural network learning, signals traveling between nodes, red on white
8. **S12 taksistas** — London black cab driver, city map growing/glowing inside his transparent head, brain lighting up
9. S11 aura battle — stylized street crowd circle, kid doing confident dance move, floating "+1000 AURA"

## Komerciniai / oficialūs klipai (teisės: naudoti salėje OK, socialui — tik su leidimu)
10. S4 Even Realities G2 reklamos momentas (užsideda → tekstas akyse)
11. S4 Meta Quest 3S reklamos momentas (užsideda → MR pasaulis kambaryje)
12. S6 humanoidai ×4: skalbiniai/namai (1X/Figure klipai) · gamykla (Figure/BMW) · mokykla (stilizuotas) · kosmosas (Robonaut/Optimus stilius)
13. S10 brain rot ×3 — scrollinimas stiklinėm akim · laikrodis sukasi · smegenys užmiega (galima ir Higgsfield stilizuotai)
14. S11 Rayyan Pacu Jalur klipas (viral video — salėje OK)
15. S15 Gorilla Tag gameplay · Cubism gameplay (oficialūs traileriai) · **MŪSŲ Laser Tag įrašas** (nufilmuoti savo!)

## Mūsų filmuojami (2)
- Laser Tag VR gameplay (S15) — Kris/Gabrielius Quest įrašas
- 15 sek. „kaip vaikas su AI sukūrė žaidimą" (S16)

---

## V5 nauji

### Kaip įdėti GIF (V5 būdas — viena eilutė)
1. Įrašyk failą į `assets/img/`.
2. `index.html`, viršuje, `var GIFMAP={};` → įrašyk eilutę, pvz.:
   ```js
   var GIFMAP={ "priesas-scroll":"priesas-scroll.gif", "g2":"g2.gif" };
   ```
3. Viskas. `GIFMAP` nurodo aukštesnį prioritetą nei `IMGMAP`, ken-burns rėmelis lieka tas pats.
- Naršyklės konsolėje `listGifSlots()` parodo visus slotus: ✅ GIF · 🖼 jpg · ⬜ tuščias.
- Jei renginio dieną GIF'ai dar nepadaryti — `SHOW_EMPTY_SLOTS=false` ir brūkšninės tuščios vietos tiesiog dings.

### 5 smegenų priešai (S8) — 5 nauji GIF'ai, stilizuoti, šviesus fonas, raudonas akcentas
16. **`priesas-miegas`** — vaikas naktį lovoje, virš galvos telefono švytėjimas; laikrodis fone šoka 23:00 → 01:00; akys vis sunkesnės. Stilizuota, be tikroviško veido. Loop 3 s.
17. **`priesas-sofa`** — „sofos bulvė": figūra įsmunka į sofą ir tampa bulve-pagalve; aplink auga dulkės/šaknys; kojos nejuda. Komiška, ne gėdinanti. Loop 3 s.
18. **`priesas-kuras`** — traškučių/gazuoto pakuotė virsta pilka rūko debesimi, kuris užgesina švytinčias smegenis; šalia stiklinė vandens + baltymų lėkštė vėl jas uždega. Loop 4 s.
19. **`priesas-draugai`** — vienas vaikas ekrano šviesoje, aplink jį — pilki „draugų" siluetai už stiklo; siluetai spalvingi tik tada, kai jis pakelia akis. Loop 4 s.
20. **`priesas-scroll`** (BOSAS) — zombiu akimis vaikas be perstojo braukia telefoną; ekranas kaip begalinė juosta, iš jo srūva pilki taškai; galva pamažu virsta žalsva zombio kauke. Stilizuota, animacinė, ne baugi. Loop 3 s. ⭐ svarbiausias iš penkių.

### Pastabos dėl kitų judesio vietų
- **S4 (akiniai)** — trečia kortelė (augimo grafikas) V5 jau animuota SVG (linija pati nusipiešia + pulsuojantis taškas), GIF nereikia. `g2` ir `quest` laukia klipų per `GIFMAP`.
- **S13 (BRAIN MAX)** — V5 turi savo interaktyvą (slot mašina + ekrano skilimas), GIF vietos nereikia.
- **S14 (evoliucijos lygis)** — V5 turi 5 animuotas SVG piktogramas (skrolintojas → atsistojo → įsibėgėjo → kūrėjas → Brain Max), GIF vietos nereikia.
- **S18 (finalas)** — animuota kosmoso scena su skrendančiu dinozauru + judančios piktogramos jau veikia. GIF vietos SĄMONINGAI nedėta, kad paskutinė skaidrė niekada neatrodytų nebaigta. Jei norėsis klipo — keisti `#spacescene` turinį.
