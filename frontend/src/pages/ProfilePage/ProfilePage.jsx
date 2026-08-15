import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/courseService";
import { useCourses } from "../../hooks/useCourses";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { courses } = useCourses();

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const enrolled = courses.filter((course) =>
    user?.enrolledCourseIds?.includes(course.id)
  );

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Explorer Profile</p>
        <h1 className="section-title">Pilot Dossier</h1>
      </header>

      {!user ? (
        <p className="muted">Loading profile…</p>
      ) : (
        <div className={styles.layout}>
          <aside className={`glass-panel ${styles.identity}`}>
            <div className={styles.avatar} aria-hidden="true">
              {user.avatarInitials}
            </div>
            <h2>{user.name}</h2>
            <p className={styles.role}>{user.role}</p>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.bio}>{user.bio}</p>
          </aside>

          <div className={styles.main}>
            <div className={styles.stats}>
              <article className={`glass-panel ${styles.stat}`}>
                <p className={styles.statValue}>{user.stats.courses}</p>
                <p className={styles.statLabel}>Courses</p>
              </article>
              <article className={`glass-panel ${styles.stat}`}>
                <p className={styles.statValue}>
                  {user.stats.completedAssignments}
                </p>
                <p className={styles.statLabel}>Completed</p>
              </article>
              <article className={`glass-panel ${styles.stat}`}>
                <p className={styles.statValue}>{user.stats.streakDays}</p>
                <p className={styles.statLabel}>Day streak</p>
              </article>
            </div>

            <section className={`glass-panel ${styles.enrolled}`}>
              <h3>Enrolled planets</h3>
              <ul>
                {enrolled.map((course) => (
                  <li key={course.id}>
                    <span
                      className={styles.dot}
                      style={{ background: course.color }}
                      aria-hidden="true"
                    />
                    <span>
                      {course.name}{" "}
                      <span className={styles.code}>{course.code}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </section>
  );
}
