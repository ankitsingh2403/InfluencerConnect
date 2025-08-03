const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instagram: { type: String, required: true },
    followers: { type: Number, required: true },
    image: { type: String },
    location: { type: String },
    category: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Influencer", influencerSchema);
