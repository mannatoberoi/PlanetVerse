import { query } from "../db/pool.js";

export async function findAllCourses() {
  return query(
    `SELECT course_id, course_name, course_code, description,
            planet_type, planet_color, created_at
     FROM courses
     ORDER BY course_id ASC`
  );
}

export async function findCourseById(courseId) {
  const rows = await query(
    `SELECT course_id, course_name, course_code, description,
            planet_type, planet_color, created_at
     FROM courses
     WHERE course_id = :courseId`,
    { courseId }
  );
  return rows[0] || null;
}

export async function createCourse(data) {
  const result = await query(
    `INSERT INTO courses (course_name, course_code, description, planet_type, planet_color)
     VALUES (:course_name, :course_code, :description, :planet_type, :planet_color)`,
    data
  );
  return findCourseById(result.insertId);
}

export async function updateCourse(courseId, data) {
  await query(
    `UPDATE courses
     SET course_name = :course_name,
         course_code = :course_code,
         description = :description,
         planet_type = :planet_type,
         planet_color = :planet_color
     WHERE course_id = :courseId`,
    { ...data, courseId }
  );
  return findCourseById(courseId);
}

export async function deleteCourse(courseId) {
  const result = await query(
    `DELETE FROM courses WHERE course_id = :courseId`,
    { courseId }
  );
  return result.affectedRows > 0;
}
