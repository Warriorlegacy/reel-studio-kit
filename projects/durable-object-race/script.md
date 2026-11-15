## Hook

**एक स्लॉट, दो confirmations—भरोसा कैसे बचाओगे?** (~3 seconds)

The hook scorer ranked its English proxy “You can lose trust when 2 requests confirm 1 slot. How do you stop it?” at 75/100 and the alternate “Your last slot: 2 clicks, 1 seat. How do you stop a costly double booking?” at 72/100. These scores are an English-only heuristic, not a predictor and not a direct score of the Hindi line.

## Beats

1. **0–3s · The conflict.** `[ON SCREEN: 1 SLOT / 2 CONFIRMED?]` Two booking cards collide over one appointment token. Start with both confirmations visible, then stamp the collision.
2. **3–8s · The race.** `[ON SCREEN: SAME STATE → RACE]` Two requests read the same available state; duplicate green confirmations fork from one slot.
3. **8–14s · One coordinator.** `[ON SCREEN: slot:09 → ONE OBJECT]` Both requests route to the same Durable Object identified by the logical slot ID. Show one object per coordination unit as the example.
4. **14–24s · The fix.** `[ON SCREEN: READ → CHECK → RESERVE]` A transaction brackets the read/check/reserve operation. Make the transaction boundary visible as one container, not a magical global lock.
5. **24–31s · The payoff.** `[ON SCREEN: BOOKED / SLOT TAKEN]` The first reservation persists; the next request sees the updated state and returns the occupied result.
6. **31–38s · The caveat.** `[ON SCREEN: RIGHT ID + ATOMIC WRITE]` A Durable Object alone does not solve the problem. The logical ID and atomic read-modify-write must match the booking rule.
7. **38–42s · Close / loop.** `[ON SCREEN: ONE SLOT. ONE SOURCE OF TRUTH.]` Return the slot token to the opening composition, then show `NEXT: WHEN NOT TO USE ONE` and the handle.

## Twist

“Use a Durable Object” is not the whole fix. Requests can interleave across asynchronous waits; a read-check-write reservation needs an atomic storage transaction and a stable ID for the correct coordination unit.

## CTA

“ऐसे system diagrams के लिए @signhify.studio को follow करो.” One ask: follow.

## Facts and sources

- Cloudflare documents Durable Objects as globally addressable coordinators with per-instance attached durable, strongly consistent storage: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- Cloudflare recommends one Durable Object per logical unit needing coordination, and a transaction for atomic read-modify-write; `await` can allow requests to interleave: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- This is an educational architecture example. It does not claim AppointmentFlow currently uses Durable Objects.

## Spoken script

एक स्लॉट, दो confirmations—भरोसा कैसे बचाओगे?

जब दो booking requests एक ही खाली slot को साथ पढ़ती हैं, race condition हो सकती है।

इस slot को एक stable ID दो। उसी ID वाला Durable Object, उस resource का coordinator बनता है।

लेकिन single-threaded होना ही काफी नहीं। Await के बीच requests interleave कर सकती हैं। इसलिए read, check और reserve को एक storage transaction में रखो।

पहली booking slot reserve करती है। अगली request updated state देखकर “already booked” लौटाती है।

Durable Object जादुई lock नहीं—ID और transaction सही होने चाहिए।

एक slot। एक source of truth। ऐसे system diagrams के लिए @signhify.studio को follow करो।

**Word count:** ~77 spoken words, about 31 seconds at 150 words per minute; allow 35–42 seconds with deliberate pauses and visual holds.
