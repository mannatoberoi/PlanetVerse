import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Button from "../../components/Button/Button";
import SpaceBackground from "../../components/SpaceBackground/SpaceBackground";
import { APP_NAME, APP_TAGLINE, ROUTES } from "../../utils/constants";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(`.${styles.brand}`, { opacity: 0, y: 28, duration: 0.9 })
        .from(`.${styles.tagline}`, { opacity: 0, y: 16, duration: 0.6 }, "-=0.45")
        .from(`.${styles.copy}`, { opacity: 0, y: 12, duration: 0.55 }, "-=0.3")
        .from(`.${styles.actions}`, { opacity: 0, y: 10, duration: 0.5 }, "-=0.25")
        .from(`.${styles.planet}`, { opacity: 0, scale: 0.8, duration: 1 }, 0.2);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`app-shell ${styles.landing}`} ref={rootRef}>
      <SpaceBackground intensity="strong" />
      <div className={styles.planet} aria-hidden="true" />
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Interactive Learning Universe</p>
        <h1 className={styles.brand}>{APP_NAME}</h1>
        <p className={styles.tagline}>{APP_TAGLINE}</p>
        <p className={styles.copy}>
          Explore courses as planets. Orbit assignments and resources. Travel through
          a cinematic galaxy built for DBMS, SQL, React, and the web stack.
        </p>
        <div className={styles.actions}>
          <Link to={ROUTES.galaxy}>
            <Button>Enter the Galaxy</Button>
          </Link>
          <Link to={ROUTES.login}>
            <Button variant="secondary">Pilot Login</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
