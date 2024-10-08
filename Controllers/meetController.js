import { sendEmail } from "../Config/email.js";
import meetModel from "../Models/meetModel.js";
import crypto from 'crypto';
export const createmeet=async(req,res)=>{
    try{
    const {id}=req.params
    const {title,description,startTime,members}=req.body
    if(!startTime){
        return res.status(404).send({message:"Start time of the meet is mandatory"});
    }
    let unique=false
    var joinCode=""
    while(!unique){
         joinCode=crypto.randomBytes(3).toString('hex').toUpperCase();
        let join=await meetModel.findOne({joinCode:joinCode});
        if(!join){
            unique=true;
        }
    }
    const baseURL = "https://localhost:8080/meet";
    const link = `${baseURL}/${joinCode}`;
    const meet= await new meetModel({title:title,description:description,startTime:startTime,host:id,members:members,joinCode:joinCode,link:link}).save()
    return res.status(201).send({
        success:true,
        message:"Meet created successfully",
        meet
    })
}
catch(error){
    return res.status(400).send({
        success:false,
        message:"Error in meet creation",
        error
    })
}
}

export const updatemeet=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description,startTime,members}=req.body
        const meet=await meetModel.findByIdAndUpdate(id,{title:title,description:description,startTime:startTime,members:members},{new:true})
        return res.status(201).send({
            success:true,
            message:"Meet details updated successfully",
            meet
        })
    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"Error in updating the meet",
            error
        })
    }
}
export const deletemeet=async(req,res)=>{
    try {
        const {id}=req.params
        await meetModel.findByIdAndDelete(id)
        return res.status(201).send({
            success:true,
            message:"Meet deleted successfully",
        })
    } catch (error) {
        return res.status(404).send({
            success:false,
            message:"Error in deleting the meet",
            error
        })
    }
}

export const getAllmeet=async(req,res)=>{
    try{
    const {id}=req.params
    const meet=await meetModel.find({host:id})
    return res.status(201).send({
        success:true,
        meet
    })
}
catch(error){
    return res.status(404).send({
        success:false,
        message:"Something went wrong",
        error
    })
}
}

export const getusermeet=async(req,res)=>{
    try{
    const {id}=req.params
    const meet=await meetModel.findById(id)
    return res.status(201).send({
        success:true,
        meet
    })
}
catch(error){
    return res.status(404).send({
        success:false,
        message:"Something went wrong",
        error
    })
}
}
export const notify =async(req,res)=>{
    try {
        const {id}=req.params
        const meet=await meetModel.findById(id)
        const members=meet.members
        for(const member of members){
            const cond=await sendEmail(member,meet.title,meet.host.name,meet.joinCode,meet.link)
            if(!cond){
                return res.status(400).send({
                    message:"Something went wrong for email",
                    success:false
                })
            }
        }
        return res.status(200).send({
            success:true,
            message:"Member notified about the meet"
        })

    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in sending the mail",
            error
        })
    }
}