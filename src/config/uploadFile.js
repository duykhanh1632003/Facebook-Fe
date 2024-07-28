import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "./config";

const uploadFile = async (filePath, file) => {
  const storageRef = ref(imageDb, filePath);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully");
    return downloadURL;
  } catch (e) {
    console.error("Error uploading file:", e);
  }
};

export default uploadFile;
