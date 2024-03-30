import { useState } from "react";
import PieceIcon from "./PieceIcon";

function Square({ square, handleGrab, handleDrop, isLegal, isPondering }) {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor =
    (square.file + square.rank) % 2 !== 0 ? "bg-blue-400" : "bg-white";

  return (
    <div
      style={{ draggable: "false" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseUp={() => {
        if (isHovered) handleDrop(square.index);
      }}
      onMouseDown={() => handleGrab(square.index, square.piece)}
      className={`aspect-square flex items-center justify-center ${backgroundColor} ${isLegal ? "bg-red" : ""} ${isHovered && isPondering ? "shadow-[0_0_0_3px_rgba(100,100,100,1)_inset]" : ""}`}
    >
      {isLegal ? (
        <PieceIcon
          piece={square.piece}
          isOdd={(square.file + square.rank) % 2 !== 0}
          isLegal={isLegal}
        />
      ) : (
        <PieceIcon
          piece={square.piece}
          isOdd={(square.file + square.rank) % 2 !== 0}
        />
      )}
    </div>
  );
}

export default Square;
