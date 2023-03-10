import { IEvent } from "./IEvent";
import { IUser } from "./IUser";

export interface ITicket {
  _id: string;
  event: Array<IEvent>;
  proposer: Array<IUser>;
  role: string;
  date: Date;
  comment: string;
}
