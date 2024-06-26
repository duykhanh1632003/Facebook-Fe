import { createSlice } from "@reduxjs/toolkit";
import { createNewPost, likePost } from "./postsThunks";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    fetchPostsStart(state) {
      state.status = "loading";
    },
    fetchPostsSuccess(state, action) {
      state.status = "succeeded";
      state.page += 1;
      state.hasMore = action.payload.length > 0;
    },
    fetchPostsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetPosts(state) {
      state.page = 1;
      state.hasMore = true;
    },
    likePostSuccess(state, action) {
      const { postId, userId } = action.payload;
      // Logic cho việc like post
    },
    likePostFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      // Logic thêm bài viết mới
    });
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  likePostSuccess,
  likePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
