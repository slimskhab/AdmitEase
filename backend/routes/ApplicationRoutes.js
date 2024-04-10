const express=require("express")
const router=express.Router();



const{
  addApplication,editApplication, getAllApplication,getUserApplication
} = require("../controllers/ApplicationController")

router.get("/",getAllApplication)
router.post("/",getUserApplication)

router.post("/add",addApplication);
router.post("/edit",editApplication)



module.exports=router