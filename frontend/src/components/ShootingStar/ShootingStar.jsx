import { useEffect, useState } from "react";
import styles from "./ShootingStar.module.css";

function makeStar() {
  return {
    id: `${Date.now()}-${Math.random()}`,
    top: `${8 + Math.random() * 45}%`,
    left: `${10 + Math.random() * 70}%`,
    delay: 0,
    duration: 1.1 + Math.random() * 0.7,
  };
}

export default function ShootingStar({ intervalMs = 5200 }) {
  const [star, setStar] = useState(null);

  useEffect(() => {
    let timeoutId;

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        setStar(makeStar());
        timeoutId = window.setTimeout(() => setStar(null), 1600);
        schedule();
      }, intervalMs + Math.random() * 2500);
    };

    schedule();
    return () => window.clearTimeout(timeoutId);
  }, [intervalMs]);

  if (!star) return null;

  return (
    <span
      className={styles.shoot}
      style={{
        top: star.top,
        left: star.left,
        animationDuration: `${star.duration}s`,
      }}
      aria-hidden="true"
    />
  );
}
