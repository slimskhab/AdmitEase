const express=require("express")
const router=express.Router();
const upload = require('../config/multerConfiguration'); 



const{
  addRecommendation,deleteRecommendation, getUserRecommendation,
} = require("../controllers/RecommendationController")

router.get("/:userId",getUserRecommendation)
router.post("/add", upload.single('file'), addRecommendation);
router.post("/delete",deleteRecommendation);



module.exports=router