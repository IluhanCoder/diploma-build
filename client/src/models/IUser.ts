export interface IUser {
  login: string;
  name: string;
  surname: string;
  email: string;
  bio?: string;
  birthday: Date;
  cell: string;
  city: string;
  gender: string;
  avatar: string;
  isActivated: boolean;
  genres: string[];
  instruments: string[];
  _id: string;
  desc: string;
  rating?: number;
}
