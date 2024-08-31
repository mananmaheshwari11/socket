import express from "express";
import dotenv from 'dotenv/config';
import authRoute from "./Routes/authRoute.js"
import cookie_Parser from "cookie-parser";
import middle from "./Middleware/authMiddleware.js"
import mongoose from "mongoose";
//import meetRoute from "./Routes/meetRoute.js"

const app = express();

app.use(cookie_Parser());
app.use(express.json());

//db connect
let connectString = "mongodb+srv://<db_username>:<db_password>@cluster0.kjwuj.mongodb.net/Meet"
connectString = connectString.replace("<db_username>",process.env.DB_USER)
connectString = connectString.replace("<db_password>",process.env.DB_PASSWORD)
const port = process.env.PORT;

//routes
app.get("",(req,res)=>{
    res.send("This is home page which will be protected")
})
app.use('/api/auth',authRoute)
//app.use('/meet',middle.requireAuth,meetRoute)
app.get("*",middle.checkUser)

mongoose.connect(connectString)

app.listen(port ,()=>{
    console.log(`Listening to port ${port}`)
})


