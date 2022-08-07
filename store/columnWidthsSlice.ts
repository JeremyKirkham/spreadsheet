import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

// Define a type for the slice state
interface ColumnState {
  value: {
    [key: string]: number;
  };
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const initialColWidth = 110;

const alphaObj = alphabet.map((alpha, i) => {
  return { [alpha]: initialColWidth };
});

// Define the initial state using that type
const initialState: ColumnState = {
  value: Object.assign({}, ...alphaObj),
};

export const columnWidthsSlice = createSlice({
  name: "columnWidths",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColumnWidth: (
      state,
      action: PayloadAction<{ key: string; width: number }>
    ) => {
      state.value = {
        ...state.value,
        [action.payload.key]: action.payload.width,
      };
    },
  },
});

export const { setColumnWidth } = columnWidthsSlice.actions;

export const columnWidths = (state: RootState) => state.columnWidths.value;

export default columnWidthsSlice.reducer;
