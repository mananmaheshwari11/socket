import mongoose from "mongoose";

const otp=new mongoose.Schema({
    email:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt:{
        type:Date,
        expires:'5m',
        default:Date.now()
    }
})