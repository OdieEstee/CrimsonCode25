import React from "react";

interface LayerProps {
  id: number;
  type: string;
  params: any;
  onRemove: (id: number) => void;
  onUpdate: (id: number, params: any) => void;
}

const Layer: React.FC<LayerProps> = ({ id, type, params, onRemove, onUpdate }) => {
  const handleParamChange = (paramName: string, value: string) => {
    const newParams = { ...params, [paramName]: paramName === "color" ? value : parseFloat(value) };
    onUpdate(id, newParams);
  };

  return (
    <div className="layer">
      <span>{type} Function</span>
      <button onClick={() => onRemove(id)}>Remove</button>
      <div>
        <label>
          Limits:
          <input
            type="text"
            value={params.xMin}
            onChange={(e) => handleParamChange("xMin", e.target.value)}
          />
          ,
          <input
            type="text"
            value={params.xMax}
            onChange={(e) => handleParamChange("xMax", e.target.value)}
          />
        </label>
        {Object.keys(params).filter(paramName => paramName !== "xMin" && paramName !== "xMax" && paramName !== "color" && paramName !== "originX" && paramName !== "originY").map((paramName) => (
          <label key={paramName}>
            {paramName}:
            <input
              type="text"
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
            type="text"
            value={params.originX}
            onChange={(e) => handleParamChange("originX", e.target.value)}
          />
           ,
          <input
            type="text"
            value={params.originY}
            onChange={(e) => handleParamChange("originY", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Layer;