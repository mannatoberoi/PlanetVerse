-- ============================================================
-- PlanetVerse SQL Practice Queries
-- Beginner-friendly examples for DBMS / SQL viva
-- ============================================================

-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS planetverse
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE planetverse;

-- CREATE TABLE (example — full schema lives in schema.sql)
CREATE TABLE IF NOT EXISTS demo_notes (
  note_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INSERT
INSERT INTO demo_notes (title, body)
VALUES ('Viva Tip', 'Explain PRIMARY KEY and FOREIGN KEY with PlanetVerse tables.');

-- SELECT all courses (planets)
SELECT course_id, course_name, course_code, planet_type, planet_color
FROM courses
ORDER BY course_name;

-- WHERE — find one course by code
SELECT *
FROM courses
WHERE course_code = 'DBMS-201';

-- ORDER BY — newest assignments first
SELECT assignment_id, title, deadline, status
FROM assignments
ORDER BY deadline DESC;

-- UPDATE — mark an assignment completed
UPDATE assignments
SET status = 'completed'
WHERE assignment_id = 4;

-- DELETE — remove a demo note
DELETE FROM demo_notes
WHERE title = 'Viva Tip';

-- INNER JOIN — assignments belonging to each course
SELECT
  c.course_name,
  c.course_code,
  a.title AS assignment_title,
  a.deadline,
  a.status
FROM courses c
INNER JOIN assignments a ON c.course_id = a.course_id
ORDER BY c.course_name, a.deadline;

-- Find assignments belonging to a specific course
SELECT a.assignment_id, a.title, a.description, a.deadline, a.status
FROM assignments a
INNER JOIN courses c ON a.course_id = c.course_id
WHERE c.course_code = 'REACT-301';

-- LEFT JOIN — courses with resources (courses without resources still appear)
SELECT
  c.course_name,
  r.title AS resource_title,
  r.resource_type
FROM courses c
LEFT JOIN resources r ON c.course_id = r.course_id
ORDER BY c.course_name;

-- Display resources for a course
SELECT r.title, r.description, r.resource_type, r.resource_url
FROM resources r
WHERE r.course_id = 2;

-- Display projects for a course
SELECT p.title, p.description, p.difficulty
FROM projects p
WHERE p.course_id = 1
ORDER BY p.difficulty;

-- GROUP BY + COUNT — count assignments for each course
SELECT
  c.course_name,
  COUNT(a.assignment_id) AS assignment_count
FROM courses c
LEFT JOIN assignments a ON c.course_id = a.course_id
GROUP BY c.course_id, c.course_name
ORDER BY assignment_count DESC;

-- COUNT projects per course
SELECT
  c.course_name,
  COUNT(p.project_id) AS project_count
FROM courses c
LEFT JOIN projects p ON c.course_id = p.course_id
GROUP BY c.course_id, c.course_name;

-- MANY-TO-MANY — students enrolled in each course
SELECT
  c.course_name,
  u.name AS student_name,
  u.email,
  e.enrolled_at
FROM enrollments e
INNER JOIN users u ON e.user_id = u.user_id
INNER JOIN courses c ON e.course_id = c.course_id
ORDER BY c.course_name, u.name;

-- Display assignment submissions (JOIN across 3 tables)
SELECT
  u.name AS student_name,
  a.title AS assignment_title,
  c.course_name,
  s.submission_url,
  s.status,
  s.submitted_at
FROM submissions s
INNER JOIN users u ON s.user_id = u.user_id
INNER JOIN assignments a ON s.assignment_id = a.assignment_id
INNER JOIN courses c ON a.course_id = c.course_id
ORDER BY s.submitted_at DESC;

-- Attendance statistics (COUNT + GROUP BY)
SELECT
  c.course_name,
  att.status,
  COUNT(*) AS total_records
FROM attendance att
INNER JOIN courses c ON att.course_id = c.course_id
GROUP BY c.course_id, c.course_name, att.status
ORDER BY c.course_name, att.status;

-- Attendance percentage style summary using conditional aggregation
SELECT
  c.course_name,
  COUNT(*) AS total_days,
  SUM(CASE WHEN att.status = 'present' THEN 1 ELSE 0 END) AS present_days,
  ROUND(
    100 * SUM(CASE WHEN att.status = 'present' THEN 1 ELSE 0 END) / COUNT(*),
    2
  ) AS present_percent
FROM attendance att
INNER JOIN courses c ON att.course_id = c.course_id
GROUP BY c.course_id, c.course_name;

-- AVG example — average number of enrollments per course
SELECT
  AVG(enrollment_count) AS avg_enrollments_per_course
FROM (
  SELECT course_id, COUNT(*) AS enrollment_count
  FROM enrollments
  GROUP BY course_id
) AS course_enrollments;

-- Courses with zero submissions yet (useful LEFT JOIN pattern)
SELECT c.course_name, c.course_code
FROM courses c
LEFT JOIN assignments a ON c.course_id = a.course_id
LEFT JOIN submissions s ON a.assignment_id = s.assignment_id
GROUP BY c.course_id, c.course_name, c.course_code
HAVING COUNT(s.submission_id) = 0;
