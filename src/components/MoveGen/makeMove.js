import { pieceBitboards } from "./moveGeneration";

function makeMove(bitboard, piece, move) {
  let newBitboard = bitboard;
  const fromSquareMask = 0b1111111n << 4n;
  const toSquareMask = 0b111111n << 10n;
  const toSquare = parseInt((move & toSquareMask) >> 10n);
  const fromSquare = parseInt((move & fromSquareMask) >> 4n);
  console.log("to square: ");
  console.log(toSquare);
  console.log("from square: ");
  console.log(fromSquare);
  // remove piece on from square
  newBitboard[piece] = newBitboard[piece] & ~pieceBitboards[toSquare];
  // add piece on to square
  newBitboard[piece] = newBitboard[piece] | pieceBitboards[fromSquare];

  return newBitboard;
}

export { makeMove };
