# Media for RA leadership deck (2026-11-16) - product intro videos + stills

**Updated:** 2026-11-15
Internal use only. Sources: official MatataStudio YouTube uploads (LT MatataStudio rep has licence to localise). All files <= 14 MB. Nothing published anywhere.

| File | Source | Duration | Size | Language | HeyGen job | Notes |
|---|---|---|---|---|---|---|
| vincibot-intro-lt.mp4 | https://youtu.be/XTiOILSfqh4 (first 120 s of 206 s) | 130.1 s | 11.5 MB | LT (AI voice dub) | completed | ASR-checked: Lithuanian speech. Voice-only dub, mouth not synced. Not native-ear-checked. |
| vincibot-intro-en.mp4 | same | 120.0 s | 11.3 MB | EN | n/a | fallback, cut 0-120 s |
| vincibot-creator-kit-en.mp4 | https://youtu.be/FH4TL4OeLQg (first 120 s of 163 s) | 120.0 s | 10.9 MB | none (music + on-screen text only) | FAILED | No LT version, see failures |
| vincibot-ai-vision-lt.mp4 | https://youtu.be/Ou2r0Q6cvks (full 149 s) | 153.9 s | 12.4 MB | LT (AI voice dub) | completed | ASR-checked: Lithuanian speech. Slightly >150 s (HeyGen dynamic duration). 960x540. Not native-ear-checked. |
| vincibot-ai-vision-en.mp4 | same | 149.0 s | 12.3 MB | EN | n/a | fallback, 960x540 |
| talebot-pro-intro-lt.mp4 | EXISTING user file "TaleBot Pro INTRO LT.mp4" (copied from Desktop/Archyvas/.../1 Intro TBP/, original untouched, 335 s / 256 MB) - first 120 s | 120.0 s | 12.8 MB | LT | not translated (no HeyGen credit used) | ASR-checked: Lithuanian speech. Cut at 120 s, may end mid-sentence. |
| talebot-pro-intro-en.mp4 | https://youtu.be/B6oOZU0Zybk (first 120 s of 277 s) | 120.0 s | 12.5 MB | EN | n/a | fallback |
| vincibot-1.jpg, vincibot-2.jpg | vincibot intro | 1280 px | 38-45 KB | - | - | two robots on leaf (light follow), drawing robot |
| creator-kit-1.jpg, creator-kit-2.jpg | creator kit | 1280 px | 59-65 KB | - | - | robot arm + hand, crane build + code blocks |
| ai-vision-1.jpg, ai-vision-2.jpg | AI vision | 1280 px | 38-53 KB | - | - | camera module in hand, robot on game mat |
| talebot-1.jpg, talebot-2.jpg | Tale-Bot Pro | 1280 px | 30-34 KB | - | - | robot on mat, finger on buttons (small orange caption overlay on talebot-2) |

All stills viewed to confirm real product, no title cards.

## HeyGen
- Language "Lithuanian (Lithuania)" supported (v3 API `/v3/video-translations/languages`). Plain "Lithuanian" is rejected: use the exact string.
- Mode speed, `translate_audio_only: true`, clips uploaded via `POST /v3/assets` (YouTube URLs not tried).
- Credits before: wallet $26.22, legacy API quota 1573. After: wallet $23.65, quota 1419. Used about $2.57 / 154 quota units for 2 successful dubs (3 submitted).
- Failed job was probably not billed (not verified).

## Failures
- Creator Kit translation FAILED: `No speaker is detected in the video. Please make sure you are assigning the correct input language code.` The video has music and on-screen text only, so there is nothing to dub. Use the EN file (text overlays are English).
- First submit attempt with language "Lithuanian": `Invalid language: Lithuanian. Check GET /v3/video-translations/languages` (no cost; fixed by exact name).

## Not verified
- LT audio checked only by local whisper ASR on ~25 s samples (output is Lithuanian but ASR text is imperfect); no human ear check of dub quality or terminology (e.g. product names).
- Videos are cut to ~120 s, so endings may be abrupt.
