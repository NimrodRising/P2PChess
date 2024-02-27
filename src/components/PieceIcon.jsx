import { useEffect, useRef, useState } from "react";
import useMousePosition from "../Hooks/useMousePosition";
import usePieceIcon from "../Hooks/usePieceIcon";
import useMouseUpEvent from "../Hooks/useMouseUpEvent";

function PieceIcon({ piece }) {
  const [isDraggingPiece, setIsDraggingPiece] = useState(false);
  const position = useMousePosition(isDraggingPiece);
  const [newPosition, setNewPosition] = useState([0, 0]);
  const pieceIcon = usePieceIcon(piece);
  const mouseup = useMouseUpEvent();
  const [domRect, setDomRect] = useState(null);
  const mousePositionRef = useRef(position);

  useEffect(() => {
    mousePositionRef.current = position;
  }, [position]);

  useEffect(() => {
    setIsDraggingPiece(false);
    setDomRect(null);
    setNewPosition([0, 0]);
  }, [mouseup]);

  useEffect(() => {
    function handleDrag() {
      const positionFromClick = [
        -domRect.left - domRect.width / 2 + mousePositionRef.current.x,
        -domRect.top - domRect.height / 2 + mousePositionRef.current.y,
      ];

      setNewPosition(positionFromClick);
    }
    if (domRect && position && isDraggingPiece) {
      console.log("activated");
      handleDrag();
    } else {
      setNewPosition([0, 0]);
    }
  }, [isDraggingPiece, position, domRect]);

  const handleMouseDown = (e) => {
    setDomRect(e.target.getBoundingClientRect());
    setIsDraggingPiece(true);
    e.target.style.zIndex = 9999;
  };

  const style = {
    transform: `translate(${newPosition[0]}px, ${newPosition[1]}px)`,
  };

  return piece ? (
    <img
      style={style}
      draggable="false"
      onMouseDown={handleMouseDown}
      className={`w-full select-none image`}
      src={pieceIcon}
      alt=""
    />
  ) : null;
}

export default PieceIcon;
