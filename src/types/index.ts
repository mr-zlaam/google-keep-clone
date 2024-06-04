import { User } from "firebase/auth";

export interface UserTypes extends User {
  accessToken?: string;
}
