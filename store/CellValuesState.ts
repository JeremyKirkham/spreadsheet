import { CellKey } from "../lib/xAndYtoPos";

export interface CellPos {
  index: number;
  label: string;
  isAbsolute: boolean;
}
export interface CellCoord {
  label: string;
  row: CellPos;
  column: CellPos;
}

export type CellFormat = "text" | "number" | "currency" | "percentage";

export interface Meta {
  format?: CellFormat;
  font?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  textDecoration?: "none" | "strikethrough";
  backgroundColor?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  horizontalAlign?: string;
}

export type MetaKeys = keyof Meta;

export interface CellValue {
  rawValue: string;
  calculatedValue?: string;
  reliesOnCells?: string[];
  meta: Meta;
}

// Define a type for the slice state
export interface CellValuesState {
  value: {
    [key: CellKey]: CellValue;
  };
}
