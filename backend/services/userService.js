import { query } from "../db/pool.js";

export async function findUserById(userId) {
  const rows = await query(
    `SELECT user_id, name, email, role, created_at
     FROM users
     WHERE user_id = :userId`,
    { userId }
  );
  return rows[0] || null;
}

export async function findEnrollmentsForUser(userId) {
  return query(
    `SELECT e.enrollment_id, e.course_id, e.enrolled_at,
            c.course_name, c.course_code, c.planet_color
     FROM enrollments e
     INNER JOIN courses c ON e.course_id = c.course_id
     WHERE e.user_id = :userId
     ORDER BY c.course_name`,
    { userId }
  );
}
