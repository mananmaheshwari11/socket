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
    },
    image:{
        type:Buffer,
        contentType:String
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    const salt = bcrypt.genSalt();
    this.password = bcrypt.hash(this.password,salt)
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email : email});
    if(user){
        try {
            const valid = await bcrypt.compare(password,user.password)
            if(valid){
                return user
            }throw Error("Incorrect password")
        } catch (error) {
            throw Error("Email not registered")
        }
    }
}

export default mongoose.model('userModel',userSchema);