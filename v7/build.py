#!/usr/bin/env python3
"""V7 build: root index.html (V6.x) + story.css + story.js -> v7/index.html.

Paleisti po KIEKVIENO root deck'o atnaujinimo:
    python3 v7/build.py && node v7/qa-v7.js     (reikia: python3 -m http.server 8899)

Idempotentiškas — visada pirma perkopijuoja šaknies failą, tada uždeda V7 sluoksnį."""
import re, shutil, sys, pathlib

ROOT = pathlib.Path("/Users/kris/bc-day")
SRC  = ROOT / "index.html"
DST  = ROOT / "v7" / "index.html"
SCR  = pathlib.Path(__file__).resolve().parent      # story.js + story.css gyvena šalia

shutil.copyfile(SRC, DST)
h = DST.read_text(encoding="utf-8")
n0 = len(h)

# 1) relative asset paths: v7/ is one level deeper
c1 = h.count('"assets/') + h.count("'assets/")
h = h.replace('"assets/', '"../assets/').replace("'assets/", "'../assets/")

# 2) pultas.html lives in the parent folder
old_pult = 'return base+"pultas.html?room="+pultRoom();'
new_pult = 'return base+"../pultas.html?room="+pultRoom();   /* V7: pultas.html liko šaknyje */'
assert old_pult in h, "pultURL not found"
h = h.replace(old_pult, new_pult)

# 3) sound board: board.json ships paths relative to the repo root, so v7/ needs ../
old_sb = 'SFX[x.id]=x.file||("../assets/sfx/"+x.id+".mp3");'
new_sb = ('var _f=x.file||("assets/sfx/"+x.id+".mp3");\n'
          '    /* V7: v7/ yra viena pakopa giliau nei assets/ */\n'
          '    SFX[x.id]=/^(https?:|\\.\\.\\/|\\/)/.test(_f)?_f:"../"+_f;')
assert old_sb in h, "sfxBoardApply line not found"
h = h.replace(old_sb, new_sb)
# V6.14 already registers the remote {name} sfx event — do not duplicate it
assert 'PULT.ch.on("broadcast",{event:"sfx"}' in h, "V6.14 remote sfx listener missing"

# 4) title
h = h.replace("<title>Brain Club Diena</title>",
              "<title>Brain Club Diena · V7 — Meteoritas ir BRAIN MAX</title>")

# 5) CSS
css = (SCR / "story.css").read_text(encoding="utf-8")
assert h.count("</style>") == 1
h = h.replace("</style>", css + "\n</style>")

# 6) body markup: mission HUD + trap overlay
anchor = '<div id="auraHud"'
assert anchor in h
hud = '<div id="v7hud"></div>\n\n'
h = h.replace(anchor, hud + anchor, 1)

# 7) story module before the boot line
boot = "build();show(0);_booted=true;bootRun();pultInit();"
assert boot in h
story = (SCR / "story.js").read_text(encoding="utf-8")
h = h.replace(boot, story + "\n" + boot)

DST.write_text(h, encoding="utf-8")
print(f"OK  asset paths rewritten: {c1}")
print(f"OK  {SRC} ({n0} B) -> {DST} ({len(h)} B)")
