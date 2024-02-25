import { useState, useEffect, useRef } from "react";

function Square({
  square,
  mousePos,
  isDragging,
  setIsDragging,
  setHovered,
  setPieceInHand,
  isLegalSquare,
  setLegalMoves,
}) {
  const number = 8 * square.rank - (7 - square.file);
  const [isHovered, setIsHovered] = useState(false);
  const [pieceIcon, setPieceIcon] = useState("");
  const [domRect, setDomRect] = useState(null);
  const [isDraggingPiece, setIsDraggingPiece] = useState(false);
  const [relPosition, setRelPosition] = useState([0, 0]);
  const [initialPosition, setInitialPosition] = useState(null);
  const [offsetPiece, setOffsetPiece] = useState(null);

  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    async function getIcon() {
      let importedIcon = await import(`../icons/${square.piece}.svg`).catch(
        () => {
          setPieceIcon("");
          return;
        }
      );

      if (importedIcon) {
        setPieceIcon(importedIcon.default);
      } else {
        setPieceIcon("");
      }
    }
    getIcon();
  }, [square.piece]);

  useEffect(() => {
    if (isHovered) {
      setHovered([square.rank, square.file]);
    }
  }, [isHovered, setHovered, square.rank, square.file]);

  useEffect(() => {
    if (isDraggingPiece && isDragging) {
      setPieceInHand({
        piece: square.piece,
        index: square.index,
        side: square.piece[0],
        from: [square.rank, square.file],
      });
      setOffsetPiece([
        initialPosition[0] - domRect.left - domRect.width / 2,
        initialPosition[1] - domRect.top - domRect.height / 2,
      ]);
      setRelPosition([
        mousePosRef.current.x - initialPosition[0],
        mousePosRef.current.y - initialPosition[1],
      ]);
    } else {
      setOffsetPiece(null);
      setIsDraggingPiece(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosition, isDragging, mousePos]);

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
      onMouseDown={() => {
        setLegalMoves(null);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`${
        isLegalSquare && isDragging ? "border border-black bg-yellow-200" : ""
      } aspect-square w-full flex items-center m-0 p-0 ${
        ((number % 8) + Math.ceil(number / 8)) % 2 !== 0
          ? "bg-blue-400"
          : "bg-white"
      }`}
    >
      {square.piece ? (
        <img
          draggable="false"
          style={styles}
          onMouseDown={(e) => {
            const domRect = e.target.getBoundingClientRect();
            setDomRect(domRect);
            setInitialPosition([mousePosRef.current.x, mousePosRef.current.y]);
            setIsDraggingPiece(true);
            setIsDragging(true);
          }}
          className={`w-full select-none image ${
            isDraggingPiece ? "pointer-events-none" : ""
          }`}
          src={pieceIcon}
          alt=""
        />
      ) : null}
    </div>
  );
}

export default Square;
