const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export const indexToAlpha = (index: number) => {
  return alphabet[index - 1];
};
