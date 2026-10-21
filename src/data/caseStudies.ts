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
  {
    slug: "neptune",
    title: "Neptune",
    typeLabel: "Admin Dashboard",
    tagline:
      "A collection-management system — a React admin dashboard over a NestJS API with role-based access, request workflows, and PostgreSQL storage.",
    roleLabel: "Main frontend contributor",
    repositoryUrl: "https://github.com/sahan721/neptune_front_done2",
    demoUrl: "https://neptunefrontdone2.vercel.app",
    problem:
      "Collection operations involve several roles working with the same records: administrators manage collectors, riders, vehicles, and daily assignments; collectors raise collection requests; riders complete them. Without one system those records drift apart. Neptune pairs a React admin dashboard with an API that decides what each role may do.",
    overview: [
      "Neptune is a full-stack collection-management system. Its React admin dashboard provides screens for collectors, riders, vehicles, daily assignments, and collection requests, with login, search, filtering, pagination, status badges, and shared table and modal components reused across every screen.",
      "The project is split across two repositories: the React frontend linked above and a separate NestJS backend. The frontend README documents the intended features and notes that availability depends on the configured modules; the backend's behaviour is described in its implementation report and API handover document rather than a project README. This case study reflects those sources and the code as it exists — it makes no claim of production usage, measured results, or end-to-end operation, which was not verified from this environment.",
    ],
    goals: [
      "Give administrators a dashboard for collection operations and monitoring",
      "Authenticate users and enforce role-based access for admin, collector, and rider roles",
      "Move collection requests through enforced status transitions with recorded timestamps",
      "Manage collector, rider, vehicle, and daily-assignment records",
      "Surface administrative reports and notification support",
    ],
    users:
      "Administrators, collectors, and riders, each with their own permissions and application area, plus developers consuming the REST API.",
    role: {
      summary:
        "Main contributor to the Neptune frontend repository (27 of 32 contributions) and a contributor to the backend repository (13 of 66 contributions), working with one other frontend contributor and one other backend contributor.",
      contributions: [
        "React and TypeScript admin dashboard built with Vite, organised into pages, layout, and shared components",
        "Routing and authentication context connecting dashboard screens to the backend API",
        "Shared interface components — data table, pagination, search, filters, modals, forms, and status badges",
        "API client layer in src/lib/api.ts, used across the dashboard pages",
        "Contributions to the NestJS backend alongside a second backend contributor",
        "Repository documentation: the project README covering features, stack, architecture, and setup",
      ],
    },
    stack: [
      { area: "Frontend", items: ["React", "TypeScript", "Vite"] },
      { area: "Interface", items: ["React Router", "lucide-react", "Custom CSS"] },
      { area: "Backend", items: ["NestJS", "Node.js", "TypeScript"] },
      { area: "Database", items: ["PostgreSQL", "Prisma ORM"] },
      { area: "Security", items: ["JWT", "Passport", "Argon2"] },
      { area: "Notifications", items: ["Web Push"] },
      { area: "Testing", items: ["Jest", "Supertest"] },
    ],
    features: [
      {
        title: "Administrative dashboard",
        description:
          "Dashboard, leaderboard, and statistic views for monitoring collection operations.",
      },
      {
        title: "Role-based authentication",
        description:
          "Sign-in with an auth context on the frontend and JWT guards separating admin, collector, and rider permissions on the API.",
      },
      {
        title: "Collection request workflow",
        description:
          "Requests move through PENDING, ACCEPTED, COMPLETED, or CANCELLED states with the transitions enforced by the backend.",
      },
      {
        title: "Record management",
        description:
          "Create, search, and review collector, rider, and vehicle records through dedicated pages and form modals.",
      },
      {
        title: "Daily assignments",
        description:
          "Assignment records tied to a collector and a date, managed through list, form, and detail views.",
      },
      {
        title: "Reusable interface components",
        description:
          "Shared data table, pagination, search bar, filters, modals, and status badges used across every screen.",
      },
      {
        title: "Notifications",
        description:
          "Toast notifications in the dashboard alongside web-push subscriptions stored for users on the backend.",
      },
    ],
    architecture: {
      overview:
        "The dashboard is a Vite-built React single-page application: routing leads to a page per resource, an auth context holds the session, and an API client in src/lib calls the backend. The NestJS side splits into admin, collector, rider, auth, and push modules behind JWT and role guards, reading and writing PostgreSQL through Prisma. The frontend README notes that feature availability depends on the configured modules, and the backend flow is documented rather than verified end to end.",
      diagram: [
        "React Admin Dashboard (Vite)",
        "        |",
        "        +---- Auth, Toast, and Layout Context",
        "        v",
        "API Client (src/lib/api.ts)",
        "        |",
        "        v",
        "NestJS Backend",
        "        |---- JWT Auth + Role Guards",
        "        |---- Admin / Collector / Rider Modules",
        "        |---- Web Push Service",
        "        v",
        "PostgreSQL via Prisma ORM",
      ].join("\n"),
      decisions: [
        "React with TypeScript and Vite for the dashboard, with React Router handling navigation",
        "A page-per-resource structure backed by shared components — table, pagination, search, filters, modals, and badges — instead of one-off screens",
        "NestJS with controllers and services separated per domain: admin, collector, rider, auth, and push",
        "JWT authentication with role guards, DTO validation, and Argon2 password hashing",
        "PostgreSQL through Prisma, with enums for roles, statuses, and request states so invalid transitions are constrained in the data model",
      ],
    },
    limitations: [
      "The frontend README states that feature availability depends on the implemented and configured application modules",
      "The backend repository's README is still the framework starter text; API behaviour is documented in an implementation report and handover document instead",
      "End-to-end operation of the deployed dashboard with a live backend API was not verified from this environment",
      "The frontend ships no automated tests; backend Jest and Supertest files exist, but their results were not reproduced here",
      "No usage figures, user counts, or production deployment are claimed",
    ],
    futureWork: [
      "Document the backend API in a project README with endpoints, payloads, and examples",
      "Expand automated testing across API endpoints and dashboard flows",
      "Strengthen accessibility and responsive design",
      "Document deployment and environment configuration for both repositories",
      "Add verified screenshots and a recording of the dashboard in use",
    ],
  },
  {
    slug: "personal-ai-data-agent",
    title: "Personal AI Data Agent",
    typeLabel: "AI Data Platform",
    tagline:
      "An AI-assisted data-analysis platform — upload a CSV, profile and visualise it, query it through an agent, train ML models, and export the results.",
    roleLabel: "Sole developer",
    repositoryUrl: "https://github.com/SahanNimnaka/Personal-AI-Data-Agent",
    demoUrl: "https://personal-ai-data-agent.vercel.app",
    problem:
      "Analysing a dataset usually means assembling a notebook, a charting library, a statistics script, and a separate model workflow. Personal AI Data Agent brings dataset profiling, statistics, interactive charts, anomaly detection, machine learning, and reporting into one interface, with a conversational agent that can invoke the supported analysis tools.",
    overview: [
      "Personal AI Data Agent is a full-stack data-analysis platform. A React dashboard uploads a CSV, shows a preview and column profile, then drives descriptive and grouped statistics, correlation analysis, IQR outlier detection, and Plotly charts. A machine-learning screen trains and compares baseline and scikit-learn models on a held-out split, and analyses can be exported as JSON, CSV, or printable HTML.",
      "The FastAPI backend processes each request in memory and has no database: uploaded datasets and results are held in browser state and are lost between reloads. The agent is restricted to a fixed tool allowlist, uses a configurable OpenAI-compatible provider when a key is configured, and otherwise falls back to a deterministic rule-based mode. The live deployment uses Vercel Services to route /api/* to the backend and everything else to the static frontend, and its /api/health endpoint was checked for this case study.",
    ],
    goals: [
      "Upload a CSV and understand its structure without writing code",
      "Run descriptive, grouped, correlation, and outlier analysis",
      "Generate interactive Plotly visualisations from the analysed data",
      "Ask natural-language questions that call supported analysis tools",
      "Train and compare machine-learning models, then export the results",
    ],
    users:
      "People exploring tabular data — analysts, students, and developers — who want profiling, charts, and baseline machine learning from one interface. The repository describes the app as intended for personal or local use.",
    role: {
      summary:
        "Sole contributor to the repository — I built the React dashboard, the FastAPI analysis services, the agent tooling and fallback, the machine-learning workflow, and the report exports.",
      contributions: [
        "React and TypeScript dashboard built with Vite and Tailwind CSS, covering upload, profiling, analysis, agent, ML, and report screens",
        "FastAPI routes for datasets, analysis, visualisations, the agent, ML training, and reports",
        "pandas, NumPy, and SciPy analysis services plus Plotly chart specifications rendered in the dashboard",
        "Agent tool runner with a fixed allowlist, tool-call limits, and a deterministic offline fallback when no LLM key is configured",
        "scikit-learn training and evaluation comparing baseline, linear or logistic regression, and random-forest models on a held-out split",
        "JSON, CSV, and printable HTML report exports, with Pytest and Vitest tests for backend and frontend logic",
      ],
    },
    stack: [
      { area: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
      { area: "Backend", items: ["Python 3.13", "FastAPI", "Uvicorn"] },
      { area: "Data & ML", items: ["pandas", "NumPy", "SciPy", "scikit-learn"] },
      { area: "Visualisations", items: ["Plotly"] },
      { area: "HTTP", items: ["HTTPX"] },
      { area: "Testing", items: ["Pytest", "Vitest"] },
      { area: "Deployment", items: ["Vercel Services"] },
    ],
    features: [
      {
        title: "Dataset exploration",
        description:
          "CSV upload with a preview and column profiling for data types, missing values, and summary information.",
      },
      {
        title: "Descriptive and group analysis",
        description:
          "Descriptive statistics and group-by aggregation over the uploaded dataset.",
      },
      {
        title: "Interactive visualisations",
        description:
          "Plotly bar, line, scatter, histogram, and box charts generated from the analysed data.",
      },
      {
        title: "Correlations and outliers",
        description:
          "Pearson, Spearman, and Kendall correlations alongside IQR-based outlier detection.",
      },
      {
        title: "AI data agent",
        description:
          "Natural-language questions that call a fixed allowlist of analysis tools, using a configurable LLM provider or a deterministic offline fallback.",
      },
      {
        title: "Machine learning",
        description:
          "Regression and classification training with baseline, linear or logistic regression, and random-forest comparisons on a held-out split.",
      },
      {
        title: "Reports and exports",
        description:
          "JSON, CSV, and printable HTML reports generated from the analyses that were run.",
      },
    ],
    architecture: {
      overview:
        "A React single-page dashboard built with Vite calls a FastAPI service. In production, Vercel Services routes /api/* to the backend and every other path to the static frontend, so requests stay same-origin and no production API URL is needed. The backend's service layer handles profiling, analysis, anomaly detection, Plotly chart specifications, the agent, ML training, and report generation with pandas, NumPy, SciPy, scikit-learn, and Plotly. Uploaded CSVs are processed in memory per request, results live in browser state, and no database or persistence layer exists.",
      diagram: [
        "React + Vite Dashboard",
        "        |",
        "        |  same-origin /api/*",
        "        v",
        "FastAPI Backend",
        "        |---- Dataset Profiling",
        "        |---- Analysis + Anomaly Detection",
        "        |---- Plotly Chart Specifications",
        "        |---- AI Agent (LLM / Offline Fallback)",
        "        |---- scikit-learn Training",
        "        v",
        "In-Memory Data (No Database)",
        "        |",
        "        v",
        "JSON / CSV / HTML Reports",
      ].join("\n"),
      decisions: [
        "React with TypeScript, Vite, and Tailwind CSS for a single-page dashboard that consumes a typed API client",
        "A stateless FastAPI backend: datasets are processed in memory per request and results live in browser state, with no database",
        "Single-origin Vercel Services deployment with /api rewrites, so the frontend needs no production API URL and cross-origin CORS is not required",
        "An agent confined to a fixed tool allowlist with a 6-call, 3-round cap and a deterministic offline fallback when no LLM key is configured",
        "Upload limits of 4 MB and 2000 columns enforced in both the backend and frontend, staying below Vercel's request-body limit",
        "Server-generated Plotly specifications rendered by plotly.js in the dashboard, with Vitest coverage for the API and validation modules",
      ],
    },
    limitations: [
      "No authentication or rate limiting is implemented; the repository states the app is intended for personal or local use and flags unrestricted public access as unsafe",
      "No persistence: uploaded datasets and results are held in memory and are lost on reload; database support is not implemented",
      "The agent only uses a real LLM when LLM_API_KEY is configured; otherwise it relies on the deterministic offline fallback",
      "Machine-learning metrics are computed on a held-out split and are unreliable on small datasets, per the repository",
      "No usage figures, user counts, or performance benchmarks are published",
    ],
    futureWork: [
      "Add authentication and rate limiting before unrestricted public deployment",
      "Add optional persistence for datasets and saved analyses",
      "Expand automated tests across agent and ML edge cases",
      "Document the API with request and response examples",
      "Broaden dataset-size limits with background processing",
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
