/**
 * Map MySQL course rows into the shape the Galaxy / Planet UI expects.
 * Orbit layout is computed from index so planets stay evenly spaced.
 */
function darkenHex(hex, amount = 0.35) {
  const clean = String(hex || "#5ad2ff").replace("#", "");
  if (clean.length !== 6) return "#1a4a7a";
  const num = parseInt(clean, 16);
  const r = Math.max(0, ((num >> 16) & 255) * (1 - amount));
  const g = Math.max(0, ((num >> 8) & 255) * (1 - amount));
  const b = Math.max(0, (num & 255) * (1 - amount));
  return `#${[r, g, b]
    .map((value) => Math.round(value).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function mapCourseToPlanet(course, index = 0, total = 5) {
  const count = Math.max(total, 1);
  const angle = (360 / count) * index;
  const baseRadius = 160;
  const radiusStep = 36;

  return {
    id: String(course.course_id),
    courseId: course.course_id,
    name: course.course_name,
    code: course.course_code,
    description: course.description,
    planetType: course.planet_type,
    color: course.planet_color,
    accent: darkenHex(course.planet_color),
    size: 88 + (index % 3) * 10,
    orbitRadius: baseRadius + (index % 4) * radiusStep,
    orbitSpeed: 42 + (index % 5) * 8,
    angle,
    createdAt: course.created_at,
  };
}

export function mapAssignment(row) {
  return {
    id: row.assignment_id,
    assignmentId: row.assignment_id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    dueDate: row.deadline,
    status: row.status,
  };
}

export function mapResource(row) {
  return {
    id: row.resource_id,
    resourceId: row.resource_id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    url: row.resource_url,
    type: row.resource_type,
  };
}

export function mapProject(row) {
  return {
    id: row.project_id,
    projectId: row.project_id,
    courseId: row.course_id,
    title: row.title,
    summary: row.description,
    description: row.description,
    difficulty: row.difficulty,
  };
}
