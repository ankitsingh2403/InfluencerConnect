const Influencer = require("../models/Influencer");

// Create a new influencer
const create = async (req, res) => {
  try {
    const {
      name,
      instagram, // Full Instagram URL
      followers,
      image,
      location,
      category
    } = req.body;

    // Basic validation
    if (!name || !instagram || !followers) {
      return res.status(400).json({
        error: "Name, Instagram link, and followers are required."
      });
    }

    const newInfluencer = new Influencer({
      name,
      instagram,
      followers,
      image,
      location,
      category
    });

    await newInfluencer.save();
    res.status(201).json(newInfluencer);
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ error: "Failed to create influencer." });
  }
};

// Get all influencers
const getAll = async (req, res) => {
  try {
    const influencers = await Influencer.find().sort({ createdAt: -1 });
    res.json(influencers);
  } catch (error) {
    console.error("Get Error:", error);
    res.status(500).json({ error: "Failed to fetch influencers." });
  }
};

// Delete an influencer
const deleteInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.findByIdAndDelete(req.params.id);
    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found." });
    }
    res.json({ message: "Influencer deleted successfully." });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Failed to delete influencer." });
  }
};

module.exports = {
  create,
  getAll,
  delete: deleteInfluencer
};
