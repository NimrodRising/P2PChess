import { pieceBitboards } from "./moveGeneration";

function parseFlags(move) {
  let flagValues = {};

  flagValues["promotion"] = (move & 0b1000n) === 0b0n ? false : true;
  flagValues["castling"] = (move & 0b0010n) === 0b0n ? false : true;
  flagValues["doublepush"] = (move & 0b0100n) === 0b0n ? false : true;
  flagValues["enpassant"] = (move & 0b0001n) === 0b0n ? false : true;

  return flagValues;
}

function capturePiece(bitboard, captureSquareBitboard) {
  let newBitboard = bitboard;
  for (const pieceType in bitboard) {
    if ((captureSquareBitboard & bitboard[pieceType]) !== 0b0n) {
      newBitboard[pieceType] = newBitboard[pieceType] & ~captureSquareBitboard;
    }
  }
  return newBitboard;
}

function makeMove(bitboard, piece, move, metadata) {
  const { castling, enpassant, doublepush, promotion } = parseFlags(move);
  let newMetadata = metadata;
  let newBitboard = bitboard;
  const fromSquareMask = 0b1111111n << 10n;
  const toSquareMask = 0b111111n << 4n;
  const toSquare = parseInt((move & toSquareMask) >> 4n);
  const fromSquare = parseInt((move & fromSquareMask) >> 10n);
  // remove piece on from-square
  newBitboard[piece] = newBitboard[piece] & ~pieceBitboards[fromSquare];

  // update meta data
  if (doublepush) {
    newMetadata["enPassantPiece"] = pieceBitboards[toSquare];
  } else {
    newMetadata["enPassantPiece"] = 0b0n;
  }

  newMetadata["side"] = metadata["side"] === "w" ? "b" : "w";

  if (piece.includes("K")) {
    newMetadata["canCastle"]["short"] = false;
    newMetadata["canCastle"]["long"] = false;
  } else if (piece.includes("R")) {
    newMetadata["canCastle"]["short"] =
      (piece.includes("b") && fromSquare === 56) ||
      (piece.includes("w") && fromSquare === 0)
        ? false
        : newMetadata["canCastle"]["short"];
    newMetadata["canCastle"]["long"] =
      (piece.includes("b") && fromSquare === 63) ||
      (piece.includes("w") && fromSquare === 7)
        ? false
        : newMetadata["canCastle"]["long"];
  }

  let captureSquareBitboard;
  if (enpassant) {
    captureSquareBitboard = piece.includes("w")
      ? pieceBitboards[toSquare] >> 8n
      : pieceBitboards[toSquare] << 8n;
  } else {
    captureSquareBitboard = pieceBitboards[toSquare];
  }

  newBitboard = capturePiece(newBitboard, captureSquareBitboard);

  if (promotion) {
    newBitboard[piece] = newBitboard[piece] & ~pieceBitboards[toSquare];
    const queen = piece === "wP" ? "wQ" : "bQ";
    newBitboard[queen] = newBitboard[queen] | pieceBitboards[toSquare];
  } else {
    newBitboard[piece] = newBitboard[piece] | pieceBitboards[toSquare];
  }
  if (castling) {
    const rook = piece === "wK" ? "wR" : "bR";
    const isLongCastle = toSquare > fromSquare;
    const rookFrom = isLongCastle ? fromSquare + 4 : fromSquare - 3;
    const rookTo = isLongCastle ? fromSquare + 1 : fromSquare - 1;

    newBitboard[piece] = newBitboard[piece] & ~pieceBitboards[fromSquare];
    newBitboard[piece] = newBitboard[piece] | pieceBitboards[toSquare];
    newBitboard[rook] = newBitboard[rook] & ~pieceBitboards[rookFrom];
    newBitboard[rook] = newBitboard[rook] | pieceBitboards[rookTo];
  }
  return { newBitboard, newMetadata };
}

export { makeMove };
