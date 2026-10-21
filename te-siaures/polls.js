/* Technologijų etiketas · Šiaurės licėjus 2026-10-22 · bendri klausimai ekranui ir telefonams.
   Atsakymai: Supabase te_tevai_atsakymai (anon INSERT) + suvestinė per RPC te_tevai_suvestine.
   Gyvas ryšys: Realtime kanalas 'te-siaures-' + KAMBARYS. */
var TE = {
  SB_URL: "https://iiekmeylpppczicrsxho.supabase.co",
  SB_KEY: "sb_publishable_iJC59f30YJm7hU4OwZsLDQ_9FN-ygzF",
  BASE: "https://krisvas333.github.io/bc-day/te-siaures/",
  CHANNEL: "te-siaures-",
  POLLS: {
    p0: { q: "Kas jūs šiandien?", type: "choice",
          o: ["Tėvai", "Mokytojai", "Ir tėvai, ir mokytojai", "Kita"] },
    p1: { q: "Tu kalbi. Žmogus priešais išsitraukia telefoną. Ką jauti?", type: "choice",
          o: ["Kad nesu svarbus", "Man tas pats", "Priklauso, kam jis naudoja", "Pats taip darau"] },
    p2: { q: "Kiek kartų per vakarienę jūsų šeimoje kas nors paima telefoną?", type: "choice",
          o: ["Nė karto", "1–2 kartus", "3–5 kartus", "Nesuskaičiuočiau", "Valgome atskirai"] },
    p3: { q: "Ar vien draudimas išspręs telefonų problemą?", type: "choice",
          o: ["Taip", "Iš dalies", "Ne, reikia susitarimų ir pavyzdžio"] },
    p4: { q: "Kurią taisyklę pradėsite šią savaitę?", type: "choice",
          o: ["01 Veidas prieš telefoną", "02 Stalas be telefonų", "03 Pranešimai išjungti",
              "04 Klausk prieš fotografuodamas", "05 Skambutis palauks", "06 Pirma laikmatis",
              "07 Pilka reiškia ramu", "08 Viena užduotis, vienas ekranas",
              "09 Telefonai miega ne miegamajame", "10 Pasakyk, kai padėjo DI"] },
    p5: { q: "Kur jums sunkiausia laikytis?", type: "choice",
          o: ["Namuose", "Mokykloje", "Darbe", "Viešose vietose: renginiai, salė, koncertai"] },
    p6: { q: "Ar prisijungtumėte prie pirmųjų 5 %?", type: "choice",
          o: ["Taip", "Gal", "Dar ne"] },
    p7: { q: "Ką pakeisi nuo rytojaus? Vienas žodis ar trumpas sakinys.", type: "text", max: 60 },
    p8: { q: "Kaip vertinate šį pranešimą?", type: "stars", follow: "p8t" },
    p8t: { q: "Ką patobulinti? (nebūtina)", type: "text", max: 200, hidden: true }
  }
};
