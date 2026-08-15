import { query } from "../db/pool.js";

export async function findAssignmentsByCourse(courseId) {
  return query(
    `SELECT assignment_id, course_id, title, description, deadline, status, created_at
     FROM assignments
     WHERE course_id = :courseId
     ORDER BY deadline ASC`,
    { courseId }
  );
}

export async function findAssignmentById(assignmentId) {
  const rows = await query(
    `SELECT assignment_id, course_id, title, description, deadline, status, created_at
     FROM assignments
     WHERE assignment_id = :assignmentId`,
    { assignmentId }
  );
  return rows[0] || null;
}

export async function createAssignment(courseId, data) {
  const result = await query(
    `INSERT INTO assignments (course_id, title, description, deadline, status)
     VALUES (:courseId, :title, :description, :deadline, :status)`,
    {
      courseId,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      status: data.status || "pending",
    }
  );
  return findAssignmentById(result.insertId);
}

export async function updateAssignment(assignmentId, data) {
  await query(
    `UPDATE assignments
     SET title = :title,
         description = :description,
         deadline = :deadline,
         status = :status
     WHERE assignment_id = :assignmentId`,
    {
      assignmentId,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      status: data.status || "pending",
    }
  );
  return findAssignmentById(assignmentId);
}

export async function deleteAssignment(assignmentId) {
  const result = await query(
    `DELETE FROM assignments WHERE assignment_id = :assignmentId`,
    { assignmentId }
  );
  return result.affectedRows > 0;
}
