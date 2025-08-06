const Meeting = require("../models/Meeting");
const sendEmail = require("../utils/sendEmail");

exports.scheduleMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();

    await sendEmail(meeting.brandEmail, "New Meeting Scheduled", `Details: ${JSON.stringify(meeting)}`);
    await sendEmail(meeting.influencerEmail, "Meeting Invitation", `Details: ${JSON.stringify(meeting)}`);

    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ error: "Unable to schedule meeting" });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch meetings" });
  }
};