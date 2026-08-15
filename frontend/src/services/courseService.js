import { mockCourses } from "../data/mockCourses";
import { mockUser } from "../data/mockUser";

/**
 * Course service — currently returns mock data.
 * Swap the internals to apiGet('/courses') later without changing pages.
 */
const USE_MOCK = true;

export async function getCourses() {
  if (USE_MOCK) {
    return Promise.resolve([...mockCourses]);
  }
  // Future: return apiGet('/courses');
  return [];
}

export async function getCourseById(id) {
  if (USE_MOCK) {
    const course = mockCourses.find((item) => item.id === id);
    return Promise.resolve(course || null);
  }
  // Future: return apiGet(`/courses/${id}`);
  return null;
}

export async function getCurrentUser() {
  if (USE_MOCK) {
    return Promise.resolve({ ...mockUser });
  }
  // Future: return apiGet('/users/me');
  return null;
}
