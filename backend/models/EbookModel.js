const mongoose=require("mongoose");

const EbookSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    userId: { type: Number, required: true },  // Add this field if it doesn't exist

    description:{
        type:String,
        required:true,
    },
    ebookFile:{
        type:String,
        required:true,
    }
    
} ,{ timestamps: true })


const Ebook=mongoose.model("Ebook",EbookSchema)

module.exports=Ebook;