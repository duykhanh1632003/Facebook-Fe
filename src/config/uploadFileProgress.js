import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { imageDb } from "./config";

const uploadFileProgress = (filePath, file, onProgress) => {
  const storageRef = ref(imageDb, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    },
    (error) => {
      console.error("Error uploading file:", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File uploaded successfully");
      return downloadURL;
    }
  );
};

export default uploadFileProgress;
