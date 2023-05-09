const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const eventController = require("../controllers/event-controller");
const multer = require("multer");
const path = require("path");
const propositionController = require("../controllers/proposition-controller");
const inviteController = require("../controllers/invite-controller");
const commentController = require("../controllers/comment-controller");
const commentService = require("../service/comment-service");
const songController = require("../controllers/song-controller");
const chatController = require("../controllers/chat-controller");
const feedbackController = require("../controllers/feedback-controller");

const imageStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const uploadImage = multer({
  storage: imageStorageEngine,
});

const pdfStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./pdfs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const uploadPdf = multer({
  storage: pdfStorageEngine,
});

const audioStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./audios");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const uploadAudio = multer({
  storage: audioStorageEngine,
});

//handles user's registration
router.post(
  "/registration",
  body("login")
    .isLength({ min: 3, max: 18 })
    .withMessage("Довжина Логіну має бути від 3 до 18 символів "),
  body("email")
    .isEmail()
    .withMessage("Адреса елекроної пошти має відповідати формату: нік@пошта"),
  body("cell")
    .isMobilePhone()
    .withMessage("Введені цифри не є номером телефону"),
  body("city")
    .isLength({ min: 3, max: 24 })
    .withMessage("Місто має довжину від 3 до 24 символів"),
  body("password")
    .isLength({ min: 5, max: 24 })
    .withMessage("Пароль має бути довжиною від 5 до 24 символів"),
  body("genres")
    .isLength({ min: 1, max: 10 })
    .withMessage("Ви маєте вказати від 1 до 10 переважних жанрів"),
  userController.registration
);
//handles user's login
router.post(
  "/login",
  body("login")
    .isLength({ min: 3, max: 18 })
    .withMessage("Довжина Логіну має бути від 3 до 18 символів "),
  userController.loginF
);
//handles user's logout
router.post("/logout", userController.logout);
//sets user's avatar
router.post("/avatar", uploadImage.single("file"), userController.setAvatar);
//returns a specific user's avatar
router.get("/avatar/:id", userController.getAvatar);
//deletes user's avatar
router.delete("/avatar", userController.deleteAvatar);
//returns all the users from DB
router.get("/users/:rated", userController.getUsers);
//returns a specific user by id
router.get("/user/:id", userController.getById);
//delete user by id
router.delete("/user/:id", userController.deleteUser);
//update user data
router.put("/user/:userId", userController.update);

//writes down a new event data into DB
router.post(
  "/event",
  body("name")
    .exists()
    .isLength({ min: 5, max: 50 })
    .withMessage("Довжина назви події має бути від 5 до 50 символів"),
  body("desc")
    .exists()
    .isLength({ min: 20, max: 300 })
    .withMessage("Довжина опису події має бути від 20 до 300 символів"),
  body("genres")
    .exists()
    .isEmpty()
    .withMessage("Ви маєте вказати хочаб 1 жанр"),
  eventController.addEvent
);
//sumbits event
router.put("/event-submit/:eventId", eventController.submitEvent);
//returns events from DB (isSubmited = true - returns submited events
//else returns unsubmited events)
router.get("/events/:isSubmited", eventController.getEvents);
//returns an event of specific user
router.get("/user-events/:userId", eventController.getUserEvents);
//sets event's avatar
//deletes event by id
router.delete("/event/:id", eventController.deleteById);

router.post(
  "/event-avatar/:eventId",
  uploadImage.single("file"),
  eventController.setAvatar
);

router.post(
  "/song-pdf/:songId",
  uploadPdf.single("file"),
  songController.putPdf
);

router.post(
  "/song-audio/:songId",
  uploadAudio.single("file"),
  songController.putAudio
);
//sends to user invite of to be a participant
router.post("/event-invite", inviteController.eventInvite);
//user sends a proposition of him to be a partificial
router.post("/event-propose", propositionController.eventPropose);
//returns a cpecific event by id
router.get("/event/:id", eventController.getById);
//refresh token request
router.get("/refresh", userController.refresh);

//return an object with proposition data of specific user
router.get("/propositions/:userId", propositionController.getUserPropositions);
//handling proposition accept/reject
//if :accept = true puts a proposer into event's "participants", and then deletes proposition
//if :accept = false just deletes proposition
router.put(
  "/proposition/:propositionId/:accept",
  propositionController.seeProposition
);
//handling invite accept/reject
//if :accept = true puts a proposer into event's "participants", and then deletes proposition
//if :accept = false just deletes proposition
router.put("/invite/:inviteId/:accept", inviteController.seeInvite);

router.get("/invites/:userId", inviteController.getUserInvites);

router.post("/comment", commentController.newComment);

router.get("/comments/:eventId", commentController.getComments);

router.delete("/comment/:commentId", commentController.deleteComment);

router.get("/invite-exists/:eventId", inviteController.eventInviteExists);

router.get("/auth", userController.getAuth);

router.get("/invite/:receiverId/:eventId", inviteController.getInvite);
// router.get("/activate/:link", userController.activate);

router.get("/events/:userId/:rights", eventController.getEventsWithRights);

router.get("/participants/:eventId", eventController.getParticipants);

router.get(
  "/proposition/:receiverId/:senderId",
  propositionController.getPropsition
);

router.put("/event/:eventId", eventController.update);

router.post("/song", songController.newSong);

router.get("/song/:songId", songController.getById);

router.get("/songs/:eventId", songController.getEventSongs);

router.delete("/song-pdf/:songId/:index", songController.deletePdf);

router.delete("/song-audio/:songId/:index", songController.deleteAudio);

router.put("/song/:songId", songController.update);

router.post("/message", chatController.newMessage);

router.get("/chat/:receiverId/:senderId", chatController.getChat);

router.get("/chats/:userId", chatController.getUserChats);

router.get("/chats/unread/:userId", chatController.countUnread);

router.post("/feedback", feedbackController.newFeedback);

router.get("/feedback/:receiverId", feedbackController.getUserFeedbacks);

router.get("/feedback/:senderId/:receiverId", feedbackController.getFeedBack);

router.delete("/feedback/:feedbackId", feedbackController.deleteFeedback);

router.get("/rating/:userId", feedbackController.calculateRating);

module.exports = router;
