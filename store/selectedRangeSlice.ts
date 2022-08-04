import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { posToXAndY } from "../lib/xAndYtoPos";

type CellKey = string;

interface Position {
  x: number;
  y: number;
}

// Define a type for the slice state
interface SelectedRangeState {
  value: {
    mouseDown: boolean;
    start?: Position;
    end?: Position;
  };
}

// Define the initial state using that type
const initialState: SelectedRangeState = {
  value: {
    mouseDown: false,
  },
};

export const selectedRangeSlice = createSlice({
  name: "selectedRange",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCell: (state, action: PayloadAction<CellKey>) => {
      const pos = posToXAndY(action.payload);
      let start = state.value.start;
      let end = state.value.end;
      if (!start || pos.x < start.x || pos.y < start.y) {
        start = pos;
      }
      if (!end) {
        end = pos;
      } else if (pos.x > end.x || pos.y > end.y) {
        end = pos;
      }
      if (state.value.mouseDown) {
        state.value = {
          start,
          end,
          mouseDown: state.value.mouseDown,
        };
      }
    },
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.value = {
        ...state.value,
        mouseDown: action.payload,
      };
    },
    clearRange: (state) => {
      state.value = {
        start: undefined,
        end: undefined,
        mouseDown: false,
      };
    },
  },
});

export const { addCell, clearRange, setMouseDown } = selectedRangeSlice.actions;

export const selectedRange = (state: RootState) => state.selectedRange.value;

export default selectedRangeSlice.reducer;
