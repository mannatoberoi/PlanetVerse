import { query } from "../db/pool.js";

export async function findResourcesByCourse(courseId) {
  return query(
    `SELECT resource_id, course_id, title, description, resource_url, resource_type, created_at
     FROM resources
     WHERE course_id = :courseId
     ORDER BY resource_id ASC`,
    { courseId }
  );
}

export async function findResourceById(resourceId) {
  const rows = await query(
    `SELECT resource_id, course_id, title, description, resource_url, resource_type, created_at
     FROM resources
     WHERE resource_id = :resourceId`,
    { resourceId }
  );
  return rows[0] || null;
}

export async function createResource(courseId, data) {
  const result = await query(
    `INSERT INTO resources (course_id, title, description, resource_url, resource_type)
     VALUES (:courseId, :title, :description, :resource_url, :resource_type)`,
    {
      courseId,
      title: data.title,
      description: data.description,
      resource_url: data.resource_url,
      resource_type: data.resource_type,
    }
  );
  return findResourceById(result.insertId);
}

export async function deleteResource(resourceId) {
  const result = await query(
    `DELETE FROM resources WHERE resource_id = :resourceId`,
    { resourceId }
  );
  return result.affectedRows > 0;
}
