# Hindi-tech content queue · @cadetsingh / @signhify.studio

This is an unscheduled idea slate for the channel pivot. Select one idea at a time after checking channel analytics and the creator's available production capacity. Research and fact-check each topic before writing its final script.

## Repeatable series

1. Real-life tech failure — show a familiar user-visible problem, then reveal the system mechanism.
2. System in 30 seconds — one moving diagram, one concept, one payoff.
3. AI tool: one task, one limit — demonstrate a real task and state a verified limitation.

## First eight episode concepts

| Order | Series | Hook / conflict | Visual metaphor | Payoff to fact-check |
|---:|---|---|---|---|
| 1 | Real-life tech failure | एक slot पर 2 bookings? | Two requests collide over one appointment card. | A stable slot key sends both requests through one coordinator; show the async-storage caveat. Current pilot. |
| 2 | Real-life tech failure | एक retry से दो payments? | A retry loop duplicates a receipt, then collapses around one idempotency key. | Explain idempotency and retries with a source-backed payment/API example. |
| 3 | System in 30 seconds | await के दौरान दूसरी request क्या कर रही है? | A paused lane opens a visible interleave gap. | Explain the specific JavaScript/Workers concurrency behavior; do not generalize beyond verified runtime semantics. |
| 4 | System in 30 seconds | Cache ने पुराना price क्यों दिखाया? | Two price cards race: origin vs cached copy. | Explain cache freshness and invalidation with an official product example. |
| 5 | Real-life tech failure | एक गलत tenant ID और data किसका? | Two tenant-colored folders route through one key gate. | Explain tenant-scoped identity and authorization checks; treat as a security topic and fact-check carefully. |
| 6 | System in 30 seconds | एक ID दो users को अलग क्यों रखती है? | Two logical slots map to two separate coordinator tokens. | Explain stable identity and isolation; contrast with the pilot's shared-slot key. |
| 7 | AI tool: one task, one limit | AI ने booking page बना दिया—दो users साथ आए तो? | Generated UI meets two simultaneous requests; a race appears. | Demonstrate a real concurrency test and show what the tool did not verify. |
| 8 | Real-life tech failure | Calendar में time सही, booking गलत क्यों? | One appointment moves across a timezone timeline. | Explain time zones and UTC/local conversion from verified platform docs. |

## Production rules

- Use one recurring slot/request visual language and one focal mechanism per episode.
- Write the title around the user-visible conflict; the cover adds a different short phrase.
- One CTA per video. Only promise a checklist or template when its complete text is in the pinned comment or a real public URL is ready.
- Do not schedule a cadence until the intended account is connected and a sustainable weekly production capacity is known.
- After the pivot begins, compare each series to the channel's own Hindi-tech baseline rather than to its old music/comedy uploads.