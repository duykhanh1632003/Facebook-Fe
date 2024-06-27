import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../config/FireBaseUrl";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { postRequest } from "../../util/services"; // Assume you have this function to handle patch requests
import { updateUserAvatar } from "./avatarSlice";

export const updateProfilePicture = createAsyncThunk(
  "user/updateProfilePicture",
  async ({ file, authUser, setAuthUser }, { dispatch }) => {
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
        const user = authUser;
        user.user.avatar = url;
        console.log("Check user", user);
        setAuthUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(updateUserAvatar(url));
      }
    } catch (error) {
      toast.error("Cập nhật ảnh đại diện không thành công");
      console.error("Error updating profile picture:", error);
    }
  }
);
