import { indexToAlpha, alphaToIndex } from "./indexToAlpha";

export interface Position {
  x: number;
  y: number;
}

export type CellKey = string;

const splitChar = "-";

export const xAndYToPos = (x: number, y: number): CellKey => {
  return `${indexToAlpha(x)}${splitChar}${y}`;
};

export const posToXAndY = (pos: CellKey): Position => {
  const split = pos.split(splitChar);
  return {
    x: alphaToIndex(split[0]),
    y: parseInt(split[1]),
  };
};
