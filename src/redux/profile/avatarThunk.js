import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../config/FireBaseUrl";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { postRequest } from "../../util/services"; // Assume you have this function to handle patch requests
import { updateUserAvatar } from "./avatarSlice";

export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async (file, { dispatch, getState }) => {
    const state = getState();
    const { authUser } = state.auth;
    try {
      const imgRef = ref(imageDb, `avatars/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);

      const body = {
        avatar: url,
      };

      const response = await postRequest(
        `/api/user/update/avatar`,
        body,
        authUser
      );

      if (response) {
        toast.success("Cập nhật ảnh đại diện thành công");
        dispatch(updateUserAvatar(url));
      }
    } catch (error) {
      toast.error("Cập nhật ảnh đại diện không thành công");
      console.error("Error updating profile picture:", error);
    }
  }
);
