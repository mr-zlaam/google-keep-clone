import { User } from "firebase/auth";

export interface UserTypes extends User {
  accessToken?: string;
}
interface UploadedByTypes {
  id: string;
  name: string;
}
export interface Note {
  id: string;
  title: string;
  description: string;
  time: any;
  uploadedBy: UploadedByTypes;
}
