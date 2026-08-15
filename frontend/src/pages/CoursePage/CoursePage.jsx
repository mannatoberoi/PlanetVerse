import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import CoursePanel from "../../components/CoursePanel/CoursePanel";
import Button from "../../components/Button/Button";
import { useCourse } from "../../hooks/useCourses";
import {
  createAssignment,
  createProject,
  createResource,
  deleteAssignment,
  deleteCourse,
  deleteProject,
  deleteResource,
  updateCourse,
} from "../../services/courseService";
import { ROUTES } from "../../utils/constants";
import styles from "./CoursePage.module.css";

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useCourse(id);
  const panelRef = useRef(null);

  const [editForm, setEditForm] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState(false);

  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "pending",
  });
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    resource_url: "#",
    resource_type: "PDF",
  });
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
  });

  useEffect(() => {
    if (!course) return;
    setEditForm({
      course_name: course.name,
      course_code: course.code,
      description: course.description,
      planet_type: course.planetType || "terrestrial",
      planet_color: course.color,
    });
  }, [course]);

  useEffect(() => {
    if (!course || !panelRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.75,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [course]);

  const clearAlerts = () => {
    setMessage("");
    setActionError("");
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCourse = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      await updateCourse(id, editForm);
      await refresh();
      setMessage("Course updated in MySQL.");
    } catch (err) {
      setActionError(err.message || "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteCourse = async () => {
    clearAlerts();
    const confirmed = window.confirm(
      "Delete this course planet from MySQL? Related moons and satellites will also be removed."
    );
    if (!confirmed) return;

    setBusy(true);
    try {
      await deleteCourse(id);
      navigate(ROUTES.galaxy);
    } catch (err) {
      setActionError(err.message || "Delete failed");
      setBusy(false);
    }
  };

  const handleCreateAssignment = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      const created = await createAssignment(id, assignmentForm);
      setAssignments((prev) => [...prev, created]);
      setAssignmentForm({
        title: "",
        description: "",
        deadline: "",
        status: "pending",
      });
      setMessage("Assignment moon saved to MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not create assignment");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    clearAlerts();
    setBusy(true);
    try {
      await deleteAssignment(assignmentId);
      setAssignments((prev) => prev.filter((item) => item.id !== assignmentId));
      setMessage("Assignment deleted from MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not delete assignment");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateResource = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      const created = await createResource(id, resourceForm);
      setResources((prev) => [...prev, created]);
      setResourceForm({
        title: "",
        description: "",
        resource_url: "#",
        resource_type: "PDF",
      });
      setMessage("Resource satellite saved to MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not create resource");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    clearAlerts();
    setBusy(true);
    try {
      await deleteResource(resourceId);
      setResources((prev) => prev.filter((item) => item.id !== resourceId));
      setMessage("Resource deleted from MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not delete resource");
    } finally {
      setBusy(false);
    }
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    clearAlerts();
    setBusy(true);
    try {
      const created = await createProject(id, projectForm);
      setProjects((prev) => [...prev, created]);
      setProjectForm({
        title: "",
        description: "",
        difficulty: "beginner",
      });
      setMessage("Project object saved to MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not create project");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    clearAlerts();
    setBusy(true);
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((item) => item.id !== projectId));
      setMessage("Project deleted from MySQL.");
    } catch (err) {
      setActionError(err.message || "Could not delete project");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <Link to={ROUTES.galaxy}>
          <Button variant="secondary">← Back to Galaxy</Button>
        </Link>
      </div>

      {loading && <p className="muted">Arriving at destination…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !course && !error && (
        <p className="muted">Course not found in this sector.</p>
      )}

      {course && (
        <div ref={panelRef}>
          <CoursePanel
            course={course}
            assignments={assignments}
            resources={resources}
            projects={projects}
            onDeleteAssignment={handleDeleteAssignment}
            onDeleteResource={handleDeleteResource}
            onDeleteProject={handleDeleteProject}
          />

          {(message || actionError) && (
            <p className={actionError ? styles.error : styles.success}>
              {actionError || message}
            </p>
          )}

          {editForm && (
            <section className={`glass-panel ${styles.manage}`} aria-labelledby="manage-course">
              <h2 id="manage-course">Manage Course Planet</h2>
              <form className={styles.form} onSubmit={handleUpdateCourse}>
                <label>
                  <span>Name</span>
                  <input
                    name="course_name"
                    value={editForm.course_name}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  <span>Code</span>
                  <input
                    name="course_code"
                    value={editForm.course_code}
                    onChange={handleEditChange}
                  />
                </label>
                <label className={styles.full}>
                  <span>Description</span>
                  <textarea
                    name="description"
                    rows={3}
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  <span>Planet type</span>
                  <input
                    name="planet_type"
                    value={editForm.planet_type}
                    onChange={handleEditChange}
                  />
                </label>
                <label>
                  <span>Color</span>
                  <input
                    type="color"
                    name="planet_color"
                    value={editForm.planet_color}
                    onChange={handleEditChange}
                  />
                </label>
                <div className={styles.actions}>
                  <Button type="submit" disabled={busy}>
                    {busy ? "Saving…" : "Update Course"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={busy}
                    onClick={handleDeleteCourse}
                  >
                    Delete Course
                  </Button>
                </div>
              </form>
            </section>
          )}

          <section className={`glass-panel ${styles.manage}`}>
            <h2>Add Assignment Moon</h2>
            <form className={styles.form} onSubmit={handleCreateAssignment}>
              <label>
                <span>Title</span>
                <input
                  value={assignmentForm.title}
                  onChange={(e) =>
                    setAssignmentForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                <span>Deadline</span>
                <input
                  type="date"
                  value={assignmentForm.deadline}
                  onChange={(e) =>
                    setAssignmentForm((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className={styles.full}>
                <span>Description</span>
                <textarea
                  rows={2}
                  value={assignmentForm.description}
                  onChange={(e) =>
                    setAssignmentForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <div className={styles.actions}>
                <Button type="submit" disabled={busy}>
                  Add Assignment
                </Button>
              </div>
            </form>
          </section>

          <section className={`glass-panel ${styles.manage}`}>
            <h2>Add Resource Satellite</h2>
            <form className={styles.form} onSubmit={handleCreateResource}>
              <label>
                <span>Title</span>
                <input
                  value={resourceForm.title}
                  onChange={(e) =>
                    setResourceForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                <span>Type</span>
                <input
                  value={resourceForm.resource_type}
                  onChange={(e) =>
                    setResourceForm((prev) => ({
                      ...prev,
                      resource_type: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className={styles.full}>
                <span>Description</span>
                <textarea
                  rows={2}
                  value={resourceForm.description}
                  onChange={(e) =>
                    setResourceForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className={styles.full}>
                <span>URL</span>
                <input
                  value={resourceForm.resource_url}
                  onChange={(e) =>
                    setResourceForm((prev) => ({
                      ...prev,
                      resource_url: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <div className={styles.actions}>
                <Button type="submit" disabled={busy}>
                  Add Resource
                </Button>
              </div>
            </form>
          </section>

          <section className={`glass-panel ${styles.manage}`}>
            <h2>Add Project Object</h2>
            <form className={styles.form} onSubmit={handleCreateProject}>
              <label>
                <span>Title</span>
                <input
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                <span>Difficulty</span>
                <select
                  value={projectForm.difficulty}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      difficulty: e.target.value,
                    }))
                  }
                >
                  <option value="beginner">beginner</option>
                  <option value="intermediate">intermediate</option>
                  <option value="advanced">advanced</option>
                </select>
              </label>
              <label className={styles.full}>
                <span>Description</span>
                <textarea
                  rows={2}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <div className={styles.actions}>
                <Button type="submit" disabled={busy}>
                  Add Project
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
