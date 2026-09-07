# 💡 Idėjos — „aura farming" pultas (streamerių/YouTuberių pasaulis)

Ką V6.14 jau **padaryta** ir kas lieka **kitam kartui**. Tvarka: nauda salei ÷ rizika prieš renginį.

## ✅ Padaryta V6.14 (pultas.html + index.html)

| Funkcija | Kaip veikia |
|---|---|
| 🔊 Garsų lenta (10 mygtukų) | `board.json` → broadcast `sfx{name}` · 1,5 s atvėsinimas kiekvienam mygtukui |
| 📄 Skaidrės antraštė + „ką sakyti" | deck'as siunčia `slide{i,n,title,say}` per kiekvieną `show()`; telefonas ką tik prisijungęs siunčia `hello` ir gauna būseną iš karto |
| ◀ ▶ Skaidrės iš telefono | broadcast `nav{dir}` |
| 🔥 HYPE COMBO ×2 | 3× ✨ per 5 s telefone → `combo` → deck'e ×2 visai teigiamai aurai 20 s + matomas metras |
| 🚀 RAID | `raid` → +50 aura visai salei + juosta per visą ekraną |
| ❤️🔥🧠👏😂🦖 Reakcijos | `emo{e}` → plaukiantys emoji (veikia ir be Twitch režimo) |
| 📈 Eiga iki 1000 sekėjų | deck'as siunčia `stats{follows,aura}`; telefone — juosta |
| 🔇 TYLA (panic) | `mute` → deck'as nutildo VISKĄ |

Pultas be interneto vis dar degraduoja saugiai: mygtukai pilki, deck'as veikia visas.

## ⏭️ Kitam kartui (dydis · rizika)

1. **Chat žinutė iš telefono į deck'o chat'ą** (S · maža) — mokytoja įrašo „Šauniai, 6a!" ir tai atsiranda suvaidintame chat'e. Reikia laukelio + `chatSys` broadcast'o.
2. **Vardinė aura** (M · vidutinė) — 4 čempionato savanoriai telefone kaip 4 mygtukai; taškas eina VARDUI, deck'e šoka jo eilutė. Reikia sinchronizuoti `CH.names`.
3. **„Poll" — salės balsavimas** (M · vidutinė) — telefone paleidi klausimą, vaikai balsuoja rankomis, mokytoja spaudžia skaičių; deck'e stulpeliai. Be antro įrenginio vaikams.
4. **Antras pultas (mentorius + mokytoja)** (S · maža) — kanalas jau tai leidžia; reikia tik parodyti, kiek pultų prisijungę (`presence`).
5. **Garso lygio matuoklis „kaip garsiai salė šaukia"** (M · didesnė) — mikrofonas deck'e → aura pagal decibelus. Efektinga, bet salėje triukšmas nenuspėjamas — testuoti be žiūrovų.
6. **Klipų mygtukas 📎** (L · didelė) — pažymi laiko kodą, kad Titas paskui iškirptų momentą. Reikia įrašymo, kurio dabar nėra.
7. **„Sekėjų" tikslo redagavimas telefone** (S · maža) — dabar 1000 fiksuotas.
8. **Streamer kameros pusės perjungimas iš telefono** (S · maža) — `scam{mode,side}` broadcast; dabar tik klavišas `C` ir ⇄ ekrane.
9. **Vibracijos ritmas pagal aurą** (S · maža) — stipresnis buzz prie +500. Kosmetika.
10. **Deck'o būsenos atkūrimas po perkrovimo** (M · vidutinė) — aura ir skaidrė į `sessionStorage`, kad nulūžus naršyklei nedingtų salės rezultatas. **Verta prieš rugsėjo 11.**

## ⛔ Sąmoningai nedaroma

- **Tikras streamas / įrašymas.** Deck'e yra „DEMO STREAMAS" žyma — vaikų veidai niekur nekeliauja. Streamer kamera rodo vaizdą TIK šitame ekrane, niekur nesiunčia ir neįrašo.
- **Vaikų telefonai kaip pultai.** Vienas pultas = mokytoja. Kitaip skaidrės ims šokinėti.
- **Tikri pinigų/loot mechanizmai.** Slot mašina, bilietas ir prizas deck'e yra **inokuliacija** — po kiekvieno eina „🧠 Koks čia triukas?" atskleidimas. Be atskleidimo — nė vieno tamsaus modelio.
