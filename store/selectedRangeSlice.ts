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
    originalStart?: Position;
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
      if (!state.value.mouseDown) {
        return;
      }
      const pos = posToXAndY(action.payload);
      const stateStart = state.value.start;
      const stateEnd = state.value.end;
      let originalStart = state.value.originalStart;
      let start = stateStart;
      let end = stateEnd;
      if (!originalStart) {
        originalStart = pos;
      }
      if (!start) {
        start = pos;
      } else {
        start = {
          x: pos.x < originalStart!.x ? pos.x : originalStart!.x,
          y: pos.y < originalStart!.y ? pos.y : originalStart!.y,
        };
      }
      if (!end) {
        end = pos;
      } else {
        end = {
          x: pos.x > originalStart.x ? pos.x : originalStart.x,
          y: pos.y > originalStart.y ? pos.y : originalStart.y,
        };
      }
      const newValue = {
        originalStart,
        start,
        end,
        mouseDown: state.value.mouseDown,
      };
      state.value = newValue;
    },
    setMouseDown: (state, action: PayloadAction<boolean>) => {
      state.value = {
        ...state.value,
        mouseDown: action.payload,
      };
    },
    clearRange: (state) => {
      state.value = {
        originalStart: undefined,
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
