import CBTJournal from "../models/CBTJournal.js";

export const createCBTJournal = async (req, res) => {
  try {
    const {
      situation,
      thought,
      emotion,
      evidence,
      alternative,
      reflection,
      date,
    } = req.body;

    const entry = await CBTJournal.create({
      user: req.userId,
      situation,
      thought,
      emotion,
      evidence,
      alternative,
      reflection,
      date,
    });

    res.status(201).json({
      message: "CBT journal saved successfully",
      entry,
    });
  } catch (error) {
    console.error("Create CBT journal error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCBTJournals = async (req, res) => {
  try {
    const entries = await CBTJournal.find({
      user: req.userId,
    }).sort({ date: -1 });

    res.status(200).json({
      entries,
    });
  } catch (error) {
    console.error("Get CBT journals error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};