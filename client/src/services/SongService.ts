import $api from "../http";

export default class SongService {
  static async newSong(
    eventId: string,
    name: string,
    author: string,
    key: string,
    tempo: number,
    signature: string
  ) {
    await $api.post(`/song`, { eventId, name, author, key, tempo, signature });
  }

  static async getById(songId: string) {
    return await $api.get(`/song/${songId}`);
  }

  static async getEventSongs(eventId: string) {
    return await $api.get(`/songs/${eventId}`);
  }

  static async putPdf(file: File, songId: string, desc: string) {
    const data = new FormData();
    data.append("file", file);
    data.append("desc", desc);
    return await $api.post(`/song-pdf/${songId}`, data);
  }

  static async putAudio(file: File, songId: string, desc: string) {
    const data = new FormData();
    data.append("file", file);
    data.append("desc", desc);
    return await $api.post(`/song-audio/${songId}`, data);
  }

  static async deletePdf(songId: string, index: number) {
    await $api.delete(`/song-pdf/${songId}/${index}`);
  }

  static async deleteAudio(songId: string, index: number) {
    await $api.delete(`/song-audio/${songId}/${index}`);
  }

  static async update(
    songId: string,
    name: string,
    author: string,
    key: string,
    tempo: number,
    signature: string,
    lyrics: string
  ) {
    await $api.put(`/song/${songId}`, {
      name,
      author,
      key,
      tempo,
      signature,
      lyrics,
    });
  }
}
