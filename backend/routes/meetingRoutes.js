const express = require("express");
const router = express.Router();
const { scheduleMeeting, getMeetings ,updateMeetingStatus } = require("../controllers/meetingController");

router.post("/schedule", scheduleMeeting);
router.get("/all", getMeetings);
router.patch("/:id/status", updateMeetingStatus);

module.exports = router;