import React, { useEffect } from "react";

interface LinearFunctionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  xMin: number;
  xMax: number;
  m: number;
  b: number;
}

const LinearFunction: React.FC<LinearFunctionProps> = ({ canvasRef, xMin, xMax, m, b }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the linear function y = mx + b
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x++) {
      const y = m * x + b;
      if (x === xMin) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }, [canvasRef, xMin, xMax, m, b]);

  return null;
};

export default LinearFunction;