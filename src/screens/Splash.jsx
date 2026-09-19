import { motion } from "framer-motion";

export function Splash({ onStart }) {
  return (
    <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 32px", gap: 0 }}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
        style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "5px", color: "#2a3a4a" }}>
        NEW SEOUL · 2047
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -28, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.6, duration: 1, ease: [0.2, 1, 0.3, 1] }}
        style={{ fontSize: 62, fontWeight: 700, color: "#fff", letterSpacing: 3, marginTop: 14, fontFamily: "var(--serif)", fontStyle: "italic", textShadow: "0 0 60px rgba(200,169,110,0.18)" }}>
        Echo
      </motion.div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
        style={{ width: 36, height: 1, background: "#2a3a4a", margin: "22px auto" }} />
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
        style={{ fontSize: 15, color: "#3a5060", fontStyle: "italic", lineHeight: 1.7, maxWidth: 320, fontFamily: "var(--serif)" }}>
        A synthetic on the run. Seven chapters.<br />No right answers.
      </motion.p>
      <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}
        whileHover={{ borderColor: "#c8a96e", color: "#c8a96e", letterSpacing: "6px" }}
        onClick={onStart}
        style={{ marginTop: 36, background: "transparent", border: "1px solid #2a3a50", color: "#4a6a80", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "4px", padding: "13px 44px", cursor: "pointer", borderRadius: 2, transition: "all 0.3s" }}>
        START
      </motion.button>
    </motion.div>
  );
}
