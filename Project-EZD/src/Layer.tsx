import React, { useState } from "react";

interface LayerProps {
  id: number;
  type: string;
  params: any;
  onRemove: (id: number) => void;
  onCopy: (id: number) => void;
  onUpdate: (id: number, params: any) => void;
}

const Layer: React.FC<LayerProps> = ({ id, type, params, onRemove, onCopy, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleParamChange = (paramName: string, value: string) => {
    const newParams = { ...params, [paramName]: value === "" ? "" : parseFloat(value) };
    onUpdate(id, newParams);
  };

  return (
    <div className="layer">
      <div className="layer-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span>{type} Function</span>
        <button onClick={() => onRemove(id)}>Remove</button>
        <button onClick={() => onCopy(id)}>Copy</button>
      </div>
      {!isCollapsed && (
        <div className="layer-body">
          <label>
            Limits:
            <input
              type="number"
              step="0.1"
              value={params.xMin}
              onChange={(e) => handleParamChange("xMin", e.target.value)}
            />
            ,
            <input
              type="number"
              step="0.1"
              value={params.xMax}
              onChange={(e) => handleParamChange("xMax", e.target.value)}
            />
          </label>
          {Object.keys(params).filter(paramName => paramName !== "xMin" && paramName !== "xMax" && paramName !== "color" && paramName !== "originX" && paramName !== "originY" && paramName !== "rotation" && paramName !== "thickness").map((paramName) => (
            <label key={paramName}>
              {paramName}:
              <input
                type="number"
                step="0.1"
                value={params[paramName]}
                onChange={(e) => handleParamChange(paramName, e.target.value)}
              />
            </label>
          ))}
          <label>
            Color:
            <input
              type="color"
              value={params.color || "#000000"}
              onChange={(e) => handleParamChange("color", e.target.value)}
            />
          </label>
          <label>
            Position:
            <input
              type="number"
              step="0.1"
              value={params.originX}
              onChange={(e) => handleParamChange("originX", e.target.value)}
            />
            ,
            <input
              type="number"
              step="0.1"
              value={params.originY}
              onChange={(e) => handleParamChange("originY", e.target.value)}
            />
          </label>
          <label>
            Rotation:
            <input
              type="number"
              step="0.1"
              value={params.rotation}
              onChange={(e) => handleParamChange("rotation", e.target.value)}
            />
          </label>
          <label>
            Thickness:
            <input
              type="number"
              step="0.1"
              value={params.thickness}
              onChange={(e) => handleParamChange("thickness", e.target.value)}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Layer;