import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IEvent, IParticipant } from "../models/IEvent";

export default class EventService {
  static async createEvent(
    name: string,
    creatorId: string,
    desc: string,
    rider: string,
    genres: string[],
    date: Date,
    adress: string,
    avatar: File,
    musiciansNeeded: string[]
  ): Promise<AxiosResponse<IEvent[]>> {
    try {
      return await $api
        .post("/event", {
          name,
          creatorId,
          desc,
          rider,
          genres,
          date,
          adress,
          musiciansNeeded,
        })
        .then((res) => {
          const data = res.data;
          EventService.setAvatar(data._id, avatar);
          return data;
        });
    } catch (error) {
      throw error;
    }
  }

  static async getEvents(
    isSubmited: boolean
  ): Promise<AxiosResponse<IEvent[]>> {
    return await $api.get<IEvent[]>(`/events/${isSubmited}`);
  }

  static async getEvent(eventId: string) {
    return await $api.get<IEvent>(`/event/${eventId}`);
  }

  static async getUserEvents(userId: string): Promise<AxiosResponse<IEvent[]>> {
    return await $api.get(`/user-events/${userId}`);
  }

  static async setAvatar(eventId: string, avatar: File) {
    const data = new FormData();
    data.append("file", avatar);
    return await $api.post("/event-avatar/" + eventId, data);
  }

  static async deleteEvent(eventId: string) {
    await $api.delete("/event/" + eventId);
  }

  static async submitEvent(eventId: string) {
    return await $api.put(`/event-submit/${eventId}`);
  }

  //returns all the events, where user has speciditc rights
  static async getEventsWithRights(userId: string, rights: number) {
    return await $api.get(`/events/${userId}/${rights}`);
  }

  static async getParticipants(eventId: string) {
    return await $api.get(`/participants/${eventId}`);
  }

  static async update(
    eventId: string,
    name: string,
    desc: string,
    rider: string,
    genres: string[],
    date: Date,
    adress: string,
    participants: IParticipant[],
    musiciansNeeded: string[]
  ) {
    return await $api.put(`/event/${eventId}`, {
      name,
      desc,
      rider,
      genres,
      date,
      adress,
      participants,
      musiciansNeeded,
    });
  }
}
