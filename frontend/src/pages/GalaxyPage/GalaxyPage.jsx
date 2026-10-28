import Toast from "../../components/Toast/Toast";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import {
  useMemo,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Tabs from "../../components/Tabs/Tabs";
import { useCourses } from "../../hooks/useCourses";
import { createCourse } from "../../services/courseService";
import { ROUTES } from "../../utils/constants";
import styles from "./GalaxyPage.module.css";

const Galaxy = lazy(() => import("../../components/Galaxy/Galaxy"));
const PAGE_SIZE = 8;

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
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");
  const [currentPage, setCurrentPage] = useState(1);
  const [planetTypeFilter, setPlanetTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [highlightedId, setHighlightedId] = useState(null);

  const [form, setForm] = useState(emptyCourseForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "explore", label: "Explore Galaxy" },
    { id: "create", label: "Create Planet" },
  ];

  // Reset pagination when search, filter, or sorting changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, planetTypeFilter, sortBy]);

  // Search, filter and sort courses.
  const filteredCourses = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();

    const result = courses.filter((course) => {
      const name = String(course.name ?? "").toLowerCase();
      const code = String(course.code ?? "").toLowerCase();

      const type = String(
        course.planetType ?? course.planet_type ?? ""
      ).toLowerCase();

      const matchesSearch =
        !query || name.includes(query) || code.includes(query);

      const matchesType =
        planetTypeFilter === "all" ||
        type === planetTypeFilter.toLowerCase();

      return matchesSearch && matchesType;
    });

    return result.sort((a, b) => {
      if (sortBy === "name-desc") {
        return String(b.name ?? "").localeCompare(
          String(a.name ?? "")
        );
      }

      if (sortBy === "code-asc") {
        return String(a.code ?? "").localeCompare(
          String(b.code ?? "")
        );
      }

      if (sortBy === "code-desc") {
        return String(b.code ?? "").localeCompare(
          String(a.code ?? "")
        );
      }

      return String(a.name ?? "").localeCompare(
        String(b.name ?? "")
      );
    });
  }, [courses, debouncedSearchQuery, planetTypeFilter, sortBy]);

  // Get available planet types for the filter.
  const planetTypes = useMemo(() => {
    return [
      ...new Set(
        courses
          .map((course) => course.planetType ?? course.planet_type)
          .filter(Boolean)
          .map((type) => String(type).toLowerCase())
      ),
    ].sort();
  }, [courses]);

  // Pagination calculations.
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setHighlightedId(null);
  };

  const handleSelectResult = (course) => {
    setHighlightedId(course.id);
    setSearchQuery(course.name ?? "");
  };

  const handleOpenResult = (course) => {
    navigate(ROUTES.course(course.id));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    setFormError("");

    const courseName = form.course_name.trim();
    const courseCode = form.course_code.trim();
    const description = form.description.trim();

    if (!courseName || !courseCode || !description) {
      setFormError(
        "Please enter a course name, course code and description."
      );
      return;
    }

    if (!/^[a-zA-Z0-9-]+$/.test(courseCode)) {
      setFormError(
        "Course code can contain only letters, numbers and hyphens."
      );
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      await createCourse({
        ...form,
        course_name: courseName,
        course_code: courseCode,
        description,
        planet_type: form.planet_type.trim(),
      });

      await refresh();

      setForm(emptyCourseForm);
      setSearchQuery("");
      setPlanetTypeFilter("all");
      setSortBy("name-asc");
      setHighlightedId(null);
      setCurrentPage(1);

      setToast({
        type: "success",
        message: "Course planet created successfully!",
      });

      setActiveTab("explore");
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Could not create course.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.page}>
      <Toast toast={toast} setToast={setToast} />

      <header className={styles.header}>
        <p className={styles.eyebrow}>Exploration Mode</p>

        <h1 className="section-title">Course Galaxy</h1>

        <p className={styles.lead}>
          Explore course planets loaded from MySQL. Search, filter,
          sort and select a planet to learn more.
        </p>
      </header>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Explore Galaxy tab */}
      {activeTab === "explore" && (
        <>
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

            <label>
              <span className="sr-only">Filter by planet type</span>

              <select
                value={planetTypeFilter}
                onChange={(event) => {
                  setPlanetTypeFilter(event.target.value);
                  setHighlightedId(null);
                }}
              >
                <option value="all">All planet types</option>

                {planetTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Sort courses</span>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="name-asc">Name: A–Z</option>
                <option value="name-desc">Name: Z–A</option>
                <option value="code-asc">Code: A–Z</option>
                <option value="code-desc">Code: Z–A</option>
              </select>
            </label>
          </div>

          {!loading && !error && (
            <p className="muted" aria-live="polite">
              Showing{" "}
              {filteredCourses.length === 0
                ? 0
                : (currentPage - 1) * PAGE_SIZE + 1}
              –
              {Math.min(
                currentPage * PAGE_SIZE,
                filteredCourses.length
              )}{" "}
              of {filteredCourses.length} matching course planets.
            </p>
          )}

          {paginatedCourses.length > 0 && (
            <ul
              className={`glass-panel ${styles.results}`}
              role="list"
            >
              {paginatedCourses.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectResult(course)}
                    aria-pressed={highlightedId === course.id}
                  >
                    <span
                      className={styles.swatch}
                      style={{
                        background: course.color || "#5ad2ff",
                      }}
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

          {/* Pagination */}
          {filteredCourses.length > PAGE_SIZE && (
            <nav
              className={styles.pagination}
              aria-label="Course pages"
            >
              <button
                type="button"
                className={styles.pageButton}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span className={styles.pageInfo} aria-live="polite">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                className={styles.pageButton}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}

          {!loading &&
            !error &&
            debouncedSearchQuery.trim() !== "" &&
            filteredCourses.length === 0 && (
              <p className="muted" role="status">
                No planets match your search and selected filter.
                Try another query.
              </p>
            )}

          {loading && (
            <p className="muted" role="status">
              Aligning stellar map…
            </p>
          )}

          {error && (
            <p className={styles.error} role="alert">
              Could not load planets from the API. Is the backend running?
              ({error})
            </p>
          )}

          {!loading && !error && (
            <Suspense
              fallback={
                <p className="muted">Rendering galaxy field…</p>
              }
            >
              <Galaxy
                courses={paginatedCourses}
                searchQuery={debouncedSearchQuery}
                highlightedId={highlightedId}
              />
            </Suspense>
          )}
        </>
      )}

      {/* Create Planet tab */}
      {activeTab === "create" && (
        <section
          className={`glass-panel ${styles.createPanel}`}
          aria-labelledby="create-course-heading"
        >
          <h2 id="create-course-heading">Create Course Planet</h2>

          <p className={styles.createLead}>
            React form → Express API → MySQL → refreshed galaxy.
          </p>

          <form className={styles.form} onSubmit={handleCreateCourse}>
            <label>
              <span>Course name</span>

              <input
                name="course_name"
                value={form.course_name}
                onChange={handleFormChange}
                placeholder="e.g. Python"
                required
                maxLength={100}
              />
            </label>

            <label>
              <span>Course code</span>

              <input
                name="course_code"
                value={form.course_code}
                onChange={handleFormChange}
                placeholder="e.g. PY-101"
                required
                maxLength={30}
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
                required
                maxLength={1000}
              />
            </label>

            <label>
              <span>Planet type</span>

              <select
                name="planet_type"
                value={form.planet_type}
                onChange={handleFormChange}
                required
              >
                <option value="terrestrial">Terrestrial</option>
                <option value="gas-giant">Gas giant</option>
                <option value="ice-giant">Ice giant</option>
                <option value="dwarf">Dwarf planet</option>
              </select>
            </label>

            <label>
              <span>Planet color</span>

              <input
                type="color"
                name="planet_color"
                value={form.planet_color}
                onChange={handleFormChange}
                required
              />
            </label>

            {formError && (
              <p className={styles.error} role="alert">
                {formError}
              </p>
            )}

            <div className={styles.formActions}>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving to MySQL…" : "Create Planet"}
              </Button>
            </div>
          </form>
        </section>
      )}
    </section>
  );
}