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
        <p className={styles.type}>{course.planetType}</p>
        <Link className={styles.link} to={ROUTES.course(course.id)}>
          Enter orbit →
        </Link>
      </div>
    </article>
  );
}
