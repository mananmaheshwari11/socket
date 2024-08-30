import jwt from "jsonwebtoken"
import userModel from "../Models/userModel.js"

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(error,decodedToken)=>{
            if(error){
                console.log(error.message)
                res.redirect("/login")
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
        res.locals.user = null;
        next();
        } else {
        let user = await userModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
        }
    });
    } else {
    res.locals.user = null;
    next();
    }
};

export default {requireAuth,checkUser};