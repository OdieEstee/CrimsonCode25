import React, { useState } from "react";

export default function FileTools({ canvasRef, bgColor, onImport }) {
    const [showExportOptions, setShowExportOptions] = useState(false);

    const handleExport = (format) => {
        console.log(`Exporting as ${format}`);
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas context not found");
            return;
        }

        // Save the current canvas content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log(bgColor);

        // Clear the canvas to make it transparent if the background color is transparent and exporting as PNG
        if (bgColor === "transparent" && format === "png") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Fill the background with white before exporting as JPEG if the background color is transparent
        if (bgColor === "transparent" && format === "jpeg") {
            console.log("Filling background with white");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        let dataUrl;
        if (format === "png") {
            dataUrl = canvas.toDataURL("image/png");
        } else if (format === "jpeg") {
            dataUrl = canvas.toDataURL("image/jpeg");
        }

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `canvas.${format}`;
        link.click();

        // Restore the canvas content
        ctx.putImageData(imageData, 0, 0);
    };

    const handleExportJSON = () => {
        console.log("Exporting as JSON");
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }

        const canvasData = {
            width: canvas.width,
            height: canvas.height,
            dataUrl: canvas.toDataURL(),
            bgColor: bgColor,
        };

        const json = JSON.stringify(canvasData);
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "canvas.json";
        link.click();
    };

    const handleImport = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    const canvas = canvasRef.current;
                    if (!canvas) {
                        console.error("Canvas not found");
                        return;
                    }

                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        console.error("Canvas context not found");
                        return;
                    }

                    canvas.width = json.width;
                    canvas.height = json.height;
                    const img = new Image();
                    img.onload = () => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0);
                    };
                    img.src = json.dataUrl;

                    // Update the attributes in the App component
                    onImport(json);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <div className="file-tools">
            <button className="file-button" onClick={() => setShowExportOptions(!showExportOptions)} title="Export Options">Export</button>
            {showExportOptions && (
                <div className="export-options">
                    <button className="file-button" onClick={() => handleExport("png")} title="Export as PNG">Export as PNG</button>
                    <button className="file-button" onClick={() => handleExport("jpeg")} title="Export as JPEG">Export as JPEG</button>
                    <button className="file-button" onClick={handleExportJSON} title="Export as JSON">Export as JSON</button>
                </div>
            )}
            <button className="file-button" onClick={handleImport} title="Import JSON">Import</button>
        </div>
    );
}