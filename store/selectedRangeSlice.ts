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
      const stateStart = state.value.start;
      const stateEnd = state.value.end;
      let start = stateStart;
      let end = stateEnd;
      if (!start) {
        start = pos;
      } else {
        start = {
          x: stateStart!.x < pos.x ? stateStart!.x : pos.x,
          y: stateStart!.y < pos.y ? stateStart!.y : pos.y,
        };
      }
      if (!end) {
        end = pos;
      } else {
        end = {
          x: stateEnd!.x > pos.x ? stateEnd!.x : pos.x,
          y: stateEnd!.y > pos.y ? stateEnd!.y : pos.y,
        };
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
