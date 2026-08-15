import { useState } from "react";
import styles from "./Planet.module.css";

export default function Planet({
  course,
  onSelect,
  style,
  showOrbit = true,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.wrap}
      style={{
        ...style,
        "--orbit-radius": `${course.orbitRadius}px`,
        "--orbit-speed": `${course.orbitSpeed}s`,
        "--start-angle": `${course.angle}deg`,
      }}
    >
      {showOrbit && <div className={styles.orbit} aria-hidden="true" />}

      <button
        type="button"
        className={`${styles.planet} ${hovered ? styles.hovered : ""}`}
        style={{
          width: course.size,
          height: course.size,
          "--planet-color": course.color,
          "--planet-accent": course.accent,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={(event) => onSelect?.(course, event.currentTarget)}
        aria-label={`Open course ${course.name}`}
      >
        <span className={styles.visual}>
          <span className={styles.surface} aria-hidden="true" />
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.glow} aria-hidden="true" />
        </span>
        <span className={styles.label}>{course.code}</span>
      </button>

      {hovered && (
        <div className={`glass-panel ${styles.tooltip}`} role="tooltip">
          <p className={styles.tooltipTitle}>{course.name}</p>
          <p className={styles.tooltipMeta}>{course.code}</p>
          <p className={styles.tooltipDesc}>{course.description}</p>
          <p className={styles.tooltipHint}>Click to travel</p>
        </div>
      )}
    </div>
  );
}
