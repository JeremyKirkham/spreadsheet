import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Parser as FormulaParser } from "hot-formula-parser";

export interface CellValue {
  rawValue: string;
  calculatedValue?: string;
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

export const cellValuesSlice = createSlice({
  name: "cellValue",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCellValue: (
      state,
      action: PayloadAction<{
        key: string;
        rawValue: string;
        calculatedValue?: string;
      }>
    ) => {
      state.value = {
        ...state.value,
        [action.payload.key]: {
          rawValue: action.payload.rawValue,
          calculatedValue: action.payload.calculatedValue,
        },
      };
    },
  },
});

export const { setCellValue } = cellValuesSlice.actions;

export const cellValues = (state: RootState) => state.cellValues.value;

export default cellValuesSlice.reducer;
