# V6.14 — garsų lenta · streamer kamera · tvarkaraštis · triuko atskleidimas

**Kas nauja ir kaip naudoti** (visa kita veikia kaip V6.13):

1. **🔊 Garsų lenta mokytojos telefone** — `pultas.html` po auros mygtukų: 4 👍 · 4 👎 · 2 🎉 iš `assets/sfx/board.json` (be jo — įmontuotas tas pats sąrašas). Bakstelėjimas → garsas deck'e, vibracija, „išsiųsta ✅", 1,5 s atvėsinimas kiekvienam mygtukui.
2. **📷 Streamer kamera** — mygtukas 📷 kampe arba klavišas `C`: pusė ekrano → kampo langelis → išjungta. ⇄ perkelia į kitą pusę. Deck'as susitraukia į kitą pusę (letterbox, nieko neapkerpa), veidrodinis vaizdas, „LIVE 🔴", aura HUD lieka matomas. Naudoja **tą patį** kameros srautą kaip CV gestai — kamera niekada neužimama du kartus. Pasirinkimas įsimenamas.
3. **📅 Tvarkaraščio skaidrė** (paskutinė, 22-a) — „Ketvirtadieniais 14:00–15:30 · 23 kab. · nuo rugsėjo 18 d." + QR. Redaguoji mygtuku ✏️ arba klavišu `R`; įsimenama. Naujai mokyklai per 5 sek.: `index.html?mokykla=…&diena=4&laikas=14:00-15:30&kab=23&nuo=2026-09-18&nuoroda=…`
4. **🧠 „Koks čia triukas?"** — mygtukas prie slot mašinos, loterijos bilieto ir 1000-sekėjų prizo. Atidengia **pajusk → sustok → įvardink → paversk**: kintamas atlygis, beveik-laimėjimas, praradimo baimė, FOMO, „dar vieną kartą" → taisyklė „tai ne tau dovana, tai tavo dėmesio pirkimas. Sustok." Klavišas `H` paslepia mygtukus.
5. **📱 Pultas v2** — skaidrės antraštė + „ką sakyti" telefone · ◀ ▶ skaidrės · 🔥 HYPE COMBO ×2 20 sek. (3× ✨ per 5 sek.) · 🚀 RAID visai salei + juosta · ❤️🔥🧠👏😂🦖 reakcijos · eiga iki 1000 sekėjų · 🔇 TYLA. Likusios idėjos — `IDEAS.md`.
6. **Taisymai** — QA priklausomybės įdiegtos (`npm run qa` nebekrenta); pasenęs SFX testas (dabar mp3 tikri) perrašytas; 💥 AKTYVUOTI BRAIN MAX nebeslysta po apatine juosta 720p; „koks čia triukas" perdanga telpa į 720p (2×2) ir riebūs žodžiai nebeskaldo sakinio; skaitmenų/`C`/`R`/`H` klavišai nebeveikia laukeliuose; „📷 Aura kamera" mygtukas su įjungtu streameriu **išjungdavo** kamerą, užuot įjungęs gestus — dabar sprendžia pagal gestus, ne pagal srautą.

**Klavišai:** → ← skaidrės · `N` užrašai · `T` streamas · `C` streamer kamera · `R` tvarkaraštis · `H` slėpti 🧠 mygtukus · `M` memas · `S` tyla · `A` aura HUD · `F` prizas · `+`/`−` aura · **`1–4`** pagyrimo garsai · **`5–8`** neigiami · **`9`/`0`** linksmi · `Esc` uždaro perdangas.

**Testai:** `npm run qa` **104 ✅ / 0** (buvo 64) · `npm run qa:chrome` **124 ✅ / 0** (buvo 48 ✅ / 2 ❌) · naujas `npm run qa:e2e` — tikras deck'as + tikras telefonas per Supabase Realtime, **23 ✅ / 0**. Visi `<script>` praėjo `node --check`.

**Dėmesio:** deck'as pailgėjo 45 sek. (32 min biudžetas) — jei laiko trūksta, tvarkaraščio skaidrę galima tiesiog praleisti. Prieš renginį vieną kartą atidaryk `R` ir suvesk tos mokyklos duomenis.
