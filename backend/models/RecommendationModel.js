const mongoose=require("mongoose");

const RecommendationSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId: { type: Number, required: true },  // Add this field if it doesn't exist

    description:{
        type:String,
        required:true,
    },
    recommendationFile:{
        type:String,
        required:true,
    }
    
} ,{ timestamps: true })


const Recommendation=mongoose.model("Recommendation",RecommendationSchema)

module.exports=Recommendation;