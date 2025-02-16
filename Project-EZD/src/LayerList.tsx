import React from "react";
import Layer from "./Layer";

interface LayerListProps {
  layers: Array<{ id: number; type: string; params: any }>;
  onRemoveLayer: (id: number) => void;
  onCopyLayer: (id: number) => void;
  onUpdateLayer: (id: number, params: any) => void;
}

const LayerList: React.FC<LayerListProps> = ({ layers, onRemoveLayer, onCopyLayer, onUpdateLayer }) => {
  return (
    <div className="layer-list">
      {layers.map(layer => (
        <Layer
          key={layer.id}
          id={layer.id}
          type={layer.type}
          params={layer.params}
          onRemove={onRemoveLayer}
          onCopy={onCopyLayer}
          onUpdate={onUpdateLayer}
        />
      ))}
    </div>
  );
};

export default LayerList;