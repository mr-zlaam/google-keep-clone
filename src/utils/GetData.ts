import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/backend/db/firebase.config";

interface UploadedByTypes {
  id: string;
  name: string;
}
interface Note {
  id: string;
  title: string;
  description: string;
  time: any;
  uploadedBy: UploadedByTypes;
}

export const collectionRef = collection(db, "notes");
export async function GetData(sortBy?: keyof Note): Promise<Note[]> {
  const currentUser = auth?.currentUser;
  try {
    const response = await getDocs(collectionRef);
    let notesData: Note[] = [];
    response.forEach((docs) => {
      notesData.push({ id: docs.id, ...docs.data() } as Note);
    });

    // Sort the data if sortBy parameter is provided
    if (sortBy) {
      notesData = notesData.sort((a, b) => {
        const valueA = a[sortBy].toLowerCase();
        const valueB = b[sortBy].toLowerCase();
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
    }

    return notesData.filter(
      (notes) => currentUser?.uid === notes.uploadedBy.id
    );
  } catch (error: any) {
    console.log(error.message);
    return []; // Return empty array if error occurs
  }
}
