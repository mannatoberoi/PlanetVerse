# PlanetVerse Database Design

## Purpose

This document explains the MySQL design used by PlanetVerse so you can discuss it clearly in a DBMS / SQL viva.

---

## Entities (tables)

| Table | Real-world meaning | Universe metaphor |
| --- | --- | --- |
| `users` | Students / admins | Explorers |
| `courses` | Subjects | Planets |
| `assignments` | Homework tasks | Moons |
| `resources` | Study materials | Satellites |
| `projects` | Larger practical work | Celestial objects |
| `enrollments` | Student registered in course | Travel permissions |
| `submissions` | Work submitted for an assignment | Mission logs |
| `attendance` | Presence records | Orbit check-ins |

---

## Table details

### 1. users

| Column | Type | Constraints |
| --- | --- | --- |
| `user_id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `name` | VARCHAR(100) | NOT NULL |
| `email` | VARCHAR(150) | NOT NULL, UNIQUE |
| `password` | VARCHAR(255) | NOT NULL (demo placeholder only) |
| `role` | ENUM | `student` / `admin` |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 2. courses

| Column | Type | Constraints |
| --- | --- | --- |
| `course_id` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `course_name` | VARCHAR(120) | NOT NULL |
| `course_code` | VARCHAR(30) | NOT NULL, UNIQUE |
| `description` | TEXT | NOT NULL |
| `planet_type` | VARCHAR(50) | NOT NULL |
| `planet_color` | VARCHAR(20) | NOT NULL |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 3. assignments

| Column | Type | Constraints |
| --- | --- | --- |
| `assignment_id` | INT | PRIMARY KEY |
| `course_id` | INT | FOREIGN KEY → `courses.course_id` |
| `title` | VARCHAR(150) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `deadline` | DATE | NOT NULL |
| `status` | ENUM | pending / completed / overdue |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 4. resources

| Column | Type | Constraints |
| --- | --- | --- |
| `resource_id` | INT | PRIMARY KEY |
| `course_id` | INT | FOREIGN KEY → `courses.course_id` |
| `title` | VARCHAR(150) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `resource_url` | VARCHAR(255) | NOT NULL |
| `resource_type` | VARCHAR(50) | NOT NULL |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 5. projects

| Column | Type | Constraints |
| --- | --- | --- |
| `project_id` | INT | PRIMARY KEY |
| `course_id` | INT | FOREIGN KEY → `courses.course_id` |
| `title` | VARCHAR(150) | NOT NULL |
| `description` | TEXT | NOT NULL |
| `difficulty` | ENUM | beginner / intermediate / advanced |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 6. enrollments (junction table)

| Column | Type | Constraints |
| --- | --- | --- |
| `enrollment_id` | INT | PRIMARY KEY |
| `user_id` | INT | FOREIGN KEY → `users.user_id` |
| `course_id` | INT | FOREIGN KEY → `courses.course_id` |
| `enrolled_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

Unique pair: `(user_id, course_id)` — a student cannot enroll twice in the same course.

### 7. submissions

| Column | Type | Constraints |
| --- | --- | --- |
| `submission_id` | INT | PRIMARY KEY |
| `assignment_id` | INT | FOREIGN KEY → `assignments.assignment_id` |
| `user_id` | INT | FOREIGN KEY → `users.user_id` |
| `submission_url` | VARCHAR(255) | NOT NULL |
| `status` | ENUM | submitted / graded / late |
| `submitted_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### 8. attendance

| Column | Type | Constraints |
| --- | --- | --- |
| `attendance_id` | INT | PRIMARY KEY |
| `user_id` | INT | FOREIGN KEY → `users.user_id` |
| `course_id` | INT | FOREIGN KEY → `courses.course_id` |
| `attendance_date` | DATE | NOT NULL |
| `status` | ENUM | present / absent / late |

Unique day record: `(user_id, course_id, attendance_date)`.

---

## Relationships

### One-to-many

- One **course** has many **assignments**
- One **course** has many **resources**
- One **course** has many **projects**
- One **assignment** has many **submissions**
- One **user** has many **submissions**
- One **user** has many **attendance** rows

### Many-to-many

- Many **users** enroll in many **courses**
- Implemented with the junction table `enrollments`

```text
users 1 ──< enrollments >── 1 courses
```

---

## Primary keys and foreign keys

- Every table has a single-column **PRIMARY KEY**
- Child tables store a **FOREIGN KEY** pointing to the parent
- `ON DELETE CASCADE` keeps the universe clean when a course/user is removed

---

## Normalization (viva talking points)

PlanetVerse follows practical 3NF style design:

1. **1NF** — atomic columns (no repeating assignment lists inside courses)
2. **2NF** — every non-key attribute depends on the whole primary key
3. **3NF** — non-key attributes do not depend on other non-key attributes

Example: assignment titles live in `assignments`, not duplicated inside `courses`.

Enrollment details live in `enrollments`, not as arrays inside `users`.

---

## Important SQL query examples

See `database/queries.sql` for runnable examples of:

- `CREATE DATABASE` / `CREATE TABLE`
- `INSERT`, `SELECT`, `UPDATE`, `DELETE`
- `WHERE`, `ORDER BY`
- `INNER JOIN`, `LEFT JOIN`
- `GROUP BY`, `COUNT`, `SUM`, `AVG`

Useful demo queries:

1. Display all courses
2. Assignments for one course
3. Count assignments per course
4. Students enrolled in each course
5. Resources / projects for a course
6. Assignment submissions with student names
7. Attendance statistics

---

## Seed courses (planets)

| Course | Code | Color idea |
| --- | --- | --- |
| Java | JAVA-101 | Gold |
| DBMS | DBMS-201 | Cyan |
| React | REACT-301 | Teal |
| JavaScript | JS-220 | Rose |
| Web Development | WEB-110 | Violet |
