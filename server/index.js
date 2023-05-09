require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");
const fileupload = require("express-fileupload");

const CLIENT_URL = process.env.CLIENT_URL;

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);
app.use(express.static("images"));
app.use(express.static("pdfs"));
app.use(express.static("audios"));

const start = async () => {
  console.log("database connecting on " + process.env.DB_URL);
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    app.listen(PORT, () => console.log("Server started on PORT = " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = app;
