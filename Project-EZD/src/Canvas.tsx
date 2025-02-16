import React, { useRef, useEffect, forwardRef } from "react";
import LinearFunction from "./LinearFunction";

const Canvas = forwardRef(({ bgColor, setBgColor, width, setWidth, height, setHeight, functions }, ref) => {
  const canvasRef = ref || useRef<HTMLCanvasElement | null>(null);

  // Function to create a new canvas
  const createNewCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, width, height); // Clear canvas for transparency

        if (bgColor === "transparent") {
          // Draw transparency texture
          const size = 20;
          for (let y = 0; y < height; y += size) {
            for (let x = 0; x < width; x += size) {
              ctx.fillStyle = (x / size + y / size) % 2 === 0 ? "#ccc" : "#fff";
              ctx.fillRect(x, y, size, size);
            }
          }
        } else {
          ctx.fillStyle = bgColor; // Set background to selected color
          ctx.fillRect(0, 0, width, height);
        }
        console.log("Canvas created with width:", width, "and height:", height, "and background color:", bgColor);
      }
    }
  };

  const drawFunctions = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw the functions from bottom to top of the layer list
    functions.slice().reverse().forEach(func => {
      switch (func.type) {
        case "linear":
          const { xMin, xMax, m, color } = func.params;
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.beginPath();
          for (let x = xMin; x <= xMax; x++) {
            const y = m * x;
            if (x === xMin) {
              ctx.moveTo(x, -y); // Invert y to match the canvas coordinate system
            } else {
              ctx.lineTo(x, -y); // Invert y to match the canvas coordinate system
            }
          }
          ctx.strokeStyle = color || "red";
          ctx.stroke();
          ctx.restore();
          break;
        // Add cases for other function types if needed
        default:
          break;
      }
    });
  };

  useEffect(() => {
    createNewCanvas();
    drawFunctions();
  }, [width, height, bgColor, functions]);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Canvas */}
      <canvas ref={canvasRef} className="border shadow-lg" />

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 1)}
          placeholder="Width"
          className="border p-2 w-24"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 1)}
          placeholder="Height"
          className="border p-2 w-24"
        />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="border p-2 w-24"
        />
        <button 
          onClick={() => setBgColor("transparent")}
          className="border p-2 w-24 bg-gray-200"
        >
          Transparent
        </button>
      </div>
    </div>
  );
});

export default Canvas;