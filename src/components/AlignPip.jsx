import { motion } from "framer-motion";
import { ALS } from "../data/storyData";

export function AlignPip({ law, good }) {
  const al = ALS.find(a => a.f(Math.sign(law), Math.sign(good))) || ALS[4];
  const lN = Math.max(-1, Math.min(1, law / 5));
  const gN = Math.max(-1, Math.min(1, good / 5));
  const dotL = `${50 + lN * 32}%`;
  const dotT = `${50 - gN * 32}%`;

  const quadIdx = law > 0 && good > 0 ? 0 : law <= 0 && good > 0 ? 1 : law > 0 && good <= 0 ? 2 : 3;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
      <div style={{ position: "relative", width: 26, height: 26 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2, width: "100%", height: "100%" }}>
          {[0, 1, 2, 3].map(i => (
            <motion.div key={i} style={{ borderRadius: 1 }} animate={{ background: i === quadIdx ? al.c + "30" : "#0d1520" }} transition={{ duration: 0.7 }} />
          ))}
        </div>
        <motion.div
          style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", transform: "translate(-50%,-50%)" }}
          animate={{ left: dotL, top: dotT, background: al.c, boxShadow: `0 0 8px ${al.c}88` }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <motion.span
        key={al.n}
        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "2px", color: al.c + "bb", textTransform: "lowercase" }}
      >
        {al.n}
      </motion.span>
    </div>
  );
}
