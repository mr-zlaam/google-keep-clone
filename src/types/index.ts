import { User } from "firebase/auth";

export interface UserTypes extends User {
  accessToken?: string;
}
export interface SortedTypes {
  id: string;
  title: string;
  description: string;
  time: any;
}
