#!/usr/bin/env python3
"""Publish tagged versions as separate folders: versions/<tag>/index.html + pultas.html
(asset paths rewritten to ../../assets/). Run from repo root; then commit + push."""
import subprocess, os, re
TAGS=["v6.13","v6.14","v6.15"]
def show(tag,f):
    r=subprocess.run(["git","show",f"{tag}:{f}"],capture_output=True,text=True)
    return r.stdout if r.returncode==0 else None
def rewrite(h):
    h=h.replace('"assets/','"../../assets/').replace("'assets/","'../../assets/")
    h=h.replace('SFX[x.id]=x.file||("../../assets/sfx/"+x.id+".mp3");',
                'SFX[x.id]=x.file?("../../"+x.file):("../../assets/sfx/"+x.id+".mp3");')
    return h
rows=[]
for t in TAGS:
    d=f"versions/{t}"; os.makedirs(d,exist_ok=True)
    for f in ["index.html","pultas.html"]:
        h=show(t,f)
        if h is None: continue
        open(f"{d}/{f}","w",encoding="utf8").write(rewrite(h))
    rows.append(t)
    print("published",t)
# index page
li="\n".join(f'<li><a href="{t}/index.html">{t}</a> — deck · <a href="{t}/pultas.html">pultas</a></li>' for t in rows)
open("versions/index.html","w",encoding="utf8").write(f"""<!doctype html><meta charset="utf-8"><title>BC Day — versijos</title>
<style>body{{font-family:system-ui;max-width:640px;margin:40px auto;padding:0 16px}}li{{margin:8px 0}}</style>
<h1>Brain Club Diena — versijos</h1>
<p><b>Naujausia (root):</b> <a href="../index.html">index.html</a> · <a href="../pultas.html">pultas</a> · <b>V7 istorija (beta):</b> <a href="../v7/index.html">v7</a></p>
<ul>{li}</ul>
<p>Kiekviena versija turi savo nuorodą ir savo pultą; garsai ir paveikslėliai bendri (<code>../../assets/</code>).</p>""")
print("versions/index.html written")
