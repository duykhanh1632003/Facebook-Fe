import { createSlice } from "@reduxjs/toolkit";
import { createNewPost, likePost } from "./postsThunks";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchPostsStart(state) {
      state.status = "loading";
    },
    fetchPostsSuccess(state, action) {
      state.status = "succeeded";
      state.list = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    addPost(state, action) {
      state.list.unshift(action.payload);
    },
    likePostSuccess(state, action) {
      const { postId, userId } = action.payload;
      const post = state.list.find((post) => post._id === postId);
      if (post) {
        post.likes.push(userId);
      }
    },
    likePostFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.list.unshift(action.payload);
    });
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  likePostSuccess,
  likePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
