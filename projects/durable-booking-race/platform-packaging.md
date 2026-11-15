# Platform packaging

## Instagram Reels · @signhify.studio

**Caption**

एक आख़िरी appointment slot. दो requests. बिना coordination के दोनों को AVAILABLE दिख सकता है.

हर logical slot (clinic + staff + date + time) को उसी stable Durable Object ID पर route करो. Async storage के read–check–reserve flow को transaction में रखो; unrelated network calls बाहर रखो.

Comment **FLOW** for the pinned booking-race checklist.

**Hashtags**

#HindiTech #SystemDesign #Cloudflare #DurableObjects #SoftwareEngineering #WebDevelopment #SaaS #AppointmentBooking

**Pinned first comment**

Booking-race checklist:
1. Define the exact slot: clinic/tenant + staff + date + start time.
2. Route every request for that slot to the same stable Durable Object ID.
3. For async storage read-modify-write, make the reservation atomic with a storage transaction.
4. Keep unrelated network calls outside the reservation transaction.
5. Test simultaneous claims, retries, different slots, and IDs that differ by tenant, staff, or time.

Cloudflare docs: https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/ · https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

## YouTube Shorts · @cadetsingh

**Preferred title:** एक slot पर 2 bookings? Durable Objects

**Cover frame:** Use the frame near 10 seconds; it shows both requests converging on the 09:30 slot, with `AVAILABLE` as the state. Extracted review frame: `out/durable-booking-race/cover.jpg`.

**Cover brief:** The in-video frame supplies the two request cards and available slot in one shot. The title names Durable Objects; the frame communicates the conflict. Keep the crop centered when choosing the Shorts frame.

**Title options checked with yt-package title.py**

1. **एक slot पर 2 bookings? Durable Objects** — 100/100, 38 characters, no lint issue. Chosen: clear conflict and the named system fit in the mobile title.
2. **Cloudflare DO: one slot, two requests** — 98/100, 37 characters. Lint issue: abbreviation “DO” is less explicit for a Hindi-first audience.
3. **एक slot पर 2 bookings? system कैसे बचता है** — 98/100, 42 characters. Lint issue: mobile truncation.

The linter's score is a packaging heuristic, not a CTR prediction. The Hindi hook scorer produced low scores on all Hindi candidates because its pattern labels are English-oriented; select the hook by clarity and validate it with channel analytics.

**Description**

Cloudflare Durable Objects से appointment slot पर double booking कैसे रोकें? इस Hindi system-design Short में stable slot IDs, single-threaded coordination, await interleaving और async storage transactions को एक animated example से समझें.

Checklist in the pinned comment. Sources:
- https://developers.cloudflare.com/durable-objects/concepts/what-are-durable-objects/
- https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/

**Tags**

Cloudflare Durable Objects, Durable Object, Cloudflare Workers, Hindi tech, system design Hindi, booking race condition, concurrency, async storage, appointment booking, Hindi coding

**Pinned first comment**

Booking-race checklist:
1. Define the exact slot: clinic/tenant + staff + date + start time.
2. Route every request for that slot to the same stable Durable Object ID.
3. For async storage read-modify-write, make the reservation atomic with a storage transaction.
4. Keep unrelated network calls outside the reservation transaction.
5. Test simultaneous claims, retries, different slots, and IDs that differ by tenant, staff, or time.

This educational example does not claim AppointmentFlow currently uses Durable Objects.

## Distribution note

The creator chose to pivot @cadetsingh toward Hindi tech. This pilot bridges with a familiar booking conflict while retaining older videos. Production is complete; confirm active OAuth for both intended channels and final approval before public posting.
