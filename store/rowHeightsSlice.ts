import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

// Define a type for the slice state
interface RowState {
  value: {
    [key: string]: number;
  };
}

const rowCount = 100;
const rows = Array.from(Array(rowCount).keys());
const initialRowHeight = 24;

const rowObj = rows.map((row, i) => {
  return { [row]: initialRowHeight };
});

// Define the initial state using that type
const initialState: RowState = {
  value: Object.assign({}, ...rowObj),
};

export const rowHeightsSlice = createSlice({
  name: "rowHeights",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRowHeight: (
      state,
      action: PayloadAction<{ key: string; height: number }>
    ) => {
      state.value = {
        ...state.value,
        [action.payload.key]: action.payload.height,
      };
    },
  },
});

export const { setRowHeight } = rowHeightsSlice.actions;

export const rowHeights = (state: RootState) => state.rowHeights.value;

export default rowHeightsSlice.reducer;
