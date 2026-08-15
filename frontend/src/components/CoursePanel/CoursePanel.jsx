import AssignmentCard from "../AssignmentCard/AssignmentCard";
import ResourceCard from "../ResourceCard/ResourceCard";
import styles from "./CoursePanel.module.css";

export default function CoursePanel({ course }) {
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
          <div className={styles.progress}>
            <div className={styles.progressMeta}>
              <span>Mission progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className={styles.track}>
              <div
                className={styles.bar}
                style={{
                  width: `${course.progress}%`,
                  background: `linear-gradient(90deg, ${course.color}, ${course.accent})`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="assignments-heading">
        <h2 id="assignments-heading" className="section-title">
          Assignments
        </h2>
        <div className={styles.grid}>
          {course.assignments?.map((item) => (
            <AssignmentCard key={item.id} assignment={item} />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="resources-heading">
        <h2 id="resources-heading" className="section-title">
          Resources
        </h2>
        <div className={styles.grid}>
          {course.resources?.map((item) => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="section-title">
          Projects
        </h2>
        <div className={styles.grid}>
          {course.projects?.map((project) => (
            <article key={project.id} className={`glass-panel ${styles.project}`}>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
