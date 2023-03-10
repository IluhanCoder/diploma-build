import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface IParticipant {
  _id: string;
  name: string;
  role: string;
  rights: number;
  feedbacked: boolean;
}

export interface IEvent {
  _id: string;
  creatorId?: string;
  creator: IUser;
  name: string;
  desc: string;
  rider: string;
  genres: [string];
  date: Date;
  adress: string;
  participants: [IParticipant];
  avatar: string;
  isSubmited: boolean;
  musiciansNeeded: [string];
  roles: [string];
  comments: [IComment];
}
