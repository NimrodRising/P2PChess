import { makeMove } from "./makeMove.js";

const emptyBitboard = {
  wP: 0b0n,
  wB: 0b0n,
  wN: 0b0n,
  wR: 0b0n,
  wQ: 0b0n,
  wK: 0b0n,
  bP: 0b0n,
  bB: 0b0n,
  bN: 0b0n,
  bR: 0b0n,
  bQ: 0b0n,
  bK: 0b0n,
};

const pieceBitboards = [
  0b0000000000000000000000000000000000000000000000000000000000000001n,
  0b0000000000000000000000000000000000000000000000000000000000000010n,
  0b0000000000000000000000000000000000000000000000000000000000000100n,
  0b0000000000000000000000000000000000000000000000000000000000001000n,
  0b0000000000000000000000000000000000000000000000000000000000010000n,
  0b0000000000000000000000000000000000000000000000000000000000100000n,
  0b0000000000000000000000000000000000000000000000000000000001000000n,
  0b0000000000000000000000000000000000000000000000000000000010000000n,
  0b0000000000000000000000000000000000000000000000000000000100000000n,
  0b0000000000000000000000000000000000000000000000000000001000000000n,
  0b0000000000000000000000000000000000000000000000000000010000000000n,
  0b0000000000000000000000000000000000000000000000000000100000000000n,
  0b0000000000000000000000000000000000000000000000000001000000000000n,
  0b0000000000000000000000000000000000000000000000000010000000000000n,
  0b0000000000000000000000000000000000000000000000000100000000000000n,
  0b0000000000000000000000000000000000000000000000001000000000000000n,
  0b0000000000000000000000000000000000000000000000010000000000000000n,
  0b0000000000000000000000000000000000000000000000100000000000000000n,
  0b0000000000000000000000000000000000000000000001000000000000000000n,
  0b0000000000000000000000000000000000000000000010000000000000000000n,
  0b0000000000000000000000000000000000000000000100000000000000000000n,
  0b0000000000000000000000000000000000000000001000000000000000000000n,
  0b0000000000000000000000000000000000000000010000000000000000000000n,
  0b0000000000000000000000000000000000000000100000000000000000000000n,
  0b0000000000000000000000000000000000000001000000000000000000000000n,
  0b0000000000000000000000000000000000000010000000000000000000000000n,
  0b0000000000000000000000000000000000000100000000000000000000000000n,
  0b0000000000000000000000000000000000001000000000000000000000000000n,
  0b0000000000000000000000000000000000010000000000000000000000000000n,
  0b0000000000000000000000000000000000100000000000000000000000000000n,
  0b0000000000000000000000000000000001000000000000000000000000000000n,
  0b0000000000000000000000000000000010000000000000000000000000000000n,
  0b0000000000000000000000000000000100000000000000000000000000000000n,
  0b0000000000000000000000000000001000000000000000000000000000000000n,
  0b0000000000000000000000000000010000000000000000000000000000000000n,
  0b0000000000000000000000000000100000000000000000000000000000000000n,
  0b0000000000000000000000000001000000000000000000000000000000000000n,
  0b0000000000000000000000000010000000000000000000000000000000000000n,
  0b0000000000000000000000000100000000000000000000000000000000000000n,
  0b0000000000000000000000001000000000000000000000000000000000000000n,
  0b0000000000000000000000010000000000000000000000000000000000000000n,
  0b0000000000000000000000100000000000000000000000000000000000000000n,
  0b0000000000000000000001000000000000000000000000000000000000000000n,
  0b0000000000000000000010000000000000000000000000000000000000000000n,
  0b0000000000000000000100000000000000000000000000000000000000000000n,
  0b0000000000000000001000000000000000000000000000000000000000000000n,
  0b0000000000000000010000000000000000000000000000000000000000000000n,
  0b0000000000000000100000000000000000000000000000000000000000000000n,
  0b0000000000000001000000000000000000000000000000000000000000000000n,
  0b0000000000000010000000000000000000000000000000000000000000000000n,
  0b0000000000000100000000000000000000000000000000000000000000000000n,
  0b0000000000001000000000000000000000000000000000000000000000000000n,
  0b0000000000010000000000000000000000000000000000000000000000000000n,
  0b0000000000100000000000000000000000000000000000000000000000000000n,
  0b0000000001000000000000000000000000000000000000000000000000000000n,
  0b0000000010000000000000000000000000000000000000000000000000000000n,
  0b0000000100000000000000000000000000000000000000000000000000000000n,
  0b0000001000000000000000000000000000000000000000000000000000000000n,
  0b0000010000000000000000000000000000000000000000000000000000000000n,
  0b0000100000000000000000000000000000000000000000000000000000000000n,
  0b0001000000000000000000000000000000000000000000000000000000000000n,
  0b0010000000000000000000000000000000000000000000000000000000000000n,
  0b0100000000000000000000000000000000000000000000000000000000000000n,
  0b1000000000000000000000000000000000000000000000000000000000000000n,
  0b0000000000000000000000000000000000000000000000000000000000000000n,
];
const maskRank = [
  0b0000000000000000000000000000000000000000000000000000000011111111n,
  0b0000000000000000000000000000000000000000000000001111111100000000n,
  0b0000000000000000000000000000000000000000111111110000000000000000n,
  0b0000000000000000000000000000000011111111000000000000000000000000n,
  0b0000000000000000000000001111111100000000000000000000000000000000n,
  0b0000000000000000111111110000000000000000000000000000000000000000n,
  0b0000000011111111000000000000000000000000000000000000000000000000n,
  0b1111111100000000000000000000000000000000000000000000000000000000n,
];
const maskFile = [
  0b1000000010000000100000001000000010000000100000001000000010000000n,
  0b0100000001000000010000000100000001000000010000000100000001000000n,
  0b0010000000100000001000000010000000100000001000000010000000100000n,
  0b0001000000010000000100000001000000010000000100000001000000010000n,
  0b0000100000001000000010000000100000001000000010000000100000001000n,
  0b0000010000000100000001000000010000000100000001000000010000000100n,
  0b0000001000000010000000100000001000000010000000100000001000000010n,
  0b0000000100000001000000010000000100000001000000010000000100000001n,
];

function rayNorth(currentSquare, incompleteRay) {
  const nextSquare = currentSquare << 8n;
  if (nextSquare > BigInt(2 ** 62 + 2 ** 63) || nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return rayNorth(nextSquare, ray);
  }
}

function rayWest(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare << 1n) & ~maskFile[7];
  if (nextSquare === 0b0n || nextSquare > BigInt(2 ** 63 + 2 ** 62)) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return rayWest(nextSquare, ray);
  }
}

function raySouth(currentSquare, incompleteRay) {
  const nextSquare = currentSquare >> 8n;
  if (nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return raySouth(nextSquare, ray);
  }
}

function rayEast(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare >> 1n) & ~maskFile[0];
  if (nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return rayEast(nextSquare, ray);
  }
}

function rayNorthEast(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare << 7n) & ~maskFile[0];
  if (nextSquare > BigInt(2 ** 63 + 2 ** 62) || nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return rayNorthEast(nextSquare, ray);
  }
}

function rayNorthWest(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare << 9n) & ~maskFile[7];
  if (nextSquare > BigInt(2 ** 63 + 2 ** 62) || nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return rayNorthWest(nextSquare, ray);
  }
}

function raySouthEast(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare >> 9n) & ~maskFile[0];
  if (nextSquare === 0b0n || nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return raySouthEast(nextSquare, ray);
  }
}

function raySouthWest(currentSquare, incompleteRay) {
  const nextSquare = (currentSquare >> 7n) & ~maskFile[7];
  if (nextSquare === 0b0n) {
    return incompleteRay;
  } else {
    const ray = incompleteRay | nextSquare;
    return raySouthWest(nextSquare, ray);
  }
}

function bitScanForward(bitboard) {
  let index = 0;
  while (index <= 63) {
    if ((pieceBitboards[index] & bitboard) !== 0b0n) {
      return index;
    } else {
      index += 1;
    }
  }
  return 64;
}

function bitScanReverse(bitboard) {
  let index = 63;
  while (index >= 0) {
    if ((pieceBitboards[index] & bitboard) !== 0b0n) {
      return index;
    } else {
      index -= 1;
    }
  }
  return 64;
}

function generateQueenMoves(
  allPieces,
  allPiecesOfColor,
  queens,
  piece,
  query = "",
) {
  const queen = query === "squares" ? piece : queens & piece;
  const queenBishopMoves = generateBishopMoves(
    allPieces,
    allPiecesOfColor,
    queen,
    piece,
    query,
  );
  const queenRookMoves = generateRookMoves(
    allPieces,
    allPiecesOfColor,
    queen,
    piece,
    query,
  );
  if (query === "squares") return queenBishopMoves | queenRookMoves;

  const moves = queenRookMoves.concat(queenBishopMoves);

  return moves;
}

function generateBishopMoves(
  allPieces,
  allPiecesOfColor,
  bishops,
  piece,
  query = "",
) {
  const bishop = query === "squares" ? piece : bishops & piece;
  const northEastEmptyBoard = rayNorthEast(bishop, 0b0n);
  const northEastBlockingPieces = northEastEmptyBoard & allPieces;
  const northEastFirstBlockingPiece =
    pieceBitboards[bitScanForward(northEastBlockingPieces)];
  const blockingRayNorthEast = rayNorthEast(northEastFirstBlockingPiece, 0b0n);
  const northEastIncomplete =
    (northEastEmptyBoard & ~blockingRayNorthEast) | northEastFirstBlockingPiece;
  const northEast = northEastIncomplete & ~allPiecesOfColor;
  const northWestEmptyBoard = rayNorthWest(bishop, 0b0n);
  const northWestBlockingPieces = northWestEmptyBoard & allPieces;
  const northWestFirstBlockingPiece =
    pieceBitboards[bitScanForward(northWestBlockingPieces)];
  const blockingRayNorthWest = rayNorthWest(northWestFirstBlockingPiece, 0b0n);
  const northWestIncomplete =
    (northWestEmptyBoard & ~blockingRayNorthWest) | northWestFirstBlockingPiece;
  const northWest = northWestIncomplete & ~allPiecesOfColor;
  const southEastEmptyBoard = raySouthEast(bishop, 0b0n);
  const southEastBlockingPieces = southEastEmptyBoard & allPieces;
  const southEastFirstBlockingPiece =
    pieceBitboards[bitScanReverse(southEastBlockingPieces)];
  const blockingRaySouthEast = raySouthEast(southEastFirstBlockingPiece, 0b0n);
  const southEastIncomplete =
    (southEastEmptyBoard & ~blockingRaySouthEast) | southEastFirstBlockingPiece;
  const southEast = southEastIncomplete & ~allPiecesOfColor;
  const southWestEmptyBoard = raySouthWest(bishop, 0b0n);
  const southWestBlockingPieces = southWestEmptyBoard & allPieces;
  const southWestFirstBlockingPiece =
    pieceBitboards[bitScanReverse(southWestBlockingPieces)];
  const blockingRaySouthWest = raySouthWest(southWestBlockingPieces, 0b0n);
  const southWestIncomplete =
    (southWestEmptyBoard & ~blockingRaySouthWest) | southWestFirstBlockingPiece;
  const southWest = southWestIncomplete & ~allPiecesOfColor;

  if (query === "squares") {
    return northEast | northWest | southEast | southWest;
  }

  const moves = [
    ...encodeMoves(
      piece,
      northEast | northWest | southEast | southWest,
      0,
      0,
      0,
      0,
    ),
  ];
  return moves;
}

function generateRookMoves(
  allPieces,
  allPiecesOfColor,
  rooks,
  piece,
  query = "",
) {
  const rook = query === "squares" ? piece : rooks & piece;
  const northEmptyBoard = rayNorth(rook, 0b0n);
  const northBlockingPieces = northEmptyBoard & allPieces;
  const northFirstBlockingPiece =
    pieceBitboards[bitScanForward(northBlockingPieces)];
  const blockingRayNorth = rayNorth(northFirstBlockingPiece, 0b0n);
  const northIncomplete =
    (northEmptyBoard & ~blockingRayNorth) | northFirstBlockingPiece;
  const north = northIncomplete & ~allPiecesOfColor;
  const eastEmptyBoard = rayEast(rook, 0b0n);
  const eastBlockingPieces = eastEmptyBoard & allPieces;
  const eastFirstBlockingPiece =
    pieceBitboards[bitScanReverse(eastBlockingPieces)];
  const blockingRayEast = rayEast(eastFirstBlockingPiece, 0b0n);
  const eastIncomplete =
    (eastEmptyBoard & ~blockingRayEast) | eastFirstBlockingPiece;
  const east = eastIncomplete & ~allPiecesOfColor;
  const southEmptyBoard = raySouth(rook, 0b0n);
  const southBlockingPieces = southEmptyBoard & allPieces;
  const southFirstBlockingPiece =
    pieceBitboards[bitScanReverse(southBlockingPieces)];
  const blockingRaySouth = raySouth(southFirstBlockingPiece, 0b0n);
  const southIncomplete =
    (southEmptyBoard & ~blockingRaySouth) | southFirstBlockingPiece;
  const south = southIncomplete & ~allPiecesOfColor;
  const westEmptyBoard = rayWest(rook, 0b0n);
  const westBlockingPieces = westEmptyBoard & allPieces;
  const westFirstBlockingPiece =
    pieceBitboards[bitScanForward(westBlockingPieces)];
  const blockingRayWest = rayWest(westFirstBlockingPiece, 0b0n);
  const westIncomplete =
    (westEmptyBoard & ~blockingRayWest) | westFirstBlockingPiece;
  const west = westIncomplete & ~allPiecesOfColor;

  const rookMoves = north | east | south | west;

  if (query === "squares") return rookMoves;

  const moves = [...encodeMoves(piece, rookMoves, 0, 0, 0, 0)];
  return moves;
}

function encodeMoves(
  piece,
  bitboard,
  promotion,
  doublePush,
  castling,
  enpassant,
) {
  // from, to, flags
  let move = 0b0n;
  let moves = [];
  const promotionFlag = 0b0000000000001000n;
  const doublePushFlag = 0b0000000000000100n;
  const castlingFlag = 0b0000000000000010n;
  const enpassantFlag = 0b0000000000000001n;
  if (promotion) move = move | promotionFlag;
  if (doublePush) move = move | doublePushFlag;
  if (castling) move = move | castlingFlag;
  if (enpassant) move = move | enpassantFlag;
  // get index of piece
  let indexOfFrom = 0;
  while ((pieceBitboards[indexOfFrom] & piece) === 0n) {
    indexOfFrom += 1;
  }

  move = move | (BigInt(indexOfFrom) << 10n);
  let currentMove;
  let indexOfTo = 0;
  // go through each valid move and encode it with the 'common move'
  for (const pieceBitboard of pieceBitboards) {
    if ((pieceBitboard & bitboard) !== 0b0n) {
      currentMove = move | (BigInt(indexOfTo) << 4n);
      moves.push(currentMove);
    }
    indexOfTo += 1;
  }
  return moves;
}

function generateWhitePawnMoves(
  whitePawnsAll,
  blackPieces,
  allPieces,
  piece,
  blackPawns,
  enPassantPieces,
  query = "",
) {
  const whitePawns = query === "squares" ? piece : whitePawnsAll & piece;
  const whitePawnOneStep = (whitePawns << 8n) & ~allPieces;
  const whitePawnTwoStep = (whitePawnOneStep << 8n) & maskRank[3] & ~allPieces;
  const whiteSteps = whitePawnOneStep | whitePawnTwoStep;
  const whitePawnLeftAttacks = (whitePawns << 9n) & ~maskFile[7] & blackPieces;
  const whitePawnRightAttacks = (whitePawns << 7n) & ~maskFile[0] & blackPieces;
  const enPassantLeftPiece =
    ((blackPawns & enPassantPieces) >> 1n) &
    whitePawns &
    maskRank[4] &
    whitePawns;
  const enPassantRightPiece =
    ((blackPawns & enPassantPieces) << 1n) &
    whitePawns &
    maskRank[4] &
    whitePawns;
  let enPassantLeft = 0b0n;
  let enPassantRight = 0b0n;
  if (enPassantLeftPiece !== 0b0n) {
    enPassantLeft = enPassantLeftPiece << 9n;
  }
  if (enPassantRightPiece !== 0b0n) {
    enPassantRight = enPassantRightPiece << 7n;
  }

  const whiteMoves =
    whiteSteps |
    whitePawnLeftAttacks |
    whitePawnRightAttacks |
    enPassantLeft |
    enPassantRight;
  if (
    whiteMoves >
    BigInt(0b1100000000000000000000000000000000000000000000000000000000000000n)
  ) {
    return [];
  }
  let promotionFlag = 0;
  if (
    (BigInt(
      2 ** 64 +
        2 ** 63 +
        2 ** 62 +
        2 ** 61 +
        2 ** 60 +
        2 ** 59 +
        2 ** 58 +
        2 ** 57,
    ) &
      whiteMoves) !==
    0b0n
  ) {
    promotionFlag = 1;
  }

  if (query === "squares") {
    return whitePawnLeftAttacks | whitePawnRightAttacks;
  }
  const moves = [
    ...encodeMoves(piece, whitePawnOneStep, promotionFlag, 0, 0, 0),
    ...encodeMoves(piece, whitePawnTwoStep, promotionFlag, 1, 0, 0),
    ...encodeMoves(
      piece,
      whitePawnLeftAttacks | whitePawnRightAttacks,
      promotionFlag,
      0,
      0,
      0,
    ),
    ...encodeMoves(piece, enPassantRight | enPassantLeft, 0, 0, 0, 1),
  ];

  return moves;
}

function generateBlackPawnMoves(
  blackPawnsAll,
  whitePieces,
  allPieces,
  piece,
  whitePawns,
  enPassantPieces,
  query = "",
) {
  const blackPawns = query === "squares" ? piece : blackPawnsAll & piece;
  const blackPawnOneStep = (blackPawns >> 8n) & ~allPieces;
  const blackPawnTwoStep = (blackPawnOneStep >> 8n) & maskRank[4] & ~allPieces;
  const blackPawnLeftAttacks = (blackPawns >> 9n) & ~maskFile[0] & whitePieces;
  const blackPawnRightAttacks = (blackPawns >> 7n) & ~maskFile[7] & whitePieces;
  const enPassantLeftPiece =
    ((whitePawns & enPassantPieces) << 1n) & maskRank[3] & blackPawns;
  const enPassantRightPiece =
    ((whitePawns & enPassantPieces) >> 1n) & maskRank[3] & blackPawns;
  let enPassantLeft = 0b0n;
  let enPassantRight = 0b0n;
  if (enPassantLeftPiece !== 0b0n) {
    enPassantLeft = enPassantLeftPiece >> 9n;
  }
  if (enPassantRightPiece !== 0b0n) {
    enPassantRight = enPassantRightPiece >> 7n;
  }

  if (query === "squares") {
    return blackPawnLeftAttacks | blackPawnRightAttacks;
  }

  let moves = [
    // flags: promotion, double push, castling, en passant
    ...encodeMoves(piece, blackPawnOneStep, 0, 0, 0, 0),
    ...encodeMoves(piece, blackPawnTwoStep, 0, 1, 0, 0),
    ...encodeMoves(
      piece,
      blackPawnLeftAttacks | blackPawnRightAttacks,
      0,
      0,
      0,
      0,
    ),
    ...encodeMoves(piece, enPassantLeft | enPassantRight, 0, 0, 0, 1),
  ];

  return moves;
}

function generateWhiteKingMovesNoCheckFilter(
  whiteKing,
  allWhitePieces,
  canCastle = true,
  query = "",
) {
  if (query === "squares") {
    allWhitePieces = 0b0n;
  }
  let whiteKingDown = (whiteKing >> 8n) & ~allWhitePieces;
  let whiteKingUp = (whiteKing << 8n) & ~allWhitePieces;
  let whiteKingLeft = (whiteKing << 1n) & ~maskFile[7] & ~allWhitePieces;
  let whiteKingRight = (whiteKing >> 1n) & ~maskFile[0] & ~allWhitePieces;
  let whiteKingUpLeft = (whiteKing << 9n) & ~maskFile[7] & ~allWhitePieces;
  let whiteKingUpRight = (whiteKing << 7n) & ~maskFile[0] & ~allWhitePieces;
  let whiteKingDownLeft = (whiteKing >> 7n) & ~maskFile[7] & ~allWhitePieces;
  let whiteKingDownRight = (whiteKing >> 9n) & ~maskFile[0] & ~allWhitePieces;
  let max =
    BigInt(0b1100000000000000000000000000000000000000000000000000000000000000n);
  whiteKingDown = whiteKingDown > max ? 0b0n : whiteKingDown;
  whiteKingUp = whiteKingUp > max ? 0b0n : whiteKingUp;
  whiteKingLeft = whiteKingLeft > max ? 0b0n : whiteKingLeft;
  whiteKingRight = whiteKingRight > max ? 0b0n : whiteKingRight;
  whiteKingUpLeft = whiteKingUpLeft > max ? 0b0n : whiteKingUpLeft;
  whiteKingUpRight = whiteKingUpRight > max ? 0b0n : whiteKingUpRight;
  whiteKingDownLeft = whiteKingDownLeft > max ? 0b0n : whiteKingDownLeft;
  whiteKingDownRight = whiteKingDownRight > max ? 0b0n : whiteKingDownRight;
  const whiteMoves =
    whiteKingDown |
    whiteKingUp |
    whiteKingLeft |
    whiteKingRight |
    whiteKingDownLeft |
    whiteKingDownRight |
    whiteKingUpLeft |
    whiteKingUpRight;

  let castleMoves = 0b0n;

  const shortBetween = (whiteKing >> 1n) | (whiteKing >> 2n);
  const longBetween = (whiteKing << 1n) | (whiteKing << 2n) | (whiteKing << 3n);

  if (canCastle.short && (shortBetween & allWhitePieces) === 0b0n) {
    castleMoves = castleMoves | (whiteKing >> 2n);
  }

  if (canCastle.long && (longBetween & allWhitePieces) === 0b0n) {
    castleMoves = castleMoves | (whiteKing << 2n);
  }

  if (query === "squares") {
    console.log(whiteMoves);
    return whiteMoves;
  }
  const moves = [
    ...encodeMoves(whiteKing, whiteMoves, 0, 0, 0, 0),
    ...encodeMoves(whiteKing, castleMoves, 0, 0, 1, 0),
  ];
  return moves;
}

function generateKnightMoves(knights, allPiecesOfColor, piece, query = "") {
  //        3     2
  //      4          1
  //
  //      5          8
  //        6     7
  const knight = query === "squares" ? piece : knights & piece;
  let knightOne =
    (knight << 6n) & ~maskFile[1] & ~maskFile[0] & ~allPiecesOfColor;
  let knightTwo = (knight << 15n) & ~maskFile[0] & ~allPiecesOfColor;
  let knightThree = (knight << 17n) & ~maskFile[7] & ~allPiecesOfColor;
  let knightFour =
    (knight << 10n) & ~maskFile[7] & ~maskFile[6] & ~allPiecesOfColor;
  let knightFive =
    (knight >> 6n) & ~maskFile[7] & ~maskFile[6] & ~allPiecesOfColor;
  let knightSix = (knight >> 15n) & ~maskFile[7] & ~allPiecesOfColor;
  let knightSeven = (knight >> 17n) & ~maskFile[0] & ~allPiecesOfColor;
  let knightEight =
    (knight >> 10n) & ~maskFile[0] & ~maskFile[1] & ~allPiecesOfColor;
  let max =
    BigInt(0b1100000000000000000000000000000000000000000000000000000000000000n);
  knightOne = knightOne > max ? 0b0n : knightOne;
  knightTwo = knightTwo > max ? 0b0n : knightTwo;
  knightThree = knightThree > max ? 0b0n : knightThree;
  knightFour = knightFour > max ? 0b0n : knightFour;
  knightFive = knightFive > max ? 0b0n : knightFive;
  knightSix = knightSix > max ? 0b0n : knightSix;
  knightSeven = knightSeven > max ? 0b0n : knightSeven;
  knightEight = knightEight > max ? 0b0n : knightEight;

  const knightMoves =
    knightOne |
    knightTwo |
    knightThree |
    knightFour |
    knightFive |
    knightSix |
    knightSeven |
    knightEight;

  if (query === "squares") {
    return knightMoves;
  }
  const moves = [...encodeMoves(piece, knightMoves, 0, 0, 0, 0)];
  return moves;
}

function generatePseudoLegalMoves(piece, square, bitboard, metadata, thequery) {
  const whitePieces =
    bitboard["wP"] |
    bitboard["wN"] |
    bitboard["wR"] |
    bitboard["wB"] |
    bitboard["wK"] |
    bitboard["wQ"];
  const blackPieces =
    bitboard["bP"] |
    bitboard["bN"] |
    bitboard["bR"] |
    bitboard["bB"] |
    bitboard["bK"] |
    bitboard["bQ"];
  const allPieces = whitePieces | blackPieces;
  const enPassantPieces = metadata["enPassantPiece"];
  const canCastle = metadata["canCastle"];

  switch (piece) {
    case "wP":
      return generateWhitePawnMoves(
        bitboard["wP"],
        blackPieces,
        allPieces,
        square,
        bitboard["bP"],
        enPassantPieces,
        thequery,
      );

    case "wB":
      return generateBishopMoves(
        allPieces,
        whitePieces,
        bitboard["wB"],
        square,
        thequery,
      );

    case "wN":
      return generateKnightMoves(bitboard["wN"], whitePieces, square, thequery);

    case "wR":
      return generateRookMoves(
        allPieces,
        whitePieces,
        bitboard["wR"],
        square,
        thequery,
      );

    case "wK":
      return generateWhiteKingMovesNoCheckFilter(
        bitboard["wK"],
        whitePieces,
        canCastle,
        thequery,
      );

    case "wQ":
      return generateQueenMoves(
        allPieces,
        whitePieces,
        bitboard["wQ"],
        square,
        thequery,
      );

    case "bP":
      const moves = generateBlackPawnMoves(
        bitboard["bP"],
        whitePieces,
        allPieces,
        square,
        bitboard["wP"],
        enPassantPieces,
        thequery,
      );
      return moves;

    case "bB":
      return generateBishopMoves(
        allPieces,
        blackPieces,
        bitboard["bB"],
        square,
        thequery,
      );

    case "bN":
      let movies = generateKnightMoves(
        bitboard["bN"],
        blackPieces,
        square,
        thequery,
      );
      return movies;
    case "bR":
      return generateRookMoves(
        allPieces,
        blackPieces,
        bitboard["bR"],
        square,
        thequery,
      );

    case "bK":
      return generateWhiteKingMovesNoCheckFilter(
        bitboard["bK"],
        blackPieces,
        canCastle,
        thequery,
      );

    case "bQ":
      return generateQueenMoves(
        allPieces,
        blackPieces,
        bitboard["bQ"],
        square,
        thequery,
      );

    default:
      console.log("I have not programmed the moves for this piece type yet.");
  }
}

function printSquares(squares) {
  const squaresStringIncomplete = squares.toString(2);
  const squaresString =
    "0".repeat(64 - squaresStringIncomplete.length) + squaresStringIncomplete;
  console.log("------------------------------");
  let row = "";
  for (let i = 0; i <= squaresString.length; i++) {
    if (row.length == 16) {
      let rowNum = Math.floor(i / 8);
      console.log(rowNum + " " + row);
      row = "";
    }
    if (squaresString[i] === "0") {
      row = row + " 0";
    } else {
      row = row + " 1";
    }
  }
}

function isSquareAttacked(pieceBB, bitboard, side) {
  const pieceTypes = ["R", "B", "N", "K", "Q", "P"];
  const defaultMetadata = {
    canCastle: { short: false, long: false },
    enPassantPiece: 0b0n,
    side: side,
  };
  const opponentSide = side === "w" ? "b" : "w";
  for (let i = 0; i < pieceTypes.length; i++) {
    const piece = side + pieceTypes[i];
    const opponentPiece = opponentSide + pieceTypes[i];
    const kingReplacedBB = structuredClone(bitboard);
    if (piece !== side + "K") {
      kingReplacedBB[piece] =
        kingReplacedBB[piece] | kingReplacedBB[side + "K"];
      kingReplacedBB[side + "K"] = 0b0n;
    }
    const pseudoLegalMoves = generatePseudoLegalMoves(
      piece,
      pieceBB,
      kingReplacedBB,
      defaultMetadata,
      "squares",
    );

    if (opponentPiece === "bP") {
      console.log("LEGAL MOVES");
      printSquares(pseudoLegalMoves);
      console.log("OPPONENT PIECD");
      printSquares(bitboard[opponentPiece]);
    }

    if ((pseudoLegalMoves & bitboard[opponentPiece]) !== 0b0n) {
      return true;
    }
  }

  return false;
}

function generateLegalMoves(piece, square, originalBitboard, originalMetadata) {
  const metadata = structuredClone(originalMetadata);
  const bitboard = structuredClone(originalBitboard);

  const pseudoLegalMoves = generatePseudoLegalMoves(
    piece,
    square,
    bitboard,
    metadata,
  );

  const side = metadata["side"];
  let legalMoves = [];
  const pseudoLegalMovesLength = pseudoLegalMoves ? pseudoLegalMoves.length : 0;
  let isKingAttackedNow = isSquareAttacked(
    bitboard[side + "K"],
    structuredClone(bitboard),
    side,
  );

  const king = bitboard[side + "K"];
  const castlingLongBetweenSquares = [king << 1n, king << 2n, king << 3n];
  const castlingShortBetweenSquares = [king >> 1n, king >> 2n];

  for (let i = 0; i < pseudoLegalMovesLength; i++) {
    if ((pseudoLegalMoves[i] & 0b0000000000000010n) !== 0b0n) {
      if (isKingAttackedNow) {
        continue;
      } else {
        let isAttacked = false;
        if ((pseudoLegalMoves[i] & (0b111111n << 10n)) < king) {
          castlingShortBetweenSquares.forEach((square) => {
            if (isSquareAttacked(square, structuredClone(bitboard), side)) {
              isAttacked = true;
            }
          });
          if (isAttacked) continue;
        } else if ((pseudoLegalMoves[i] & (0b111111n << 10n)) > king) {
          castlingLongBetweenSquares.forEach((square) => {
            if (isSquareAttacked(square, structuredClone(bitboard), side)) {
              isAttacked = true;
            }
          });
          if (isAttacked) continue;
        }
      }
    }
    const tempBitboard = structuredClone(bitboard);
    const defaultMetadata = {
      canCastle: { short: false, long: false },
      enPassantPieces: 0b0n,
    };
    const { newBitboard } = makeMove(
      tempBitboard,
      piece,
      pseudoLegalMoves[i],
      defaultMetadata,
    );

    const kingBitboard = newBitboard[side + "K"];
    const isKingAttacked = isSquareAttacked(kingBitboard, newBitboard, side);

    if (!isKingAttacked) legalMoves.push(pseudoLegalMoves[i]);
  }
  return legalMoves;
}

export { pieceBitboards, generateLegalMoves };
