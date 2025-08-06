const express = require("express");
const router = express.Router();
const { scheduleMeeting, getMeetings } = require("../controllers/meetingController");

router.post("/schedule", scheduleMeeting);
router.get("/all", getMeetings);

module.exports = router;