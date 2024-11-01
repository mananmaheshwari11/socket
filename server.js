import express from "express";
import authRoute from "./Routes/authRoute.js";
import meetRoute from "./Routes/meetRoute.js";
import cookie_Parser from "cookie-parser";
import meetModel from "./Models/meetModel.js";
import mongoose from "mongoose";
import cors from 'cors'
import morgan from 'morgan'
import { Server } from "socket.io";
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:true
});

app.use(cookie_Parser());
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

// db connect
let connectString = "mongodb+srv://<db_username>:<db_password>@cluster0.kjwuj.mongodb.net/Meet";
connectString = connectString.replace("<db_username>", process.env.DB_USER);
connectString = connectString.replace("<db_password>", process.env.DB_PASSWORD);
const port = process.env.PORT;

// routes
app.use('/api/auth', authRoute);
app.use('/api/meet', meetRoute);


mongoose.connect(connectString);

io.on('connection', (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on('join-meet',async({joinCode,userID,name})=>{
        const meet=await meetModel.findOne({joinCode:joinCode});
        if(!meet){
        socket.emit("Invalid join code")
           return ;
        }
        if(meet.host.toString()===userID){ // host apne aap connect hoga 
            socket.join(joinCode);
            socket.emit('accessGranted',{message:'meet access to host'});
            console.log("Host joined the meet");
        }
        else{ // user ki join request jayegi
            
            io.to(meet.host).emit('request',{name});
            console.log(`Join request of ${name} sent to host`);
        }   
    })  

    socket.on('approveJoin',async({joinCode,userID,name,allow})=>{
        if(allow){
            io.to(joinCode).emit('accessGranted',{name})
            socket.join(joinCode);
            const meet=await meetModel.findOne({joinCode:joinCode});
            meet.members.push({name});
            console.log(`User ${name}allowed to join`);
        }
        else{
            io.to(userID).emit('accessDenied','Host denied access');
        }
    });
    socket.on('disconnect',()=>{
        console.log('User disconnected',socket.id);
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});