# Sahan Nimnaka — Developer Portfolio

<div align="center">

  **Software Developer | Web & Application Development**

  A personal portfolio showcasing my software development projects, technical skills, academic background, and experience.

  [GitHub Profile](https://github.com/sahan721)

</div>

---

## 🌟 Overview

Welcome to my developer portfolio repository.

This project is a personal portfolio website built to present my development journey, technical capabilities, and software projects in a professional and accessible format.

The portfolio brings together information about my background, skills, education, experience, and projects in one place. It is designed to help recruiters, collaborators, and other developers explore my work and understand the technologies I use.

## ✨ Key Features

### 👨‍💻 About Me
- Personal introduction and developer profile.
- Overview of my development interests and background.
- Central starting point for exploring my work.

### 🛠️ Technical Skills
- Organised presentation of development technologies and tools.
- Technology information associated with featured projects.
- Structured skill sections for easier navigation.

### 🚀 Project Showcase
- Dedicated section for software projects.
- Project cards with descriptions and technology labels.
- Links to relevant GitHub repositories.
- Category-based project filtering.
- Animated project-card interactions.

### 🎓 Education & Experience
- Sections for academic background and qualifications.
- Space to present relevant work and project experience.
- A structured overview of my professional development.

### 📬 Contact
- Contact section for professional enquiries.
- Links to relevant online profiles.

### 🎨 User Interface
- Responsive portfolio layout.
- Animated interface elements using Framer Motion.
- Reusable React components.
- Styling with Tailwind CSS.
- Modern web development architecture using Next.js and TypeScript.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React-based web application framework |
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling and layout |
| Framer Motion | UI animations and transitions |
| ESLint | Code quality and linting, if configured in the project |

## 🏗️ Technical Architecture

### Application Structure

The portfolio uses a component-based frontend architecture. Its page sections and reusable interface components are organised within the application source code.

**Main technologies:**

- **Next.js:** Application structure and routing.
- **React:** Reusable interface components.
- **TypeScript:** Type definitions and maintainable application code.
- **Tailwind CSS:** Styling and responsive layouts.
- **Framer Motion:** Animated interactions and transitions.

### UI Component Organisation

The portfolio separates major content areas into reusable components, helping keep the interface organised and easier to maintain.

The project includes sections for the introduction, skills, projects, experience, education, and contact information.

### Project Presentation Flow

```text
Visitor Opens Portfolio
         |
         v
     Introduction
         |
         v
    Technical Skills
         |
         v
    Project Showcase
         |
         v
 Education & Experience
         |
         v
       Contact
```

This diagram illustrates the portfolio's content flow, rather than an enforced navigation sequence.

## 📁 Project Structure

The repository uses a Next.js application structure with source code, public assets, and project configuration files.

```text
portfolio/
├── public/             # Static assets
├── src/                # Application source code
├── package.json        # Dependencies and scripts
├── package-lock.json   # Dependency lockfile
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

The exact organisation of pages, components, and assets is defined by the current repository structure.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sahan721/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open the local address displayed in the terminal to view the portfolio.

### 4. Build and Verify

```bash
npm run build
npm run typecheck
npm run smoke
```

Run all checks together with:

```bash
npm run verify
```

### 5. Run the Production Build

```bash
npm run start
```

### Site URL for Metadata

Canonical links, Open Graph URLs, the sitemap, and robots.txt are generated from `src/lib/site.ts`:

- `NEXT_PUBLIC_SITE_URL` when set (use the final custom domain),
- otherwise Netlify's automatically provided `URL` environment variable,
- otherwise `http://localhost:3000` for local builds.

No production domain is hardcoded. Set `NEXT_PUBLIC_SITE_URL` in Netlify if the site uses a custom domain.

## Deployment (Netlify)

`netlify.toml` is committed with:

- build command `npm run build`,
- publish directory `.next`,
- the `@netlify/plugin-nextjs` plugin,
- Node 22 plus conservative security and static-asset cache headers.

Steps:

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Netlify reads `netlify.toml`; confirm the build settings above and deploy.
4. Optionally set `NEXT_PUBLIC_SITE_URL` under **Site configuration → Environment variables** to the production URL, then redeploy.
5. Enable Netlify Forms and configure a notification address so the contact form delivers messages.
6. To publish a résumé, add a valid `public/resume.pdf` and set `resumePath` in `src/data/contact.ts`. The committed PDF is damaged, so it is deliberately unlinked.

Deployment has not been performed from this environment. The live URL and any custom domain must be confirmed in Netlify.

## 📱 Responsive Design & User Experience

The portfolio is designed to present project and profile information in a structured, accessible format.

Its frontend implementation includes:

- Responsive page layouts.
- Reusable content components.
- Animated project cards and interface elements.
- Technology labels and project links.
- Project-category filtering.
- Consistent styling through Tailwind CSS.

The behaviour of the deployed site should be verified across desktop and mobile screen sizes.

## 📊 Featured Projects

The portfolio can serve as a central directory for my software development work.

### Air Guard — Air Quality Monitoring & Prediction

An IoT and environmental-data project combining sensor readings, backend services, database storage, and an AI prediction component.

Repository: [Air Guard](https://github.com/sahan721/air_guard)

### MediSync — Hospital Staff Management System

A Laravel-based application focused on hospital staff administration, attendance-related workflows, shift management, and supporting administrative features.

Repository: [MediSync](https://github.com/sahan721/medisync)

### BubbleBlizz — Beverage Ordering Application

A native Android beverage-ordering app built with Kotlin and Jetpack Compose.

Repository: [BubbleBlizz](https://github.com/sahan721/BubbleBlizz-test)

### Neptune — Collection Management Dashboard

A full-stack collection-management system pairing a React admin dashboard with a NestJS, Prisma, and PostgreSQL backend.

Frontend: [Neptune](https://github.com/sahan721/neptune_front_done2)
Backend: [neptune-backend](https://github.com/sahan721/neptune-backend)
Live demo: [neptunefrontdone2.vercel.app](https://neptunefrontdone2.vercel.app)

### Personal AI Data Agent — CSV Analysis & Machine Learning

An AI-assisted data-analysis platform pairing a React and TypeScript dashboard with a Python FastAPI backend for dataset profiling, statistics, Plotly visualisations, anomaly detection, scikit-learn model training, and JSON, CSV, or HTML report exports.

Repository: [Personal AI Data Agent](https://github.com/SahanNimnaka/Personal-AI-Data-Agent)
Live demo: [personal-ai-data-agent.vercel.app](https://personal-ai-data-agent.vercel.app)

*Project descriptions are summaries. Feature completeness and live deployment should be verified before presenting them as fully operational products.*

## 🔧 Development & Maintenance

Potential maintenance activities include:

- Keeping project descriptions and repository links current.
- Updating technology and skill information as projects evolve.
- Verifying navigation and contact links.
- Checking responsive layouts and animations.
- Ensuring downloadable assets, such as a CV, are available.
- Maintaining accurate setup instructions and project documentation.

## 🗺️ Future Improvements

Possible improvements to the portfolio include:

- [ ] Add verified live-demo links for the remaining featured projects.
- [ ] Include screenshots and visual demonstrations of completed work.
- [ ] Add a verified downloadable CV.
- [ ] Improve accessibility and keyboard navigation.
- [ ] Add project-specific technical case studies.
- [ ] Document deployment and build configuration.
- [ ] Add performance and accessibility checks.
- [ ] Keep project status and implementation claims up to date.

These are potential improvements, not claims that the features are already implemented.

## 🤝 Contributing

This repository primarily represents my personal portfolio. Suggestions and feedback that improve the presentation, usability, accessibility, or code quality are welcome.

## 📜 License

No specific licence has been confirmed for this repository. Check the repository's existing licence before reusing or distributing its source code.

## 📬 Contact & Links

- **Developer:** Sahan Nimnaka
- **GitHub:** [@sahan721](https://github.com/sahan721)
- **Portfolio repository:** [github.com/sahan721/Portfolio](https://github.com/sahan721/Portfolio)

---

<div align="center">

  **Sahan Nimnaka — Developer Portfolio**

  *Showcasing projects, skills, and continuous growth in software development.*

</div>
