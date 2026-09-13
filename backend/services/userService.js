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

/**
 * Used only for demo login — returns password so the controller can compare.
 * The password is never sent back to the client in the API response.
 */
export async function findUserByEmailWithPassword(email) {
  const rows = await query(
    `SELECT user_id, name, email, password, role, created_at
     FROM users
     WHERE email = :email`,
    { email }
  );
  return rows[0] || null;
}

export async function findEnrollmentsForUser(userId) {
  return query(
    `SELECT e.enrollment_id, e.course_id, e.enrolled_at,
            c.course_name, c.course_code, c.description,
            c.planet_type, c.planet_color
     FROM enrollments e
     INNER JOIN courses c ON e.course_id = c.course_id
     WHERE e.user_id = :userId
     ORDER BY c.course_name`,
    { userId }
  );
}
