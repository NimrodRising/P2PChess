import { useState } from "react";
import Square from "./Square";
import { useEffect } from "react";
import {
  generateBlackPawnMoves,
  generateWhitePawnMoves,
  pieceBitboards,
} from "./MoveGen/moveGeneration";
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

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  return (
    <div className="border w-2/3 max-w-screen-sm border-black">
      <div className=" grid grid-cols-8">
        {board.map((piece, index) => (
          <Square
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
  const zeroStr = "0";
  binaryStr = zeroStr.repeat(numLeadingZeroes) + binaryStr;
  let legalMoves = [];
  let index, file, rank, newIndex;
  for (const el of binaryStr) {
    if (el === "1") {
      index = binaryStr.indexOf(el);
      file = 7 - (index % 8);
      rank = Math.floor(index / 8);
      newIndex = 8 * rank + file;
      console.log(
        `Old Index: ${index} New Index: ${newIndex} \n Rank: ${rank} File: ${file}`
      );
      legalMoves.push([rank, file]);
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
      legalMovesBitboard = generateBlackPawnMoves(
        whitePawnsAll,
        blackPieces,
        allPieces,
        pieceBitboards[newIndex]
      );
      break;
    // convertBitBoard to list of coords and return
    case "bP":
      console.log("black pawn recognized");
      console.log(
        blackPawnsAll.toString(2),
        "\n",
        whitePieces.toString(2),
        "\n",
        allPieces.toString(2),
        "\n",
        pieceBitboards[newIndex].toString(2)
      );
      legalMovesBitboard = generateWhitePawnMoves(
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
  console.log(legalMovesBitboard.toString(2));
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

export default ChessBoard;
