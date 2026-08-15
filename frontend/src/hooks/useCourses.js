import { useEffect, useState } from "react";
import { getCourseById, getCourses } from "../services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { courses, loading, error };
}

export function useCourse(id) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getCourseById(id)
      .then((data) => {
        if (active) setCourse(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load course");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return { course, loading, error };
}
