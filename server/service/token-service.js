const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
const { Types, Mongoose } = require("mongoose");

class TokenService {
  async generateToken(userId) {
    const token = jwt.sign({ _id: userId }, process.env.TOKEN_SECRET);
    await tokenModel.create({ token, user: Types.ObjectId(userId) });
    return token;
  }

  async validateToken(token) {
    try {
      const candidateToken = await tokenModel.find({ token });
      if (candidateToken == undefined) throw ApiError.UnauthorizedError();
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
