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
};
