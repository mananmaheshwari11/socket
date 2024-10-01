import express from "express";
import dotenv from 'dotenv/config';
import authRoute from "./Routes/authRoute.js";
import meetRoute from "./Routes/meetRoute.js";
import cookie_Parser from "cookie-parser";
import meetModel from "./Models/meetModel.js";
import mongoose from "mongoose";
import cors from 'cors'
import morgan from 'morgan'
import { Server as SocketIOServer } from "socket.io";
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

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

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

// socket methods
io.on('connection', (socket) => {
    console.log("User Connected");

    // When a user sends a join request
    socket.on('join-meet', async ({ meetingId, joinCode, userId }) => {
        try {
            const meet = await meetModel.findOne({
                $or: [{ _id: meetingId }, { joinCode: joinCode }]
            });

            if (!meet) {
                socket.emit('error', 'Meeting not found');
                return;
            }

            // Check if the user is the host or needs approval
            if (meet.host === userId) {
                // If the user is the host, join directly
                socket.join(meetingId);
                console.log(`Host joined room: ${meetingId}`);
                socket.emit('join-approved', 'You have joined as the host');
            } else {
                // Notify the host about the new user
                socket.to(meet.host).emit('verify-member', { userId, meetingId });
                console.log(`Join request sent to host for user: ${userId}`);
            }
        } catch (error) {
            socket.emit('error', 'An error occurred while joining the meeting');
        }
    });

    // Host approves or rejects the new user
    socket.on('approve-member', ({ meetingId, userId, approved }) => {
        if (approved) {
            // Notify the user that they can join the meeting
            io.to(userId).emit('join-approved', { meetingId });
            console.log(`User ${userId} approved to join meeting ${meetingId}`);
            io.to(meetingId).emit('user-joined', { userId });  // Broadcast to the meeting
        } else {
            // Notify the user that they were rejected
            io.to(userId).emit('join-rejected', { meetingId });
            console.log(`User ${userId} rejected from meeting ${meetingId}`);
        }
    });

    // Handle WebRTC offer
    socket.on('offer', ({ meetingId, offer }) => {
        socket.to(meetingId).emit('offer', { userId: socket.id, offer: offer });
    });

    // Handle WebRTC answer
    socket.on('answer', ({ meetingId, answer }) => {
        socket.to(meetingId).emit('answer', { userId: socket.id, answer: answer });
    });

    // Handle ICE candidates
    socket.on('ice-candidate', ({ meetingId, candidate }) => {
        socket.to(meetingId).emit('ice-candidate', { userId: socket.id, candidate: candidate });
    });

    // Handle leave meeting
    socket.on('leave-meet', ({ meetingId }) => {
        socket.leave(meetingId);
        console.log(`User left room: ${meetingId}`);
        socket.to(meetingId).emit('user-left', { userId: socket.id });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', { userId: socket.id });
        console.log('A user disconnected');
    });
});
