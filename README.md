# PlanetVerse

## Where Knowledge Comes Alive.

PlanetVerse is an interactive learning universe for a college project that demonstrates **DBMS**, **SQL**, **React**, **HTML**, **CSS**, and **JavaScript**.

Courses appear as planets. Assignments, resources, and projects orbit those courses. The universe is powered by a real **MySQL** database through an **Express** API — not fake database logic.

---

## Problem statement

Learning portals often feel static, and student projects rarely connect a creative frontend to a real relational database. PlanetVerse solves both problems by:

1. Teaching modern web UI with React, HTML, CSS, and JavaScript
2. Demonstrating relational database design with MySQL
3. Showing a clear React → Express → SQL → MySQL data path

---

## Objectives

- Represent courses as interactive planets loaded from MySQL
- Demonstrate one-to-many and many-to-many relationships
- Provide real CRUD through REST APIs
- Keep a cinematic space-themed UI (GSAP + React Three Fiber)
- Stay beginner-friendly for classroom / viva explanation

---

## Features

- Animated landing page and space background
- Galaxy view with planets generated from `GET /api/courses`
- Course search (highlight / dim planets)
- Course detail page with assignments, resources, and projects from MySQL
- Real CREATE / UPDATE / DELETE for courses and related records
- Login form with JavaScript validation (email + required fields)
- Profile page loaded from the users + enrollments tables
- SQL schema, seed data, and practice queries for DBMS viva

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React (JavaScript) + Vite |
| Styling | CSS + CSS Modules |
| Animation | GSAP |
| 3D accent | Three.js + React Three Fiber |
| Routing | React Router |
| Backend | Node.js + Express |
| Database | MySQL |
| SQL access | mysql2 (parameterized queries) |

---

## Project structure

```text
PlanetVerse/
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── queries.sql
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env.example
├── frontend/
│   └── src/
├── DATABASE_DESIGN.md
├── PROJECT_ARCHITECTURE.md
└── README.md
```

---

## Architecture

```text
React UI
   ↓ fetch /api/...
JavaScript API service layer
   ↓ HTTP
Express routes + controllers
   ↓ parameterized SQL
MySQL (planetverse)
   ↓ rows
Express JSON response
   ↓
React state
   ↓
PlanetVerse planets / panels
```

---

## Database overview

Tables:

- `users`
- `courses`
- `assignments`
- `resources`
- `projects`
- `enrollments` (users ↔ courses)
- `submissions`
- `attendance`

Relationships:

- ONE course → MANY assignments / resources / projects
- MANY users ↔ MANY courses through `enrollments`

See [DATABASE_DESIGN.md](./DATABASE_DESIGN.md) for full details.

---

## Installation

### Requirements

- Node.js 18+
- npm
- MySQL 8+ (or 9.x)

---

## MySQL setup

1. Start MySQL on your machine.
2. Create / load the schema and seed data:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

3. (Optional) Practice queries:

```bash
mysql -u root -p planetverse < database/queries.sql
```

---

## Backend setup

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=planetverse
```

Then:

```bash
npm install
npm run dev
```

API health check: http://localhost:5001/api/health

---

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL (usually http://localhost:5173).

In development, Vite proxies `/api` → `http://localhost:5001`.

Optional frontend env:

```bash
cp .env.example .env
```

```env
VITE_API_URL=/api
```

---

## Environment variables

### backend/.env

| Variable | Purpose |
| --- | --- |
| `PORT` | Express port (default 5001) |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name (`planetverse`) |

### frontend/.env

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | API base path (default `/api`) |

Never commit real `.env` files. Use `.env.example` only.

---

## How to run (both servers)

Terminal 1 — MySQL must already be running.

Terminal 2:

```bash
cd backend
npm run dev
```

Terminal 3:

```bash
cd frontend
npm run dev
```

Then open the frontend URL and visit **Galaxy**.

---

## Screenshots

Add screenshots here for your report / viva:

1. Landing page
2. Galaxy with MySQL planets
3. Course detail (assignments / resources / projects)
4. Create course form
5. Search highlight

---

## Future improvements

- Real authentication with hashed passwords
- Role-based access (student / admin)
- Attendance and submission UI pages
- Advanced cinematic transitions
- Deployment (cloud MySQL + hosted API)

---

## Documentation

- [DATABASE_DESIGN.md](./DATABASE_DESIGN.md)
- [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md)
