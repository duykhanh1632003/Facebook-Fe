import { ref, deleteObject } from "firebase/storage";
import { imageDb } from "./FireBaseUrl";

const deleteFile = async (fileUrl) => {
  try {
    // Extract file path from the URL
    console.log("Original File URL:", fileUrl);
    let filePath = fileUrl.split("/o/")[1].split("?alt=media")[0];
    filePath = decodeURIComponent(filePath); // Decode the file path
    console.log("Decoded File Path:", filePath);

    const fileRef = ref(imageDb, filePath);

    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (e) {
    console.error("Error deleting file:", e);
  }
};

export default deleteFile;
