import mongoose from "mongoose";

const meetModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    startTime:{
        type:Date,
        default:Date.now,
        required:true
    },
    host:{
        type:mongoose.ObjectId,
        ref:'userModel',
        required:true
    },
    members:[{
        type:String,
        default:"open for everyone"
    }],
    link:{
        type:String,
        required:true,
    },
    joinCode:{
        type:String,
        required:true,
    },
    expireAt: {  // Expiry field
        type: Date,
        default: Date.now,
        expires: 162800  // 48 hours in seconds
    }
},{timestamps:true})

export default mongoose.model('meetModel',meetModel);