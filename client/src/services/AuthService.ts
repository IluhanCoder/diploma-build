import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IEvent } from "../models/IEvent";

export default class AuthService {
  static async loginF(
    email: string,
    password: string
  ) {
    return $api.post("/login", { email, password });
  }

  static async registration(
    login: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    birthday: Date,
    cell: string,
    city: string,
    gender: string,
    genres: string[],
    instruments: string[]
  ) {
    return $api.post("/registration", {
      login: login,
      name,
      surname,
      email,
      password,
      birthday,
      cell,
      city,
      gender,
      genres,
      instruments,
      avatar: null,
      eventInvites: [],
      eventPropositions: [],
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
