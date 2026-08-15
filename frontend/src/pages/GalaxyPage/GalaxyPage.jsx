import { lazy, Suspense } from "react";
import { useCourses } from "../../hooks/useCourses";
import styles from "./GalaxyPage.module.css";

const Galaxy = lazy(() => import("../../components/Galaxy/Galaxy"));

export default function GalaxyPage() {
  const { courses, loading, error } = useCourses();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Exploration Mode</p>
        <h1 className="section-title">Course Galaxy</h1>
        <p className={styles.lead}>
          Hover a planet for course intel. Click to travel through space into the
          course world.
        </p>
      </header>

      {loading && <p className="muted">Aligning stellar map…</p>}
      {error && <p className="muted">{error}</p>}
      {!loading && !error && (
        <Suspense fallback={<p className="muted">Rendering galaxy field…</p>}>
          <Galaxy courses={courses} />
        </Suspense>
      )}
    </section>
  );
}
