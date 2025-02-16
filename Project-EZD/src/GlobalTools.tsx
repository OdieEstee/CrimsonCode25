import React from "react"

export default function GlobalTools() {
    
    return (
        <div className="global-tools">
            <button className="global-button" title = "Select">S</button>
            <button className="global-button" title = "Move">M</button>
            <button className="global-button" title = "Text">T</button>
            <button className="global-button" title = "Perspective">P</button>
            <button className="global-button" title = "Clear Canvas">C</button>
            <button className="global-button" title = "Undo">U</button>
            <button className="global-button" title = "Redo">R</button>
        </div>
    );
}