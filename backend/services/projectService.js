import { query } from "../db/pool.js";

export async function findProjectsByCourse(courseId) {
  return query(
    `SELECT project_id, course_id, title, description, difficulty, created_at
     FROM projects
     WHERE course_id = :courseId
     ORDER BY project_id ASC`,
    { courseId }
  );
}

export async function findProjectById(projectId) {
  const rows = await query(
    `SELECT project_id, course_id, title, description, difficulty, created_at
     FROM projects
     WHERE project_id = :projectId`,
    { projectId }
  );
  return rows[0] || null;
}

export async function createProject(courseId, data) {
  const result = await query(
    `INSERT INTO projects (course_id, title, description, difficulty)
     VALUES (:courseId, :title, :description, :difficulty)`,
    {
      courseId,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty || "beginner",
    }
  );
  return findProjectById(result.insertId);
}

export async function deleteProject(projectId) {
  const result = await query(
    `DELETE FROM projects WHERE project_id = :projectId`,
    { projectId }
  );
  return result.affectedRows > 0;
}
