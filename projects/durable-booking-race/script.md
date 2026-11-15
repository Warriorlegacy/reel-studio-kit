# Durable booking race: one slot, two requests

## Hook (max 3 s)

**एक slot पर दो bookings?** Open on two request cards colliding over one calendar slot. The visual conflict and first Hindi words land in the first second.

## Beats

1. **0–1 s · Conflict.** One final appointment slot; two request cards collide. On-screen: **1 SLOT / 2 BOOKINGS?**
2. **1–9 s · The unsafe baseline.** Split into two request lanes. Without a coordinator, both read **AVAILABLE** from the same snapshot; duplicate confirmations begin to print.
3. **9–16 s · One coordinator.** Build a stable key from clinic, staff, date, and time. Both lanes route into the same Durable Object. On-screen: **SAME SLOT ID → SAME OBJECT**.
4. **16–23 s · The caveat.** Show that a Durable Object is single-threaded, then let a second request slip in during an awaited fetch.
5. **23–30 s · The critical section.** Put **ASYNC READ → CHECK → RESERVE** inside a storage transaction. Keep the unrelated network call outside the transaction and reservation's critical path.
6. **30–36 s · Payoff and twist.** Request A reserves the slot. Request B sees **BOOKED** and returns **ALREADY BOOKED**. Briefly split the IDs to show why a mismatched key recreates the conflict.
7. **36–44 s · CTA / loop.** Restore the shared key and collapse the diagram into **ONE SLOT · ONE COORDINATOR**. Ask viewers to comment **FLOW** for the pinned checklist. Put the usable checklist in the first comment, then loop the slot card back into frame one.

## Twist

A Durable Object provides a single-threaded coordinator for one stable ID. It is not a lock across different IDs, and an async read-check-write can interleave at an awaited operation. Keep the ID aligned to the logical slot and use a storage transaction for the async read-modify-write path. Cloudflare's current SQL booking example also shows a synchronous check-and-insert sequence inside one Durable Object.

## CTA

**Comment FLOW for the pinned checklist.** The checklist is ready to paste as the first comment on both platforms.

## Facts and sources

- Durable Objects have globally unique names that let clients coordinate through one object, durable strongly consistent storage, and single-threaded cooperative multitasking: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- Cloudflare's booking example routes requests for one event to the same Durable Object. Its rules page demonstrates synchronous SQL seat check-and-insert, explains interleaving across await fetch(), and recommends transaction() for atomic async read-modify-write operations: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
- This is an educational design pattern. It does not claim AppointmentFlow currently uses Durable Objects.

## Spoken script

एक slot पर दो bookings?

आख़िरी slot खाली है. बिना coordinator के, दो requests साथ आती हैं. दोनों को AVAILABLE दिखता है—अब दो confirmations निकलने वाले हैं.

Stable key बनाओ: clinic, staff, date, time. उसी key के Durable Object पर दोनों requests route करो—एक coordinator, एक फैसला.

Durable Object single-threaded है, फिर भी await fetch के दौरान दूसरी request चल सकती है. Async storage का read-check-reserve? इसे transaction में बाँधो. Network call को बाहर रखो.

पहली request slot reserve करती है. दूसरी BOOKED देखकर ALREADY BOOKED लौटाती है.

गलत key? दो coordinators. Race वापस.

Comment FLOW for the pinned checklist.

**Word count:** 100 whitespace-delimited spoken units. At 150 words per minute, this is a rough runtime estimate only; pauses and ElevenLabs delivery determine final duration. Scene timing must follow the approved audio.