# V7 · QA rezultatai

**Paskutinis paleidimas:** 2026-09-08 (V7.1 — Kris'o siužetas: meteoritas · BRAIN MAX · Neuronas)
**Komanda:** `python3 v7/build.py && node v7/qa-v7.js` (reikia `python3 -m http.server 8899` iš `/Users/kris/bc-day`)

## Rezultatas

```
──────── 91 PASS · 0 FAIL ────────
```

Tikrinta dviejuose dydžiuose: **1280×720** ir **1920×1080** (visi testai kartojami abiem).

| Blokas | Testų | Rezultatas |
|--------|-------|-----------|
| Įkrova (boot · start · skaidrių skaičius · abu HUD) | 6 ×2 | ✅ |
| Istorijos sluoksnis (7 skyriai · 7 įgūdžiai · vartai · U klavišas · spąstai · draugystė · manifestas · cliffhangeris · ☄️ skaitiklis) | 22 ×2 | ✅ |
| Garsų lenta (board.json · `../` keliai · HEAD 200 visiems mp3) | 6 ×2 | ✅ |
| V6 mechanikos (aura · confetti · slot · čempionatas · Twitch · pultas) | 7 ×2 | ✅ |
| Visos 39 skaidrės (persiliejimas · atsivaizdavimas · užrašai) | 3 ×2 | ✅ |
| Konsolės klaidos | 1 | ✅ (0 JS klaidų) |

## Papildomos patikros (šis paleidimas)

- **`node --check` ant viso inline JS** (visi `<script>` blokai iš `v7/index.html`) → **sintaksė OK**.
- **Vertikalus tilpimas 1280×720** — išmatuotos naujos/perrašytos skaidrės:
  `p1` 720 · `draugai` 720 · `manifestas` 720 · `cliff` 720 · `p6` 720 (px, = viewport, be nuoslinkio).
  ⚠️ Prieš pataisą `cliff` buvo 803 px (persiliedavo) — sutrumpintas uždarymo sakinys +
  `.v7wrap .closeq` / `.v7cont` dydžiai `max-height:820px` medijoje.
- **Vizualus patikrinimas** ekrano nuotraukomis: `p1`, `draugai`, `manifestas`, `cliff`, `p6` — LIGHT
  brand'as, JetBrains Mono antraštės, vienas raudonas akcentas, teksto dydis skaitomas iš salės.

## Naujos QA eilutės (V7.1)

Pakeista `v7/qa-v7.js` (senos eilutės rėmėsi Kibirkšties premisa):
- `37 skaidrės` → **`39 skaidrės (22 V6 + 17 istorijos)`**
- `/PRABUDIMAS/` → **`/SIGNALAS/`** (P1 kortelė)
- `cliffhangeris prieš kvietimo skaidrę` → **`cliffhangeris prieš „Mūsų žodį"`** + **`„Mūsų žodis" prieš kvietimo skaidrę`**
- **+ `4 pagrindinės žinutės eilutės`** (mokykis mokytis · kartu su draugais · gerbk mokytojus · nepamiršk linksmintis)
- **+ `draugystės taisyklė PRIEŠ slot mašiną`** (`draugai` → `brainmax`)
- **+ `„nemokama dovana = apgaulė" įvardinta`**
- **+ `☄️ meteorito skaitiklis HUD'e mažėja`** (P1 = 70 d. → P7 = 3 d.)

## Kas NEPATIKRINTA ⚠️

- **Tikra salė.** Auros srautas (vartų slenksčiai 150…3200) niekada nebuvo matuotas gyvai.
- **Meta Quest 3S / VR zonos** — deck'as jų neteikia, tik nurodo.
- **`bias` skill'as** dar nepaleistas šitam siužetui (taisyklė 14 — privaloma prieš renginį).
- **Mokytojo pultas per tinklą** (`pultas.html`) tikrintas tik kaip QR/kambario kodas, ne su antru įrenginiu.
- **Nepaleista, nedeploy'inta, necommit'inta.**
