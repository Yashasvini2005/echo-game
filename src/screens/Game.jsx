import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALS, STORY } from "../data/storyData";
import { BG_MAP } from "../components/backgrounds";
import { useTypewriter } from "../hooks/useTypewriter";
import { AlignPip } from "../components/AlignPip";
import { Particles } from "../components/Particles";
import { FireBg } from "../components/backgrounds/FireBg";

export function Game({ onEnd }) {
  const [ci, setCi] = useState(0);
  const [law, setLaw] = useState(0);
  const [good, setGood] = useState(0);
  const [picked, setPicked] = useState(null);
  const [reaction, setReaction] = useState("");
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [particleOrigin, setParticleOrigin] = useState({ x: 300, y: 400 });
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [bgKey, setBgKey] = useState(STORY[0].bg);
  const [active, setActive] = useState(true);
  const choiceRefs = useRef([]);

  const chapter = STORY[ci];
  const { displayed, done, skip } = useTypewriter(chapter.ps, active);
  const al = ALS.find(a => a.f(Math.sign(law), Math.sign(good))) || ALS[4];

  useEffect(() => { if (done) setChoicesVisible(true); }, [done]);

  const handleAdvance = useCallback(() => {
    const next = ci + 1;
    if (next >= STORY.length) { onEnd(law, good); return; }
    setActive(false);
    setPicked(null); setReaction(""); setChoicesVisible(false);
    setTimeout(() => {
      setCi(next);
      setBgKey(STORY[next].bg);
      setActive(true);
    }, 400);
  }, [ci, law, good, onEnd]);

  // Clicking a choice selects it and shows its reaction + alignment shift.
  // Clicking a different choice while one is already selected switches the
  // selection (reverting the previous choice's alignment shift first).
  // Clicking the currently-selected choice again confirms and advances.
  const handlePick = useCallback((i, e) => {
    if (picked === i) {
      handleAdvance();
      return;
    }
    const c = chapter.cs[i];
    if (picked !== null) {
      const prev = chapter.cs[picked];
      if (prev.al.l) setLaw(l => l - prev.al.l);
      if (prev.al.g) setGood(g => g - prev.al.g);
    }
    setPicked(i);
    setReaction(c.rx);
    if (c.al.l) setLaw(l => l + c.al.l);
    if (c.al.g) setGood(g => g + c.al.g);
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.closest("#game-root").getBoundingClientRect();
    setParticleOrigin({ x: rect.left - parent.left + rect.width / 2, y: rect.top - parent.top + rect.height / 2 });
    setParticleTrigger(t => t + 1);
  }, [picked, chapter, handleAdvance]);

  // Click anywhere on the screen while the text is still typing to reveal
  // the rest of the current chapter's paragraphs immediately.
  const handleScreenClick = useCallback(() => {
    if (!done) skip();
  }, [done, skip]);

  const BgComponent = BG_MAP[bgKey] || FireBg;

  return (
    <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      id="game-root" onClick={handleScreenClick}
      style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", zIndex: 2, cursor: done ? "default" : "pointer" }}>

      <AnimatePresence mode="wait">
        <motion.div key={bgKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <BgComponent />
        </motion.div>
      </AnimatePresence>

      <Particles trigger={particleTrigger} color={al.c} origin={particleOrigin} />

      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center,transparent 35%,rgba(4,7,12,0.75) 100%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom,rgba(4,7,12,0.7),transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top,rgba(4,7,12,0.97) 50%,transparent)" }} />

      {/* HUD */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ position: "relative", zIndex: 2, padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div key={chapter.loc} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.35 }}
            style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "3px", color: "#1e2e3a", textTransform: "uppercase" }}>
            {chapter.loc}
          </motion.div>
        </AnimatePresence>
        <AlignPip law={law} good={good} />
      </motion.div>

      {/* Story */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, padding: "14px 22px 10px", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        <div style={{ background: "var(--panel)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8, padding: "16px 20px", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
          {/* subtle top glow */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${al.c}22,transparent)`, transition: "background 0.8s" }} />

          <div style={{ flex: 1, overflow: "hidden", fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.9, color: "#7a8e9e" }}>
            <AnimatePresence mode="wait">
              <motion.div key={ci} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                {displayed.map((text, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{ marginBottom: i < displayed.length - 1 ? "0.85em" : 0 }}>
                    {text}
                    {i === displayed.length - 1 && !done && (
                      <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.1, times: [0, 0.5] }}
                        style={{ display: "inline-block", width: 1, height: 13, background: "var(--accent)", marginLeft: 2, verticalAlign: "middle" }} />
                    )}
                  </motion.p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Reaction */}
          <AnimatePresence>
            {reaction && (
              <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 10 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}
                style={{ paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <motion.div initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
                  style={{ fontFamily: "var(--serif)", fontSize: 13, color: "#3d5060", fontStyle: "italic", lineHeight: 1.75, borderLeft: "2px solid rgba(200,169,110,0.22)", paddingLeft: 12 }}>
                  {reaction}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Choices */}
      <div style={{ position: "relative", zIndex: 2, flexShrink: 0, padding: "8px 22px 14px" }}>
        <AnimatePresence>
          {choicesVisible && (
            <motion.div initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 9 }} />
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <AnimatePresence>
            {choicesVisible && chapter.cs.map((c, i) => (
              <motion.button key={`${ci}-${i}`}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: picked !== null && picked !== i ? 0.55 : 1, x: 0 }}
                exit={{ opacity: 0 }} whileHover={{ x: 4, borderColor: "rgba(200,169,110,0.25)", color: "#8a9eae" }}
                transition={{ duration: 0.32, delay: i * 0.08 }}
                onClick={e => { e.stopPropagation(); handlePick(i, e); }}
                style={{
                  background: picked === i ? "rgba(200,169,110,0.06)" : "rgba(6,10,16,0.65)",
                  border: `1px solid ${picked === i ? "rgba(200,169,110,0.25)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 5, padding: "9px 16px", cursor: "pointer",
                  textAlign: "left", color: picked === i ? "#a08870" : "#3d5060",
                  fontFamily: "var(--serif)", fontSize: 14, lineHeight: 1.4,
                  display: "flex", gap: 12, alignItems: "flex-start",
                  transition: "background 0.2s,border-color 0.2s,color 0.2s",
                }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: picked === i ? "var(--accent)" : "#1e2e3e", flexShrink: 0, marginTop: 2 }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{c.t}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {picked !== null && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
              style={{ marginTop: 8 }}>
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.8 }}
                style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "3px", color: "#1e3040" }}>
                tap again to continue, or pick another →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}