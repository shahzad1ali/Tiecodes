export const company = {
  name: "TieCodes",
  wordmark: "TieCodes",
  tagline: "innovate.connect.inspire.",
  headline: "Building software for fleet, field service, and operational workflows",
  description:
    "TieCodes is a software house creating custom web applications, mobile apps, GPS platforms, SaaS dashboards, and workflow systems for logistics, field operations, service marketplaces, and digital business growth.",
  location: "Lahore, Punjab, Pakistan",
  email: "darabkhanse@gmail.com",
  phones: ["+92 308 612 2231", "+92 321 4086550"],
  linkedin: "https://www.linkedin.com/company/tiecodes-pvt-ltd",
  website: "https://tiecodes.com",
  employees: "11–50",
  repeatClients: "80%+",
  founded: "2023",
  responseTime: "We reply within 24 hours.",
} as const;

export const founder = {
  name: "Darab Khan",
  role: "CEO & Founder",
  location: "Lahore, Punjab, Pakistan",
  photo: "/brand/darab-khan.png",
  linkedin: "https://www.linkedin.com/in/darab-khan-26b8841b4",
  bio: "Darab leads TieCodes as a software house building custom web platforms, mobile apps, GPS systems, and logistics technology — combining product engineering with practical AI so businesses get tools that fit how teams actually work.",
  education: [
    {
      school: "Lahore University of Management Sciences (LUMS)",
      detail: "MS, Artificial Intelligence",
      years: "2024 – 2026 (Expected)",
    },
    {
      school: "The University of Lahore",
      detail: "Software Engineering",
      years: "2017 – 2021",
    },
  ],
  experience: [
    {
      title: "CEO & Founder",
      org: "TieCodes",
      years: "Jan 2023 – Present",
    },
    {
      title: "Sr. Software Engineer",
      org: "Code District",
      years: "Feb 2022 – Oct 2022",
    },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/demo", label: "Demo" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerExtraLinks = [
  { href: "/engagement", label: "Engagement" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const testimonials = [
  {
    quote:
      "Dispatch used to live in spreadsheets and WhatsApp. TieCodes built a platform our managers actually use — tracking, jobs, and reports in one place.",
    role: "Fleet Operations Lead",
    region: "Gulf region",
  },
  {
    quote:
      "We needed a white-label load board we own, not another per-load fee platform. The custom board and GPS visibility changed how we work with carriers.",
    role: "Freight Broker",
    region: "South Asia",
  },
  {
    quote:
      "Driver apps and live tracking cut the phone chaos. Clear POD and alerts mean fewer disputes and faster handoffs.",
    role: "Courier Network Manager",
    region: "Pakistan",
  },
] as const;

export const engagementModels = [
  {
    title: "Fixed price",
    summary: "Scoped MVP or feature set with a clear deliverable and timeline.",
    bestFor: "Well-defined products: driver app MVP, tracking dashboard, load board v1.",
    timeline: "Typically 6–14 weeks depending on scope",
  },
  {
    title: "Time & materials",
    summary: "Flexible engagement when requirements evolve as you learn from users.",
    bestFor: "Ongoing product iteration, integrations, and AI/ops experiments.",
    timeline: "Monthly cycles with transparent burn",
  },
  {
    title: "Dedicated team",
    summary: "A focused squad embedded with your roadmap for continuous delivery.",
    bestFor: "Scale-ups needing steady velocity across web, mobile, and APIs.",
    timeline: "Quarterly commitments, sprint cadence",
  },
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
  | "load-board"
  | "web-portals"
  | "service-marketplace"
  | "saas-dashboard";

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
  {
    slug: "web-portals",
    title: "Business Web Portals",
    shortTitle: "Web Portals",
    summary:
      "Client portals, dashboards, operations hubs, and custom web products designed for visibility and growth.",
    headline: "Web products that turn operations into simple, scalable systems.",
    problem:
      "Many teams lose time to fragmented tools, manual admin work, and unclear reporting. A custom web portal brings your workflows into one system your team can trust.",
    features: [
      "Custom login and role-based access",
      "Operations dashboards and KPIs",
      "Customer and employee portals",
      "Workflow automation and approvals",
      "Document management and file uploads",
      "Data reports, exports, and analytics",
      "API integrations with internal systems",
      "Responsive web experience across devices",
      "SEO-friendly business pages and landing pages",
      "Scalable architecture for future growth",
    ],
    whoBenefits: [
      "Service businesses",
      "B2B operators",
      "Startup teams",
      "Digital-first companies",
    ],
    icon: "Globe",
  },
  {
    slug: "saas-dashboard",
    title: "SaaS Dashboard Systems",
    shortTitle: "SaaS",
    summary:
      "Modern dashboards, reporting layers, and product platforms built for visibility, control, and scale.",
    headline: "Turn your data into decisions your team can act on.",
    problem:
      "Without a clear product dashboard, teams rely on manual reporting and guesswork. SaaS dashboards replace that with real-time insight and operational control.",
    features: [
      "Executive and operational dashboards",
      "Live analytics and KPI widgets",
      "Admin control panels and permissions",
      "Custom reporting and filtered views",
      "Integrations with CRMs, ERP, and APIs",
      "Notifications and alerts",
      "Scalable reporting architecture",
      "User journey and engagement insights",
      "Multi-tenant support",
      "White-label design and branding",
    ],
    whoBenefits: [
      "Product companies",
      "Agencies",
      "Operations teams",
      "Scaling businesses",
    ],
    icon: "LayoutDashboard",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const services = [
  {
    title: "Custom Software Development",
    description: "Tailored business software for web, mobile, operations, and internal systems built around your workflow.",
    icon: "Code2",
  },
  {
    title: "MVP Development",
    description: "Launch-ready first versions that validate your idea quickly, attract early users, and create a clear path to scale.",
    icon: "Rocket",
  },
  {
    title: "Product Development",
    description: "From product discovery and UX to architecture, delivery, analytics, and continuous improvement after launch.",
    icon: "Layers3",
  },
  {
    title: "Web Development",
    description: "Responsive business websites, customer portals, dashboards, and scalable web applications designed for growth.",
    icon: "Globe",
  },
  {
    title: "Mobile App Development",
    description: "Android and iOS apps for drivers, field teams, managers, and customers with live updates, tracking, and real-time workflows.",
    icon: "Smartphone",
  },
  {
    title: "SaaS & Dashboard Systems",
    description: "Custom admin panels, operational dashboards, and software products that give teams visibility, control, and reporting.",
    icon: "LayoutDashboard",
  },
  {
    title: "Fleet & Logistics Systems",
    description: "Fleet management, trucking, freight forwarding, and parcel tracking built around GPS-aware workflows.",
    icon: "Truck",
  },
  {
    title: "Marketplace & Service Portals",
    description: "Provider and installer workflows with job creation, proposals, assignment, agreement verification, and completion tracking.",
    icon: "ClipboardList",
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
    description: "SEO-friendly online stores, catalogs, checkout flows, payments, and back-office tools built for growth.",
    icon: "ShoppingBag",
  },
  {
    title: "Google & Third-Party Integrations",
    description: "Maps, Analytics, authentication, payments, messaging, and business APIs connected into one reliable product system.",
    icon: "PlugZap",
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

export const capabilities = [
  {
    title: "Custom Product Engineering",
    description:
      "End-to-end software built around your workflows — from web apps and dashboards to field-service and booking platforms that actually match business operations.",
    icon: "Code2",
  },
  {
    title: "Web App & Portal Development",
    description:
      "Business portals, customer experiences, admin dashboards, and internal tools designed for usability, visibility, and growth across teams.",
    icon: "Globe",
  },
  {
    title: "Mobile Apps for the Road",
    description:
      "Android and iOS apps for drivers, field teams, customers, and managers with job updates, assignments, GPS views, and task status tracking.",
    icon: "Smartphone",
  },
  {
    title: "Marketplace & Service Workflows",
    description:
      "Provider and installer portals with job creation, bidding, assignment, agreements, verification, completion, and mutual review built into one process.",
    icon: "ClipboardList",
  },
  {
    title: "GPS & Fleet Platforms",
    description:
      "Real-time maps, geofencing, dispatch, and analytics for logistics operations, tracking systems, and live route visibility.",
    icon: "Radar",
  },
  {
    title: "AI for Operations",
    description:
      "Assignments, alerts, recommendations, and smart dispatch support that help teams act faster without losing transparency.",
    icon: "Brain",
  },
  {
    title: "Integrations & APIs",
    description:
      "Payment gateways, maps, service APIs, and internal data flows connected cleanly so your product works as a system, not a patchwork.",
    icon: "Link2",
  },
  {
    title: "MVP & Product Launches",
    description:
      "Focused first releases for founders and teams that need to test, learn, and launch without overbuilding.",
    icon: "Rocket",
  },
  {
    title: "E-Commerce & Growth",
    description:
      "Online stores, conversion-focused journeys, SEO foundations, and operational tooling for digital commerce.",
    icon: "ShoppingBag",
  },
] as const;

export const aiCapabilities = [
  {
    title: "Job assignment intelligence",
    description:
      "Recommend matching providers, installers, or drivers based on location, response time, and workload to speed up approval and reduce delays.",
    icon: "Sparkles",
  },
  {
    title: "Agreement & verification checks",
    description:
      "Flag missing documents, terms mismatch, or incomplete confirmation steps before work begins to keep service workflows compliant and accountable.",
    icon: "Bot",
  },
  {
    title: "Smart dispatch support",
    description:
      "Route jobs to the right team with context — availability, skills, location, and status — instead of chaotic manual assignment.",
    icon: "Cpu",
  },
  {
    title: "Completion & rating insights",
    description:
      "Track job completion, ongoing quality, and mutual review data so teams can improve service performance and trust.",
    icon: "Brain",
  },
] as const;

export const techStack = [
  "React",
  "Next.js",
  "React Native",
  "Flutter",
  "Python / Django",
  "PHP / Laravel",
  "Node.js",
  "MySQL",
  "PostgreSQL",
  "REST APIs",
  "Webhooks",
  "Google Maps",
  "GPS / Telematics",
  "AI / ML",
  "LLM Integrations",
  "Cloud DevOps",
  "Push Notifications",
] as const;

export const whyUs = [
  {
    title: "Software house",
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
