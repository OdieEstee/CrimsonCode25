import React, { useRef, useState } from "react";
import "./App.css";
import Canvas from "./Canvas";
import FileTools from "./FileTools";
import GlobalTools from "./GlobalTools";
import LayerList from "./LayerList";

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgColor, setBgColor] = useState("transparent");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [functions, setFunctions] = useState([]);
  const [layers, setLayers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleImport = (json) => {
    setWidth(json.width);
    setHeight(json.height);
    setBgColor(json.bgColor || "transparent");
    setFunctions(json.functions || []);
    setLayers(json.layers || []);
  };

  const addFunction = (type) => {
    let newFunction;
    let newLayer;
    const canvas = canvasRef.current;
    const originX = canvas ? canvas.width / 2 : width / 2;
    const originY = canvas ? canvas.height / 2 : height / 2;

    switch (type) {
      case "y=mx":
        newFunction = { id: functions.length + 1, type: "y=mx", params: { xMin: -100, xMax: 100, m: 1, color: "#000000", originX, originY, rotation: 0, thickness: 1 } };
        newLayer = { id: functions.length + 1, type: "y=mx", params: { xMin: -100, xMax: 100, m: 1, color: "#000000", originX, originY, rotation: 0, thickness: 1 } };
        break;
      case "y=ax^b":
        newFunction = { id: functions.length + 1, type: "y=ax^b", params: { xMin: -100, xMax: 100, a: 1, b: 2, color: "#000000", originX, originY, rotation: 0, thickness: 1 } };
        newLayer = { id: functions.length + 1, type: "y=ax^b", params: { xMin: -100, xMax: 100, a: 1, b: 2, color: "#000000", originX, originY, rotation: 0, thickness: 1 } };
        break;
      // Add cases for other function types if needed
      default:
        return;
    }
    setFunctions([newFunction, ...functions]);
    setLayers([newLayer, ...layers]);
    setShowDropdown(false); // Hide the dropdown after adding a function
  };

  const updateFunction = (id, params) => {
    setFunctions(functions.map(func => func.id === id ? { ...func, params } : func));
  };

  const updateLayer = (id, params) => {
    setLayers(layers.map(layer => layer.id === id ? { ...layer, params } : layer));
    const func = functions.find(func => func.id === id);
    if (func) {
      updateFunction(id, params);
    }
  };

  const removeLayer = (id) => {
    setFunctions(functions.filter(func => func.id !== id));
    setLayers(layers.filter(layer => layer.id !== id));
  };

  const copyLayer = (id) => {
    const layerToCopy = layers.find(layer => layer.id === id);
    if (layerToCopy) {
      const newId = functions.length + 1;
      const newFunction = { ...layerToCopy, id: newId, params: { ...layerToCopy.params } };
      const newLayer = { ...layerToCopy, id: newId, params: { ...layerToCopy.params } };
      setFunctions([newFunction, ...functions]);
      setLayers([newLayer, ...layers]);
    }
  };

  return (
    <div className="App">
      <h1>Project EZD</h1>
      <FileTools
        canvasRef={canvasRef}
        bgColor={bgColor}
        width={width}
        height={height}
        functions={functions}
        layers={layers}
        onImport={handleImport}
      />
      <Canvas
        ref={canvasRef}
        bgColor={bgColor}
        setBgColor={setBgColor}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        functions={functions}
      />
      <div className="dropdown">
        <button onClick={() => setShowDropdown(!showDropdown)}>Add</button>
        {showDropdown && (
          <div className="dropdown-content">
            <button onClick={() => addFunction("y=mx")}>y=mx</button>
            <button onClick={() => addFunction("y=ax^b")}>y=ax^b</button>
            {/* Add more buttons for other function types if needed */}
          </div>
        )}
      </div>
      <LayerList layers={layers} onRemoveLayer={removeLayer} onCopyLayer={copyLayer} onUpdateLayer={updateLayer} />
      <GlobalTools />
    </div>
  );
};

export default App;