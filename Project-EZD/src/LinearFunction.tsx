import React, { useEffect } from "react";

interface LinearFunctionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  xMin: number;
  xMax: number;
  m: number;
  color: string;
  originX: number;
  originY: number;
}

const LinearFunction: React.FC<LinearFunctionProps> = ({ canvasRef, xMin, xMax, m, color, originX, originY }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Translate the origin to the specified coordinates
    ctx.save();
    ctx.translate(originX, originY);

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
    ctx.strokeStyle = color;
    ctx.stroke();

    // Restore the original coordinate system
    ctx.restore();
  }, [canvasRef, xMin, xMax, m, color, originX, originY]);

  return null;
};

export default LinearFunction;