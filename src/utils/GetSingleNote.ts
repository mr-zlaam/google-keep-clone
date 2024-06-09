import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/backend/db/firebase.config";

export async function GetSingleNote(slug: string) {
  const collectionRef = collection(db, "notes");
  const q = query(collectionRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } else {
    throw new Error("Document not found");
  }
}
