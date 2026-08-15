# PlanetVerse Project Architecture

## High-level flow

```text
React (PlanetVerse UI)
        ↓
JavaScript API layer (fetch)
        ↓
Express REST API
        ↓
Parameterized SQL (mysql2)
        ↓
MySQL database (planetverse)
        ↓
Express JSON response
        ↓
React state (useState / useEffect)
        ↓
UI updates (planets, cards, forms)
```

---

## Why this architecture?

It mirrors a real full-stack app while staying easy to explain:

1. **React** handles the interactive universe UI
2. **Express** exposes clean REST endpoints
3. **MySQL** stores lasting course / learner data
4. The frontend never talks to MySQL directly

---

## Frontend layer

Location: `frontend/src`

### Responsibilities

- Render pages and reusable components
- Call `/api/...` through `services/`
- Map database rows into planet-friendly objects
- Keep GSAP / Three.js visuals intact

### Important files

| File | Role |
| --- | --- |
| `services/api.js` | Shared fetch helper (GET/POST/PUT/DELETE) |
| `services/courseService.js` | Course / assignment / resource / project API calls |
| `utils/mapCourse.js` | Converts MySQL rows → planet UI shape |
| `hooks/useCourses.js` | Loads and refreshes API data |
| `pages/GalaxyPage` | Search + create course + galaxy |
| `pages/CoursePage` | Course details + CRUD forms |
| `pages/LoginPage` | Client-side validation |
| `pages/ProfilePage` | User + enrollments from MySQL |

### Example: loading planets

```text
GalaxyPage
  → useCourses()
  → getCourses()
  → apiGet('/courses')
  → Express GET /api/courses
  → SELECT * FROM courses
  → mapCourseToPlanet()
  → <Galaxy courses={...} />
  → <Planet /> for each course
```

---

## Backend layer

Location: `backend`

```text
server.js
  → routes/
  → controllers/
  → services/
  → db/pool.js (MySQL)
```

### Responsibilities

- Accept HTTP requests
- Validate required fields
- Run parameterized SQL
- Return JSON `{ success, data }`

### Example: create course

```text
React form submit
  → POST /api/courses
  → courseController.createCourse
  → courseService.createCourse
  → INSERT INTO courses (...)
  → SELECT new row
  → JSON response
  → React refresh()
  → new planet appears
```

---

## Database layer

Location: `database/`

| File | Purpose |
| --- | --- |
| `schema.sql` | CREATE DATABASE + CREATE TABLE + constraints |
| `seed.sql` | Sample users, courses, relations |
| `queries.sql` | Practice SQL for viva |

---

## CRUD map

| Action | React | API | SQL |
| --- | --- | --- | --- |
| Create course | Galaxy form | `POST /api/courses` | `INSERT` |
| Read courses | Galaxy / Dashboard | `GET /api/courses` | `SELECT` |
| Read one course | Course page | `GET /api/courses/:id` | `SELECT` |
| Update course | Course manage form | `PUT /api/courses/:id` | `UPDATE` |
| Delete course | Course delete button | `DELETE /api/courses/:id` | `DELETE` |
| Assignments | Course page | `/api/courses/:id/assignments` | CRUD SQL |
| Resources | Course page | `/api/courses/:id/resources` | CRUD SQL |
| Projects | Course page | `/api/courses/:id/projects` | CRUD SQL |

Important rule for this phase:

> UI success messages appear **only after** the API/database operation succeeds.

---

## Security notes (beginner-safe)

- Database credentials live in `backend/.env` (ignored by git)
- SQL uses named placeholders (`:courseId`) to reduce injection risk
- Login currently validates input in React only (no password auth yet)
- Seed passwords are clearly marked as demo placeholders

---

## Local development wiring

1. MySQL stores data
2. Express listens on `http://localhost:5001`
3. Vite frontend runs on `http://localhost:5173`
4. Vite proxies `/api` → Express so the browser can call `/api/courses` safely

---

## Syllabus mapping

| Subject | Where it appears |
| --- | --- |
| HTML | Semantic JSX (`section`, `form`, `label`, `nav`) |
| CSS | Glass panels, responsive grids, hover/glow |
| JavaScript | fetch, async/await, validation, array methods |
| React | components, props, state, hooks, routing |
| DBMS | entities, keys, relationships, normalization |
| SQL | SELECT/INSERT/UPDATE/DELETE + JOIN/GROUP BY |
