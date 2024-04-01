const mongoose=require("mongoose");

const StudentSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    interests:{
        type:String,
        required:true
    },

} ,{ timestamps: true })


const Student=mongoose.model("Student",StudentSchema)

module.exports=Student;