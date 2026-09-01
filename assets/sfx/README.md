# 🔊 Garso efektai — ką čia įmesti

Deck'as ieško **keturių** mp3 failų šitame aplanke. Jei failo nėra — jis
**pats sugeneruoja** pakaitalą per WebAudio, todėl viskas veikia ir be jų.
Tikri failai skamba geriau: įmesk juos ir nieko keisti nereikia.

| Failas (tiksliai toks pavadinimas) | Kada groja | Koks garsas reikalingas |
|---|---|---|
| `fa.mp3` | aura minusas · neteisingas atsakymas · falstartas čempionate | trumpas komiškas krentantis „wah-wah / fail" (meme-neigiamas), **0,4–1,0 s** |
| `jee.mp3` | aura pliusas · teisingas atsakymas | kylantis šviesus „jėėė!" čirpsmas, minia džiaugiasi, **0,5–1,2 s** |
| `tada.mp3` | kiekvienas skaidrės pakeitimas | LABAI trumpas 3 natų „ta-ta-ta" tiktelėjimas, **≤0,25 s** (ilgesnis erzins — jis skamba ~30 kartų) |
| `victory.mp3` | čempionato nugalėtojas · BRAIN MAX · 1000 sekėjų | pilnesnė fanfara / pergalės temos gabalas, **1,5–3 s** |

## Taisyklės
- **Formatas:** mp3, mono užtenka, 128 kbps. Failo dydis < 200 KB.
- **Garsumas:** normalizuok iki ~−3 dBFS. `tada.mp3` padaryk **tyliausią** — jis kartojasi.
- **Teisės:** imk tik tai, ką galima naudoti viešame renginyje (YouTube Audio Library,
  Pixabay, Mixkit — visi turi nemokamų „meme" SFX). Vengti autorinių TV/žaidimų temų.
- **Tyla pradžioje:** nukirpk tylą failo priekyje, kitaip garsas vėluos.

## Kaip patikrinti
1. Įmesk failus čia.
2. Atidaryk deck'ą, spausk `+` ir `−` (aura) — turi skambėti `jee` / `fa`.
3. Naršyklės konsolėje `sfxStatus()` parodo, kurie failai rasti, o kurie groja sintezuotą pakaitalą.

🔇 mygtukas ekrano kampe (arba klavišas `S`) nutildo VISKĄ.
