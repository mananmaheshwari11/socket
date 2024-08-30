import express from "express";
import dotenv from 'dotenv/config';
import authRoute from "./Routes/authRoute.js"
import cookie_Parser from "cookie-parser";
import middle from "./Middleware/authMiddleware.js"
//import meetRoute from "./Routes/meetRoute.js"


const app = express();

app.use(cookie_Parser);
app.use(express.json);

//db connect


//routes
app.use('/api/auth',authRoute)
//app.use('/meet',middle.requireAuth,meetRoute)
app.get("*",middle.checkUser)

//express server
const port = process.env.PORT;
app.listen(port ,()=>{
    console.log(`Listening to port ${port}`)
})