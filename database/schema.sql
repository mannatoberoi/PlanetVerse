-- ============================================================
-- PlanetVerse Database Schema
-- DBMS concepts: entities, PKs, FKs, 1:N, M:N, constraints
-- ============================================================

CREATE DATABASE IF NOT EXISTS planetverse
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE planetverse;

-- Drop in reverse dependency order (safe re-run for development)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS submissions;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 1. USERS (explorers / students / admins)
-- ------------------------------------------------------------
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. COURSES (planets in the learning universe)
-- ------------------------------------------------------------
CREATE TABLE courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(120) NOT NULL,
  course_code VARCHAR(30) NOT NULL,
  description TEXT NOT NULL,
  planet_type VARCHAR(50) NOT NULL,
  planet_color VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_courses_code (course_code),
  INDEX idx_courses_name (course_name)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. ASSIGNMENTS (moons) — ONE course → MANY assignments
-- ------------------------------------------------------------
CREATE TABLE assignments (
  assignment_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  deadline DATE NOT NULL,
  status ENUM('pending', 'completed', 'overdue') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_assignments_course
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_assignments_course (course_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. RESOURCES (satellites) — ONE course → MANY resources
-- ------------------------------------------------------------
CREATE TABLE resources (
  resource_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  resource_url VARCHAR(255) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resources_course
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_resources_course (course_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 5. PROJECTS (celestial objects) — ONE course → MANY projects
-- ------------------------------------------------------------
CREATE TABLE projects (
  project_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_course
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_projects_course (course_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 6. ENROLLMENTS — MANY users ↔ MANY courses (junction table)
-- ------------------------------------------------------------
CREATE TABLE enrollments (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_enrollments_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_enrollments_course
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE KEY uq_enrollment_user_course (user_id, course_id),
  INDEX idx_enrollments_course (course_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 7. SUBMISSIONS — assignment work by a user
-- ------------------------------------------------------------
CREATE TABLE submissions (
  submission_id INT AUTO_INCREMENT PRIMARY KEY,
  assignment_id INT NOT NULL,
  user_id INT NOT NULL,
  submission_url VARCHAR(255) NOT NULL,
  status ENUM('submitted', 'graded', 'late') NOT NULL DEFAULT 'submitted',
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_submissions_assignment
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_submissions_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX idx_submissions_assignment (assignment_id),
  INDEX idx_submissions_user (user_id)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 8. ATTENDANCE — presence records per user + course
-- ------------------------------------------------------------
CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL DEFAULT 'present',
  CONSTRAINT fk_attendance_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_attendance_course
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE KEY uq_attendance_day (user_id, course_id, attendance_date),
  INDEX idx_attendance_course (course_id)
) ENGINE=InnoDB;
