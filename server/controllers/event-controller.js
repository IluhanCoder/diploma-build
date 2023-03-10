const eventModel = require("../models/event-model");
const eventService = require("../service/event-service");
const EventService = require("../service/event-service");
const userService = require("../service/user-service");
const commentController = require("./comment-controller");

class EventController {
  async addEvent(req, res, next) {
    try {
      const {
        name,
        creatorId,
        desc,
        rider,
        genres,
        date,
        adress,
        musiciansNeeded,
      } = req.body;
      const event = await EventService.addEvent(
        name,
        creatorId,
        desc,
        rider,
        genres,
        date,
        adress,
        musiciansNeeded
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  async submitEvent(req, res, next) {
    try {
      const { eventId } = req.params;
      await eventService.submitEvent(eventId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getEvents(req, res, next) {
    try {
      const { isSubmited } = req.params;
      const convertedIsSubmited = isSubmited === "true";
      const events = await eventService.getEvents(convertedIsSubmited);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getUserEvents(req, res, next) {
    try {
      const { userId } = req.params;
      const events = await EventService.getUserEvents(userId);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventsWithRights(req, res, next) {
    try {
      const { userId, rights } = req.params;
      const events = await EventService.getEventsWithRights(userId, rights);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async setAvatar(req, res, next) {
    console.log(req.params);
    try {
      const { eventId } = req.params;
      const file = req.file;
      console.log(file);
      if (file) {
        await EventService.setAvatar(file.path, eventId);
      }
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Set avatar error" });
    }
  }

  async getById(req, res, next) {
    try {
      const eventId = req.params.id;
      const event = await EventService.getById(eventId);
      return res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      const eventId = req.params.id;
      EventService.deleteById(eventId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async addComment(req, res, next) {
    try {
      const { content, commenterId, eventId, commenterName } = req.body;
      EventService.addComment(content, commenterId, commenterName, eventId);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { eventId, commentIndex } = req.params;
      await eventService.deleteComment(eventId, commentIndex);
      return res.status(200);
    } catch (error) {
      next(error);
    }
  }

  async getParticipants(req, res, next) {
    try {
      const { eventId } = req.params;
      const participants = await eventService.getParticipants(eventId);
      return res.status(200).json(participants);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { eventId } = req.params;
      const {
        name,
        desc,
        rider,
        genres,
        date,
        adress,
        participants,
        musiciansNeeded,
      } = req.body;
      await EventService.update(
        eventId,
        name,
        desc,
        rider,
        genres,
        date,
        adress,
        participants,
        musiciansNeeded
      );
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
