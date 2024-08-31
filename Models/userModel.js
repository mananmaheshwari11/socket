import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
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
    }
    // image:{
    //     type:Buffer,
    //     contentType:String
    // }
},{timestamps:true})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
            const valid = await bcrypt.compare(password,user.password)
            if(valid){
                return user
            }throw Error("Incorrect password")
        }
    else{
        throw Error("Email not registered")
    }
}

export default mongoose.model('userModel',userSchema);