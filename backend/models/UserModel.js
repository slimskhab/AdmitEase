const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userType:{
        type:String,
        required: true
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
    },
    coverLetter:{
        type:String,
    }

} ,{ timestamps: true })


const User=mongoose.model("User",UserSchema)

module.exports=User;