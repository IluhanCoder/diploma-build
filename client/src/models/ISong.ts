import { IEvent } from "./IEvent";

type FileData = {
  file: string;
  desc: string;
};

export interface ISong {
  _id: string;
  eventId: string;
  event: IEvent;
  name: string;
  author: string;
  key: string;
  temp: number;
  signature: string;
  pdf?: FileData[];
  audio?: FileData[];
  lyrics?: string[];
  desc?: string;
}
