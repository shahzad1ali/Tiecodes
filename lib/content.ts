export const company = {
  name: "TieCodes",
  wordmark: "TieCodes",
  tagline: "innovate.connect.inspire.",
  headline: "Building the Tech Behind Modern Fleet & Logistics Operations",
  description:
    "TieCodes is a software house that designs custom apps and platforms for fleet, logistics, GPS tracking, driver operations — and AI-assisted intelligence that helps teams decide faster.",
  location: "Lahore, Punjab, Pakistan",
  email: "info@tiecodes.com",
  phones: ["+92 308 612 2231", "+92 321 4086550"],
  linkedin: "https://www.linkedin.com/company/tiecodes-pvt-ltd",
  website: "https://tiecodes.com",
  employees: "11–50",
  repeatClients: "80%+",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const fleetChallenges = [
  {
    title: "Supply Chain Disruptions",
    description: "Visibility across every handoff so delays do not cascade into chaos.",
    icon: "Link2",
  },
  {
    title: "Fuel Management",
    description: "Track consumption, cut waste, and turn routes into measurable savings.",
    icon: "Fuel",
  },
  {
    title: "Route Optimization",
    description: "Plan smarter paths that reduce idle time and improve on-time delivery.",
    icon: "MapPinned",
  },
  {
    title: "Compliance Requirements",
    description: "Stay audit-ready with documents, alerts, and operational records in one place.",
    icon: "ShieldCheck",
  },
  {
    title: "Maintenance Issues",
    description: "Schedule service before breakdowns and keep vehicles earning on the road.",
    icon: "Wrench",
  },
  {
    title: "Health & Safety Issues",
    description: "Monitor driver behavior and safety signals that protect people and assets.",
    icon: "HardHat",
  },
  {
    title: "Managing High Costs",
    description: "Unify dispatch, tracking, and reporting so growth does not mean more overhead.",
    icon: "Coins",
  },
] as const;

export const valueProps = [
  {
    title: "Smarter Fleets",
    description: "Live data and clear dashboards so every vehicle and driver stays visible.",
    icon: "ChartSpline",
  },
  {
    title: "Lower Costs",
    description: "Optimize fuel, routes, and maintenance instead of fighting spreadsheet chaos.",
    icon: "TrendingDown",
  },
  {
    title: "Better Performance",
    description: "Dispatch faster, deliver cleaner proofs, and grow with confidence.",
    icon: "Gauge",
  },
] as const;

export const benefits = [
  "Lower Costs",
  "Higher Efficiency",
  "Improved Safety",
  "Better Decisions",
  "Business Growth",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We map how your fleet, drivers, and operations actually work today.",
  },
  {
    step: "02",
    title: "Design",
    description: "Custom workflows for dispatch, tracking, bidding, and reporting — your way.",
  },
  {
    step: "03",
    title: "Build",
    description: "Web and mobile platforms with GPS, alerts, and role-based access.",
  },
  {
    step: "04",
    title: "Launch & Scale",
    description: "Ship, train your team, and iterate as your network grows.",
  },
] as const;

export type SolutionSlug =
  | "fleet-management"
  | "gps-tracking"
  | "driver-apps"
  | "taxi-booking"
  | "load-board";

export type Solution = {
  slug: SolutionSlug;
  title: string;
  shortTitle: string;
  summary: string;
  problem: string;
  headline: string;
  features: string[];
  whoBenefits: string[];
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "fleet-management",
    title: "Fleet Management",
    shortTitle: "Fleet",
    summary:
      "Real-time visibility and control over your entire fleet — from dispatch to delivery.",
    headline: "Smarter Fleet. Better Efficiency. Stronger Business.",
    problem:
      "Running a fleet should not feel like managing chaos. Whether you manage 10 vehicles or 1,000, you need speed, visibility, and automation — not endless phone calls and spreadsheets.",
    features: [
      "Real-time vehicle tracking",
      "Route optimization",
      "AI-assisted route & ETA suggestions",
      "Live Google Maps integration",
      "Dispatch & job assignment",
      "Pickup & delivery management",
      "Driver management & performance monitoring",
      "Geofencing alerts",
      "Vehicle maintenance tracking",
      "Fuel & expense tracking",
      "Digital proof of delivery (POD)",
      "Reports & analytics",
      "Admin dashboard & role-based access",
      "Push notifications",
      "Payment gateway integration",
      "Multi-company support",
      "REST API integrations",
      "Mobile apps for drivers & fleet managers",
    ],
    whoBenefits: [
      "Transportation companies",
      "Logistics operators",
      "Courier & delivery services",
      "Enterprises with private fleets",
    ],
    icon: "Truck",
  },
  {
    slug: "gps-tracking",
    title: "GPS Tracking",
    shortTitle: "GPS",
    summary:
      "Live location tracking for vehicles and assets — with geofencing, fuel insight, and smarter decisions.",
    headline: "GPS tracking is more than a pin on a map.",
    problem:
      "Many businesses think GPS is only for seeing where vehicles are. Modern tracking helps you cut fuel costs, improve safety, and raise delivery accuracy every day.",
    features: [
      "Monitor vehicles in real time",
      "Geofencing alerts",
      "Route history and playback",
      "AI anomaly detection on trips & fuel",
      "Fuel cost reduction via route insight",
      "Maintenance schedules to minimize downtime",
      "Driver behavior and safety signals",
      "Delivery accuracy improvements",
      "Real-time reports for fleet performance",
      "Employee and asset tracking options",
    ],
    whoBenefits: [
      "Fleet owners",
      "Field service teams",
      "Security & compliance teams",
      "Operations managers",
    ],
    icon: "Radar",
  },
  {
    slug: "driver-apps",
    title: "Driver Apps",
    shortTitle: "Drivers",
    summary:
      "Driver registration, live jobs, performance monitoring, and proof of delivery — built for the road.",
    headline: "Give drivers a clear app. Give managers clear control.",
    problem:
      "Driver operations fall apart when assignments live in chats and paper. TieCodes builds mobile apps that register drivers, assign work, track performance, and capture delivery proof.",
    features: [
      "Driver registration & onboarding",
      "Secure login & user management",
      "Job assignment and status updates",
      "Live tracking for drivers and managers",
      "Driver performance monitoring",
      "Digital proof of delivery (POD)",
      "Document management",
      "Push notifications",
      "Expense and trip reporting",
      "Role-based access for ops and admins",
    ],
    whoBenefits: [
      "Fleet managers",
      "Driver networks",
      "Courier platforms",
      "Trucking operators",
    ],
    icon: "UserRoundCheck",
  },
  {
    slug: "taxi-booking",
    title: "Taxi Booking & Dispatch",
    shortTitle: "Taxi",
    summary:
      "Scalable ride-hailing platforms with rider apps, driver apps, and automated dispatch.",
    headline: "Launch or scale your own ride platform.",
    problem:
      "Taxi and on-demand businesses need more than a booking form — they need matching, dispatch, tracking, and payments that scale with demand.",
    features: [
      "Rider booking experience",
      "Driver mobile apps",
      "Automated dispatch",
      "Live trip tracking",
      "Fare and payment flows",
      "Admin operations dashboard",
      "Push notifications",
      "Ratings and trip history",
    ],
    whoBenefits: [
      "Ride-hailing startups",
      "Taxi businesses",
      "Courier expansions into passenger transport",
      "City mobility operators",
    ],
    icon: "CarTaxiFront",
  },
  {
    slug: "load-board",
    title: "Custom Load Board",
    shortTitle: "Load Board",
    summary:
      "Built for brokers. Owned by you — white-label load matching with bidding, GPS, and reports.",
    headline: "Built for brokers. Owned by you.",
    problem:
      "Generic load boards charge per load and limit your brand. TieCodes builds custom white-label boards so shippers and carriers connect on a platform you own.",
    features: [
      "No per-load fees",
      "No user limits",
      "100% white-label (your brand)",
      "Live bidding for carriers",
      "Route optimization for multi-stop trips",
      "GPS tracking from pickup to delivery",
      "Reports & insights for invoices, documents, and margins",
      "Shipper–carrier matching",
      "Document management",
      "Third-party load board integrations",
    ],
    whoBenefits: [
      "Freight brokers",
      "Shippers",
      "Carriers",
      "3PL operators",
    ],
    icon: "ClipboardList",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const services = [
  {
    title: "Custom Software Development",
    description: "Business solutions tailored to how your operations actually run.",
    icon: "Code2",
  },
  {
    title: "Mobile App Development",
    description: "Android and iOS apps for drivers, riders, managers, and field teams.",
    icon: "Smartphone",
  },
  {
    title: "Web Platforms",
    description: "Fast, modern dashboards and customer-facing web applications.",
    icon: "Globe",
  },
  {
    title: "Fleet & Logistics Systems",
    description: "Fleet management, trucking, freight forwarding, and parcel tracking.",
    icon: "Truck",
  },
  {
    title: "GPS & Employee Tracking",
    description: "Live location accountability for vehicles, assets, and people.",
    icon: "MapPin",
  },
  {
    title: "AI & Intelligent Ops",
    description:
      "LLM-assisted workflows, predictive alerts, and smart routing layered into your products.",
    icon: "Brain",
  },
  {
    title: "ERP & Inventory",
    description: "Inventory, warehouse, HR/payroll, and process systems that scale.",
    icon: "Boxes",
  },
  {
    title: "E-Commerce Websites",
    description: "SEO-friendly online stores built for growth.",
    icon: "ShoppingBag",
  },
  {
    title: "SMM & Digital Consultancy",
    description: "Boost presence while your product stack stays sharp.",
    icon: "Megaphone",
  },
] as const;

export const aboutValues = [
  {
    title: "Reliable Results",
    description: "On-time delivery and outstanding quality you can plan around.",
  },
  {
    title: "Expert Team",
    description: "Skilled professionals across logistics, mobile, and web stacks.",
  },
  {
    title: "Customer Focus",
    description: "We solve your unique challenges — not one-size-fits-all templates.",
  },
  {
    title: "Proven Success",
    description: "Over 80% of our business comes from repeat clients.",
  },
] as const;

/** Software-house capabilities shown below the hero */
export const capabilities = [
  {
    title: "Custom Product Engineering",
    description:
      "End-to-end web and backend systems shaped around your workflows — not off-the-shelf templates.",
    icon: "Code2",
  },
  {
    title: "Mobile Apps for the Road",
    description:
      "Driver, rider, and manager apps on Android and iOS with live jobs, tracking, and POD.",
    icon: "Smartphone",
  },
  {
    title: "GPS & Fleet Platforms",
    description:
      "Real-time maps, geofencing, dispatch, and analytics built for logistics operations.",
    icon: "Radar",
  },
  {
    title: "AI for Operations",
    description:
      "Route suggestions, anomaly alerts, demand signals, and smart dispatch assistance woven into your product.",
    icon: "Brain",
  },
  {
    title: "Integrations & APIs",
    description:
      "Payment gateways, maps, load boards, and REST APIs that connect your stack cleanly.",
    icon: "Link2",
  },
] as const;

export const aiCapabilities = [
  {
    title: "Intelligent route assistance",
    description:
      "Recommend better paths using live traffic, history, and delivery windows — fewer miles, fewer delays.",
    icon: "Sparkles",
  },
  {
    title: "Anomaly & risk alerts",
    description:
      "Flag unusual stops, fuel spikes, or safety patterns so ops can act before issues become costs.",
    icon: "Bot",
  },
  {
    title: "Smart dispatch support",
    description:
      "Match jobs to drivers with context — skills, location, ETA — instead of guessing from chats.",
    icon: "Cpu",
  },
  {
    title: "Operational insights",
    description:
      "Turn tracking and trip data into clear recommendations your managers can trust.",
    icon: "Brain",
  },
] as const;

export const techStack = [
  "React",
  "Next.js",
  "Flutter",
  "Python / Django",
  "PHP / Laravel",
  "Node.js",
  "MySQL",
  "REST APIs",
  "Google Maps",
  "GPS / Telematics",
  "AI / ML",
  "LLM Integrations",
  "Cloud DevOps",
  "Push Notifications",
] as const;

export const whyUs = [
  {
    title: "Software house, not a template shop",
    description:
      "We design and ship custom platforms — white-label when you need ownership, tailored when your process is unique.",
  },
  {
    title: "Domain depth in fleet & logistics",
    description:
      "Drivers, dispatch, GPS, load boards, and taxi ops are our daily craft — we speak the language of the road.",
  },
  {
    title: "Long-term partners",
    description:
      "Over 80% of our business comes from repeat clients who trust us to build, launch, and keep improving.",
  },
  {
    title: "Based in Lahore, shipping worldwide",
    description:
      "A focused team that delivers reliable quality with clear communication from discovery to scale.",
  },
] as const;
