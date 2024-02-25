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
  0b000010000000000000000000000000000000000000000000000000000000000n,
  0b0001000000000000000000000000000000000000000000000000000000000000n,
  0b0010000000000000000000000000000000000000000000000000000000000000n,
  0b0100000000000000000000000000000000000000000000000000000000000000n,
  0b1000000000000000000000000000000000000000000000000000000000000000n,
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
let whitePawns =
  0b0000000000000000000000000000000000000000000000001111111100000000n;
let whiteRooks =
  0b0000000000000000000000000000000000000000000000000000000010000001n;
let whiteKnights =
  0b0000000000000000000000000000000000000000000000000000000001000010n;
let whiteBishops =
  0b0000000000000000000000000000000000000000000000000000000000100100n;
let whiteQueens =
  0b0000000000000000000000000000000000000000000000000000000000001000n;
let whiteKing =
  0b0000000000000000000000000000000000000000000000000000000000010000n;
let blackPawns =
  0b0000000011111111000000000000000000000000000000000000000000000000n;
let blackRooks =
  0b1000000100000000000000000000000000000000000000000000000000000000n;
let blackKnights =
  0b0100001000000000000000000000000000000000000000000000000000000000n;
let blackBishops =
  0b0010010000000000000000000000000000000000000000000000000000000000n;
let blackQueens =
  0b0000100000000000000000000000000000000000000000000000000000000000n;
let blackKing =
  0b0001000000000000000000000000000000000000000000000000000000000000n;

let allWhitePieces =
  whitePawns |
  whiteRooks |
  whiteKnights |
  whiteBishops |
  whiteQueens |
  whiteKing;
let allBlackPieces =
  blackPawns |
  blackRooks |
  blackKnights |
  blackBishops |
  blackQueens |
  blackKing;
let allPieces = allWhitePieces | allBlackPieces;
allPieces;

function generateWhitePawnMoves(whitePawnsAll, blackPieces, allPieces, piece) {
  const whitePawns = whitePawnsAll & piece;
  const whitePawnOneStep = (whitePawns << 8n) & ~allPieces;
  const whitePawnTwoStep = (whitePawnOneStep << 8n) & maskRank[3] & ~allPieces;
  const whiteSteps = whitePawnOneStep | whitePawnTwoStep;
  const whitePawnLeftAttacks = (whitePawns << 9n) & ~maskFile[0] & blackPieces;
  const whitePawnRightAttacks = (whitePawns << 7n) & ~maskFile[7] & blackPieces;
  const whiteMoves = whiteSteps | whitePawnLeftAttacks | whitePawnRightAttacks;

  return whiteMoves.toString(2);
}

function generateBlackPawnMoves(blackPawnsAll, whitePieces, allPieces, piece) {
  const blackPawns = blackPawnsAll & piece;
  const blackPawnOneStep = (blackPawns >> 8n) & ~allPieces;
  const blackPawnTwoStep = (blackPawnOneStep >> 8n) & maskRank[4] & ~allPieces;
  const blackSteps = blackPawnOneStep | blackPawnTwoStep;
  const blackPawnLeftAttacks = (blackPawns >> 7n) & ~maskFile[7] & whitePieces;
  const blackPawnRightAttacks = (blackPawns >> 9n) & ~maskFile[0] & whitePieces;
  const blackMoves = blackSteps | blackPawnLeftAttacks | blackPawnRightAttacks;

  return blackMoves.toString(2);
}

export { generateBlackPawnMoves, generateWhitePawnMoves, pieceBitboards };
