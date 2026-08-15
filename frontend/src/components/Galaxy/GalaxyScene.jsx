import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import styles from "./Galaxy.module.css";

function GalaxyDust() {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const count = 1800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = Math.pow(Math.random(), 0.55) * 8;
      const spin = radius * 0.55;
      const branch = ((i % 3) / 3) * Math.PI * 2;
      const angle = branch + spin;
      const spread = (Math.random() - 0.5) * 0.45 * (1 + radius * 0.08);
      arr[i * 3] = Math.cos(angle) * radius + spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.55;
      arr[i * 3 + 2] = Math.sin(angle) * radius + spread;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8ecbff"
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function CoreGlow() {
  const meshRef = useRef(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.05;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.35, 24, 24]} />
      <meshBasicMaterial color="#5ad2ff" transparent opacity={0.35} />
    </mesh>
  );
}

/**
 * Soft 3D galaxy disc behind interactive course planets.
 */
export default function GalaxyScene() {
  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 3.2, 7.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#00000000"]} />
        <ambientLight intensity={0.4} />
        <GalaxyDust />
        <CoreGlow />
      </Canvas>
    </div>
  );
}
