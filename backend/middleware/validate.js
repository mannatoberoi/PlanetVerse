/**
 * Lightweight request validators for beginner-friendly input checks.
 */

export function requireFields(body, fields) {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length > 0) {
    const error = new Error(`Missing required fields: ${missing.join(", ")}`);
    error.status = 400;
    error.details = { missing };
    throw error;
  }
}

export function parseId(value, label = "id") {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    const error = new Error(`Invalid ${label}`);
    error.status = 400;
    throw error;
  }
  return id;
}
