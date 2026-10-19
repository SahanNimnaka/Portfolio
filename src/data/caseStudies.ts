export type StackGroup = {
  area: string;
  items: string[];
};

export type CaseStudyFeature = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  typeLabel: string;
  tagline: string;
  roleLabel: string;
  repositoryUrl: string;
  /** Only set when a working demo has been verified. */
  demoUrl?: string;
  problem: string;
  overview: string[];
  goals: string[];
  users: string;
  role: {
    summary: string;
    contributions: string[];
  };
  stack: StackGroup[];
  features: CaseStudyFeature[];
  architecture: {
    overview: string;
    diagram: string;
    decisions: string[];
  };
  limitations: string[];
  futureWork: string[];
};

/**
 * Every claim below is grounded in the repositories' own READMEs, file
 * structure, and GitHub metadata (checked October 2026). Where the source
 * material states something is unverified or incomplete, the case study
 * says so rather than inventing results. No challenges section exists
 * because none of the repositories document them.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "air-guard",
    title: "Air Guard",
    typeLabel: "IoT Backend",
    tagline:
      "Air-quality monitoring and prediction — from ThingSpeak sensor readings to an Express API, PostgreSQL storage, and a Python AI component.",
    roleLabel: "Sole developer",
    repositoryUrl: "https://github.com/sahan721/air_guard",
    problem:
      "Air-quality information typically lives in separate places: raw sensor readings on an IoT platform, current conditions in an external weather service, and predictive analysis inside a model. Air Guard brings those sources together so readings, weather data, and predictions can be viewed through one backend.",
    overview: [
      "Air Guard is an IoT-based air-quality monitoring and prediction platform. It retrieves environmental sensor measurements — PM1.0, PM2.5, PM10, temperature, humidity, AQI, and RSSI — from a connected ThingSpeak channel and stores them in PostgreSQL, complemented by external weather information.",
      "The repository contains the backend services of the system: an Express API, a Prisma-based database layer, scheduled jobs, integration points for weather data and a Python-based AI model, plus dashboard-related components. The project README is explicit that end-to-end operation and model accuracy have not been verified — this case study reflects the code and documentation as they exist, without claims of production deployment or measured prediction accuracy.",
    ],
    goals: [
      "Ingest air-quality readings from a connected ThingSpeak channel",
      "Store current and historical readings, devices, weather data, and predictions in PostgreSQL",
      "Expose a REST API for devices, sensor readings, weather information, and predictions",
      "Run scheduled jobs for sensor-data synchronisation, weather updates, and AI processing",
      "Provide an admin dashboard component for viewing and managing system information",
    ],
    users:
      "Administrators who view and manage devices, readings, weather data, and predictions through the admin dashboard, alongside developers consuming the backend API.",
    role: {
      summary:
        "Sole contributor to the repository — I designed and built the backend services, the database layer, the scheduled jobs, and the AI-model integration.",
      contributions: [
        "Express + TypeScript API with controllers, routes, validators, and services",
        "Prisma schema and database layer for readings, history, weather, devices, and predictions",
        "Node-Cron jobs for sensor-data synchronisation, weather updates, and AI processing",
        "Integration between the backend and a Python-based AI prediction component",
        "Dashboard-related components for viewing and managing system information",
        "Environment-based configuration with secrets kept out of Git, per the repository's security notes",
      ],
    },
    stack: [
      { area: "Backend", items: ["Node.js", "Express.js", "TypeScript"] },
      { area: "Database", items: ["PostgreSQL", "Prisma ORM"] },
      { area: "AI / ML", items: ["Python"] },
      { area: "IoT data", items: ["ThingSpeak"] },
      { area: "External data", items: ["Weather API"] },
      { area: "Scheduling", items: ["Node-Cron"] },
      { area: "Interface", items: ["Admin dashboard components"] },
    ],
    features: [
      {
        title: "IoT data integration",
        description:
          "Retrieves air-quality measurements from a connected ThingSpeak channel.",
      },
      {
        title: "Data management",
        description:
          "Stores current and historical readings using PostgreSQL and Prisma.",
      },
      {
        title: "Backend API",
        description:
          "Endpoints for device management, sensor readings, weather information, and predictions.",
      },
      {
        title: "Weather integration",
        description:
          "Fetches external weather information to complement air-quality data.",
      },
      {
        title: "AI prediction integration",
        description:
          "A Python-based AI model component with a backend job for prediction tasks.",
      },
      {
        title: "Scheduled processing",
        description:
          "Jobs for sensor-data synchronisation, weather updates, and AI processing.",
      },
      {
        title: "Admin dashboard",
        description:
          "A dashboard component for viewing and managing system information.",
      },
    ],
    architecture: {
      overview:
        "Sensor data flows from IoT devices into ThingSpeak, where the backend retrieves it. From the Express service, data is written to PostgreSQL through Prisma, enriched by weather lookups, and processed by scheduled jobs that also drive the Python AI model. Results — readings, weather data, and predictions — are served through the API and surfaced in an admin dashboard. The repository's own README notes that this is the intended component flow and does not by itself confirm that every component currently operates end to end.",
      diagram: [
        "IoT Sensor Data",
        "      |",
        "      v",
        "ThingSpeak Integration",
        "      |",
        "      v",
        "Node.js / Express Backend",
        "      |",
        "      +------> PostgreSQL Database",
        "      |",
        "      +------> Weather Data Integration",
        "      |",
        "      +------> Python AI Model",
        "      |",
        "      v",
        "Air Quality Data & Predictions",
        "      |",
        "      v",
        "Admin Dashboard",
      ].join("\n"),
      decisions: [
        "Node.js/Express with TypeScript as the backend stack, structured into controllers, routes, services, validators, and jobs",
        "Prisma as the ORM, giving a typed data layer over PostgreSQL",
        "Scheduled work — data sync, weather updates, AI processing — isolated in Node-Cron jobs rather than request handlers",
        "The AI component stays in Python and is invoked by a backend job, keeping the prediction model separate from the API codebase",
        "Environment-based configuration with secrets expected in a local .env file and kept out of Git",
      ],
    },
    limitations: [
      "End-to-end operation of every component has not been verified; the README documents this openly",
      "No automated tests currently cover the API endpoints or the scheduled jobs",
      "AI model evaluation results have not been published — no prediction-accuracy claims are made",
      "No live demo, deployment URL, or verified dashboard screenshots exist yet",
    ],
    futureWork: [
      "Add automated tests for API endpoints and scheduled jobs",
      "Document API endpoints with request and response examples",
      "Publish measured AI model evaluation results once available",
      "Add verified dashboard screenshots and a live demo",
      "Improve deployment configuration and operational monitoring",
    ],
  },
  {
    slug: "medisync",
    title: "MediSync",
    typeLabel: "Web Application",
    tagline:
      "Hospital staff management in Laravel — staff records, QR-code attendance, shifts, leave, and reports behind role-specific areas.",
    roleLabel: "Main contributor",
    repositoryUrl: "https://github.com/sahan721/medisync",
    problem:
      "Hospital workforce coordination involves many moving parts — staff records, attendance, shifts, leave requests, and reports — frequently handled through fragmented manual processes. MediSync brings these workflows into a single web application.",
    overview: [
      "MediSync is a web-based hospital staff management application built with Laravel. It provides role-specific areas for administrators, sisters, and staff, covering staff administration, attendance, shift coordination, leave workflows, and supporting reporting tools.",
      "The repository contains the full Laravel application — migrations, routes, models, Blade and Livewire views, and Pest tests. Per its README, feature completeness, test coverage of the principal workflows, and production deployment have not been independently verified.",
    ],
    goals: [
      "Centralise staff administration and staff-related records",
      "Record attendance through QR-code generation and scanning workflows",
      "Coordinate staff shifts, including overtime handling and scheduled reminders",
      "Handle leave requests through a structured staff-administration workflow",
      "Generate PDF and spreadsheet reports and support push notifications",
    ],
    users:
      "Three role-specific audiences, each with its own application area: administrators, sisters, and staff.",
    role: {
      summary:
        "Main contributor to the repository — I built the core Laravel application: its data models, authentication and role areas, QR attendance, shift and leave workflows, and reporting features. The repository also contains a small contribution from a second user.",
      contributions: [
        "Laravel application structure — models, migrations, routes, and Blade/Livewire views",
        "Role-specific application areas built on Laravel Breeze authentication",
        "QR-code attendance workflows using Simple QrCode",
        "Shift scheduling and leave-request workflows",
        "PDF and spreadsheet report generation with DomPDF and PhpSpreadsheet",
        "Web-push notifications via Minishlink Web Push",
        "Pest-based tests covering authentication and profile functionality",
      ],
    },
    stack: [
      { area: "Language", items: ["PHP 8.2+"] },
      { area: "Framework", items: ["Laravel 12", "Laravel Breeze"] },
      { area: "Interface", items: ["Livewire", "Blade", "Tailwind CSS", "Vite"] },
      { area: "Database", items: ["SQLite (default)", "Eloquent ORM"] },
      {
        area: "Integrations",
        items: ["Simple QrCode", "DomPDF", "PhpSpreadsheet", "Web Push"],
      },
      { area: "Testing", items: ["Pest"] },
    ],
    features: [
      {
        title: "Staff management",
        description:
          "Staff administration and staff-related records, with separate areas for administrators, sisters, and staff.",
      },
      {
        title: "Attendance",
        description:
          "QR-code generation and scanning for attendance-related workflows.",
      },
      {
        title: "Shift management",
        description:
          "Shift scheduling, overtime shift handling, and scheduled shift reminders.",
      },
      {
        title: "Leave management",
        description: "Leave-request workflows for staff administration.",
      },
      {
        title: "Reports",
        description: "PDF report generation and spreadsheet export.",
      },
      {
        title: "Notifications",
        description:
          "Push-notification support and subscription-related endpoints.",
      },
    ],
    architecture: {
      overview:
        "A single Laravel application serves all three role areas. Requests pass through Laravel's routing and authentication layers into Eloquent models backed by the configured database (SQLite by default), with Livewire and Blade rendering dynamic views. Cross-cutting libraries handle QR codes, PDF and spreadsheet exports, and web push; Pest covers automated tests.",
      diagram: [
        "Users",
        "  |",
        "  v",
        "Laravel Web Application",
        "  |",
        "  +---- Authentication and Role-Based Areas",
        "  |",
        "  +---- Staff Management",
        "  |",
        "  +---- Attendance and QR Workflows",
        "  |",
        "  +---- Shift and Leave Management",
        "  |",
        "  +---- Reports and Notifications",
        "  |",
        "  v",
        "Database",
      ].join("\n"),
      decisions: [
        "Laravel 12 as the application framework, with the default database set to SQLite for straightforward local setup (per .env.example)",
        "Laravel Breeze for authentication scaffolding, extended with role-specific application areas",
        "Livewire and Blade for server-rendered dynamic interfaces",
        "A dedicated library per concern — Simple QrCode for attendance, DomPDF and PhpSpreadsheet for exports, Minishlink Web Push for notifications",
        "Pest for automated testing alongside Laravel feature tests",
      ],
    },
    limitations: [
      "Feature completeness and test coverage of the principal workflows have not been independently verified, per the repository README",
      "Tests cover authentication and profile functionality; attendance, permissions, shifts, leave, exports, and notifications still need dedicated testing",
      "No verified deployment, hospital usage, or production readiness is claimed",
      "No live demo or verified application screenshots are available",
    ],
    futureWork: [
      "Expand automated tests for core staff-management workflows",
      "Document API endpoints and role permissions",
      "Add verified application screenshots and a demonstration link",
      "Document deployment configuration and environment variables",
      "Improve monitoring, error handling, and security verification",
    ],
  },
  {
    slug: "bubbleblizz",
    title: "BubbleBlizz",
    typeLabel: "Android Application",
    tagline:
      "A native Android beverage-ordering app in Kotlin and Jetpack Compose — catalogue, cart, favourites, and a multi-step checkout.",
    roleLabel: "Sole developer",
    repositoryUrl: "https://github.com/sahan721/BubbleBlizz-test",
    problem:
      "Ordering a drink on a phone should take a few taps. BubbleBlizz explores that experience as a native Android application: browse a beverage catalogue, organise favourites, manage a cart, and move through a multi-step checkout flow.",
    overview: [
      "BubbleBlizz is a native Android application built with Kotlin and Jetpack Compose. It features a product catalogue — fruit juices, dairy drinks, soft drinks, and energy drinks — detail screens, a shopping cart, favourites, a multi-step checkout flow, and profile management.",
      "The repository is a Kotlin and Android project using Gradle Kotlin DSL, compile SDK 34, and Material Design 3 — a native Android codebase, not a Flutter or web application. State is held in in-memory Compose stores: the authentication screens exist but are not connected to a backend, and payment options are presented without real payment processing. The README lists these as future work.",
    ],
    goals: [
      "Browse a beverage catalogue with categories, sizes, prices, and ratings",
      "Manage a cart with quantity controls and calculated totals",
      "Save favourite products in a dedicated favourites screen",
      "Move through a multi-step checkout: shipping details, payment selection, order review, and order details",
      "Manage a profile through profile and edit-profile screens",
    ],
    users:
      "Android phone users browsing and ordering beverages — the app targets devices running Android 7.0 (API 24) and above.",
    role: {
      summary:
        "Sole contributor — I designed and implemented the entire Android application: navigation, screens, reusable components, theme, and state stores.",
      contributions: [
        "Navigation graph with Navigation Compose covering splash, auth, catalogue, cart, checkout, and profile routes",
        "Reusable Compose components and a Material Design 3 theme",
        "Screen implementations: catalogue, product details, cart, favourites, checkout, and profile",
        "Centralised in-memory state stores — CartStore, FavoritesStore, CheckoutStore, and UserStore — fed by a predefined catalogue",
        "Gradle Kotlin DSL build configuration targeting SDK 34 with a minimum of SDK 24",
      ],
    },
    stack: [
      { area: "Language", items: ["Kotlin"] },
      { area: "Platform", items: ["Android SDK (min 24, target 34)"] },
      { area: "Interface", items: ["Jetpack Compose", "Material Design 3"] },
      { area: "Navigation", items: ["Navigation Compose"] },
      {
        area: "State",
        items: ["CartStore", "FavoritesStore", "CheckoutStore", "UserStore"],
      },
      { area: "Build", items: ["Gradle Kotlin DSL", "Java/Kotlin 17"] },
    ],
    features: [
      {
        title: "Authentication interfaces",
        description:
          "Splash, login, and registration screens with password masking and navigation between them — not connected to a backend service.",
      },
      {
        title: "Beverage catalogue",
        description:
          "Fruit juices, dairy drinks, soft drinks, and energy drinks with names, descriptions, sizes, prices, and ratings, organised by category.",
      },
      {
        title: "Product details",
        description:
          "Detail screens with product images from Android drawable resources.",
      },
      {
        title: "Shopping cart",
        description:
          "Add products, increase or update quantities, remove items, and calculate totals.",
      },
      {
        title: "Favourites",
        description:
          "Add or remove favourites and view them in a dedicated screen.",
      },
      {
        title: "Checkout workflow",
        description:
          "Shipping details, payment-method selection, order review, and order details — without real payment processing.",
      },
      {
        title: "Profile",
        description: "Profile and edit-profile screens backed by local state.",
      },
    ],
    architecture: {
      overview:
        "The app follows a screen-based architecture: MainActivity enters a Navigation Compose graph that routes between screens; reusable components provide shared UI; each data domain has a dedicated in-memory store fed by a predefined local catalogue. Material Design 3 and a custom theme keep the visuals consistent.",
      diagram: [
        "Android Application",
        "        |",
        "        v",
        "MainActivity / App Entry",
        "        |",
        "        v",
        "Navigation Compose",
        "        |",
        "        +---- Authentication Screens",
        "        |",
        "        +---- Home and Product Catalogue",
        "        |",
        "        +---- Product Details",
        "        |",
        "        +---- Cart and Favourites",
        "        |",
        "        +---- Checkout and Order Details",
        "        |",
        "        +---- Profile Management",
        "        |",
        "        v",
        "Local Application State Stores",
      ].join("\n"),
      decisions: [
        "Jetpack Compose with Material Design 3 instead of XML layouts, for declarative UI",
        "Navigation Compose centralising all screen transitions in a single navigation graph",
        "A dedicated store per data domain — cart, favourites, checkout, user — rather than ad hoc state passing between screens",
        "A predefined local catalogue, so the UI flows run without any backend dependency",
        "Kotlin with Gradle Kotlin DSL, compile/target SDK 34, and a minimum SDK of 24",
      ],
    },
    limitations: [
      "State is in-memory — persistence across app restarts has not been verified",
      "Authentication screens are navigation-only; no server-backed authentication is connected",
      "Payment methods are selectable, but no real payment processing is implemented",
      "No automated tests are included yet",
      "No screenshots or demonstration video are available yet",
    ],
    futureWork: [
      "Connect authentication to a real backend",
      "Integrate a persistent product catalogue and order service",
      "Add order history and persistent cart storage",
      "Integrate a verified payment gateway",
      "Add product search and sorting",
      "Improve form validation and error handling",
      "Add automated UI and unit tests",
      "Add screenshots and a demonstration video",
    ],
  },
];

export const caseStudySections = [
  { id: "overview", label: "Overview" },
  { id: "goals", label: "Goals & users" },
  { id: "role", label: "Role & contributions" },
  { id: "stack", label: "Technology stack" },
  { id: "features", label: "Key features" },
  { id: "architecture", label: "Architecture & decisions" },
  { id: "limitations", label: "Limitations & future work" },
] as const;

export const caseStudyBySlug = new Map(
  caseStudies.map((study) => [study.slug, study]),
);

/** Previous/next case study in the series, wrapping around. */
export function adjacentCaseStudy(slug: string): {
  prev: CaseStudy;
  next: CaseStudy;
} {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  const count = caseStudies.length;
  return {
    prev: caseStudies[(index - 1 + count) % count],
    next: caseStudies[(index + 1) % count],
  };
}
