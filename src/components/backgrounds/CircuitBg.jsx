import { useEffect, useRef } from "react";

export function CircuitBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    let t = 0, raf;
    const nodes = [[.2, .25], [.5, .2], [.8, .25], [.15, .5], [.5, .45], [.85, .5], [.2, .75], [.5, .78], [.8, .75]];
    const edges = [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8]];

    function draw() {
      const W = cv.width, H = cv.height;
      cx.fillStyle = "#040306";
      cx.fillRect(0, 0, W, H);

      edges.forEach(([a, b]) => {
        cx.strokeStyle = "rgba(60,20,120,0.2)";
        cx.lineWidth = 0.5;
        cx.beginPath();
        cx.moveTo(W * nodes[a][0], H * nodes[a][1]);
        cx.lineTo(W * nodes[b][0], H * nodes[b][1]);
        cx.stroke();
      });

      const progress = (t * 0.15) % 1;
      const totalEdges = edges.length;
      const currentEdge = Math.floor(progress * totalEdges);
      const edgeProg = (progress * totalEdges) % 1;
      if (currentEdge < totalEdges) {
        const [a, b] = edges[currentEdge];
        const px = W * nodes[a][0] + (W * nodes[b][0] - W * nodes[a][0]) * edgeProg;
        const py = H * nodes[a][1] + (H * nodes[b][1] - H * nodes[a][1]) * edgeProg;
        cx.fillStyle = "rgba(140,70,255,0.9)";
        cx.beginPath(); cx.arc(px, py, 5, 0, 6.28); cx.fill();
        cx.strokeStyle = "rgba(140,70,255,0.3)";
        cx.lineWidth = 1;
        cx.beginPath(); cx.arc(px, py, 10, 0, 6.28); cx.stroke();
      }

      nodes.forEach(([nx, ny], i) => {
        const p = Math.sin(t * 1.5 + i * 0.8) * 0.5 + 0.5;
        cx.beginPath();
        cx.arc(W * nx, H * ny, 3 + p * 2, 0, 6.28);
        cx.fillStyle = `rgba(100,50,220,${0.3 + p * 0.4})`;
        cx.fill();
      });

      const scanY = ((t * 0.12) % 1) * H;
      cx.fillStyle = "rgba(80,30,200,0.04)";
      cx.fillRect(0, scanY, W, 2);

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={600} height={660} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
