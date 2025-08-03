const Campaign = require("../models/Campaign");

const create = async (req, res) => {
  try {
    const { brandName, objective, budget, startDate, endDate, influencers } = req.body;
    const campaign = new Campaign({ brandName, objective, budget, startDate, endDate, influencers });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Failed to create campaign." });
  }
};

const getAll = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("influencers")
      .sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve campaigns." });
  }
};

const remove = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found." });
    res.json({ message: "Campaign deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete campaign." });
  }
};

module.exports = {
  create,
  getAll,
  delete: remove,
};
