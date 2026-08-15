import StarField from "../StarField/StarField";
import ShootingStar from "../ShootingStar/ShootingStar";
import { useMouseParallax } from "../../hooks/useMouseParallax";
import styles from "./SpaceBackground.module.css";

/**
 * Shared animated universe backdrop used across pages.
 */
export default function SpaceBackground({ intensity = "normal" }) {
  const parallax = useMouseParallax(intensity === "strong" ? 26 : 14);

  return (
    <div className={styles.root} aria-hidden="true">
      <div
        className={styles.nebula}
        style={{
          transform: `translate3d(${parallax.x * 0.4}px, ${parallax.y * 0.4}px, 0)`,
        }}
      />
      <div
        className={`${styles.nebula} ${styles.nebulaAlt}`}
        style={{
          transform: `translate3d(${parallax.x * -0.25}px, ${parallax.y * -0.25}px, 0)`,
        }}
      />
      <StarField density={intensity === "strong" ? 180 : 130} parallax={parallax} />
      <div
        className={styles.distantPlanet}
        style={{
          transform: `translate3d(${parallax.x * 0.7}px, ${parallax.y * 0.55}px, 0)`,
        }}
      />
      <div
        className={`${styles.distantPlanet} ${styles.distantPlanetTwo}`}
        style={{
          transform: `translate3d(${parallax.x * -0.5}px, ${parallax.y * 0.35}px, 0)`,
        }}
      />
      <div className={styles.particles} />
      <ShootingStar />
      <ShootingStar intervalMs={7800} />
      <div className={styles.vignette} />
    </div>
  );
}
