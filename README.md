# 🧠 Brain Club Diena — mokyklos pristatymo deck'as

**Gyvai:** https://krisvas333.github.io/bc-day/ · **Mokytojos pultas:** https://krisvas333.github.io/bc-day/pultas.html · **V7 istorija (beta):** https://krisvas333.github.io/bc-day/v7/
**Versija:** V6.14 (git tag `v6.14`, 2026-09-08) · atsarginė: `v6.13` · istorija: `v7.0-beta`
Auditorija: 3–6 kl., visa salė · trukmė ≈ 32 min (22 skaidrės) · viena byla `index.html`, be build'o, veikia ir be interneto.

---

## 1 · Prieš renginį (5 min)

1. Atidaryk https://krisvas333.github.io/bc-day/ Chrome'e, **F11 / pilnas ekranas**, projektorius 16:9 (1080p geriau nei 720p).
2. Spausk **🎤 GYVAS** (arba 🔊 SU BALSU — ElevenLabs LT balsas; 🤖 AUTO — pats sukasi).
3. Spausk **`R`** → įrašyk **mokyklą · savaitės dieną · pradžios datą · laiką · kabinetą · registracijos nuorodą** → Išsaugoti. Įsimenama naršyklėje. Greitas kelias naujai mokyklai:
   `https://krisvas333.github.io/bc-day/?mokykla=VGTU+in%C5%BEinerijos+lic%C4%97jus&diena=4&laikas=14:00-15:30&kab=23&nuo=2026-09-18`
   (`diena` 1–5 = Pr–Pn). Jei nieko neįrašysi, skaidrė sąžiningai rodo „Kada ir kur — vedėjas pasakys dabar".
4. Nueik į **AURA skaidrę (13)** → telefonu nuskenuok **QR** (arba atidaryk `pultas.html?room=KODAS`, kodas ekrane). Bakstelėk vieną garsą — turi suskambėti salėje.
5. Spausk **`C`** — patikrink kamerą (leisk prieigą). `N` — vedėjo užrašai (KĄ SAKYTI · KĄ DARYTI · TILTAS) yra kiekvienoje skaidrėje.

## 2 · Klavišai deck'e

| Klavišas | Ką daro |
|---|---|
| `→` `←` | kita / ankstesnė skaidrė |
| `N` | vedėjo užrašai įjungti / išjungti |
| `+` / `−` | salės aura +100 / −100 (groja jee / fa) |
| `A` | auros HUD |
| `1 2 3 4` | 👍 garsai: Vine boom · Ding · Rahhh · Sheesh |
| `5 6 7 8` | 👎 garsai: Fahhh · Bruh · Metal pipe · Windows error |
| `9` `0` | 🎉 garsai: Delfino juokas · 6-7 |
| `C` | 📷 streamer kamera: pusė ekrano → kampo langelis → išjungta (⇄ ekrane keičia pusę) |
| `R` | 📅 tvarkaraščio forma |
| `H` | slėpti / rodyti „🧠 Koks čia triukas?" mygtukus |
| `T` | Twitch sluoksnis (chat, sekėjai, 1000 sekėjų prizas) |
| `F` | prizas |
| `M` | memas (užsidaro pats) |
| `S` | 🔇 tyla — nutildo VISKĄ |
| `Esc` | uždaro bet kurią perdangą / formą |

## 3 · Mokytojos pultas (`pultas.html`)

Telefone, per QR nuo AURA skaidrės. Veikia per Supabase Realtime; **be interneto** mygtukai pilki, deck'as veikia visas.

- **✨ +100 · 💀 −100 · 🚀 +500 SUPER** — aura salei (groja jee / fa deck'e).
- **🎉 KONFETI** · **🚀 RAID** (+50 visai salei + juosta per ekraną) · **🔇 TYLA** (panic mygtukas).
- **◀ ▶** — skaidrės iš telefono. Viršuje matai **skaidrės antraštę + „KĄ SAKYTI"** ir eigą iki 1000 sekėjų.
- **🔥 HYPE COMBO** — 3× ✨ per 5 sek. → deck'e ×2 visai teigiamai aurai 20 sek. (matomas metras).
- **❤️🔥🧠👏😂🦖** — reakcijos plaukia deck'e kaip TikTok Live.
- **🔊 Garsų lenta** — 4 👍 · 4 👎 · 2 🎉 (sąrašas iš `assets/sfx/board.json`). Kiekvienam mygtukui 1,5 s atvėsinimas, kad vaikai nespam'intų.

## 4 · Garsai (`assets/sfx/`)

14 mp3 (mono, −14 LUFS, < 50 KB): `fa` `jee` `tada` `victory` + `pos1–4` `neg1–4` `fun1–2`. Šaltiniai ir teisės — [`assets/sfx/SOURCES.md`](assets/sfx/SOURCES.md). ⚠️ **Meme garsai salėje — gerai; į skelbiamą video — ne.** Nėra failo → deck'as pats sintezuoja pakaitalą. Konsolėje `sfxStatus()` rodo, kurie failai rasti.

## 5 · „🧠 Koks čia triukas?" (inokuliacija, ne pardavimas)

Prie slot mašinos, loterijos bilieto ir 1000 sekėjų prizo. Atidengia **pajusk → sustok → įvardink triuką → paversk**: kintamas atlygis · beveik-laimėjimas · praradimo baimė · FOMO · „dar vieną kartą". Baigiasi taisykle: *„tai ne tau dovana, tai tavo dėmesio pirkimas. Sustok."* Rodyk visada po slot mašinos — niekada be jos.

## 6 · Streamer režimas

`C` → kamera pusėje ekrano, deck'as susitraukia į kitą pusę (letterbox, niekas neapkerpamas), „LIVE 🔴", veidrodis. Kris'as pilnu ekranu dalinasi ekranu kaip streameris. Tas pats kameros srautas kaip CV gestams (📷 Aura kamera): dešinė ranka virš galvos +300, kairė −200, atviras delnas +500 — veikia 1–3 vaikams prie kameros (~2–4 m). Kai kamera pusėje ekrano, `N` užrašus išjunk.

## 7 · V7 — istorija (beta, `v7/`)

Kibirkštis (= salė) prabunda Brain City be atminties; Neuronas Riteris duoda misijas; AItor — sąjungininkas, kuris mąsto kitaip ir turi būti tikrinamas; Omikronas siurbia miesto šviesą. 7 lygiai (P1–P7), kiekvienas atrakina įgūdį per V6 mechaniką; P7 — cliffhangeris → „Tęsinys: BrAIn Club". Vartai neblokuoja: **`U`** atrakina, „🙌 SALĖ PADEDA +300". 37 skaidrės ≈ 37 min. Istorija: [`v7/STORY.md`](v7/STORY.md). **Prieš renginį:** gyvas perbėgimas su laikrodžiu + `bias` auditas. Perstatyti po root pakeitimų: `python3 v7/build.py && node v7/qa-v7.js`.

## 8 · QA ir versijos

```
python3 -m http.server 8899 &      # reikia visiems Chrome testams
npm install                         # vieną kartą (jsdom, puppeteer-core)
npm run qa                          # jsdom  104 testai
npm run qa:chrome                   # Chrome 124 testai
npm run qa:e2e                      # tikras deck'as + tikras pultas per Supabase, 23 testai
node v7/qa-v7.js                    # V7      81 testai
```
Taisyklė: **push tik po `node --check`** ant inline skripto ir žalio `npm run qa` (V4.2 kartą sulaužė visą deck'ą viena kabute). Kopijos: `~/bc-day-versions/vX.Y-index.html`. Grįžti: `git checkout v6.13 -- index.html pultas.html`.

## 9 · Žinomos ribos

- QR paskutinėje skaidrėje veda į `krisvas.lt/go/bc-diena` — **taikinys dar nesukurtas** (2026-09-08 nukreipia į krisvas.lt pradžią). Sprendžia Kris'as.
- Kamera / pultas / garsas salėje testuoti tik automatiškai — prieš renginį bakstelėk tikru telefonu.
- 720p projektoriuje su kamera pusėje + užrašais ekranas ankštas — arba 1080p, arba `N` išjungtas.
- Idėjų sąrašas kitam kartui: [`IDEAS.md`](IDEAS.md) · pokyčiai: [`CHANGELOG-6.14.md`](CHANGELOG-6.14.md).
