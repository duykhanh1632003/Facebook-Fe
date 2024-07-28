import { ref, deleteObject } from "firebase/storage";
import { imageDb } from "./FireBaseUrl";

const deleteFile = async (filePath) => {
  const fileRef = ref(imageDb, filePath);

  try {
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (e) {
    console.error("Error deleting file:", e);
  }
};

export default deleteFile;
