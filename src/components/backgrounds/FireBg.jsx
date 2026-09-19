import { useEffect, useRef } from "react";

export function FireBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let t = 0, raf;
    const sparks = Array.from({ length: 18 }, () => ({
      x: 0.15 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      speed: 0.28 + Math.random() * 0.18,
      size: 0.8 + Math.random() * 1.4,
    }));

    function draw() {
      const W = cv.width, H = cv.height;
      cx.fillStyle = "#050200";
      cx.fillRect(0, 0, W, H);

      const g = cx.createRadialGradient(W * .42, H * .58, 10, W * .42, H * .58, H * .55);
      g.addColorStop(0, "rgba(160,35,0,0.09)");
      g.addColorStop(1, "transparent");
      cx.fillStyle = g;
      cx.fillRect(0, 0, W, H);

      [[0, .38, .1, .62], [.08, .28, .09, .72], [.16, .42, .07, .58], [.22, .22, .12, .78],
       [.34, .32, .09, .68], [.42, .19, .11, .81], [.52, .36, .08, .64], [.59, .24, .1, .76],
       [.68, .4, .09, .6], [.76, .17, .11, .83], [.86, .33, .1, .67]].forEach(([x, y, w, h]) => {
        cx.fillStyle = "#0c0600";
        cx.fillRect(W * x, H * y, W * w, H * h);
      });

      sparks.forEach((s, i) => {
        const progress = ((t * s.speed + s.phase) % (Math.PI * 2)) / (Math.PI * 2);
        const sy = H * (0.62 - progress * 0.38);
        const wobble = Math.sin(t * 2.1 + i) * W * 0.025;
        const alpha = progress < 0.7 ? progress / 0.7 : (1 - progress) / 0.3;
        cx.beginPath();
        cx.arc(W * s.x + wobble, sy, s.size, 0, 6.28);
        cx.fillStyle = `rgba(255,${65 + i * 5},0,${alpha * 0.7})`;
        cx.fill();
      });

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={600} height={660} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
