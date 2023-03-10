import { IEvent } from "./IEvent";
import { IUser } from "./IUser";

export interface ITicket {
  _id: string;
  type: string;
  sender: IUser;
  receiver: IUser;
  event: IEvent;
  role: string;
  date: Date;
  comment: string;
}
