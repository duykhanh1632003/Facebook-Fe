import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./post/postsSlice";
import avatarReducer from "./profile/avatarSlice"; // Renamed for clarity

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    avatar: avatarReducer,
  },
});
