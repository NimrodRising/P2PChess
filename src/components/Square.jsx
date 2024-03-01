import { useState } from "react";
import PieceIcon from "./PieceIcon";

function Square({ square }) {
  return (
    <div
      className={`aspect-square w-full flex items-center m-0 p-0 ${
        (square.file + square.rank) % 2 !== 0 ? "bg-blue-400" : "bg-white"
      }`}
    >
      <PieceIcon
        piece={square.piece}
        isOdd={(square.file + square.rank) % 2 !== 0}
      />
    </div>
  );
}

export default Square;
