import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALS, ENDS } from "../data/storyData";
import { BeamsBg } from "../components/backgrounds/BeamsBg";

export function Ending({ law, good, onRestart }) {
  const al = ALS.find(a => a.f(Math.sign(law), Math.sign(good))) || ALS[4];
  const e = ENDS[al.n] || { t: "Unknown.", d: "You were something new." };
  const [hoveredAl, setHoveredAl] = useState(null);

  return (
    <motion.div key="ending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px", textAlign: "center" }}>
      <BeamsBg />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 20%,rgba(4,7,12,0.85) 100%)", zIndex: 1, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "5px", color: "#2a3a4a" }}>
          YOUR ALIGNMENT
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 700, fontStyle: "italic", color: al.c, marginTop: 12, lineHeight: 1.2, textShadow: `0 0 30px ${al.c}44` }}>
          {e.t}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          style={{ fontFamily: "var(--serif)", fontSize: 14, color: "#3a5060", marginTop: 14, maxWidth: 380, lineHeight: 1.8, fontStyle: "italic" }}>
          {e.d}
        </motion.div>

        {/* 3x3 alignment grid */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, marginTop: 26, width: 192, position: "relative" }}>
          {ALS.map((a, i) => (
            <motion.div key={a.n}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 + i * 0.05, duration: 0.35 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              onHoverStart={() => setHoveredAl(a.n)} onHoverEnd={() => setHoveredAl(null)}
              style={{ height: 44, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "1px", cursor: "default", position: "relative",
                background: a.n === al.n ? a.c + "22" : "rgba(8,12,18,0.88)",
                border: `1px solid ${a.n === al.n ? a.c + "55" : "rgba(255,255,255,0.05)"}`,
                color: a.n === al.n ? a.c : "#1a2838",
                boxShadow: a.n === al.n ? `0 0 12px ${a.c}33` : "none",
              }}>
              {a.abbr}
              <AnimatePresence>
                {hoveredAl === a.n && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
                    style={{ position: "absolute", bottom: "calc(100% + 7px)", left: "50%", transform: "translateX(-50%)", background: "#0a1018", border: `1px solid ${a.c}33`, borderRadius: 4, padding: "5px 10px", fontFamily: "var(--mono)", fontSize: 9, whiteSpace: "nowrap", letterSpacing: "1px", color: a.c, zIndex: 20, pointerEvents: "none" }}>
                    {a.n}
                    <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", border: "4px solid transparent", borderTopColor: "#0a1018" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          whileHover={{ borderColor: "var(--accent)", color: "var(--accent)", letterSpacing: "5px" }}
          onClick={onRestart}
          style={{ marginTop: 26, background: "transparent", border: "1px solid #1a2a38", color: "#3a5060", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "4px", padding: "12px 36px", cursor: "pointer", borderRadius: 2, transition: "all 0.3s" }}>
          play again
        </motion.button>
      </div>
    </motion.div>
  );
}
