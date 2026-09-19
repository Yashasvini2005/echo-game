import { useEffect, useRef } from "react";

export function GridBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let t = 0, raf;

    function draw() {
      const W = cv.width, H = cv.height;
      cx.fillStyle = "#030508";
      cx.fillRect(0, 0, W, H);

      cx.strokeStyle = "rgba(15,40,90,0.3)";
      cx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 55) { cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x, H); cx.stroke(); }
      for (let y = 0; y < H; y += 55) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }

      const lx = ((t * 0.18) % 1) * W;
      cx.strokeStyle = "rgba(30,80,200,0.5)";
      cx.lineWidth = 1.5;
      cx.beginPath(); cx.moveTo(lx, 0); cx.lineTo(lx, H); cx.stroke();

      const grd = cx.createLinearGradient(lx - 30, 0, lx + 30, 0);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.5, "rgba(40,100,255,0.06)");
      grd.addColorStop(1, "transparent");
      cx.fillStyle = grd;
      cx.fillRect(lx - 30, 0, 60, H);

      cx.fillStyle = "rgba(80,160,255,0.8)";
      cx.beginPath(); cx.arc(lx, H * 0.5, 4, 0, 6.28); cx.fill();

      const pulse = Math.sin(t * 2) * 0.5 + 0.5;
      cx.strokeStyle = `rgba(40,100,255,${0.08 * pulse})`;
      cx.lineWidth = 1;
      cx.beginPath(); cx.arc(lx, H * 0.5, 20 * (1 + pulse * 0.5), 0, 6.28); cx.stroke();

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={600} height={660} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
