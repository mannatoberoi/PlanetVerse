import { useEffect, useState } from "react";
import { getUserById } from "../../services/courseService";
import styles from "./ProfilePage.module.css";

const DEMO_USER_ID = 1;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getUserById(DEMO_USER_ID)
      .then((data) => {
        if (active) setUser(data);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load profile");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PV";

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Explorer Profile</p>
        <h1 className="section-title">Pilot Dossier</h1>
        <p className="muted">Loaded from MySQL users + enrollments tables.</p>
      </header>

      {loading && <p className="muted">Loading profile…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {user && (
        <div className={styles.layout}>
          <aside className={`glass-panel ${styles.identity}`}>
            <div className={styles.avatar} aria-hidden="true">
              {initials}
            </div>
            <h2>{user.name}</h2>
            <p className={styles.role}>{user.role}</p>
            <p className={styles.email}>{user.email}</p>
          </aside>

          <div className={styles.main}>
            <div className={styles.stats}>
              <article className={`glass-panel ${styles.stat}`}>
                <p className={styles.statValue}>
                  {user.enrollments?.length || 0}
                </p>
                <p className={styles.statLabel}>Enrolled planets</p>
              </article>
              <article className={`glass-panel ${styles.stat}`}>
                <p className={styles.statValue}>{user.user_id}</p>
                <p className={styles.statLabel}>Explorer ID</p>
              </article>
            </div>

            <section className={`glass-panel ${styles.enrolled}`}>
              <h3>Enrolled planets</h3>
              <ul>
                {(user.enrollments || []).map((item) => (
                  <li key={item.enrollment_id}>
                    <span
                      className={styles.dot}
                      style={{ background: item.planet_color }}
                      aria-hidden="true"
                    />
                    <span>
                      {item.course_name}{" "}
                      <span className={styles.code}>{item.course_code}</span>
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
