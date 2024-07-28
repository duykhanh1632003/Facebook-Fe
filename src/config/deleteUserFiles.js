import { db } from "./config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const deleteUserFiles = async (userId) => {
  const q = query(collection(db, "files"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    console.log(`Document with ID ${doc.id} deleted`);
  });
};

export default deleteUserFiles;
