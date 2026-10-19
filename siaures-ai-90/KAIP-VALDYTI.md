# KAIP VALDYTI · DI mokytojams (90 min.)

**Kur:** Šiaurės licėjus · **Kada:** An, 2026-10-20, 16:30 · **Paruošta:** 2026-10-19

---

## 1. Paleisk (1 min.)

1. Atidaryk **Terminal**.
2. Įklijuok ir **spausk Enter**:

```
cd ~/bc-day && python3 -m http.server 8899
```

3. **Palik langą atidarytą.** Nespausk Ctrl+C.
4. Chrome naršyklėje **atidaryk**:

```
http://localhost:8899/siaures-ai-90/index.html
```

5. **Spausk F** (pilnas ekranas). **Spausk ?** (pamatysi pultą ir kodą).

Ženklelis viršuje: `📱 N · KODAS`. Žalias = telefonai mato ekraną.

---

## 2. Klavišai (visi tikri, patikrinti kode)

| Klavišas | Ką daro |
|---|---|
| **→** · **tarpas** · **PageDown** | toliau (žingsnis arba skaidrė) |
| **←** · **PageUp** | atgal |
| **Home** | į pirmą skaidrę |
| **N** | užrašai (tik tau) |
| **F** | pilnas ekranas |
| **T** | laikmatis (skaidrėse, kur jis yra) |
| **V** | Kris'o balsas (skaidrės su VO) |
| **Y** | video (skaidrės su video) |
| **S** | atsarginė nuotrauka (15 ir 21 skaidrė) |
| **P** (mažoji) | pulso skydas, **P** dar kartą uždaro |
| **Shift+P** (didžioji) | nunulina pulsą |
| **M** | rankinis įvedimas (kai nėra interneto) |
| **Shift+R, du kartus** | išvalo šios skaidrės atsakymus |
| **?** | pagalba, pulto QR ir kodas |
| **Esc** | uždaro pagalbą, pulsą ir langus |
| **skaičius + Enter** | šokti į skaidrę. Pvz. `15` + Enter |
| **0 + Enter** | „pradėjom dabar“: laikrodis perskaičiuoja planą |

⚠️ **Caps Lock turi būti išjungtas.** Jis sukeičia **p** ir **P**, **r** ir **R**.

---

## 3. Telefono pultas (Kris'o telefonas)

1. Deck'e **spausk ?**
2. Telefonu **nuskenuok** QR (jis rodo `pultas.html?room=KODAS`).
3. Telefone matai: skaidrės pavadinimą, užrašus, **← →**, šuolį į skaidrę, atskleidimą (quiz), laikmatį, balsą.
4. Būsena `✅ pultas prijungtas`. Jei raudona: perkrauk pultą arba **naudok klaviatūrą**.

⚠️ Pultas veikia tik su internetu (4G tinka). Be jo klaviatūra veikia visada.

---

## 4. Kaip jungiasi mokytojai

1. **1 skaidrė** rodo **QR + 4 raidžių kodą**.
2. Mokytojai **skenuoja QR** savo telefonu. Atsidaro `join.html`.
3. Jei QR neveikia: jie atidaro tą patį adresą ir **įveda kodą** apačioje.
4. Telefone matys klausimą, kai tik pasieksi skaidrę su ★.
5. **Užklausų bankas (18 vnt.)** telefone veikia ir be ryšio. Mygtukas „Kopijuoti“.

🔴 **PRIEŠ RENGINĮ privaloma: push** (žr. 9 dalį). Kol nėra push, QR veda į **404**.

---

## 5. Jei neveikia Wi-Fi

1. **Įjunk telefono hotspot'ą** ir prijunk kompiuterį. Deck'as ir telefonai veikia per 4G.
2. Ženklelis rodo **„ryšio nėra (M)“**? Klausk **balsu**: „pakelkite ranką“. **Spausk M**, suvesk skaičius. Rezultatai rodomi tose pačiose skaidrėse.
3. **Demo be interneto:**
   - **15 skaidrė:** paruoštas pavyzdys (→), arba **S** (nuotrauka).
   - **21 skaidrė:** **S** = žemėlapio nuotrauka.
   - **Atsarginiai pavyzdžiai** (4 failai, paimk ir rodyk iš Finder'io ar VS Code):
     `~/bc-day/siaures-ai-90/backup/pavyzdziai/`
     (matematika 5 kl. · lietuvių 3 kl. · istorija 7 kl. · muzika 4 kl.)
4. **Paskutinė atsarga:** senasis deck'as `~/bc-day/siaures-ai/` (60 min., veikia be tinklo).
5. **Video (Y)** ir **balsas (V)**: video reikia interneto. Be jo praleisk.

---

## 6. Kaip nunulinti balsavimą

- **Vienas klausimas:** toje skaidrėje **Shift+R, du kartus** per 2,5 s.
- **Pulsas:** **Shift+P**.
- **Visas deck'as iš naujo** (nauja sesija): atidaryk su nauju kodu:

```
http://localhost:8899/siaures-ai-90/index.html?room=ABCD
```

(Vietoj ABCD bet kokios 4 raidės ar skaičiai. Seni duomenys lieka senam kodui.)
Mokytojai jungiasi prie **naujo** kodo, kurį rodo 1 skaidrė.

⚠️ Atsakymai saugomi **tik šio kompiuterio Chrome** (`localStorage`). Prieš išjungdamas **nufotografuok 17 ir 24 skaidrę** (rezultatai).

---

## 7. Kaip REDAGUOTI tekstą rytoj (Kris + Povilas)

**Failas:** `~/bc-day/siaures-ai-90/index.html`

**Receptas (3 min.):**

1. **Atidaryk** `index.html` per **VS Code** (arba TextEdit: dešinys pelės klavišas, „Open With“).
2. **Ctrl+F** (Mac: Cmd+F) ir ieškok: `SKAIDRĖ 15`
   (skaičius = skaidrės numeris, kurį matai deck'e. Pvz. `SKAIDRĖ 22`.)
3. Po ta eilute prasideda `<section class="slide"...>`. **Tekstas yra paprastas HTML** tarp `<h1>`, `<p>`, `<li>`.
4. **Pakeisk tik žodžius.** Neliesk `<` `>` ženklų ir `class=` ar `data-` dalių.
5. **Cmd+S** (išsaugoti).
6. Naršyklėje **Cmd+R** (perkrauti). Deck'as grįžta į tą pačią skaidrę.

**Kur kas yra:**

| Ką keisti | Kur |
|---|---|
| Skaidrės tekstas | po `SKAIDRĖ N` |
| Tavo užrašai (N klavišas) | tos pačios skaidrės viduje, `<aside class="notes">` |
| 18 telefono užklausų | `join.html`, ieškok `var BANK` |
| Pirma užklausa 15 skaidrėje | `index.html`, ieškok `PROMPT_L1` |
| Klasių žemėlapio užklausos | `index.html`, ieškok `var GM` |
| Klausimai telefonams | `index.html`, ieškok `var ACTS` |

⚠️ **Jei pakeitei užklausą 1 (testas), pakeisk ją abiejuose:** `join.html` (BANK) ir `index.html` (PROMPT_L1).
⚠️ **Jei kas sulūžo:** Cmd+Z, išsaugok, perkrauk. Dar blogai: parašyk Neuron, jis grąžins (`git checkout siaures-ai-90/index.html`).
⚠️ Po redagavimo **paleisk testą** (žr. 8 dalį) arba paprašyk Neuron.

**Arba tiesiog pasakyk Neuron:**

> „Pakeisk skaidrės 15 tekstą į: ...“
> „Skaidrėje 22 pašalink antrą punktą.“
> „Pridėk į užrašus 9 skaidrei: ...“

---

## 8. Patikra po pakeitimų

```
cd ~/bc-day && python3 -m http.server 8899
```

Kitame Terminal lange:

```
cd ~/bc-day && node siaures-ai-90/qa.js
```

Turi baigtis: **PASS 86 · FAIL 0**. Jei FAIL: parodyk eilutę Neuron.

---

## 9. Kaip paskelbti (push) kai pasiruošęs

Kol nepaskelbta, telefonų QR veda į 404.

**Lengviausia:** pasakyk Neuron **„push siaures-ai-90“**. Jis paklaus ir padarys.

**Pats:**

```
cd ~/bc-day
git status
git push
```

Palauk 1–2 min. **Patikrink telefonu:**
`https://krisvas333.github.io/bc-day/siaures-ai-90/join.html`
(turi atsidaryti puslapis, ne „404“).

---

## 10. Prieš išeinant iš namų (30 sek.)

- [ ] Push padarytas, `join.html` atsidaro telefone
- [ ] Įkrovikliai ir HDMI / adapteris
- [ ] Hotspot įjungiamas telefone
- [ ] Deck'as atidarytas, **F**, **?** rodo pultą
- [ ] `backup/pavyzdziai/` atidaryta Finder'yje
- [ ] Caps Lock išjungtas
