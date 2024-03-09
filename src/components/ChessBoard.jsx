import { useEffect, useReducer, useState } from "react";
import Square from "./Square";
import {
  generateBlackPawnMoves,
  generateWhitePawnMoves,
  generateBlackKingMovesNoCheckFilter,
  pieceBitboards,
  generateWhiteKingMovesNoCheckFilter,
  generateKnightMoves,
  generateRookMoves,
  generateBishopMoves,
  generateQueenMoves,
  getEnPassantPieces,
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
  bitboardToArray,
} from "./utils.js";
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
  enPassantPieces:
    0b0000000000000000000000001111111111111111000000000000000000000000n,
  canCastle: true,
};

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [state, dispatch] = useReducer(reducer, initialBoardAction);
  const [legalMoves, setLegalMoves] = useState([]);
  useEffect(() => {
    function makeMove(state) {
      let boardCopy = [...board];
      boardCopy[state.from] = "";
      boardCopy[state.to] = state.piece;
      dispatch({ type: "UPDATE_ENPASSANT_PIECES", board: board });
      return boardCopy;
    }
    if (state.isPondering) {
      const legalMoves = generateLegalMoves(
        state.piece,
        state.from,
        board,
        state.enPassantPieces,
      );
      setLegalMoves(legalMoves); // setting legal moves to highlight legal squares
    }
    if (!state.isPondering && state.to !== null) {
      setBoard(makeMove(state));
      dispatch({ type: "RESET" });
    }
  }, [state, board]);

  function handleGrab(index, piece) {
    dispatch({ type: "GRAB_PIECE", from: index, piece: piece });
  }

  function handleDrop(index) {
    dispatch({
      type: "DROP_PIECE",
      to: legalMoves.includes(index) ? index : null,
    });
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
    case "RESET": {
      return {
        ...initialBoardAction,
        enPassantPieces: state.enPassantPieces,
      };
    }
    case "UPDATE_ENPASSANT_PIECES": {
      const enPassantPieces = getEnPassantPieces(
        state.enPassantPieces,
        toBitboard(/P/, action.board),
      );
      return {
        ...state,
        enPassantPieces: enPassantPieces,
      };
    }
    default: {
      throw new Error("Unrecognized action type!");
    }
  }
}

function generateLegalMoves(piece, index, board, enPassantPieces) {
  let legalMoves = [];
  // the regex in allPieces matches all non space characters
  const allPieces = toBitboard(/^(?!\s*$).+/, board);
  const pieceBB = pieceBitboards[63 - index];
  const whitePieces = toBitboard(/w/, board);
  const whitePawns = toBitboard(/wP/, board);
  const blackPieces = toBitboard(/b/, board);
  const blackPawns = toBitboard(/bP/, board);
  switch (piece) {
    case "wP": {
      const legalMovesBB = generateWhitePawnMoves(
        whitePawns,
        blackPieces,
        allPieces,
        pieceBB,
        blackPawns,
        enPassantPieces,
      );
      return bitboardToList(legalMovesBB); // converts the bitboard of legal squares to list of legal squares (indeces)
    }
    case "bP": {
      const legalMovesBB = generateBlackPawnMoves(
        blackPawns,
        whitePieces,
        allPieces,
        pieceBB,
        whitePawns,
        enPassantPieces,
      );
      return bitboardToList(legalMovesBB); // converts the bitboard of legal squares to list of legal squares (indeces)
    }
    case "bK": {
      const blackKing = toBitboard(/bK/, board);
      const legalMovesBB = generateBlackKingMovesNoCheckFilter(
        blackKing,
        blackPieces,
      );

      return bitboardToList(legalMovesBB);
    }
    case "wK": {
      const whiteKing = toBitboard(/wK/, board);
      const legalMovesBB = generateWhiteKingMovesNoCheckFilter(
        whiteKing,
        whitePieces,
      );

      return bitboardToList(legalMovesBB);
    }
    case "wN": {
      const whiteKnights = toBitboard(/wN/, board);
      const legalMovesBB = generateKnightMoves(
        whiteKnights,
        whitePieces,
        pieceBB,
      );

      return bitboardToList(legalMovesBB);
    }
    case "bN": {
      const blackKnights = toBitboard(/bN/, board);
      const legalMovesBB = generateKnightMoves(
        blackKnights,
        blackPieces,
        pieceBB,
      );

      return bitboardToList(legalMovesBB);
    }
    case "wR": {
      const rooks = toBitboard(/wR/, board);
      const legalMovesBB = generateRookMoves(
        allPieces,
        whitePieces,
        rooks,
        pieceBB,
      );
      return bitboardToList(legalMovesBB);
    }

    case "bR": {
      const rooks = toBitboard(/bR/, board);
      const legalMovesBB = generateRookMoves(
        allPieces,
        blackPieces,
        rooks,
        pieceBB,
      );

      return bitboardToList(legalMovesBB);
    }

    case "wB": {
      const bishops = toBitboard(/wB/, board);
      const legalMovesBB = generateBishopMoves(
        allPieces,
        whitePieces,
        bishops,
        pieceBB,
      );
      return bitboardToList(legalMovesBB);
    }

    case "bB": {
      const bishops = toBitboard(/bB/, board);
      const legalMovesBB = generateBishopMoves(
        allPieces,
        blackPieces,
        bishops,
        pieceBB,
      );
      return bitboardToList(legalMovesBB);
    }

    case "wQ": {
      const queens = toBitboard(/wQ/, board);
      const legalMovesBB = generateQueenMoves(
        allPieces,
        whitePieces,
        queens,
        pieceBB,
      );
      return bitboardToList(legalMovesBB);
    }

    case "bQ": {
      const queens = toBitboard(/bQ/, board);
      const legalMovesBB = generateQueenMoves(
        allPieces,
        blackPieces,
        queens,
        pieceBB,
      );
      return bitboardToList(legalMovesBB);
    }
    default: {
      console.log("I haven't programmed legal moves for this piece type yet!");
    }
  }
  return legalMoves;
}

export default ChessBoard;
