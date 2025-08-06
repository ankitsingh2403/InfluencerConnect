const Meeting = require("../models/Meeting");
const sendEmail = require("../utils/sendEmail");

exports.scheduleMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();

    // Email body template
    const emailBody = `
🌟 Great News! Your Meeting is Confirmed via InfluencerConnect 🌟

We're excited to inform you that a meeting has been successfully scheduled between a brand and an influencer through InfluencerConnect.

🔗 Meeting Details:
• 📅 Date: ${meeting.date}  
• 🕒 Time: ${meeting.time}  
• 📌 Mode: ${meeting.mode}  
${meeting.mode === "offline" ? `• 📍 Location: ${meeting.location}` : `• 🔗 Meeting Link: ${meeting.link}`}

👤 Influencer:
• Email: ${meeting.influencerEmail}

🏢 Brand:
• Email: ${meeting.brandEmail}

✨ Why this matters:
This meeting marks the beginning of a powerful collaboration opportunity. Connect, discuss, and create a campaign that truly resonates.

🤝 Powered by InfluencerConnect:
We simplify influencer-brand partnerships—enabling seamless scheduling, smarter outreach, and impactful results. Let us handle the tech while you focus on creativity and conversions.

Need help? Chat with our 24/7 WhatsApp assistant for instant support.

Let the collaboration begin! 🚀  
Team InfluencerConnect
`;

    // Send email to both brand and influencer
    await sendEmail(meeting.brandEmail, "🤝 Meeting Confirmed with Influencer", emailBody);
    await sendEmail(meeting.influencerEmail, "📣 Your Meeting is Confirmed", emailBody);

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error scheduling meeting:", error);
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
