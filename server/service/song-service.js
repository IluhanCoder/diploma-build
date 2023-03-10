const Mongoose = require("mongoose");
const songModel = require("../models/song-model");

class SongService {
  async newSong(eventId, name, author, tempo, key, signature) {
    const song = await songModel.create({
      eventId,
      name,
      author,
      tempo,
      key,
      signature,
    });
    return song;
  }

  async getById(songId) {
    const convertedSongId = Mongoose.Types.ObjectId(songId);
    const song = await songModel.aggregate([
      { $match: { _id: convertedSongId } },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
    ]);
    return song[0];
  }

  async getEventSongs(eventId) {
    const convertedEventId = Mongoose.Types.ObjectId(eventId);
    const songs = await songModel.find({ eventId: convertedEventId });
    return songs;
  }

  async putPdf(filePath, songId, desc) {
    const filter = { _id: songId };
    let fileStr = filePath.replace("pdfs\\", "");
    const updateDocument = {
      $push: {
        pdf: { file: fileStr, desc: desc },
      },
    };
    const result = await songModel.updateOne(filter, updateDocument);
    return result;
  }

  async putAudio(filePath, songId, desc) {
    const filter = { _id: songId };
    let fileStr = filePath.replace("audios\\", "");
    const updateDocument = {
      $push: {
        audio: { file: fileStr, desc: desc },
      },
    };
    const result = await songModel.updateOne(filter, updateDocument);
    return result;
  }

  async getPdfs(songId) {
    const song = await songModel.findById(songId);
    return song.pdf;
  }

  async deletePdf(songId, index) {
    const oldPdf = await songModel.findById(songId);
    const newPdf = oldPdf.pdf.filter((file) => {
      return oldPdf.pdf.indexOf(file) != index;
    });
    await songModel.updateOne({ _id: songId }, { pdf: newPdf });
  }

  async deleteAudio(songId, index) {
    const oldAudio = await songModel.findById(songId);
    const newAudio = oldAudio.audio.filter((file) => {
      return oldAudio.audio.indexOf(file) != index;
    });
    await songModel.updateOne({ _id: songId }, { audio: newAudio });
  }

  async update(songId, name, key, tempo, signature, author, lyrics) {
    await songModel.updateOne(
      { _id: songId },
      {
        name,
        key,
        tempo,
        signature,
        author,
        lyrics,
      }
    );
  }
}

module.exports = new SongService();
