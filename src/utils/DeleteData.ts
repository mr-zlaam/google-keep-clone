import { db } from "@/backend/db/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";

export default async function DeleteNote(id: string) {
  try {
    const deleteDocsRef = doc(db, "notes", id);
    await deleteDoc(deleteDocsRef);
  } catch (error: any) {
    console.log(error.message);
  }
}
