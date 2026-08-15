import { apiDelete, apiGet, apiPost, apiPut } from "./api";
import {
  mapAssignment,
  mapCourseToPlanet,
  mapProject,
  mapResource,
} from "../utils/mapCourse";

/**
 * Course service — talks to Express → MySQL.
 * No mock course arrays. Planets come from the database.
 */

export async function getCourses() {
  const response = await apiGet("/courses");
  const rows = response.data || [];
  return rows.map((row, index) => mapCourseToPlanet(row, index, rows.length));
}

export async function getCourseById(id) {
  const response = await apiGet(`/courses/${id}`);
  const row = response.data;
  if (!row) return null;
  return mapCourseToPlanet(row, 0, 1);
}

export async function createCourse(payload) {
  const response = await apiPost("/courses", payload);
  return mapCourseToPlanet(response.data, 0, 1);
}

export async function updateCourse(id, payload) {
  const response = await apiPut(`/courses/${id}`, payload);
  return mapCourseToPlanet(response.data, 0, 1);
}

export async function deleteCourse(id) {
  return apiDelete(`/courses/${id}`);
}

export async function getAssignments(courseId) {
  const response = await apiGet(`/courses/${courseId}/assignments`);
  return (response.data || []).map(mapAssignment);
}

export async function createAssignment(courseId, payload) {
  const response = await apiPost(`/courses/${courseId}/assignments`, payload);
  return mapAssignment(response.data);
}

export async function updateAssignment(id, payload) {
  const response = await apiPut(`/assignments/${id}`, payload);
  return mapAssignment(response.data);
}

export async function deleteAssignment(id) {
  return apiDelete(`/assignments/${id}`);
}

export async function getResources(courseId) {
  const response = await apiGet(`/courses/${courseId}/resources`);
  return (response.data || []).map(mapResource);
}

export async function createResource(courseId, payload) {
  const response = await apiPost(`/courses/${courseId}/resources`, payload);
  return mapResource(response.data);
}

export async function deleteResource(id) {
  return apiDelete(`/resources/${id}`);
}

export async function getProjects(courseId) {
  const response = await apiGet(`/courses/${courseId}/projects`);
  return (response.data || []).map(mapProject);
}

export async function createProject(courseId, payload) {
  const response = await apiPost(`/courses/${courseId}/projects`, payload);
  return mapProject(response.data);
}

export async function deleteProject(id) {
  return apiDelete(`/projects/${id}`);
}

export async function getUserById(id) {
  const response = await apiGet(`/users/${id}`);
  return response.data;
}
