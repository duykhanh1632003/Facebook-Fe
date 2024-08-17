import { createSlice } from "@reduxjs/toolkit";
import { updateProfilePicture } from "./avatarThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateUserAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePicture.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUserAvatar } = userSlice.actions;

export default userSlice.reducer;
