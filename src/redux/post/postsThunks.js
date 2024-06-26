import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  likePostSuccess,
  likePostFailure,
} from "./postsSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../config/FireBaseUrl";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { getRequest, postRequest } from "../../util/services";
import { axiosHaveAuth } from "../../util/axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(fetchPostsStart());
    try {
      console.log("da o day");
      const instance = axiosHaveAuth();
      const response = await instance.get("/api/get/allPosts");
      console.log("Check res", response);
      thunkAPI.dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      thunkAPI.dispatch(fetchPostsFailure(error.toString()));
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (
    { inputValue, img, setImg, setInputValue, setModalShow, authUser },
    { dispatch }
  ) => {
    try {
      console.log("Creating new post...");
      let url = "";
      if (img !== null) {
        const imgRef = ref(imageDb, `files/${v4()}`);
        const snapshot = await uploadBytes(imgRef, img.file);
        url = await getDownloadURL(snapshot.ref);
      }

      const body = {
        image: url,
        content: inputValue,
        author: authUser.user._id,
        likes: [],
        comments: [],
        share: [],
      };

      const response = await postRequest(`/api/new/post`, body, authUser);

      if (response) {
        console.log("Post created successfully:", response.data);
        toast.success("Tạo bài viết thành công");
        setImg(null);
        setInputValue("");
        setModalShow(false); // Đóng modal
        dispatch(addPost(response.data));
      }
    } catch (error) {
      toast.error("Tạo bài viết không thành công");
      console.error("Error creating post:", error);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const instance = axiosHaveAuth();
      const response = await instance.post(`/api/like/post`, {
        postId,
        userId,
      });
      thunkAPI.dispatch(likePostSuccess({ postId, userId }));
    } catch (error) {
      thunkAPI.dispatch(likePostFailure(error.toString()));
    }
  }
);
