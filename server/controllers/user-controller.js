const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const Uuid = require("uuid");
const fs = require("fs");
const userModel = require("../models/user-model");
const multer = require("multer");
const tokenService = require("../service/token-service");
const { contextsKey } = require("express-validator/src/base");
const eventService = require("../service/event-service");

class UserController {
  async registration(req, res, next) {
    try {
      const {
        login,
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
      } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Помилка валідації", errors.array()));
      }
      const userData = await userService.registration(
        login,
        name,
        surname,
        email,
        password,
        birthday,
        cell,
        city,
        gender,
        genres,
        instruments
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async loginF(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.loginF(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, next, res) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const rated = req.params.rated == "true";
      const users = await userService.getAllUsers(rated);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async setAvatar(req, res, next) {
    try {
      const tokenBearer = req.headers["authorization"].split(" ");
      const token = tokenBearer[1];
      const file = req.file;
      if (req.file) {
        const user = tokenService.validateAccessToken(token);
        await userService.setAvatar(file.path, user);
        res.json(file);
      }
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Set avatar error" });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await userModel.findById(req.id);
      fs.unlinkSync(AVATAR_FILE_PATH + "\\" + avatarName);
      user.avatar = null;
      await user.save();
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Delete avatar error" });
    }
  }

  async deleteUser(req, res, next) {
    console.log(req.params.id);
    try {
      const id = req.params.id;
      await userService.deleteUserById(id);
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { userId } = req.params;
      const {
        login,
        name,
        surname,
        email,
        cell,
        city,
        gender,
        desc,
        birthday,
        genres,
        instruments,
      } = req.body;
      await userService.update(
        userId,
        name,
        surname,
        login,
        email,
        cell,
        city,
        gender,
        desc,
        birthday,
        genres,
        instruments
      );
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userService.getById(userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAvatar(req, res, next) {
    try {
      const userId = req.params.id;
      const avatar = await userService.getAvatar(userId);
      return res.status(200).json(avatar);
    } catch (error) {
      next(error);
    }
  }

  async getPropositions(req, res, next) {
    console.log(req.body);
    try {
      const propositions = req.body;
      const proposData = await userService.getPropositions(propositions);
      return res.status(200).json(proposData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
