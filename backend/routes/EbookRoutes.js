const express=require("express")
const router=express.Router();
const upload = require('../config/multerConfiguration'); 



const{
  addEbook,deleteEbook, getUserEbook,
  getAllEBooks,
} = require("../controllers/EbookController")

router.get("/:userId",getUserEbook)
router.post("/getAll",getAllEBooks);
router.post("/add", upload.single('file'), addEbook);
router.post("/delete",deleteEbook);



module.exports=router