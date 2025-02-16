import React, { useRef, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import FileTools from "./FileTools";
import GlobalTools from "./GlobalTools";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgColor, setBgColor] = useState("transparent");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);


  const handleImport = (json) => {
    setWidth(json.width);
    setHeight(json.height);
    setBgColor(json.bgColor || "transparent");
  };




  return (
    <div className="App">
      <h1>Project EZD</h1>
      <FileTools canvasRef={canvasRef} bgColor={bgColor} onImport={handleImport} />
      <Canvas
        ref={canvasRef}
        bgColor={bgColor}
        setBgColor={setBgColor}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
      />
      <GlobalTools />
    </div>
  );
};

export default App;