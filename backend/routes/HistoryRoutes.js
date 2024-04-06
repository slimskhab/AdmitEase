const express=require("express")
const router=express.Router();



const{
  addHistory,deleteHistory,editHistory, getAllHistory,
} = require("../controllers/HistoryController")

router.get("/:userId",getAllHistory)

router.post("/add",addHistory);
router.post("/delete",deleteHistory);
router.post("/edit",editHistory)



module.exports=router