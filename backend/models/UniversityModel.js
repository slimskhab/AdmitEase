const mongoose=require("mongoose");

const UniversitySchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    universityName:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required: true
    },
    universityType:{
        type:String,
        required:true,
    },

    totalApplications:{
        type:Number,
        required:true,
        default:0
    },
    universityDescription:{
        type:String,
        required:true,
    },
    universityImage:{
        type:String,
        required:true,
    }
    
} ,{ timestamps: true })


const University=mongoose.model("University",UniversitySchema)

module.exports=University;