import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Splash } from "./screens/Splash";
import { Game } from "./screens/Game";
import { Ending } from "./screens/Ending";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [finalLaw, setFinalLaw] = useState(0);
  const [finalGood, setFinalGood] = useState(0);

  return (
    <div style={{ background: "#07090c", borderRadius: 12, overflow: "hidden", height: 660, display: "flex", flexDirection: "column", fontFamily: "var(--serif)", color: "var(--ink)", position: "relative" }}>
      <AnimatePresence mode="wait">
        {screen === "splash" && <Splash key="splash" onStart={() => setScreen("game")} />}
        {screen === "game" && <Game key="game" onEnd={(l, g) => { setFinalLaw(l); setFinalGood(g); setScreen("ending"); }} />}
        {screen === "ending" && <Ending key="ending" law={finalLaw} good={finalGood} onRestart={() => setScreen("splash")} />}
      </AnimatePresence>
    </div>
  );
}
