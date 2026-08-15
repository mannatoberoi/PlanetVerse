import { useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import Planet from "../Planet/Planet";
import GalaxyScene from "./GalaxyScene";
import { ROUTES } from "../../utils/constants";
import styles from "./Galaxy.module.css";

export default function Galaxy({
  courses = [],
  searchQuery = "",
  highlightedId = null,
}) {
  const stageRef = useRef(null);
  const flashRef = useRef(null);
  const navigate = useNavigate();
  const travelingRef = useRef(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const handleSelect = (course, planetEl) => {
    if (travelingRef.current) return;
    travelingRef.current = true;

    const stage = stageRef.current;
    const flash = flashRef.current;
    if (!stage || !planetEl) {
      navigate(ROUTES.course(course.id));
      return;
    }

    const rect = planetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const tl = gsap.timeline({
      onComplete: () => navigate(ROUTES.course(course.id)),
    });

    tl.to(stage, {
      scale: 2.4,
      x: window.innerWidth / 2 - cx,
      y: window.innerHeight / 2 - cy,
      duration: 1.15,
      ease: "power3.inOut",
    })
      .to(
        flash,
        {
          opacity: 1,
          duration: 0.45,
          ease: "power2.in",
        },
        "-=0.35"
      )
      .to(stage, { opacity: 0.15, duration: 0.25 }, "-=0.2");
  };

  return (
    <section className={styles.galaxy} aria-label="Course galaxy">
      <GalaxyScene />
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.core} aria-hidden="true">
          <span className={styles.corePulse} />
          <span className={styles.coreLabel}>Knowledge Core</span>
        </div>
        {courses.map((course) => {
          const matches =
            !normalizedQuery ||
            course.name.toLowerCase().includes(normalizedQuery) ||
            course.code.toLowerCase().includes(normalizedQuery);

          const isHighlighted =
            highlightedId != null && String(highlightedId) === String(course.id);

          let matchState = "neutral";
          if (normalizedQuery) {
            matchState = matches ? "match" : "dim";
          }
          if (isHighlighted) matchState = "match";

          return (
            <Planet
              key={course.id}
              course={course}
              onSelect={handleSelect}
              matchState={matchState}
            />
          );
        })}
      </div>
      <div className={styles.travelFlash} ref={flashRef} aria-hidden="true" />
    </section>
  );
}
