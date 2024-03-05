import { useState } from "react";
import PieceIcon from "./PieceIcon";

function Square({ square, handleGrab, handleDrop, isLegal }) {
  if (square.index === 36) {
    console.log(square.piece);
  }
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ draggable: "false" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseUp={() => {
        if (isHovered) handleDrop(square.index);
      }}
      onMouseDown={() => handleGrab(square.index, square.piece)}
      className={`aspect-square w-full flex items-center justify-center m-0 p-0 ${
        (square.file + square.rank) % 2 !== 0 ? "bg-blue-400" : "bg-white"
      } ${isLegal ? "bg-red-200" : ""}`}
    >
      {" "}
      <PieceIcon
        piece={square.piece}
        isOdd={(square.file + square.rank) % 2 !== 0}
      />
    </div>
  );
}

export default Square;
