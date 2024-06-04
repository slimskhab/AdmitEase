const express=require("express")
const router=express.Router();



const{
  addUser,loginUser,
  editCoverLetter,
  getCoverLetter
} = require("../controllers/UserController");

router.post("/login",loginUser);
router.post("/signup",addUser);
router.post("/edit/:userId",editCoverLetter)
router.get("/get/:userId",getCoverLetter)


module.exports=router