import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Parser as FormulaParser } from "hot-formula-parser";
import { xAndYToPos } from "../lib/xAndYtoPost";

interface CellPos {
  index: number;
  label: string;
  isAbsolute: boolean;
}
interface CellCoord {
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
interface CellValuesState {
  value: {
    [key: string]: CellValue;
  };
}

// Define the initial state using that type
const initialState: CellValuesState = {
  value: {},
};

const calculateFromRaw = (state: CellValuesState, rawValue: string) => {
  const parser = new FormulaParser();
  let reliesOnCells: string[] = [];

  const fn = (cellCoord: CellCoord, done: any) => {
    const cellId = xAndYToPos(
      cellCoord.column.index + 1,
      cellCoord.row.index + 1
    );
    reliesOnCells.push(cellId);
    done(state.value[cellId].calculatedValue);
  };

  parser.on("callCellValue", fn);

  let calculatedValue = rawValue;
  if (rawValue.charAt(0) == "=") {
    const calculated = parser.parse(rawValue.substring(1));
    calculatedValue = calculated.error ?? calculated.result;
  }

  return {
    calculatedValue,
    reliesOnCells,
  };
};

export const cellValuesSlice = createSlice({
  name: "cellValue",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCellMeta: (
      state,
      action: PayloadAction<{
        key: string;
        metaKey: MetaKeys;
        metaValue: any;
      }>
    ) => {
      state.value = {
        ...state.value,
        [action.payload.key]: {
          ...state.value[action.payload.key],
          meta: {
            ...state.value[action.payload.key].meta,
            [action.payload.metaKey]: action.payload.metaValue,
          },
        },
      };
    },
    setCellValue: (
      state,
      action: PayloadAction<{
        key: string;
        rawValue: string;
        propagateChanges: boolean;
      }>
    ) => {
      const rawValue = action.payload.rawValue;
      const rs = calculateFromRaw(state, rawValue);
      const currentVal = state.value[action.payload.key];

      const newVal = {
        rawValue,
        calculatedValue: rs.calculatedValue,
        reliesOnCells: rs.reliesOnCells,
        meta: currentVal?.meta ?? {},
      };

      state.value = {
        ...state.value,
        [action.payload.key]: newVal,
      };

      if (action.payload.propagateChanges) {
        Object.keys(state.value)
          .filter((objKey) =>
            state.value[objKey].reliesOnCells?.includes(action.payload.key)
          )
          .map((c) => {
            cellValuesSlice.caseReducers.setCellValue(
              state,
              setCellValue({
                key: c,
                rawValue: state.value[c].rawValue,
                propagateChanges: true,
              })
            );
          });
      }
    },
  },
});

export const { setCellValue, setCellMeta } = cellValuesSlice.actions;

export const cellValues = (state: RootState) => state.cellValues.value;

export default cellValuesSlice.reducer;
