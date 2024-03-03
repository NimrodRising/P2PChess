import { useEffect, useReducer } from "react";
import usePieceIcon from "../Hooks/usePieceIcon";
import useUserEvents from "../Hooks/useUserEvents";

// initial State for reducer
const initialState = {
  isDraggingPiece: false,
  domRect: null,
  newPosition: [0, 0],
};

function PieceIcon({ piece }) {
  // reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // custom hooks
  const { userPosition, mouseupEvent } = useUserEvents(state.isDraggingPiece);
  const pieceIcon = usePieceIcon(piece);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [mouseupEvent]);

  const handleMouseDown = (e) => {
    const domRect = e.target.getBoundingClientRect();
    const updatedPosition = updatePosition(
      domRect.left,
      domRect.width,
      domRect.top,
      domRect.height,
      userPosition,
    );

    dispatch({ type: "MOUSEDOWN", event: e, updatedPosition: updatedPosition });
  };

  useEffect(() => {
    if (state.domRect && userPosition && state.isDraggingPiece) {
      const updatedPosition = updatePosition(
        state.domRect.left,
        state.domRect.width,
        state.domRect.top,
        state.domRect.height,
        userPosition,
      );
      dispatch({ type: "POSITION_CHANGE", updatedPosition: updatedPosition });
    }
  }, [state.isDraggingPiece, userPosition, state.domRect]);

  const style = state.isDraggingPiece
    ? {
        transform: `translate(${state.newPosition[0]}px, ${state.newPosition[1]}px)`,
      }
    : null;

  return piece ? (
    <img
      style={style}
      draggable="false"
      onMouseDown={handleMouseDown}
      className={`w-full select-none image ${state.isDraggingPiece ? "pointer-events-none" : ""}`}
      src={pieceIcon}
      alt=""
    />
  ) : null;
}

function updatePosition(left, width, top, height, userPosition) {
  return [
    -left - width / 2 + userPosition.x,
    -top - height / 2 + userPosition.y,
  ];
}

// reducer
function reducer(state, action) {
  switch (action.type) {
    case "MOUSEDOWN": {
      return {
        ...state,
        domRect: action.event.target.getBoundingClientRect(),
        isDraggingPiece: true,
        newPosition: action.updatedPosition,
      };
    }
    case "RESET": {
      return initialState;
    }
    case "POSITION_CHANGE": {
      return {
        ...state,
        newPosition: action.updatedPosition,
      };
    }
    default: {
      throw new Error();
    }
  }
}

export default PieceIcon;
