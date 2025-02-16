import React, { useEffect } from "react";

interface PowerFunctionProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  xMin: number;
  xMax: number;
  a: number;
  b: number;
  color: string;
  originX: number;
  originY: number;
  rotation: number;
  thickness: number;
}

const PowerFunction: React.FC<PowerFunctionProps> = ({ canvasRef, xMin, xMax, a, b, color, originX, originY, rotation, thickness }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Translate the origin to the specified coordinates and apply rotation
    ctx.save();
    ctx.translate(originX, originY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Set the line thickness
    ctx.lineWidth = thickness;

    // Draw the quadratic function y = ax^b
    ctx.beginPath();
    for (let x = xMin; x <= xMax; x += 0.1) {
      const y = a * Math.pow(x, b);
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
  }, [canvasRef, xMin, xMax, a, b, color, originX, originY, rotation, thickness]);

  return null;
};

export default PowerFunction;