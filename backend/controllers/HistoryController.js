
const Counter = require("../models/counterModel")
const History = require("../models/HistoryModel")

const addHistory = async (req, res) => {
  try {
const{userId,institutionName,degreeType,degreeField,startYear,endYear,description}=req.body

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalhistory" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

   
    const history = new History({
      id: counter.seq,
      userId,
      institutionName,
      degreeType,
      degreeField,
      startYear,
      endYear,
      description,

    });

    await history.save();

    res.status(201).json({
      status: "success",
      message: "Added History",
      history: history
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const editHistory = async (req, res) => {
    try {
      const historyId = req.body.historyId; // Assuming you're passing historyId in the URL
      const {
        institutionName,
        degreeType,
        degreeField,
        startYear,
        endYear,
        description
      } = req.body;
  
      const updatedHistory = await History.findOneAndUpdate(
        { id: historyId }, // Assuming id is the unique identifier for a history entry
        {
          institutionName,
          degreeType,
          degreeField,
          startYear,
          endYear,
          description
        },
        { new: true }
      );
  
      if (!updatedHistory) {
        return res.status(404).json({ message: "History not found" });
      }
  
      res.status(200).json({
        status: "success",
        message: "History updated",
        history: updatedHistory
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  };
  

const deleteHistory = async (req, res) => {
    try {
      const historyId = req.body.historyId;
  
      const deletedHistory = await History.findOneAndDelete({ id: historyId });
  
      if (!deletedHistory) {
        return res.status(404).json({ message: "History not found" });
      }
  
      res.status(200).json({
        status: "success",
        message: "History deleted",
        history: deletedHistory
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  };


  const getAllHistory=async (req,res)=>{
    try{
        const userId=req.params.userId
        const history=await History.find({userId:userId})

        return res.status(200).json({
            status: "success",
            message: "History retrieved",
            history: history
          }); 
    }catch(e){
        console.error(e);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  }
  


module.exports = {addHistory,deleteHistory,editHistory,getAllHistory }