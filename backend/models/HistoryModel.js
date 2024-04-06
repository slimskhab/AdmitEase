const mongoose=require("mongoose");

const HistorySchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
    },
    institutionName:{
        type:String,
        required: true
    },
    degreeType:{
        type:String,
        required: true
    },
    degreeField:{
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


const History=mongoose.model("History",HistorySchema)

module.exports=History;