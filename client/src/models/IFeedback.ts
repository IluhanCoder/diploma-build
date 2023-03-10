import { IUser } from "./IUser";

export interface IFeedback {
  _id: string;
  sender: IUser;
  receiverId: string;
  content: string;
  value: number;
}
