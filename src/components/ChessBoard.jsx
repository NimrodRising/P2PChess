import { useEffect, useReducer, useState } from "react";
import Square from "./Square";
import { generateLegalMoves, pieceBitboards } from "./MoveGen/moveGeneration";
import {
  doesContainSubArray,
  arraysEqual,
  binaryStringToBigInt,
  bitboardToArray,
  getSquaresFromMoves,
} from "./utils.js";
import { makeMove } from "./MoveGen/makeMove.js";
doesContainSubArray;
arraysEqual;
binaryStringToBigInt;

const initialBitboard = {
  wP: 0b0000000000000000000000000000000000000000000000001111111100000000n,
  wB: 0b0000000000000000000000000000000000000000000000000000000000100100n,
  wN: 0b0000000000000000000000000000000000000000000000000000000001000010n,
  wR: 0b0000000000000000000000000000000000000000000000000000000010000001n,
  wQ: 0b0000000000000000000000000000000000000000000000000000000000010000n,
  wK: 0b0000000000000000000000000000000000000000000000000000000000001000n,
  bP: 0b0000000011111111000000000000000000000000000000000000000000000000n,
  bB: 0b0010010000000000000000000000000000000000000000000000000000000000n,
  bN: 0b0100001000000000000000000000000000000000000000000000000000000000n,
  bR: 0b1000000100000000000000000000000000000000000000000000000000000000n,
  bQ: 0b0001000000000000000000000000000000000000000000000000000000000000n,
  bK: 0b0000100000000000000000000000000000000000000000000000000000000000n,
};

const initialBoard = bitboardToArray(initialBitboard);

const initialBoardAction = {
  isPondering: false,
  to: null,
  from: null,
  piece: null,
};

const initialMetadata = {
  canCastle: { short: true, long: true },
  enPassantPiece: 0b0n,
  side: "w",
};

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [bitboard, setBitboard] = useState(initialBitboard);
  const [metadata, setMetadata] = useState(initialMetadata);
  const [state, dispatch] = useReducer(reducer, initialBoardAction);
  const [legalMoves, setLegalMoves] = useState([]);
  const [legalSquares, setLegalSquares] = useState([]);
  const [turn, setTurn] = useState("w");
  const [halfMoveCount, setHalfMoveCount] = useState(1);
  const turns = ["w", "b"];
  useEffect(() => {
    if (state.isPondering) {
      const pieceBitboard = pieceBitboards[63 - state.from];
      const legalMoves = state.piece.includes(turn)
        ? generateLegalMoves(state.piece, pieceBitboard, bitboard, metadata)
        : [];
      setLegalMoves(legalMoves);
      setLegalSquares(getSquaresFromMoves(legalMoves));
    }
    if (!state.isPondering && state.to !== null) {
      const move = legalMoves[legalSquares.indexOf(state.to)];
      const { newBitboard, newMetadata } = makeMove(
        bitboard,
        state.piece,
        move,
        metadata,
      );
      const newBoard = bitboardToArray(newBitboard);
      setBitboard(newBitboard);
      setBoard(newBoard);
      setMetadata(newMetadata);
      dispatch({ type: "RESET" });
      setLegalSquares([]);
      const newTurn = turns[halfMoveCount % 2];
      setTurn(newTurn);
      setHalfMoveCount((halfMoveCount) => halfMoveCount + 1);
    } else if (!state.isPondering) {
      setLegalSquares([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, board]);

  function handleGrab(index, piece) {
    dispatch({ type: "GRAB_PIECE", from: index, piece: piece });
  }

  function handleDrop(index) {
    dispatch({
      type: "DROP_PIECE",
      to: legalSquares.includes(index) ? index : null,
    });
  }

  return (
    <div className="border w-2/3 max-w-screen-sm border-black">
      <div className=" grid grid-cols-8">
        {board.map((piece, index) => (
          <Square
            isLegal={legalSquares.includes(index)}
            handleDrop={handleDrop}
            handleGrab={handleGrab}
            key={index}
            square={{
              index: index,
              rank: Math.floor(index / 8),
              file: index % 8,
              piece: piece,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "GRAB_PIECE": {
      return {
        ...state,
        from: action.from,
        isPondering: true,
        piece: action.piece,
      };
    }
    case "DROP_PIECE": {
      return {
        ...state,
        to: action.to,
        isPondering: false,
      };
    }
    case "RESET": {
      return {
        ...initialBoardAction,
      };
    }
    default: {
      throw new Error("Unrecognized action type!");
    }
  }
}

export default ChessBoard;
