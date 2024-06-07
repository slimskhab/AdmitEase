const Recommendation = require("../models/RecommendationModel");
const Counter = require("../models/counterModel");
const fs = require("fs");

const addRecommendation = async (req, res) => {
    try {
      const { description,userId } = req.body;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({message:"No file uploaded!"});
        }
  
      const counter = await Counter.findOneAndUpdate(
        { id: "autovalRecommendation" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      const recommendation = new Recommendation({
        id: counter.seq,
        description,
        userId,
        recommendationFile: file.path,

      });
  
      await recommendation.save();
  
      res.status(201).json({
        status: "success",
        message: "Added Recommendation",
        recommendation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  };


const deleteRecommendation = async (req, res) => {
    try {
      const recommendationId = req.body.recommendationId;
  console.log(recommendationId)
      const deletedRecommendation = await Recommendation.findOneAndDelete({
        id: recommendationId,
      });
  
      if (!deletedRecommendation) {
        return res.status(404).json({ message: "Recommendation not found" });
      }
  
      if (deletedRecommendation.recommendationFile) {
        fs.unlinkSync(deletedRecommendation.recommendationFile);
      }
  
      res.status(200).json({
        status: "success",
        message: "Recommendation deleted",
        recommendation: deletedRecommendation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  };


  const getUserRecommendation = async (req, res) => {
    try {
        const userId = req.params.userId;

        const recommendations = await Recommendation.find({userId });

        if (!recommendations.length) {
            return res.status(404).json({ message: "No recommendations found for this user" });
        }

        res.status(200).json({
            status: "success",
            message: "User recommendations retrieved",
            recommendations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error!",
        });
    }
};
  module.exports = {
    addRecommendation,
    deleteRecommendation,
    getUserRecommendation
  };
  