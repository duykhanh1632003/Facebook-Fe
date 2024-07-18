import { createContext, useContext, useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { axiosHaveAuth } from "../util/axios";
import { useAuthContext } from "./AuthContext";

const VideoPostContext = createContext();

export const useVideoPostContext = () => useContext(VideoPostContext);

export const VideoPostProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [videoPosts, setVideoPosts] = useState([]);
  const instance = axiosHaveAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/api/get/allVideo");
      setVideoPosts(response.data.metadata);
    };

    fetchData();
  }, []);

  const uploadVideoToFirebase = async (videoFile, content) => {
    if (!authUser.user) {
      throw new Error("User not authenticated");
    }

    const videoRef = ref(storage, `videos/${videoFile.name}`);
    await uploadBytes(videoRef, videoFile);
    const videoURL = await getDownloadURL(videoRef);

    const formData = new FormData();
    formData.append("content", content);
    formData.append("videoURL", videoURL);
    formData.append("author", authUser.user._id);

    try {
      const res = await instance.post("/api/upload/video/firebase", formData);

      if (res.data) {
        toast.success("Video uploaded successfully!");
        setVideoPosts((prevPosts) => [...prevPosts, res.data]);
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      throw error;
    }
  };

  return (
    <VideoPostContext.Provider value={{ videoPosts, uploadVideoToFirebase }}>
      {children}
    </VideoPostContext.Provider>
  );
};
