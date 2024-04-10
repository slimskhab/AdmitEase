const express=require("express")
const router=express.Router();
const upload = require('../config/multerConfiguration'); 



const{
  addUniversity,deleteUniversity,editUniversity, getAllUniversity,
} = require("../controllers/UniversityController")

router.get("/",getAllUniversity)
router.post("/add", upload.single('file'), addUniversity);
router.post("/delete",deleteUniversity);
router.post("/edit",upload.single('file'),editUniversity)



module.exports=router