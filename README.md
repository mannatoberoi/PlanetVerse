# PlanetVerse

**Where Knowledge Comes Alive.**

PlanetVerse is an interactive learning universe for a college project that demonstrates **DBMS**, **SQL**, **React**, **HTML**, **CSS**, and **JavaScript**. Courses appear as planets in a futuristic animated galaxy. Assignments, resources, and projects orbit those courses — and later, all important content will come from a MySQL database.

---

## Problem statement

Traditional learning portals feel static and disconnected from the subjects they teach. Students studying databases and modern web development need a project that:

1. Clearly shows HTML structure, CSS styling, and JavaScript/React logic
2. Is designed from day one for a future MySQL-backed backend
3. Feels creative and memorable — not like a generic admin dashboard

PlanetVerse solves this by turning the learning system itself into an explorable universe.

---

## Objectives

- Build a cinematic, animated frontend prototype of a learning platform
- Represent courses as interactive planets with hover and click transitions
- Organize the codebase so mock data can later be swapped for API/SQL data
- Practice semantic HTML (via JSX), modular CSS, and React component design
- Keep the stack beginner-friendly: JavaScript only (no TypeScript)

---

## Current features (Phase 1 — Frontend prototype)

- Cinematic GSAP loading screen
- Animated space background (stars, particles, nebula, shooting stars, parallax)
- Landing, Login, Dashboard, Galaxy, Course, and Profile pages
- React Router navigation
- Interactive course planets with glow/hover tooltips
- GSAP “travel through space” transition into a course
- React Three Fiber soft 3D galaxy dust behind the interactive map
- Glassmorphism UI with futuristic typography
- Service layer ready for future Express/MySQL integration
- Temporary mock course/user data only (no backend yet)

---

## Technology stack

| Layer | Technology |
| --- | --- |
| UI | React (JavaScript) + Vite |
| Markup | Semantic HTML via JSX |
| Styling | CSS + CSS Modules |
| Animation | GSAP |
| 3D (galaxy accent) | Three.js + React Three Fiber |
| Routing | React Router |
| Future backend | Express + MySQL (folder reserved) |

---

## Project structure

```text
PlanetVerse/
├── backend/                 # Future Express + SQL API (not implemented yet)
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx          # Routes + boot loading screen
│       ├── main.jsx
│       ├── assets/
│       ├── components/      # Reusable UI & universe pieces
│       ├── data/            # Temporary mock data
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/        # Data access (mock now → API later)
│       ├── styles/
│       └── utils/
├── .gitignore
└── README.md
```

---

## How to run the frontend

### Requirements

- Node.js 18+ recommended
- npm

### Commands

```bash
cd frontend
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build    # production build
npm run preview  # preview the production build
```

---

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing |
| `/login` | Login (UI only) |
| `/dashboard` | Dashboard |
| `/galaxy` | Interactive galaxy |
| `/course/:id` | Course detail |
| `/profile` | Profile |

---

## What’s next (not in this phase)

- Express API in `backend/`
- MySQL schema for users, courses, assignments, resources, projects
- Real authentication
- Replace mock data in `courseService.js` with API calls

---

## Authors

Built as a college project demonstrating DBMS, SQL, React, HTML, CSS, and JavaScript.
