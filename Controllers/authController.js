import { error } from "console";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const handleError = (err) =>{
    console.log(err.message,err.code);
    let errors = {email:"",password:""}

    //if incorrect email
    if(error.message === "Email not registered"){
        console.log("That email is not registered");
    }
      // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(val);
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3*24*60*60;
const createToken=(id)=>{
    return jwt.sign(id,process.env.JWT_SECRET,{
        expiresIn : maxAge
    })
}

const post_signup = async (req,res) =>{
    const {name,email,phone,password} = req.body;
    try {
        console.log("i am here")
        const user = await userModel.create({name,email,phone,password})
        res.status(201).json({success:true,user : user._id});
    } catch (error) {
        const errors = handleError(error);
        res.status(400).json({errors})
        // console.log(error)
    }
}

const post_login = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await userModel.login(email,password);
        const token = createToken({id:user._id});
        // res.cookie("jwt",token,{
        //     httpOnly : true,
        //     maxAge : maxAge*1000
        // })
        return res.status(200).send({success:true,user: user._id,token:token});
    } catch (error) {
        const errors = handleError(error)
        res.status(200).json({user : ""})
        // console.log(error)
    }
}

const get_logout = (req,res) =>{
    // res.cookie("jwt","",{
    //     maxAge : 1
    // });
    // res.redirect("/");
}

export default {post_login,post_signup,get_logout}