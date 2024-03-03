import { useEffect, useReducer, useState } from "react";
import Square from "./Square";
import {
  generateBlackPawnMoves,
  generateWhitePawnMoves,
  pieceBitboards,
} from "./MoveGen/moveGeneration";
generateBlackPawnMoves;
generateWhitePawnMoves;
pieceBitboards;
import {
  doesContainSubArray,
  arraysEqual,
  binaryStringToBigInt,
  toBitboard,
  bitboardToList,
} from "./utils.js";
doesContainSubArray;
arraysEqual;
binaryStringToBigInt;

const initialBoard = [
  "bR",
  "bN",
  "bB",
  "bQ",
  "bK",
  "bB",
  "bN",
  "bR",
  "bP",
  "bP",
  "bP",
  "bP",
  "bP",
  "bP",
  "bP",
  "bP",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "wP",
  "wP",
  "wP",
  "wP",
  "wP",
  "wP",
  "wP",
  "wP",
  "wR",
  "wN",
  "wB",
  "wQ",
  "wK",
  "wB",
  "wN",
  "wR",
];

const initialBoardAction = {
  isPondering: false,
  to: null,
  from: null,
  piece: null,
};

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [state, dispatch] = useReducer(reducer, initialBoardAction);
  const [legalMoves, setLegalMoves] = useState([]);

  useEffect(() => {
    if (state.isPondering) {
      const legalMoves = generateLegalMoves(state.piece, state.from, board);
      setLegalMoves(legalMoves); // setting legal moves to highlight legal squares
    }
    if (!state.isPondering && state.to !== null) {
      // setBoard(); // setting board using bitboard logic
    }
  }, [state, board]);

  function handleGrab(index, piece) {
    dispatch({ type: "GRAB_PIECE", from: index, piece: piece });
  }

  function handleDrop(index, piece) {
    dispatch({ type: "DROP_PIECE", to: index });
    setLegalMoves([]);
  }

  return (
    <div className="border w-2/3 max-w-screen-sm border-black">
      <div className=" grid grid-cols-8">
        {board.map((piece, index) => (
          <Square
            isLegal={legalMoves.includes(index)}
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
    default: {
      throw new Error("Unrecognized action type!");
    }
  }
}

function generateLegalMoves(piece, index, board) {
  let legalMoves = [];
  // the regex in allPieces matches all non space characters
  const allPieces = toBitboard(/^(?!\s*$).+/, board);
  const pieceBB = pieceBitboards[63 - index];
  switch (piece) {
    case "wP": {
      const whitePawnsAll = toBitboard(/wP/, board);
      const blackPieces = toBitboard(/b/, board);
      const legalMovesBB = generateWhitePawnMoves(
        whitePawnsAll,
        blackPieces,
        allPieces,
        pieceBB,
      );
      return bitboardToList(legalMovesBB); // converts the bitboard of legal squares to list of legal squares (indeces)
    }
    case "bP": {
      const blackPawnsAll = toBitboard(/bP/, board);
      const whitePieces = toBitboard(/w/, board);
      const legalMovesBB = generateBlackPawnMoves(
        blackPawnsAll,
        whitePieces,
        allPieces,
        pieceBB,
      );
      return bitboardToList(legalMovesBB); // converts the bitboard of legal squares to list of legal squares (indeces)
    }
    default: {
      console.log("I haven't programmed legal moves for this piece type yet!");
    }
  }
  return legalMoves;
}

export default ChessBoard;
