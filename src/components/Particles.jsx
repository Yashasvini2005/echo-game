import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Particles({ trigger, color, origin }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const ps = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 14) * Math.PI * 2 + Math.random() * 0.5,
      speed: 1.2 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), 900);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 20 }}>
      {particles.map(p => (
        <motion.div key={p.id}
          initial={{ x: origin.x, y: origin.y, opacity: 1, scale: 1 }}
          animate={{ x: origin.x + Math.cos(p.angle) * p.speed * 50, y: origin.y + Math.sin(p.angle) * p.speed * 50 + 30, opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: color, top: 0, left: 0 }}
        />
      ))}
    </div>
  );
}
