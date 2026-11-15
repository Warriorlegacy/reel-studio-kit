# Booking-race checklist

Use this checklist when several requests may claim the same appointment slot.

1. **Name the coordination unit.** Decide what makes a slot unique, such as tenant/clinic, staff member, date, and start time.
2. **Use one stable key.** Every request for that exact logical slot must resolve to the same coordinator ID.
3. **Keep the critical path atomic.** For async storage read-modify-write operations, use a storage transaction. Keep unrelated network calls outside the reservation step. Synchronous SQL operations inside one Durable Object have different concurrency guarantees; follow the storage API's documented behavior.
4. **Return the persisted result.** A competing request should read the reserved state and return a clear “already booked” response.
5. **Check the boundaries.** Test two simultaneous requests for one slot, requests for different slots, retries of the same request, and keys that differ only by tenant/staff/time.

This is a practical design checklist, not a claim about AppointmentFlow's current implementation.

Source: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
