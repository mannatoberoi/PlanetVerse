import { useEffect, useRef } from "react";
import gsap from "gsap";
import { APP_NAME, APP_TAGLINE } from "../../utils/constants";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onComplete }) {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => onComplete?.(),
      });

      tl.from(`.${styles.brand}`, { opacity: 0, y: 18, duration: 0.7 })
        .from(`.${styles.tagline}`, { opacity: 0, y: 10, duration: 0.5 }, "-=0.25")
        .to(progressRef.current, { width: "100%", duration: 1.6, ease: "power1.inOut" }, 0.2)
        .to(
          labelRef.current,
          {
            duration: 1.6,
            ease: "none",
            onUpdate() {
              if (labelRef.current) {
                labelRef.current.textContent = `Calibrating orbit… ${Math.round(this.progress() * 100)}%`;
              }
            },
          },
          0.2
        )
        .to(rootRef.current, { opacity: 0, duration: 0.55, delay: 0.15 });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className={styles.screen} ref={rootRef} role="status" aria-live="polite">
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.brand}>{APP_NAME}</p>
      <p className={styles.tagline}>{APP_TAGLINE}</p>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.bar} ref={progressRef} />
      </div>
      <p className={styles.label} ref={labelRef}>
        Calibrating orbit… 0%
      </p>
    </div>
  );
}
