import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { CellKey, posToXAndY } from "../../lib/xAndYtoPos";
import { indexToAlpha } from "../../lib/indexToAlpha";
import { CellValuesState, MetaKeys } from "../lib/CellValuesState";
import { addColumnToLeft as addColumnToLeftFn } from "../lib/addColumnToLeft";
import { calculateFromRaw } from "../lib/calculateFromRaw";

// Define the initial state using that type
const initialState: CellValuesState = {
  value: {},
};

export const cellValuesSlice = createSlice({
  name: "cellValue",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addColumnToLeft: (state, action: PayloadAction<{ key: string }>) => {
      const newState = addColumnToLeftFn(state, action.payload.key);
      state.value = newState;
    },
    addColumnToRight: (state, action: PayloadAction<{ key: string }>) => {
      const newKey = indexToAlpha(posToXAndY(action.payload.key).x + 1);
      cellValuesSlice.caseReducers.addColumnToLeft(state, {
        ...action,
        payload: { key: newKey },
      });
    },
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
        key: CellKey;
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

export const { addColumnToLeft, addColumnToRight, setCellValue, setCellMeta } =
  cellValuesSlice.actions;

export const cellValues = (state: RootState) => state.cellValues.value;

export default cellValuesSlice.reducer;
