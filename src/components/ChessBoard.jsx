import { useState } from "react";
import Square from "./Square";
import { useEffect } from "react";

let initialBoard = [
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
];

function pawnInfluence(board, from, side) {
  const fromRank = from[0];
  const fromFile = from[1];
  const targetFile = fromFile;
  let targetRank;
  if (fromRank === 1 || fromRank === 6) {
    targetRank = side === "w" ? fromRank + 2 : fromRank - 2;
  } else {
    targetRank = side === "w" ? fromRank + 1 : fromRank - 1;
  }
  const pawnInfluence = board.map((row, rank) =>
    row.map((square, file) => {
      if (rank === fromRank && file === fromFile) return "p";
      if (rank === targetRank && file === targetFile) return "m";
      return "";
    })
  );
  return pawnInfluence;
}

pawnInfluence(initialBoard, [0, 1], "b");

function generateLegalMoves(board, piece, from, side) {
  switch (piece) {
    case "wP":
    case "bP":
      return pawnMoves(board, from, side);
    default:
      return [];
  }
}

function pawnMoves(board, from, side) {
  if (side === "w") {
    let legalMoves = [];
    const nextRank = from[0] + 1;
    if (nextRank > 7 || board[nextRank][from[1]]) return legalMoves;
    legalMoves.push([nextRank, from[1]]);
    if (nextRank === 2) legalMoves.push([nextRank + 1, from[1]]);
    return legalMoves;
  } else {
    let legalMoves = [];
    const nextRank = from[0] - 1;
    if (nextRank < 0 || board[nextRank][from[1]]) return legalMoves;
    legalMoves.push([nextRank, from[1]]);
    if (nextRank === 5) legalMoves.push([nextRank - 1, from[1]]);
    return legalMoves;
  }
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
      setLegalMoves(
        generateLegalMoves(
          board,
          pieceInHand.piece,
          pieceInHand.from,
          pieceInHand.side
        )
      );
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
