const alphaRanges = ["", "A"];
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alphaRanges
  .map((ar) => alpha.map((x) => `${ar}${String.fromCharCode(x)}`))
  .flat();

export const indexToAlpha = (index: number) => {
  return alphabet[index - 1];
};

export const alphaToIndex = (alpha: string) => {
  return alphabet.indexOf(alpha) + 1;
};
