import { configureStore } from "@reduxjs/toolkit";
import selectedCellReducer from "./selectedCellSlice";
import cellValuesReducer from "./cellValuesSlice";

export const store = configureStore({
  reducer: {
    selectedCell: selectedCellReducer,
    cellValues: cellValuesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
