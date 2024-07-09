import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";
import { imageDb } from "../config/FireBaseUrl";
import { useAuthContext } from "./AuthContext";
import { axiosHaveAuth } from "../util/axios";

const StoriesContext = createContext();

export const useStoriesContext = () => useContext(StoriesContext);

export const StoriesProvider = ({ children }) => {
  const [createImage, setCreatImage] = useState(false);
  const [buttonCreateImageText, setButtonCreateImageText] = useState(true);
  const [rightImageCrop, setRightImageCrop] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [nameValueBg, setNameValueBg] = useState(1);
  const [nameValueFont, setNameValueFont] = useState(1);
  const [valueInput, setValueInput] = useState("");
  const [leftTextStr, setLeftTextStr] = useState(false);
  const [runFunction, setRunFunction] = useState(false);
  const [img, setImg] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const fileInputRef = useRef();
  const editorRef = useRef(null);

  const { authUser } = useAuthContext();
  const instance = axiosHaveAuth();
  const navigate = useNavigate();

  const handleChangeNoi = () => {
    setRunFunction(true);
  };

  useEffect(() => {
    const uploadImageAndCreateStory = async () => {
      if (editorRef.current) {
        const canvas = editorRef.current.getImage();
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "profile_picture.png", {
              type: "image/png",
            });
            const imgRef = ref(imageDb, `avatars/${v4()}`);
            const snapshot = await uploadBytes(imgRef, file);
            const url = await getDownloadURL(snapshot.ref);

            // API call to create image story
            await createImageStory(authUser.user._id, url);
          }
        });
      }
    };

    if (runFunction) {
      if (rightImageCrop) {
        uploadImageAndCreateStory();
      } else {
        // API call to create text story
        createTextStory(
          authUser.user._id,
          valueInput,
          nameValueFont,
          nameValueBg
        );
      }
      setRunFunction(false);
    }
  }, [
    runFunction,
    authUser.user._id,
    rightImageCrop,
    valueInput,
    nameValueFont,
    nameValueBg,
    setRunFunction,
  ]);

  const createTextStory = async (userId, text, font, background) => {
    try {
      const response = await instance.post("/api/stories/text", {
        userId,
        text,
        font,
        background,
      });

      if (response.status !== 200) {
        console.error("Failed to create text story");
      } else {
        console.log("Text story created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to create text story", error);
    }
  };

  const createImageStory = async (userId, imageUrl) => {
    try {
      const response = await instance.post("/api/stories/image", {
        userId,
        imageUrl,
      });

      if (response.status !== 200) {
        console.error("Failed to create image story");
      } else {
        console.log("Image story created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to create image story", error);
    }
  };

  return (
    <StoriesContext.Provider
      value={{
        createImage,
        setCreatImage,
        buttonCreateImageText,
        setButtonCreateImageText,
        rightImageCrop,
        setRightImageCrop,
        cancel,
        setCancel,
        nameValueBg,
        setNameValueBg,
        nameValueFont,
        setNameValueFont,
        valueInput,
        setValueInput,
        leftTextStr,
        setLeftTextStr,
        runFunction,
        setRunFunction,
        img,
        setImg,
        scale,
        setScale,
        rotate,
        setRotate,
        fileInputRef,
        editorRef,
        handleChangeNoi,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};
