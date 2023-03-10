import { IUser } from "./IUser";

export interface IChat {
  _id: string;
  user1: IUser;
  user2: IUser;
  messages: [{ content: string; senderId: string; date: Date }];
  unreadCount: number;
}
