const mongoose=require("mongoose");

const ApplicationSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required: true
    },
    institutionName:{
        type:String,
        required:true,
    },
    
} ,{ timestamps: true })


const Application=mongoose.model("Application",ApplicationSchema)

module.exports=Application;