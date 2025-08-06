const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  brandEmail: String,
  influencerEmail: String,
  date: String,
  time: String,
  mode: String,
  location: String,
  link: String
});

module.exports = mongoose.model("Meeting", meetingSchema);