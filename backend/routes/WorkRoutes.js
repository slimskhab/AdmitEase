const express=require("express")
const router=express.Router();



const{
  addWork,deleteWork,editWork, getAllWork,
} = require("../controllers/WorkController")

router.get("/:userId",getAllWork)

router.post("/add",addWork);
router.post("/delete",deleteWork);
router.post("/edit",editWork)



module.exports=router