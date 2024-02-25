import { useState } from "react";
import Square from "./Square";
import { useEffect } from "react";
import {
  generateBlackPawnMoves,
  generateWhitePawnMoves,
  pieceBitboards,
} from "./MoveGen/moveGeneration";

let initialBoard = [
  ["wR", "wN", "wB", "wK", "wQ", "wB", "wN", "wR"],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["bR", "bN", "bB", "bK", "bQ", "bB", "bN", "bR"],
];

function binaryStringToBigInt(binaryString) {
  const chunkSize = 32;
  const chunks = [];

  for (let i = 0; i < binaryString.length; i += chunkSize) {
    chunks.push(binaryString.slice(i, i + chunkSize));
  }

  return chunks.reduce((result, chunk) => {
    return (result << BigInt(chunk.length)) + BigInt("0b" + chunk);
  }, 0n);
}

function generateAllPieceBitboard(board) {
  let binaryStr = "";
  for (const row of board) {
    for (const el of row) {
      if (el.length === 0 || !el.includes("P")) {
        binaryStr += "0";
      } else {
        binaryStr += "1";
      }
    }
  }

  let bitBoard = binaryStringToBigInt(binaryStr);
  return bitBoard;
}

function generateColoredBitboard(board, color) {
  let binaryStr = "";
  for (const row of board) {
    for (const el of row) {
      if (el.includes(color) && el.includes("P")) {
        binaryStr += "1";
      } else {
        binaryStr += "0";
      }
    }
  }

  let bitBoard = binaryStringToBigInt(binaryStr);
  return bitBoard;
}

function bitboardToList(bitboard) {
  let binaryStr = bitboard.toString(2);
  const numLeadingZeroes = 64 - binaryStr.length;
  console.log("num leading:");
  console.log(numLeadingZeroes);
  const zeroStr = "0";
  binaryStr = zeroStr.repeat(numLeadingZeroes) + binaryStr;
  let legalMoves = [];
  let index, file, rank, newIndex;
  for (const el of binaryStr) {
    if (el === "1") {
      index = binaryStr.indexOf(el);

      file = Math.floor(index / 8);
      rank = 7 - (index % 8);
      newIndex = 8 * rank + file;

      legalMoves.push([file, rank]);
    }
  }
  return legalMoves;
}
function generateLegalMoves(board, pieceInHand) {
  let file = pieceInHand.index - Math.floor(pieceInHand.index / 8) * 8;
  let rank = 7 - Math.floor(pieceInHand.index / 8);
  const newIndex = 8 * rank + file;
  let legalMovesBitboard;
  const whitePawnsAll = generateColoredBitboard(board, "w");
  const blackPawnsAll = generateColoredBitboard(board, "b");
  const blackPieces = generateColoredBitboard(board, "b");
  const whitePieces = generateColoredBitboard(board, "w");
  const allPieces = generateAllPieceBitboard(board);
  const piece = pieceInHand.piece;
  switch (piece) {
    case "wP":
      legalMovesBitboard = generateWhitePawnMoves(
        whitePawnsAll,
        blackPieces,
        allPieces,
        pieceBitboards[newIndex]
      );
      break;
    // convertBitBoard to list of coords and return
    case "bP":
      legalMovesBitboard = generateBlackPawnMoves(
        blackPawnsAll,
        whitePieces,
        allPieces,
        pieceBitboards[newIndex]
      );
      // convertBitBoard to list of coords and return
      break;
    default:
      legalMovesBitboard = 0b0n;
      break;
  }
  const legalMoves = bitboardToList(legalMovesBitboard);
  return legalMoves;
}

function arraysEqual(a1, a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function containsSubArray(arr, subArr) {
  for (let el of arr) {
    if (arraysEqual(el, subArr)) {
      return true;
    }
  }
  return false;
}

function ChessBoard({ mousePos, isDragging, setIsDragging }) {
  const [board, setBoard] = useState(initialBoard);
  const [move, setMove] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [pieceInHand, setPieceInHand] = useState(null);
  const [legalMoves, setLegalMoves] = useState(null);

  useEffect(() => {
    if (pieceInHand) {
      setMove({
        ...pieceInHand,
        to: hovered,
      });
      setLegalMoves(generateLegalMoves(board, pieceInHand));
      setPieceInHand(null);
    }
    if (move && !isDragging) {
      if (containsSubArray(legalMoves, [move.to[0], move.to[1]])) {
        setBoard((currBoard) => {
          // Create a deep copy of the current board
          const newBoard = JSON.parse(JSON.stringify(currBoard));

          // Update the "from" square to empty
          newBoard[move.from[0]][move.from[1]] = "";

          // Update the "to" square with the moved piece
          newBoard[move.to[0]][move.to[1]] = move.piece;

          return newBoard;
        });
      }
    }
  }, [move, isDragging, pieceInHand]);
  return (
    <div
      onMouseUp={() => {
        setIsDragging(false);
      }}
      className="border w-2/3 max-w-screen-sm border-black"
    >
      <div className=" grid grid-cols-8">
        {[].concat(...board).map((piece, index) => (
          <Square
            isLegalSquare={
              legalMoves
                ? containsSubArray(legalMoves, [
                    Math.floor(index / 8),
                    index % 8,
                  ])
                : false
            }
            setLegalMoves={setLegalMoves}
            setPieceInHand={setPieceInHand}
            hovered={hovered}
            setHovered={setHovered}
            setMove={setMove}
            setIsDragging={setIsDragging}
            isDragging={isDragging}
            mousePos={mousePos}
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

export default ChessBoard;
