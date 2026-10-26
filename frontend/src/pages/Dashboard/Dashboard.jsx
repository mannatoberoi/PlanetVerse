
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import PlanetCard from "../../components/PlanetCard/PlanetCard";
import { useCourses } from "../../hooks/useCourses";
import { ROUTES } from "../../utils/constants";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { courses, loading, error, refresh } = useCourses();

  async function handleRetry() {
    try {
      await refresh();
    } catch {
      // The hook stores the error for the UI to display.
    }
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Mission Control</p>
          <h1 className="section-title">Your Learning Dashboard</h1>
          <p className={styles.lead}>
            Your course planets are loaded from MySQL. Visit the Galaxy
            to explore and create courses.
          </p>
        </div>

        <Link to={ROUTES.galaxy}>
          <Button>Open Galaxy</Button>
        </Link>
      </header>

      {loading && (
        <p className="muted" role="status">
          Charting courses…
        </p>
      )}

      {!loading && error && (
        <div role="alert">
          <p className="muted">
            Could not load your courses: {error}
          </p>
          <Button onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="glass-panel">
          <h2>No course planets yet</h2>
          <p>
            Your galaxy is waiting! Visit the Galaxy to create your
            first course planet.
          </p>
          <Link to={ROUTES.galaxy}>
            <Button>Explore Galaxy</Button>
          </Link>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className={styles.grid}>
          {courses.map((course) => (
            <PlanetCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
