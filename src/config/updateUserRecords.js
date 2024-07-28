import { db } from "./config";
import { doc, updateDoc } from "firebase/firestore";

const updateUserRecords = async (collectionName, docId, data) => {
  const docRef = doc(db, collectionName, docId);

  try {
    await updateDoc(docRef, data);
    console.log("Document successfully updated");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export default updateUserRecords;
