
const Counter = require("../models/counterModel")
const Work = require("../models/WorkModel")

const addWork = async (req, res) => {
  try {
const{userId,companyName,position,location,startYear,endYear,description}=req.body

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalwork" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

   
    const work = new Work({
      id: counter.seq,
      userId,
      companyName,
      position,
      location,
      startYear,
      endYear,
      description,

    });

    await work.save();

    res.status(201).json({
      status: "success",
      message: "Added Work",
      work: work
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const editWork = async (req, res) => {
    try {
      const workId = req.body.workId; // Assuming you're passing workId in the URL
      const {
        companyName,
        position,
        location,
        startYear,
        endYear,
        description
      } = req.body;
  
      const updatedWork = await Work.findOneAndUpdate(
        { id: workId }, // Assuming id is the unique identifier for a work entry
        {
          companyName,
          position,
          location,
          startYear,
          endYear,
          description
        },
        { new: true }
      );
  
      if (!updatedWork) {
        return res.status(404).json({ message: "Work not found" });
      }
  
      res.status(200).json({
        status: "success",
        message: "Work updated",
        work: updatedWork
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  };
  

const deleteWork = async (req, res) => {
    try {
      const workId = req.body.workId;
  
      const deletedWork = await Work.findOneAndDelete({ id: workId });
  
      if (!deletedWork) {
        return res.status(404).json({ message: "Work not found" });
      }
  
      res.status(200).json({
        status: "success",
        message: "Work deleted",
        work: deletedWork
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  };


  const getAllWork=async (req,res)=>{
    try{
        const userId=req.params.userId
        const work=await Work.find({userId:userId})

        return res.status(200).json({
            status: "success",
            message: "Work retrieved",
            work: work
          }); 
    }catch(e){
        console.error(e);
      res.status(500).json({
        message: "Server Error!"
      });
    }
  }
  


module.exports = {addWork,deleteWork,editWork,getAllWork }