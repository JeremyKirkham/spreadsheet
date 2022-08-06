export interface Position {
  x: number;
  y: number;
}

export type CellKey = string;

const splitChar = "-";

export const xAndYToPos = (x: number, y: number): CellKey => {
  return `${x}${splitChar}${y}`;
};

export const posToXAndY = (pos: CellKey): Position => {
  const split = pos.split(splitChar);
  return {
    x: parseInt(split[0]),
    y: parseInt(split[1]),
  };
};
