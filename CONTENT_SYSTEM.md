# Signhify motion content system

## Channel position

Audience: software engineers, systems developers, tech founders, solopreneurs, DevOps and self-hosting enthusiasts, AI builders, and prompt engineers. The voice is authoritative, architectural, hyper-practical, contrarian, open-source-first, and free of generic hype. These are the existing Signhify brand pillars and voice from `D:\Autogram\data\brand.json`.

Working series name: **Systems in Motion**. Explain one concrete engineering idea in Hindi, using a visual mechanism that makes the idea easy to retell. English API and code terms stay in English when that is how practitioners use them.

## Design language

- Canvas: 1080 × 1920, 30 fps, with the Reel Studio Kit safe box. Keep the first frame self-explanatory while muted.
- Brand palette: warm paper `#F8F6F0`, ink `#111111`, terracotta `#E05A36`, and green `#16A34A`. Use the brand's existing warm, editorial identity; do not fall back to the generic dark neon SaaS look.
- Hindi display and captions use a Devanagari-capable face (Noto Sans Devanagari or Hind); Latin UI and code use Inter and JetBrains Mono. Confirm glyph rendering in the contact sheet.
- Give technical objects depth with layered cards, masks, parallax, perspective, and deliberate shadows. Type belongs inside the diagram and can be revealed by the object it labels; avoid decorative text floating over unrelated backgrounds.
- Motion has a cause: requests move, state changes, queues reorder, or a label lands when the narration names it. Use a new visual beat every 1–2 seconds and a larger composition change every 4–7 seconds. Build tension by tightening motion, then leave a short hold on the answer.
- Show the premise in frame zero: a visible result, conflict, or question. Use the narration and Hindi captions as separate accessibility channels; keep each caption line short and inside the platform-safe region.
- Use a restrained sound motif tied to actions. Narration remains clear; never add a sound or camera move that does not explain a beat.

## Research and distribution loop

Research style references for craft, then test the actual account's response. Current references favor expressive, story-bearing kinetic typography; the GLORIA reel integrates masked type into a textured, parallax scene and changes its palette with the story. This is a design direction, not evidence that any one look guarantees reach.

Instagram's Professional Dashboard provides personalized Best Practices guidance and Reel insights, including retention information. YouTube says Shorts performance includes whether viewers choose to watch, average view duration, average percentage viewed, and satisfaction signals. Review reach to non-followers, retention, rewatches, shares/saves, profile visits, follows per reach, and comments. After a post has enough data, make the next edit from the largest observed drop or strongest replay/share moment. Do not infer a winning format from views alone.

Do not use a fixed high-volume schedule as a substitute for learning. Keep Autogram's previously disabled autopilot off; publish a unique approved asset once, record its media ID, and compare each new post with its own earlier posts. The user has had duplicate-posting issues.

## Hindi ElevenLabs narration

- All newly produced video formats use an original Hindi script and an ElevenLabs Hindi-capable voice: Instagram Reels, YouTube Shorts, and longer YouTube explainers. Static carousels do not need voiceover.
- Narration direction: clear Indian Hindi, conversational and confident, precise on technical English terms, brisk but unhurried, with pauses before the reveal. No imitation or cloning of a real person's voice.
- Default TTS model: `eleven_multilingual_v2`; choose and verify a Hindi-capable library voice after OAuth is connected. Keep the voice ID and key in ignored local environment files only.
- Generate word-aligned Hindi captions from the final audio; retain the approved Devanagari wording rather than changing it to match an ASR transcript.

## Pilot: one slot, two requests

One 35–45 second, 9:16 motion explainer for Instagram Reels and YouTube Shorts. Explain the race condition in appointment booking and the Cloudflare Durable Object coordination pattern. The video is an educational example and must not imply that AppointmentFlow itself uses Durable Objects.

Visual arc: one slot and two conflicting confirmations → two requests read the same state → both route to the same slot ID → a transaction wraps read/check/reserve → one booking succeeds and the next sees the occupied state → caution that the object ID and transaction still need to be designed correctly.

Use primary Cloudflare documentation in the caption and a compact on-screen source card:

- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

## Platform packaging

- Instagram: Hindi caption with the core takeaway and source URLs; use a small set of relevant tags. One ask only: follow for more Hindi system diagrams.
- YouTube Shorts: give the same video a distinct, searchable Hindi title and concise source-led description. Do not make the title repeat the cover text. The cover should communicate the conflict in at most three words.
- Use no promise of a guaranteed view count, no invented benchmark, and no repeated file upload. The same original file may be cross-posted once to the user's Instagram and YouTube channels with platform-specific packaging.

## Style research

- Creative Bloq, 2026 typography trends: story-led expressive typography and kinetic type that sets pace. https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026
- GLORIA vertical kinetic typography reference: masked, parallax type, a story-driven palette shift, and audio-synced entrances. https://vimeo.com/1217818998
- Meta's Instagram creator Best Practices hub: https://about.fb.com/news/2024/10/best-practices-education-hub-creators-instagram/
- Meta's Reels insight and retention tools: https://about.fb.com/news/2023/11/helping-creators-test-content-and-earn-rewards/
- YouTube Shorts Search & Discovery: https://support.google.com/youtube/answer/11914225
- YouTube recommendation-performance signals: https://support.google.com/youtube/answer/16559650
