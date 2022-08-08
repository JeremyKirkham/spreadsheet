import { configureStore } from "@reduxjs/toolkit";
import selectedCellReducer from "./slices/selectedCellSlice";
import cellValuesReducer from "./slices/cellValuesSlice";
import selectedRangeReducer from "./slices/selectedRangeSlice";
import columnWidthsReducer from "./slices/columnWidthsSlice";
import rowHeightsReducer from "./slices/rowHeightsSlice";

export const store = configureStore({
  reducer: {
    selectedCell: selectedCellReducer,
    cellValues: cellValuesReducer,
    selectedRange: selectedRangeReducer,
    rowHeights: rowHeightsReducer,
    columnWidths: columnWidthsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
