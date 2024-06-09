const Counter = require("../models/counterModel");
const Application = require("../models/ApplicationsModel");
const User = require("../models/UserModel");
const Recommendation = require("../models/RecommendationModel");
const History = require("../models/HistoryModel");
const Work = require("../models/WorkModel");

const addApplication = async (req, res) => {
  try {
    const { userId, institutionName } = req.body;

    const existingApplication = await Application.findOne({ userId, institutionName });

    if (existingApplication) {
      return res.status(400).json({
        status: "fail",
        message: "User has already applied to this institution",
      });
    }

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


const getCSVData=async(req,res)=>{
  const applications = await Application.find({});
  var result=[]
  for(let element of applications) {
    var currentUserId=element.userId;
    var currentUser=await User.findOne({id:currentUserId});
    if(!currentUser || currentUser.userType!=="Student"){
      continue;
    }
    var fullName=`${currentUser.firstName} ${currentUser.lastName}`
    var email=currentUser.email;
    var coverLetter=currentUser.coverLetter
    var recommendations=await Recommendation.find({userId:currentUserId})
    recommendations=recommendations.map((e)=>{
      return `http://localhost:6005/${e.recommendationFile}`
    });
    var accademicHistories=await History.find({userId:currentUserId});
    accademicHistories = accademicHistories.map((e) => {
      const filteredObject = {
        institutionName: e.institutionName,
        degreeType: e.degreeType,
        degreeField: e.degreeField,
        startYear: e.startYear,
        endYear: e.endYear,
        description: e.description
      };
      return JSON.stringify(filteredObject, null, 2);
    });

    var workExperiences=await Work.find({userId:currentUserId});
    workExperiences = workExperiences.map((e) => {
      const filteredObject = {
        companyName: e.companyName,
        position: e.position,
        location: e.location,
        startYear: e.startYear,
        endYear: e.endYear,
        description: e.description
      };
      return JSON.stringify(filteredObject, null, 2);
    });


    result.push({
      fullName,
      email,
      universityName:element.institutionName,
      coverLetter,
      recommendations,
      accademicHistories,
      workExperiences
    })
  }

  return res.status(200).json({
    status: "success",
    message: "Applications retrieved",
    applications: result,
  })

}

module.exports = {
  addApplication,
  getCSVData,
  editApplication,
  getAllApplication,
  getUserApplication
};
