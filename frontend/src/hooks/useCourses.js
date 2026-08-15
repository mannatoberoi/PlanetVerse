import { useCallback, useEffect, useState } from "react";
import {
  getAssignments,
  getCourseById,
  getCourses,
  getProjects,
  getResources,
} from "../services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      setCourses(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to load courses");
      setCourses([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getCourses()
      .then((data) => {
        if (active) setCourses(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load courses");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { courses, setCourses, loading, error, refresh };
}

export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [courseData, assignmentData, resourceData, projectData] =
        await Promise.all([
          getCourseById(id),
          getAssignments(id),
          getResources(id),
          getProjects(id),
        ]);

      setCourse(courseData);
      setAssignments(assignmentData);
      setResources(resourceData);
      setProjects(projectData);
    } catch (err) {
      setError(err.message || "Failed to load course");
      setCourse(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [courseData, assignmentData, resourceData, projectData] =
          await Promise.all([
            getCourseById(id),
            getAssignments(id),
            getResources(id),
            getProjects(id),
          ]);

        if (!active) return;
        setCourse(courseData);
        setAssignments(assignmentData);
        setResources(resourceData);
        setProjects(projectData);
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load course");
          setCourse(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  return {
    course,
    assignments,
    resources,
    projects,
    setAssignments,
    setResources,
    setProjects,
    loading,
    error,
    refresh,
  };
}
