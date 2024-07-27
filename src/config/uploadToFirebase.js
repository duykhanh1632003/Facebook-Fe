// src/uploadToFirebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "./FireBaseUrl";

const uploadToFirebase = async (file) => {
  const storageRef = ref(imageDb, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export default uploadToFirebase;
