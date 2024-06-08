import { collection, getDocs } from "firebase/firestore";
import { db } from "@/backend/db/firebase.config";

interface Note {
  id: string;
  title: string;
  description: string;
  time: any;
}

export const collectionRef = collection(db, "notes");
export async function GetData(sortBy?: keyof Note): Promise<Note[]> {
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

    return notesData;
  } catch (error: any) {
    console.log(error.message);
    return []; // Return empty array if error occurs
  }
}
