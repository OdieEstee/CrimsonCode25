import React from "react";
import select from "./assets/select.png";
import move from "./assets/move.png";
import text from "./assets/text.png";
import perspective from "./assets/perspective.png";
import clear from "./assets/clear.png";
import undo from "./assets/undo.png";
import redo from "./assets/redo.png";

export default function GlobalTools() {
  return (
    <div className="global-tools">
      <button className="global-button" title="Select">
        <img src={select} alt="Select" className="icon" />
      </button>
      <button className="global-button" title="Move">
        <img src={move} alt="Move" className="icon" />
      </button>
      <button className="global-button" title="Text">
        <img src={text} alt="Text" className="icon" />
      </button>
      <button className="global-button" title="Perspective">
        <img src={perspective} alt="Perspective" className="icon" />
      </button>
      <button className="global-button" title="Clear Canvas">
        <img src={clear} alt="Clear Canvas" className="icon" />
      </button>
      <button className="global-button" title="Undo">
        <img src={undo} alt="Undo" className="icon" />
      </button>
      <button className="global-button" title="Redo">
        <img src={redo} alt="Redo" className="icon" />
      </button>
    </div>
  );
}