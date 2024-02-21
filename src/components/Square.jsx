import { useState, useEffect } from "react";
function Square({ number, piece, mousePos, isDragging, setIsDragging }) {
  const [pieceIcon, setPieceIcon] = useState("");
  const [domRect, setDomRect] = useState(null);
  const [isDraggingPiece, setIsDraggingPiece] = useState(false);
  const [relPosition, setRelPosition] = useState([0, 0]);
  const [initialPosition, setInitialPosition] = useState(null);
  const [offsetPiece, setOffsetPiece] = useState(null);

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

  useEffect(() => {
    if (isDraggingPiece && isDragging) {
      setOffsetPiece([
        initialPosition[0] - domRect.left - domRect.width / 2,
        initialPosition[1] - domRect.top - domRect.height / 2,
      ]);
      setRelPosition([
        mousePos.x - initialPosition[0],
        mousePos.y - initialPosition[1],
      ]);
    } else {
      setOffsetPiece(null);
      setIsDraggingPiece(false);
    }
  }, [initialPosition, mousePos, isDragging]);

  let styles =
    relPosition && isDraggingPiece && offsetPiece
      ? {
          transform: `translate(${relPosition[0] + offsetPiece[0]}px, ${
            relPosition[1] + offsetPiece[1]
          }px)`,
        }
      : {};

  return (
    <div
      key={number}
      className={`${"aspect-square w-full flex items-center m-0 p-0"} ${
        ((number % 8) + Math.ceil(number / 8)) % 2 !== 0
          ? "bg-blue-400"
          : "bg-white"
      }`}
    >
      {piece ? (
        <img
          draggable="false"
          style={styles}
          onMouseDown={(e) => {
            const domRect = e.target.getBoundingClientRect();
            setDomRect(domRect);
            setInitialPosition([mousePos.x, mousePos.y]);
            setIsDraggingPiece(true);
            setIsDragging(true);
          }}
          className="w-full select-none image"
          src={pieceIcon}
        ></img>
      ) : null}
    </div>
  );
}

export default Square;
