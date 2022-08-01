import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { posToXAndY } from "../lib/xAndYtoPost";

// Define a type for the slice state
interface SelectedCellState {
  value: string;
}

// Define the initial state using that type
const initialState: SelectedCellState = {
  value: "",
};

export const selectedCellSlice = createSlice({
  name: "selectedCell",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = selectedCellSlice.actions;

export const selectedCell = (state: RootState) => state.selectedCell.value;
export const selectedCellPosition = (state: RootState) =>
  posToXAndY(state.selectedCell.value);

export default selectedCellSlice.reducer;
