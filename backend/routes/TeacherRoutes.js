const express=require("express")
const router=express.Router();



const{
  addTeacher,loginTeacher
} = require("../controllers/TeacherController")

router.post("/login",loginTeacher);
router.post("/signup",addTeacher);


module.exports=router