import React, { useEffect, useRef } from "react";
import "./App.css";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;

    // Draw the function y = x
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.beginPath();

    for (let x = 0; x < canvas.width; x++) {
      let y = x; // y = x function
      ctx.lineTo(x, canvas.height - y); // Invert y-axis
    }

    ctx.stroke();
  }, []);

  return (
    <div className="App">
      <h1>Math Art App</h1>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

export default App;