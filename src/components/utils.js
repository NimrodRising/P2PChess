function arraysEqual(a1, a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

function doesContainSubArray(arr, subArr) {
  for (let el of arr) {
    if (arraysEqual(el, subArr)) {
      return true;
    }
  }
  return false;
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

function toBitboard(regex, board) {
  const binaryString = board
    .map((piece) => (piece.search(regex) === -1 ? "0" : "1"))
    .join("");
  return binaryStringToBigInt(binaryString);
}

// takes bitboard object - containing bitboards for each piece type - and converts it to array consumable by component
function bitboardToArray(boardState) {
  const board = new Array(64);
  for (const pieceType in boardState) {
    const binaryStringIncomplete = boardState[pieceType].toString(2);
    const padding = "0".repeat(64 - binaryStringIncomplete.length);
    const binaryString = padding + binaryStringIncomplete;
    const binaryStringArray = binaryString.split("");
    binaryStringArray.forEach((el, index) => {
      if (el === "1") {
        board[index] = pieceType;
      } else if (!board[index]) {
        board[index] = "";
      }
    });
  }
  return board;
}

// takes moves array and returns array of the "to squares" there-encoded
function getSquaresFromMoves(moves) {
  // moves are in format: from (6 bits) to (6 bits) flags (4 bits)
  const mask = 0b111111n;
  const squares = moves.map((move) => {
    return 63 - parseInt(((mask << 4n) & move) >> 4n);
  });
  return squares;
}

function bitboardToList(bitboard) {
  const binaryString = bitboard.toString(2);
  let padding;
  if (64 - binaryString.length < 0) {
    throw new Error(
      `binary String ${binaryString} exceeds allowed length by ${binaryString.length - 64}`,
    );
  } else {
    padding = "0".repeat(64 - binaryString.length);
  }
  const list = [...(padding + binaryString)].reduce((acc, char, index) => {
    if (char === "1") {
      acc.push(index);
    }
    return acc;
  }, []);
  return list;
}

export {
  arraysEqual,
  doesContainSubArray,
  binaryStringToBigInt,
  toBitboard,
  bitboardToList,
  bitboardToArray,
  getSquaresFromMoves,
};
