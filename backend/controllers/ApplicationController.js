const Counter = require("../models/counterModel");
const Application = require("../models/ApplicationsModel");

const addApplication = async (req, res) => {
  try {
    const { userId, institutionName } = req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalApplication" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const application = new Application({
      id: counter.seq,
      userId,
      institutionName,
      status: "pending",
    });

    await application.save();

    res.status(201).json({
      status: "success",
      message: "Added Application",
      application: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const editApplication = async (req, res) => {
  try {
    const applicationId = req.body.applicationId;
    const { status } = req.body;

    const updatedApplication = await Application.findOneAndUpdate(
      { id: applicationId },
      {
        status,
      },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Application updated",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getUserApplication = async (req, res) => {
  try {
    const { userId } = req.body;
    const application = await Application.find({ userId: userId });

    return res.status(200).json({
      status: "success",
      message: "Application retrieved",
      application: application,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getAllApplication = async (req, res) => {
  try {
    const application = await Application.find({});

    return res.status(200).json({
      status: "success",
      message: "Application retrieved",
      application: application,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addApplication,
  editApplication,
  getAllApplication,
  getUserApplication
};
