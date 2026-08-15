import { useMemo, useState } from "react";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useCourses } from "../../hooks/useCourses";
import { createCourse } from "../../services/courseService";
import { ROUTES } from "../../utils/constants";
import styles from "./GalaxyPage.module.css";

const Galaxy = lazy(() => import("../../components/Galaxy/Galaxy"));

const emptyCourseForm = {
  course_name: "",
  course_code: "",
  description: "",
  planet_type: "terrestrial",
  planet_color: "#5ad2ff",
};

export default function GalaxyPage() {
  const navigate = useNavigate();
  const { courses, loading, error, refresh } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [form, setForm] = useState(emptyCourseForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q)
    );
  }, [courses, searchQuery]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setHighlightedId(null);
  };

  const handleSelectResult = (course) => {
    setHighlightedId(course.id);
    setSearchQuery(course.name);
  };

  const handleOpenResult = (course) => {
    navigate(ROUTES.course(course.id));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    setFormError("");
    setStatusMessage("");

    if (
      !form.course_name.trim() ||
      !form.course_code.trim() ||
      !form.description.trim() ||
      !form.planet_type.trim() ||
      !form.planet_color.trim()
    ) {
      setFormError("Please fill in every field before creating a planet.");
      return;
    }

    setSaving(true);
    try {
      await createCourse(form);
      await refresh();
      setForm(emptyCourseForm);
      setStatusMessage("New course planet created in MySQL and added to the galaxy.");
    } catch (err) {
      setFormError(err.message || "Could not create course");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Exploration Mode</p>
        <h1 className="section-title">Course Galaxy</h1>
        <p className={styles.lead}>
          Planets are loaded from MySQL through the Express API. Hover for intel,
          search to highlight, click to travel.
        </p>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span className="sr-only">Search courses</span>
          <input
            type="search"
            placeholder="Search planets (Java, DBMS, React…)"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </label>

        {matches.length > 0 && (
          <ul className={`glass-panel ${styles.results}`} role="listbox">
            {matches.map((course) => (
              <li key={course.id}>
                <button
                  type="button"
                  onClick={() => handleSelectResult(course)}
                  onDoubleClick={() => handleOpenResult(course)}
                >
                  <span
                    className={styles.swatch}
                    style={{ background: course.color }}
                    aria-hidden="true"
                  />
                  {course.name} <em>{course.code}</em>
                </button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => handleOpenResult(course)}
                >
                  Open
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="muted">Aligning stellar map…</p>}
      {error && (
        <p className={styles.error}>
          Could not load planets from the API. Is the backend running? ({error})
        </p>
      )}

      {!loading && !error && (
        <Suspense fallback={<p className="muted">Rendering galaxy field…</p>}>
          <Galaxy
            courses={courses}
            searchQuery={searchQuery}
            highlightedId={highlightedId}
          />
        </Suspense>
      )}

      <section className={`glass-panel ${styles.createPanel}`} aria-labelledby="create-course-heading">
        <h2 id="create-course-heading">Create Course Planet</h2>
        <p className={styles.createLead}>
          React form → POST /api/courses → SQL INSERT → MySQL → new planet appears.
        </p>

        <form className={styles.form} onSubmit={handleCreateCourse}>
          <label>
            <span>Course name</span>
            <input
              name="course_name"
              value={form.course_name}
              onChange={handleFormChange}
              placeholder="e.g. Python"
            />
          </label>
          <label>
            <span>Course code</span>
            <input
              name="course_code"
              value={form.course_code}
              onChange={handleFormChange}
              placeholder="e.g. PY-101"
            />
          </label>
          <label className={styles.full}>
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={3}
              placeholder="What will explorers learn?"
            />
          </label>
          <label>
            <span>Planet type</span>
            <input
              name="planet_type"
              value={form.planet_type}
              onChange={handleFormChange}
              placeholder="terrestrial"
            />
          </label>
          <label>
            <span>Planet color</span>
            <input
              type="color"
              name="planet_color"
              value={form.planet_color}
              onChange={handleFormChange}
            />
          </label>

          {formError && <p className={styles.error}>{formError}</p>}
          {statusMessage && <p className={styles.success}>{statusMessage}</p>}

          <div className={styles.formActions}>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving to MySQL…" : "Create Planet"}
            </Button>
          </div>
        </form>
      </section>
    </section>
  );
}
