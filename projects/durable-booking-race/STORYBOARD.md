# Storyboard · Systems in Motion 01

## Format and design

- 1080 × 1920, 30 fps, vertical short, estimated 40–44 seconds after Hindi TTS. Approved audio sets final timing.
- Show the conflict at frame zero. No logo intro or greeting.
- Signhify palette: paper #F8F6F0, ink #111111, terracotta #E05A36, green #16A34A.
- Editorial system diagram: dimensional paper cards, crisp shadows, masked reveals, short parallax moves, and restrained grain. Avoid generic dark neon gradients and floating text without a visual referent.
- No presenter avatar: the request lanes and slot token are the characters.
- Keep essential diagrams inside the reel kit safe box. Captions stay in a separate lower band; UI/code labels use Latin monospace and spoken Hindi uses a Devanagari-capable font.
- A small event sound marks each action: tap for request, paper snap for routing, single click for commit. Narration stays foreground; use a low, restrained rhythm bed only if it leaves voice intelligible.

## Beat map

| Approx. time | Narration cue | Visual action and transition |
|---|---|---|
| 0–1 s | “एक slot पर दो bookings?” | At frame zero, one slot token marked 09:30 is struck by two request cards. Oversized **1 SLOT / 2 BOOKINGS?** resolves within the first second; no logo or intro. |
| 1–9 s | “आख़िरी slot खाली है. बिना coordinator के…” | Split into request A / request B. A **NO COORDINATOR** label frames the unsafe baseline; both lanes read AVAILABLE and duplicate confirmation outlines begin to print. |
| 9–16 s | “Stable key बनाओ…” | Four labels click into one key capsule: clinic / staff / date / slot. The lanes bend through a visible routing rail and enter one terracotta object labeled slot:09. |
| 16–23 s | “single-threaded… await fetch…” | Pull the object open as a cutaway. A second request moves during the awaited fetch; a brief collision warns that single-threaded does not make every async sequence atomic. |
| 23–30 s | “Async storage का read-check-reserve?” | ASYNC READ → CHECK → RESERVE becomes a three-part mechanism inside a transaction bracket. An unrelated network call stays outside the bracket; a small label says **ASYNC READ-MODIFY-WRITE** so the transaction claim stays scoped. |
| 30–36 s | “पहली request… दूसरी…” | Request A stamps BOOKED and exits with the only green confirmation. Request B reads the new state and flips to ALREADY BOOKED. Briefly split the IDs to preview the wrong-key failure. |
| 36–44 s | “गलत key?… Comment FLOW…” | Restore one shared ID and collapse the diagram into ONE SLOT · ONE COORDINATOR. A pinned-comment teaser shows KEY / ATOMIC RESERVE / TEST. The slot token returns to the opening position for a seamless loop. |

## Motion rules

- Every visible move has a cause in the narration: request, read, route, await, commit, reject.
- Add a small visual change every 1–2 seconds; make a larger layout turn every 4–7 seconds.
- Use no more than two focal labels at once. Each caption chunk should be short enough to read on a phone.
- Keep labels and captions inside platform UI-safe areas; inspect at actual phone size.
- Scene cuts will be aligned to actual voice word timings only after the script is approved and ElevenLabs audio is generated.

## Quality checks after approval

- Verify Devanagari glyphs and line breaks in the contact sheet.
- Check hook visibility, safe-zone fit, caption wrapping, contrast, and motion cadence.
- Listen for Hindi pronunciation of technical English terms and ensure the final audio fits under 60 seconds.