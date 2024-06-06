const mongoose=require("mongoose");

const WorkSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
    },
    companyName:{
        type:String,
        required: true
    },
    position:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required:true,
    },
    startYear:{
        type:String,
        required:true
    },
    endYear:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
} ,{ timestamps: true })


const Work=mongoose.model("Work",WorkSchema)

module.exports=Work;