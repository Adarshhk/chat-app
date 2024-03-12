import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import {connectToDB} from './database/database.js'
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;


app.use(cookieParser());
app.use(express.json()); 

app.use("/api/auth" , authRoutes)
app.use("/api/message" , messageRoutes)
app.use("/api/user" , userRoutes)

server.listen(PORT , ()=>{
    connectToDB();
    console.log(`Server is running on port : ${PORT}`)
});