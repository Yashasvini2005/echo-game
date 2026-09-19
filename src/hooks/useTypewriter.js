import { useState, useEffect, useRef, useCallback } from "react";

/* Types out an array of paragraphs one character at a time.
   `active` gates when typing (re)starts — flip it to re-trigger typing
   for a new chapter. Returns the currently displayed lines, whether
   typing has finished, and a `skip` function that instantly reveals
   the rest of the current paragraphs (used for click-to-fast-forward). */
export function useTypewriter(paragraphs, active) {
  const [displayed, setDisplayed] = useState([]);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    setDisplayed([]);
    setDone(false);
    let pIdx = 0, cIdx = 0;

    function tick() {
      if (pIdx >= paragraphs.length) {
        setDone(true);
        return;
      }
      const text = paragraphs[pIdx];
      cIdx++;
      if (cIdx > text.length) {
        pIdx++;
        cIdx = 0;
        timerRef.current = setTimeout(tick, pIdx < paragraphs.length ? 220 : 0);
        return;
      }
      setDisplayed(prev => {
        const next = [...prev];
        next[pIdx] = text.slice(0, cIdx);
        return next;
      });
      timerRef.current = setTimeout(tick, 15);
    }

    tick();
    return () => clearTimeout(timerRef.current);
  }, [paragraphs, active]);

  const skip = useCallback(() => {
    clearTimeout(timerRef.current);
    setDisplayed(paragraphs.slice());
    setDone(true);
  }, [paragraphs]);

  return { displayed, done, skip };
}