-- ============================================================
-- PlanetVerse Seed Data
-- Realistic sample records for viva / demo (not hundreds of rows)
-- Password values are DEMO PLACEHOLDERS only — not production auth.
-- ============================================================

USE planetverse;

-- Clear existing demo data (respect FK order)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE attendance;
TRUNCATE TABLE submissions;
TRUNCATE TABLE enrollments;
TRUNCATE TABLE projects;
TRUNCATE TABLE resources;
TRUNCATE TABLE assignments;
TRUNCATE TABLE courses;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- Users (explorers)
-- password column stores a labeled demo placeholder (no real secrets)
-- ------------------------------------------------------------
INSERT INTO users (name, email, password, role) VALUES
('Nova Explorer', 'nova@planetverse.edu', 'DEMO_ONLY_hash_student1', 'student'),
('Aria Orbit', 'aria@planetverse.edu', 'DEMO_ONLY_hash_student2', 'student'),
('Kai Nebula', 'kai@planetverse.edu', 'DEMO_ONLY_hash_student3', 'student'),
('Admin Stella', 'admin@planetverse.edu', 'DEMO_ONLY_hash_admin', 'admin');

-- ------------------------------------------------------------
-- Courses (planets)
-- ------------------------------------------------------------
INSERT INTO courses (course_name, course_code, description, planet_type, planet_color) VALUES
('Java', 'JAVA-101',
 'Learn object-oriented programming with Java — classes, inheritance, collections, and building solid console and API foundations.',
 'terrestrial', '#f0c75e'),
('DBMS', 'DBMS-201',
 'Understand database management systems: relational models, normalization, indexing, transactions, and designing real schemas.',
 'gas-giant', '#5ad2ff'),
('React', 'REACT-301',
 'Build interactive user interfaces with React components, props, state, hooks, and routing for modern web apps.',
 'ice-world', '#3dffe0'),
('JavaScript', 'JS-220',
 'Master core JavaScript: variables, functions, arrays, objects, events, async/await, and DOM-driven interactivity.',
 'lava-world', '#ff7b9c'),
('Web Development', 'WEB-110',
 'Shape the web with semantic HTML, expressive CSS, responsive layouts, and the fundamentals of front-end architecture.',
 'ringed', '#8b7bff');

-- ------------------------------------------------------------
-- Assignments (moons) — course_id 1..5 in insert order
-- ------------------------------------------------------------
INSERT INTO assignments (course_id, title, description, deadline, status) VALUES
(1, 'OOP Basics Lab', 'Create classes for Student and Course with constructors and methods.', '2026-09-10', 'pending'),
(1, 'Collections Challenge', 'Use ArrayList and HashMap to manage a simple gradebook.', '2026-09-24', 'pending'),
(2, 'ER Diagram Mission', 'Design an ER diagram for a campus library system.', '2026-09-08', 'completed'),
(2, 'Normalize Library Schema', 'Apply 1NF, 2NF, and 3NF to a denormalized dataset.', '2026-09-20', 'pending'),
(2, 'SQL Join Practice', 'Write INNER JOIN and LEFT JOIN queries on sample tables.', '2026-10-02', 'pending'),
(3, 'Component Architecture Sketch', 'Break a landing page into reusable React components.', '2026-09-12', 'completed'),
(3, 'Hooks & State Lab', 'Build a counter and form using useState and useEffect.', '2026-09-26', 'pending'),
(4, 'Array Methods Orbit', 'Solve problems using map, filter, and reduce.', '2026-09-15', 'pending'),
(4, 'Async Mission Control', 'Fetch JSON data with async/await and handle errors.', '2026-09-29', 'pending'),
(5, 'Semantic Landing Page', 'Create a semantic HTML structure for a product page.', '2026-09-05', 'completed'),
(5, 'Responsive Galaxy Layout', 'Use Flexbox and media queries for a responsive layout.', '2026-09-18', 'pending');

-- ------------------------------------------------------------
-- Resources (satellites)
-- ------------------------------------------------------------
INSERT INTO resources (course_id, title, description, resource_url, resource_type) VALUES
(1, 'Java Language Tour', 'Official overview of Java language features.', 'https://docs.oracle.com/en/java/', 'Article'),
(1, 'OOP Crash Notes', 'Short PDF notes on encapsulation and inheritance.', '#', 'PDF'),
(2, 'Relational Algebra Notes', 'Beginner notes connecting algebra to SQL.', '#', 'PDF'),
(2, 'Indexing Walkthrough', 'Video-style outline of B-Tree indexing ideas.', '#', 'Video'),
(2, 'MySQL Cheat Sheet', 'Quick reference for common SQL statements.', '#', 'PDF'),
(3, 'Hooks Field Guide', 'Practical guide to useState, useEffect, and custom hooks.', '#', 'PDF'),
(3, 'React Router Basics', 'How client-side routing maps URLs to pages.', '#', 'Article'),
(4, 'ES Modules Primer', 'Import/export patterns in modern JavaScript.', '#', 'Article'),
(4, 'Array Methods Map', 'Visual map of map/filter/reduce use cases.', '#', 'PDF'),
(5, 'Flex & Grid Atlas', 'Layout patterns for responsive pages.', '#', 'PDF'),
(5, 'Accessibility Checklist', 'Labels, headings, and keyboard basics.', '#', 'Article');

-- ------------------------------------------------------------
-- Projects (celestial objects)
-- ------------------------------------------------------------
INSERT INTO projects (course_id, title, description, difficulty) VALUES
(1, 'Student Registry Console', 'CLI app that stores and lists student records.', 'beginner'),
(1, 'Mini Library API', 'Simple Java service for book checkout logic.', 'intermediate'),
(2, 'Campus Library Schema', 'Design and implement a normalized MySQL schema.', 'intermediate'),
(2, 'Attendance Analytics Pack', 'Write aggregate SQL reports for attendance.', 'advanced'),
(3, 'Mini Learning Dashboard', 'Compose reusable React UI for a student dashboard.', 'intermediate'),
(3, 'Planet Card Gallery', 'Render a list of course cards from API data.', 'beginner'),
(4, 'Interactive Quiz Engine', 'Build quiz logic with vanilla JavaScript patterns.', 'intermediate'),
(5, 'Glass UI Kit', 'Design translucent panels for a space-themed app.', 'beginner'),
(5, 'Responsive Portfolio', 'Personal portfolio with semantic HTML and CSS.', 'beginner');

-- ------------------------------------------------------------
-- Enrollments (MANY-TO-MANY: users ↔ courses)
-- ------------------------------------------------------------
INSERT INTO enrollments (user_id, course_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 2), (2, 3), (2, 5),
(3, 1), (3, 4), (3, 5);

-- ------------------------------------------------------------
-- Submissions
-- ------------------------------------------------------------
INSERT INTO submissions (assignment_id, user_id, submission_url, status) VALUES
(3, 1, 'https://example.edu/submissions/er-diagram-nova', 'graded'),
(6, 1, 'https://example.edu/submissions/react-arch-nova', 'submitted'),
(10, 1, 'https://example.edu/submissions/semantic-nova', 'graded'),
(3, 2, 'https://example.edu/submissions/er-diagram-aria', 'submitted'),
(6, 2, 'https://example.edu/submissions/react-arch-aria', 'graded'),
(1, 3, 'https://example.edu/submissions/oop-kai', 'submitted');

-- ------------------------------------------------------------
-- Attendance
-- ------------------------------------------------------------
INSERT INTO attendance (user_id, course_id, attendance_date, status) VALUES
(1, 2, '2026-08-01', 'present'),
(1, 2, '2026-08-02', 'present'),
(1, 2, '2026-08-03', 'late'),
(1, 3, '2026-08-01', 'present'),
(1, 3, '2026-08-02', 'absent'),
(2, 2, '2026-08-01', 'present'),
(2, 2, '2026-08-02', 'present'),
(2, 3, '2026-08-01', 'late'),
(3, 1, '2026-08-01', 'present'),
(3, 1, '2026-08-02', 'present'),
(3, 4, '2026-08-01', 'absent');
