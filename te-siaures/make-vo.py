#!/usr/bin/env python3
"""Generate per-slide voiceover (Kris Professional voice, eleven_v4_turbo) from vo-scripts.json
into assets/vo/NN.mp3 via ~/promo-video/bin/vo.py. Skips files that already exist (use --force).
Usage: python3 te-siaures/make-vo.py [--force] [slide numbers...]"""
import json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
VO = os.path.expanduser("~/promo-video/bin/vo.py")
OUT = os.path.join(HERE, "assets", "vo")
os.makedirs(OUT, exist_ok=True)
scripts = json.load(open(os.path.join(HERE, "vo-scripts.json")))
force = "--force" in sys.argv
only = [a for a in sys.argv[1:] if a.isdigit()]
for k, text in scripts.items():
    if not k.isdigit() or (only and k not in only):
        continue
    base = os.path.join(OUT, k.zfill(2))
    if os.path.exists(base + ".mp3") and not force:
        print("skip", k); continue
    r = subprocess.run([sys.executable, VO, text, "-o", base, "--voice", "kris", "--format", "mp3_44100_128",
                        "--align", "forced"], capture_output=True, text=True, timeout=180)
    ok = os.path.exists(base + ".mp3")
    print(("OK " if ok else "FAIL ") + k, (r.stderr or "").strip().splitlines()[-1:] if not ok else "")
# keep only mp3 in the published folder (timing files are local)
for f in os.listdir(OUT):
    if not f.endswith(".mp3"):
        os.remove(os.path.join(OUT, f))
