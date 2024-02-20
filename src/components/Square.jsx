import { useState, useEffect } from "react";

function Square({ number, piece }) {
  const [pieceIcon, setPieceIcon] = useState("");

  useEffect(() => {
    async function getIcon() {
      let importedIcon = await import(`../icons/${piece}.svg`).catch(() => {
        setPieceIcon("");
        return;
      });

      if (importedIcon) {
        setPieceIcon(importedIcon.default);
      } else {
        setPieceIcon("");
      }
    }
    getIcon();
  });

  return (
    <div
      key={number}
      className={`aspect-square w-full flex items-center m-0 p-0 ${
        ((number % 8) + Math.ceil(number / 8)) % 2 !== 0
          ? "bg-blue-400"
          : "bg-white"
      }`}
    >
      <img className="w-full" src={pieceIcon}></img>
    </div>
  );
}

export default Square;
