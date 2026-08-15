import { useEffect, useRef } from "react";
import styles from "./StarField.module.css";

/**
 * Canvas star field with slow drift — performant ambient motion.
 */
export default function StarField({ density = 140, parallax = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const parallaxRef = useRef(parallax);

  useEffect(() => {
    parallaxRef.current = parallax;
  }, [parallax]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let stars = [];
    let animationId = 0;
    let width = 0;
    let height = 0;

    const createStars = () => {
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.15 + 0.02,
        depth: Math.random() * 0.8 + 0.2,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      for (const star of stars) {
        star.twinkle += 0.02;
        star.y += star.speed * star.depth;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }

        const alpha = star.a * (0.65 + Math.sin(star.twinkle + time * 0.001) * 0.35);
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 235, 255, ${alpha})`;
        ctx.arc(
          star.x + px * star.depth,
          star.y + py * star.depth,
          star.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
