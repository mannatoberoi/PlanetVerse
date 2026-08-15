import { useEffect, useState } from "react";

/**
 * Soft mouse-based parallax for layered space backgrounds.
 */
export function useMouseParallax(strength = 18) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return offset;
}
