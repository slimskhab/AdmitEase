const express=require("express")
const router=express.Router();



const{
  addApplication,editApplication, getAllApplication,getUserApplication,
  getCSVData
} = require("../controllers/ApplicationController")

router.get("/",getAllApplication)
router.post("/",getUserApplication)
router.get("/csv",getCSVData)
router.post("/add",addApplication);
router.post("/edit",editApplication)



module.exports=router