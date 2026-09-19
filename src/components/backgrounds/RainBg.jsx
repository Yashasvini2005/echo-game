import { useEffect, useRef } from "react";

export function RainBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let raf;
    const drops = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.6 + Math.random() * 0.5,
      len: 10 + Math.random() * 8,
    }));

    function draw() {
      const W = cv.width, H = cv.height;
      cx.fillStyle = "#020408";
      cx.fillRect(0, 0, W, H);

      [[0, .38, .1, .62], [.08, .28, .09, .72], [.16, .42, .07, .58], [.22, .22, .12, .78],
       [.34, .32, .09, .68], [.42, .19, .11, .81], [.52, .36, .08, .64], [.59, .24, .1, .76],
       [.68, .4, .09, .6], [.76, .17, .11, .83], [.86, .33, .1, .67]].forEach(([x, y, w, h]) => {
        cx.fillStyle = "#040a14";
        cx.fillRect(W * x, H * y, W * w, H * h);
      });

      drops.forEach(d => {
        d.y += d.speed * 0.004;
        if (d.y > 1) { d.y = -0.05; d.x = Math.random(); }
        cx.strokeStyle = "rgba(60,110,200,0.12)";
        cx.lineWidth = 0.5;
        cx.beginPath();
        cx.moveTo(W * d.x, H * d.y);
        cx.lineTo(W * d.x - 2, H * d.y + d.len);
        cx.stroke();
      });

      const rg = cx.createLinearGradient(0, H * 0.78, 0, H);
      rg.addColorStop(0, "rgba(20,60,180,0.06)");
      rg.addColorStop(1, "transparent");
      cx.fillStyle = rg;
      cx.fillRect(0, H * 0.78, W, H * 0.22);

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={600} height={660} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
