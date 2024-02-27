import { useState, useEffect, useRef } from "react";
import PieceIcon from "./PieceIcon";

function Square({ square }) {
  const [isDraggingPiece, setIsDraggingPiece] = useState(false);
  return (
    <div
      className={`aspect-square w-full flex items-center m-0 p-0 ${
        (square.file + square.rank) % 2 !== 0 ? "bg-blue-400" : "bg-white"
      }`}
    >
      <PieceIcon
        piece={square.piece}
        isOdd={(square.file + square.rank) % 2 === 0}
        isDraggingPiece={isDraggingPiece}
        setIsDraggingPiece={setIsDraggingPiece}
      />
    </div>
  );
}

// KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP
// const [domRect, setDomRect] = useState(null);
// const [relPosition, setRelPosition] = useState([0, 0]);
// const [offsetPiece, setOffsetPiece] = useState(null);
// const [initialPosition, setInitialPosition] = useState(null);
// const mousePosRef = useRef(mousePos);
// KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP
// calculating variables use in transform for dragging behavior
// useEffect(() => {
//   if (bool && bool) {
//     setOffsetPiece([
//       initialPosition[0] - domRect.left - domRect.width / 2,
//       initialPosition[1] - domRect.top - domRect.height / 2,
//     ]);
//     setRelPosition([
//       mousePosRef.current.x - initialPosition[0],
//       mousePosRef.current.y - initialPosition[1],
//     ]);
//   } else {
//     setOffsetPiece(null);
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [initialPosition, isDragging, mousePos]);
// setting transform for dragging behavior
// KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP
// relPosition && isDraggingPiece && offsetPiece
//   ? {
//       transform: `translate(${relPosition[0] + offsetPiece[0]}px, ${
//         relPosition[1] + offsetPiece[1]
//       }px)`,
//     }
//   : {};
// KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP KEEP

// temp variable

export default Square;
