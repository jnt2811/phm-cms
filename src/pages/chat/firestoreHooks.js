import { useEffect, useState } from "react";
import { firestore } from "../../firebase";

export const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = firestore.collection(collection);

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        collectionRef.where(
          condition.fieldName,
          condition.operator,
          condition.compareValue
        );
      }
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(docs);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};
