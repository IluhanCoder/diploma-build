import { IUser } from "./IUser";

export interface IComment {
  commenterId: string;
  eventId: string;
  content: string;
  commenter: IUser;
  date: Date;
  _id: string;
}
