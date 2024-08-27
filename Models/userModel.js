import mongoose from "mongoose";

const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        required:true,
        length:10
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:Buffer,
        contentType:String
    }
},{timestamps:true})

export default mongoose.model('userModel',userModel);