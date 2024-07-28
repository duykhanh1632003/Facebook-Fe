import { useState, useEffect } from "react";
import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(docsArray);
    };

    fetchData();
  }, [collectionName]);

  return documents;
};

export default useFirestore;
