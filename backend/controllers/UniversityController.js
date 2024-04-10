const Counter = require("../models/counterModel");
const University = require("../models/UniversityModel");
const fs = require("fs");

const addUniversity = async (req, res) => {
  try {
    const { universityName, universityDescription,universityType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({message:"No file uploaded!"});
      }

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalUniversity" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const university = new University({
      id: counter.seq,
      universityName,
      universityDescription,
      universityType,
      universityImage: file.path,
      status: "Active",
    });

    await university.save();

    res.status(201).json({
      status: "success",
      message: "Added University",
      university: university,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const editUniversity = async (req, res) => {
  try {
    console.log(req.body)

    const {
      totalApplications,
      status,
      universityName,
      universityDescription,
      universityId,
      universityType,

    } = req.body;
    let file;
    if (req.file) {
      const oldUniversity = await University.findOne({ id: universityId });
      if (oldUniversity.universityImage) {
        fs.unlinkSync(oldUniversity.universityImage);
      }
      file = req.file.path;
    }

    const updatedUniversity = await University.findOneAndUpdate(
      { id: universityId },
      {
        totalApplications,
        status,
        universityName,
        universityType,

        universityDescription,
        universityImage: file || null, // Set new image path or null if no new image
      },
      { new: true }
    );

    if (!updatedUniversity) {
      return res.status(404).json({ message: "University not found" });
    }

    res.status(200).json({
      status: "success",
      message: "University updated",
      university: updatedUniversity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};


const deleteUniversity = async (req, res) => {
  try {
    const universityId = req.body.universityId;

    const deletedUniversity = await University.findOneAndDelete({
      id: universityId,
    });

    if (!deletedUniversity) {
      return res.status(404).json({ message: "University not found" });
    }

    if (deletedUniversity.universityImage) {
      fs.unlinkSync(deletedUniversity.universityImage);
    }

    res.status(200).json({
      status: "success",
      message: "University deleted",
      university: deletedUniversity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

const getAllUniversity = async (req, res) => {
  try {
    const university = await University.find({});

    return res.status(200).json({
      status: "success",
      message: "University retrieved",
      university: university,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addUniversity,
  deleteUniversity,
  editUniversity,
  getAllUniversity,
};
