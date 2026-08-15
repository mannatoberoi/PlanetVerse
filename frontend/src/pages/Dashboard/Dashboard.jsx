import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import PlanetCard from "../../components/PlanetCard/PlanetCard";
import { useCourses } from "../../hooks/useCourses";
import { ROUTES } from "../../utils/constants";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { courses, loading, error } = useCourses();

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Mission Control</p>
          <h1 className="section-title">Your Learning Dashboard</h1>
          <p className={styles.lead}>
            Course planets loaded live from MySQL — create more in the Galaxy,
            then return here to browse them.
          </p>
        </div>
        <Link to={ROUTES.galaxy}>
          <Button>Open Galaxy</Button>
        </Link>
      </header>

      {loading && <p className="muted">Charting courses…</p>}
      {error && <p className="muted">{error}</p>}

      {!loading && !error && (
        <div className={styles.grid}>
          {courses.map((course) => (
            <PlanetCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
