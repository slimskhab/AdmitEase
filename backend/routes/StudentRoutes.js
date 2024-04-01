const express=require("express")
const router=express.Router();



const{
  addStudent,loginStudent
} = require("../controllers/StudentController")

router.post("/login",loginStudent);
router.post("/signup",addStudent);


module.exports=router