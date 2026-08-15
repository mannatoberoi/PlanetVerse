import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import styles from "./PlanetCard.module.css";

export default function PlanetCard({ course }) {
  return (
    <article className={`glass-panel ${styles.card}`}>
      <div
        className={styles.orb}
        style={{
          "--planet-color": course.color,
          "--planet-accent": course.accent,
        }}
        aria-hidden="true"
      />
      <div className={styles.body}>
        <p className={styles.code}>{course.code}</p>
        <h3 className={styles.title}>{course.name}</h3>
        <p className={styles.desc}>{course.description}</p>
        <div className={styles.progressBlock}>
          <div className={styles.progressMeta}>
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className={styles.track} aria-hidden="true">
            <div
              className={styles.bar}
              style={{
                width: `${course.progress}%`,
                background: `linear-gradient(90deg, ${course.color}, ${course.accent})`,
              }}
            />
          </div>
        </div>
        <Link className={styles.link} to={ROUTES.course(course.id)}>
          Enter orbit →
        </Link>
      </div>
    </article>
  );
}
