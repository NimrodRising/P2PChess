import { useState } from "react";
import PieceIcon from "./PieceIcon";

function Square({ square, handleGrab, handleDrop, isLegal }) {
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
        (square.file + square.rank) % 2 !== 0 && !isLegal ? "bg-blue-400" : ""
      } ${isLegal ? "bg-red-100" : ""}`}
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
