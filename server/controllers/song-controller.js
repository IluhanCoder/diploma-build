const songService = require("../service/song-service");

class SongController {
  async newSong(req, res, next) {
    try {
      const { eventId, name, author, key, tempo, signature } = req.body;
      await songService.newSong(eventId, name, author, tempo, key, signature);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { songId } = req.params;
      const song = await songService.getById(songId);
      return res.status(200).json(song);
    } catch (error) {
      next(error);
    }
  }

  async getEventSongs(req, res, next) {
    try {
      const { eventId } = req.params;
      const events = await songService.getEventSongs(eventId);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async putPdf(req, res, next) {
    try {
      const file = req.file;
      const desc = req.body.desc;
      const { songId } = req.params;
      if (file) {
        await songService.putPdf(file.path, songId, desc);
        res.json(file);
      }
    } catch (error) {
      next(error);
    }
  }

  async putAudio(req, res, next) {
    try {
      const file = req.file;
      const desc = req.body.desc;
      const { songId } = req.params;
      if (file) {
        await songService.putAudio(file.path, songId, desc);
        res.json(file);
      }
    } catch (error) {
      next(error);
    }
  }

  async getPdfs(req, res, next) {
    try {
      const { eventId } = req.params;
      const files = await songService.getPdfs(eventId);
      return res.status(200).json(files);
    } catch (error) {
      next(error);
    }
  }

  async deletePdf(req, res, next) {
    try {
      const { songId, index } = req.params;
      await songService.deletePdf(songId, index);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteAudio(req, res, next) {
    try {
      const { songId, index } = req.params;
      await songService.deleteAudio(songId, index);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { songId } = req.params;
      const { name, key, tempo, signature, author, lyrics } = req.body;
      await songService.update(
        songId,
        name,
        key,
        tempo,
        signature,
        author,
        lyrics
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SongController();
