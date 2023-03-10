import { IEvent } from "../IEvent";
import { IUser } from "../IUser";

export interface PropositionResponseItem {
  proposer: IUser;
  event: IEvent;
  date: Date;
  role: string;
}
