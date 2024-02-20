import Square from "./Square";

let board = [
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
];

function ChessBoard() {
  return (
    <div className="border w-2/3 max-w-screen-sm border-black">
      <div className=" grid grid-cols-8">
        {[].concat(...board).map((piece, index) => (
          <Square key={piece} piece={piece} number={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default ChessBoard;
