import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./FireBaseUrl";

const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export default deleteDocument;
