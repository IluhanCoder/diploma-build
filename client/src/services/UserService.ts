import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { ITicket } from "../models/ITicket";

const adminId = "645a4a376e925a9759e40117";

export default class UserService {
  static getUsers(rated: boolean): Promise<AxiosResponse<IUser[]>> {
    return $api.get(`/users/${rated}`);
  }

  static async changeAvatar(fileData: File) {
    const data = new FormData();
    data.append("file", fileData);
    await $api.post("/avatar", data).catch((err) => console.log(err));
  }

  static deleteUserById(userId: string) {
    $api.delete("/user/" + userId);
  }

  static async getById(userId: string) {
    console.log(userId);
    return $api.get("/users/:" + userId);
  }

  static getAvatar(id: string) {
    return $api.get("/avatar/:" + id);
  }

  static removeInvite(event: IEvent, userId: string) {
    return $api.post("/event-invite-remove/" + userId, { event });
  }

  static async update(
    userId: string,
    name: string,
    surname: string,
    login: string,
    email: string,
    cell: string,
    city: string,
    gender: string,
    desc: string,
    birthday: Date,
    genres: string[],
    instruments: string[]
  ) {
    await $api.put(`/user/${userId}`, {
      desc,
      name,
      surname,
      login,
      email,
      cell,
      city,
      gender,
      birthday,
      genres,
      instruments,
    });
  }

  static sendInvite(eventId: string, userId: string) {
    const event = $api.get("/event/" + eventId).then((result) => {
      const event = result.data;
      $api.post("/event-invite", { event, userId });
    });
  }

  static async sendProposition(eventId: string, userId: string, role: string) {
    return await $api.post("/event-proposition/", { eventId, userId, role });
  }

  static async getPropositionData(propositions: Array<ITicket>) {
    console.log(propositions);
    return await $api.post("/propositions/", { propositions });
  }

  static isAdmin(userId: string) {
    return userId == adminId;
  }
}
