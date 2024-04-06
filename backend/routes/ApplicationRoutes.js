const express=require("express")
const router=express.Router();



const{
  addApplication,editApplication, getAllApplication,
} = require("../controllers/ApplicationController")

router.post("/",getAllApplication)
router.post("/add",addApplication);
router.post("/edit",editApplication)



module.exports=router