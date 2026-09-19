import { useEffect, useRef } from "react";

export function BeamsBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let t = 0, raf;

    function draw() {
      const W = cv.width, H = cv.height;
      cx.fillStyle = "#020305";
      cx.fillRect(0, 0, W, H);

      [0.25, 0.5, 0.75].forEach((bx, i) => {
        const flicker = Math.sin(t * 1.3 + i * 1.2) * 0.12 + 0.88;
        cx.save();
        cx.globalAlpha = 0.028 * flicker;
        cx.beginPath();
        cx.moveTo(W * bx, 0); cx.lineTo(W * bx - 70, H); cx.lineTo(W * bx + 70, H); cx.closePath();
        cx.fillStyle = "#c8c0b0";
        cx.fill();
        cx.restore();

        cx.save();
        cx.globalAlpha = 0.04 * flicker;
        cx.beginPath();
        cx.moveTo(W * bx, 0); cx.lineTo(W * bx - 20, H); cx.lineTo(W * bx + 20, H); cx.closePath();
        cx.fillStyle = "#ffffff";
        cx.fill();
        cx.restore();
      });

      for (let r = 40; r < 260; r += 50) {
        const pulse = Math.sin(t * 0.9 + r * 0.015) * 0.3 + 0.7;
        cx.beginPath();
        cx.arc(W * 0.5, H * 0.42, r * pulse, 0, 6.28);
        cx.strokeStyle = `rgba(30,55,120,${0.07 * (260 - r) / 260})`;
        cx.lineWidth = 1;
        cx.stroke();
      }

      cx.strokeStyle = "rgba(20,40,80,0.18)";
      cx.lineWidth = 0.5;
      cx.beginPath(); cx.moveTo(0, H * 0.5); cx.lineTo(W, H * 0.5); cx.stroke();

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={600} height={660} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
