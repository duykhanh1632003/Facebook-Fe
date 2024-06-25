import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./post/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
