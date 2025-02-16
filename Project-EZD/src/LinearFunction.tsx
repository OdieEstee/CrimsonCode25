import React, { useEffect } from "react";

interface LinearFunctionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  xMin: number;
  xMax: number;
  m: number;
}

const LinearFunction: React.FC<LinearFunctionProps> = ({ canvasRef, xMin, xMax, m }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Translate the origin to the center of the canvas
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Draw the linear function y = mx
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x++) {
      const y = m * x;
      if (x === xMin) {
        ctx.moveTo(x, -y); // Invert y to match the canvas coordinate system
      } else {
        ctx.lineTo(x, -y); // Invert y to match the canvas coordinate system
      }
    }
    ctx.strokeStyle = "red";
    ctx.stroke();

    // Restore the original coordinate system
    ctx.restore();
  }, [canvasRef, xMin, xMax, m]);

  return null;
};

export default LinearFunction;