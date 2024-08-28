import mongoose from "mongoose";

const meetModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    startTime:{
        type:Date,
        required:true
    },
    host:{
        type:mongoose.ObjectId,
        ref:'userModel',
        required:true
    },
    link:{
        type:String,
        required:true,
    },
    index:{
        expires:'1d'
    }
},{timestamps:true})

export default mongoose.model('meetModel',meetModel);