const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    objective: String,
    budget: Number,
    startDate: Date,
    endDate: Date,
    influencers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Influencer" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
