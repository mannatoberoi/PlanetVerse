import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import CoursePanel from "../../components/CoursePanel/CoursePanel";
import Button from "../../components/Button/Button";
import { useCourse } from "../../hooks/useCourses";
import { ROUTES } from "../../utils/constants";
import styles from "./CoursePage.module.css";

export default function CoursePage() {
  const { id } = useParams();
  const { course, loading, error } = useCourse(id);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!course || !panelRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.75,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [course]);

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <Link to={ROUTES.galaxy}>
          <Button variant="secondary">← Back to Galaxy</Button>
        </Link>
      </div>

      {loading && <p className="muted">Arriving at destination…</p>}
      {error && <p className="muted">{error}</p>}
      {!loading && !course && !error && (
        <p className="muted">Course not found in this sector.</p>
      )}
      {course && (
        <div ref={panelRef}>
          <CoursePanel course={course} />
        </div>
      )}
    </section>
  );
}
