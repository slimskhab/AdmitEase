const Ebook = require("../models/EbookModel");
const Counter = require("../models/counterModel");
const fs = require("fs");

const addEbook = async (req, res) => {
    try {
      const { description,userId } = req.body;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({message:"No file uploaded!"});
        }
  
      const counter = await Counter.findOneAndUpdate(
        { id: "autovalEbook" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      const ebook = new Ebook({
        id: counter.seq,
        description,
        userId,
        ebookFile: file.path,

      });
  
      await ebook.save();
  
      res.status(201).json({
        status: "success",
        message: "Added Ebook",
        ebook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  };


const deleteEbook = async (req, res) => {
    try {
      const ebookId = req.body.ebookId;
      const deletedEbook = await Ebook.findOneAndDelete({
        id: ebookId,
      });
  
      if (!deletedEbook) {
        return res.status(404).json({ message: "Ebook not found" });
      }
  
      if (deletedEbook.ebookFile) {
        fs.unlinkSync(deletedEbook.ebookFile);
      }
  
      res.status(200).json({
        status: "success",
        message: "Ebook deleted",
        ebook: deletedEbook,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error!",
      });
    }
  };


  const getUserEbook = async (req, res) => {
    try {
        const userId = req.params.userId;

        const ebooks = await Ebook.find({userId });

        if (!ebooks.length) {
            return res.status(404).json({ message: "No ebooks found for this user" });
        }

        res.status(200).json({
            status: "success",
            message: "User ebooks retrieved",
            ebooks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error!",
        });
    }
};


const getAllEBooks=async(req,res)=>{
  try{
      const ebooks=await Ebook.find({})
      return res.status(200).json({
          status: "success",
          message: "Ebooks retrieved",
          ebooks,
      });
  }catch(err){
    res.status(500).json({
      message: "Server Error!",
  });
  }
}

  module.exports = {
    addEbook,
    deleteEbook,
    getUserEbook,
    getAllEBooks
  };
  