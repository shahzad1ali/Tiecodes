export const insights = [
  {
    slug: "gps-tracking-beyond-the-map-pin",
    title: "GPS tracking isn’t just a pin on a map",
    excerpt:
      "How modern fleet platforms use live location, geofencing, and reports to cut fuel waste and raise delivery accuracy.",
    date: "2026-03-12",
    tags: ["GPS", "Fleet"],
    body: [
      "Many teams start with a simple map view and stop there. The real value appears when location data feeds dispatch, maintenance, and customer updates.",
      "Geofencing turns arrivals and departures into events. Fuel and idle reports turn gut feel into measurable savings. Driver apps close the loop with proof of delivery.",
      "At TieCodes we design tracking as an operations system — maps, alerts, roles, and APIs that match how your fleet actually runs.",
    ],
  },
  {
    slug: "why-brokers-own-their-load-board",
    title: "Why brokers are building load boards they own",
    excerpt:
      "Per-load fees and borrowed brands limit growth. A white-label board puts matching, bidding, and GPS under your control.",
    date: "2026-02-04",
    tags: ["Load Board", "Freight"],
    body: [
      "Marketplace fees add up. Worse, your customers never see your brand — they see the platform’s.",
      "A custom load board can include live bidding, multi-stop routing, document handling, and tracking from pickup to delivery without per-load tax.",
      "We build white-label boards for brokers who want ownership, no user caps, and reports that consolidate invoices and margins.",
    ],
  },
  {
    slug: "practical-ai-for-logistics-ops",
    title: "Practical AI for logistics operations",
    excerpt:
      "Skip the hype. Useful AI in fleets looks like route hints, anomaly alerts, and smarter dispatch — wired into products you already use.",
    date: "2026-01-18",
    tags: ["AI", "Operations"],
    body: [
      "AI in logistics does not need a science project. It needs clear signals: trip history, fuel patterns, ETAs, and driver context.",
      "Route assistance and anomaly alerts help managers act earlier. Dispatch support reduces guesswork when assigning jobs.",
      "TieCodes layers AI into custom fleet and tracking products so intelligence sits next to the workflows your team already trusts.",
    ],
  },
] as const;

export type InsightSlug = (typeof insights)[number]["slug"];

export function getInsight(slug: string) {
  return insights.find((p) => p.slug === slug);
}
