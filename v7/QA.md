# V7 · QA rezultatai

**Data:** 2026-09-07 22:23 EEST · **Šaltinis:** root `index.html` **V6.14** (211 758 B, 22:21) → `v7/index.html`
⚠️ Root deck'ą kitas agentas keitė TRIS kartus statybos metu — paskutinis build ir testai paleisti ant 22:21 versijos.
Po bet kokio naujo root pakeitimo: `python3 v7/build.py && node v7/qa-v7.js`.
**Verdiktas: 81 PASS · 0 FAIL** (`node v7/qa-v7.js`, exit 0)

## Kaip paleisti

```bash
cd /Users/kris/bc-day
python3 v7/build.py                       # perstato v7/index.html iš root deck'o
node tools/extract-js.js v7/index.html /tmp/bcday-v7 && node --check /tmp/bcday-v7/index-0.js
python3 -m http.server 8899 &
node v7/qa-v7.js
```

## 1 · Sintaksė

`tools/extract-js.js` ištraukė **1 inline `<script>` bloką**; `node --check` — **OK**.
(Taisyklė iš V4.2 avarijos: kiekvienas build tik po `node --check`.)

## 2 · Tikras Chrome (puppeteer-core, headless) — 1280×720 IR 1920×1080

Abi raiškos pratestuotos pilnai; žemiau — po vieną kartą (rezultatai identiški).

**Įkrova (6/6)** — boot dingsta · start matomas · **37 skaidrės** (22 V6 + 15 istorijos) ·
1-a skaidrė = P1 PRABUDIMAS · aura HUD įsijungia · misijos HUD rodo „LYGIS 1/7".

**Istorijos sluoksnis (17/17)** — 7 skyrių kortelės · 7 įgūdžio atrakinimai ·
kiekviena skaidrė turi `chap` 1–7 · **kiekviena iš 37 skaidrių turi `notes.say/do/br`** ·
kiekviena turi `voice` (TTS atsarga) · P2 vartai užrakinti prie 0 auros → atsirakina po `aura(200)` ·
vedėjo klavišas **U** atrakina · įgūdis pažymimas atėjus į kortelę · HUD pip'as užsidega ·
spąstų skaidrė iškart po slot mašinos · 4 triukai įvardinti · cliffhangeris prieš kvietimo skaidrę ·
tvarkaraščio skaidrė lieka paskutinė · „TĘSINYS · BRAIN CLUB" yra.

**Garsai (6/6)** — V6.14 `SFXBOARD` įkeltas iš `board.json` (10 garsų) · visi 10 id `SFX` žemėlapyje su `../` ·
`SFXALIAS` (kind → sintezuotas pakaitalas) veikia · **nuotolinis `{name}` įvykis registruotas VIENĄ kartą**
(V7 jo nedubliuoja) · **visi 14 mp3 tikrai atsakė HTTP 200 iš `v7/`** (pos1–4 · neg1–4 · fun1–2 · fa · jee · tada · victory) ·
seni garsai nepajudinti.

**V6 mechanikos (7/7)** — `aura()` · konfeti · slot mašina (3 būgnai) · čempionatas startuoja ·
bracket 4 žaidėjai · Twitch sluoksnis · pulto kambario kodas 4 simboliai.
`v7Trap('scratch')` atidaro **V6.14 `hackBox`** dekoderį; `#v7trapBox` neegzistuoja (dublio nėra).

**Visos 37 skaidrės (3/3)** — nė vienos su horizontaliu persiliejimu · visos atsivaizduoja
(aukštis > 80 px, tekstas > 10 simbolių) · užrašai renderinasi kiekvienai.

**Konsolė (1/1)** — 0 JS klaidų, 0 `pageerror`.

## 3 · Tinklo patikra (atskira)

Perbėgus visas 37 skaidres, vienintelės nesėkmingos užklausos:
- `404 /assets/img/styvas.jpg` — ⚠️ **jau egzistuojantis V6 trūkumas** (memų sluoksnis), ne V7 kelių klaida:
  URL teisingas (`/assets/img/`, ne `/v7/assets/`), failo tiesiog nėra repo.
- `404 /favicon.ico` — nereikšminga.

`pultURL()` → `http://localhost:8899/v7/../pultas.html?room=XXXX` → **HTTP 200** (pultas liko šaknyje, nepaliestas).

## 4 · Ko QA NEPATIKRINO ⚠️

- **Kamera / MediaPipe CV gestai** — headless Chrome su fake device'u; **tikros kameros testas neatliktas**.
- **Supabase realtime pultas** — patikrintas tik QR/kodo generavimas, **ne tikras telefono ryšys salėje**.
- **Garsų skambesys** — patikrinta, kad mp3 pasiekiami ir keliai teisingi; **ar jie gerai skamba per salės
  garsiakalbius — Kris'o ausų testas**.
- **Projektorius 16:9 gyvai**, Safari, touch svirtis — netestuota (kaip ir V6).
- **Laikas salėje** — +5 min istorijos sluoksnio yra skaičiavimas iš `sec` reikšmių, ne tikras pravažiavimas.
- **Vaikų reakcija** — jokio personų vėjo tunelio V7 tekstams. `personas` + `bias` dar nepraleisti.

## 5 · Kas NEBUVO liesta

`/Users/kris/bc-day/index.html` · `pultas.html` · `assets/**` — **nė vienas baitas nepakeistas**
(patvirtinta: `v7/build.py` tik SKAITO root failą). Nieko necommit'inta, nieko nedeploy'inta.
