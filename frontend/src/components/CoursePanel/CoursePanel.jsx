import AssignmentCard from "../AssignmentCard/AssignmentCard";
import ResourceCard from "../ResourceCard/ResourceCard";
import Button from "../Button/Button";
import styles from "./CoursePanel.module.css";

export default function CoursePanel({
  course,
  assignments = [],
  resources = [],
  projects = [],
  onDeleteAssignment,
  onDeleteResource,
  onDeleteProject,
}) {
  if (!course) return null;

  return (
    <div className={styles.panel}>
      <header className={`glass-panel ${styles.hero}`}>
        <div
          className={styles.planet}
          style={{
            "--planet-color": course.color,
            "--planet-accent": course.accent,
          }}
          aria-hidden="true"
        />
        <div>
          <p className={styles.code}>{course.code}</p>
          <h1 className={styles.title}>{course.name}</h1>
          <p className={styles.desc}>{course.description}</p>
          <p className={styles.meta}>
            Planet type: {course.planetType || "unknown"} · Data from MySQL
          </p>
          <div className={styles.orbitHint} aria-hidden="true">
            <span>🪐 Course</span>
            <span>🌙 Assignments</span>
            <span>🛰️ Resources</span>
            <span>🚀 Projects</span>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="assignments-heading">
        <h2 id="assignments-heading" className="section-title">
          🌙 Assignments
        </h2>
        <div className={styles.grid}>
          {assignments.length === 0 && (
            <p className="muted">No assignment moons yet.</p>
          )}
          {assignments.map((item) => (
            <div key={item.id} className={styles.item}>
              <AssignmentCard assignment={item} />
              {onDeleteAssignment && (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => onDeleteAssignment(item.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="resources-heading">
        <h2 id="resources-heading" className="section-title">
          🛰️ Resources
        </h2>
        <div className={styles.grid}>
          {resources.length === 0 && (
            <p className="muted">No resource satellites yet.</p>
          )}
          {resources.map((item) => (
            <div key={item.id} className={styles.item}>
              <ResourceCard resource={item} />
              {onDeleteResource && (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => onDeleteResource(item.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="section-title">
          🚀 Projects
        </h2>
        <div className={styles.grid}>
          {projects.length === 0 && (
            <p className="muted">No project objects yet.</p>
          )}
          {projects.map((project) => (
            <article key={project.id} className={`glass-panel ${styles.project}`}>
              <h3>{project.title}</h3>
              <p>{project.summary || project.description}</p>
              {project.difficulty && (
                <p className={styles.difficulty}>{project.difficulty}</p>
              )}
              {onDeleteProject && (
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => onDeleteProject(project.id)}
                >
                  Delete
                </Button>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
