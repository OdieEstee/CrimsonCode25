import React, { useRef, useEffect, forwardRef } from "react";
import MathFunction from "./MathFunction";

const Canvas = forwardRef(({ bgColor, setBgColor, width, setWidth, height, setHeight, functions, updateFunction }, ref) => {
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

  useEffect(() => {
    createNewCanvas();
  }, [width, height, bgColor]);

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