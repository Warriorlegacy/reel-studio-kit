# Publish package · Durable booking race

## Instagram Reels · @signhify.studio

**Caption**

एक आख़िरी appointment slot. दो requests एक साथ आती हैं. दोनों को `AVAILABLE` दिखे, तो double-booking race शुरू.

एक stable slot key दोनों requests को उसी Durable Object तक route करती है. फिर async storage के read–check–reserve flow को transaction में साथ बाँधो, ताकि एक reservation जीते.

Comment **FLOW** — checklist pinned comment में है.

**Hashtags**

#HindiTech #SystemDesign #Cloudflare #DurableObjects #Concurrency #SoftwareEngineering #AppointmentBooking #CodingHindi

**Pinned first comment**

Booking-race checklist:
1. Define the logical slot: tenant/clinic + staff + date + start time.
2. Route every request for that slot to the same stable Durable Object ID.
3. Make async-storage read–check–reserve atomic with a storage transaction.
4. Keep unrelated network calls outside that reservation transaction.
5. Check simultaneous claims, retries, different slots, and IDs that differ by tenant, staff, or time.

Cloudflare references:
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

## YouTube Shorts · intended channel: @cadetsingh

**Title**

एक slot पर 2 bookings? Durable Objects

**Cover frame**

Use the in-video frame near 10 seconds. It shows the two request cards converging on one slot with `AVAILABLE` as the slot state, while the title promises the Durable Objects explanation. The extracted review frame is `out/durable-booking-race/cover.jpg`.

**Description**

Cloudflare Durable Objects क्या हैं, और appointment slot पर double booking कैसे रोकते हैं?
इस Hindi system-design Short में race condition, stable slot ID और storage transaction को animation से समझें.

Checklist pinned comment में है.

Sources:
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

यह एक educational systems example है; यह दावा नहीं करता कि AppointmentFlow अभी Durable Objects इस्तेमाल करता है.

**Tags**

Cloudflare Durable Objects, Durable Objects Hindi, Cloudflare Workers, system design Hindi, race condition Hindi, booking race condition, double booking prevention, appointment booking, concurrency, async storage, storage transaction, await interleaving, Hindi tech, Hindi coding, distributed systems

**Pinned first comment**

Booking-race checklist:
1. Define the logical slot: tenant/clinic + staff + date + start time.
2. Route every request for that slot to the same stable Durable Object ID.
3. Make async-storage read–check–reserve atomic with a storage transaction.
4. Keep unrelated network calls outside that reservation transaction.
5. Check simultaneous claims, retries, different slots, and IDs that differ by tenant, staff, or time.

Cloudflare docs: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/ · https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

## Three search queries this package targets

- Cloudflare Durable Objects क्या हैं
- appointment double booking कैसे रोकें
- race condition system design Hindi

The description's first two lines cover the system, consequence, language, and transaction explanation. Tags are limited to relevant topic spellings and disambiguation terms.

## Publishing gate

The connected YouTube OAuth accounts currently belong to other channels, and Instagram currently resolves to `piyushrajsingh.golu`; neither connection currently proves publishing access to the intended handles. Do not publish until the user completes OAuth for `@cadetsingh` and `@signhify.studio` and approves this final video/package.
