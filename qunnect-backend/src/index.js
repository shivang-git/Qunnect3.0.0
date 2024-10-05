import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import {createServer} from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import connectDB from '../config/dbConnect.js';
connectDB();
import {socketServer} from './socketServer.js';



import AuthRouter from '../routes/authRoute/authRoute.js';
import PostRouter from '../routes/postRoute/postRoute.js';
import UserRouter from '../routes/userRoute/userRoute.js';
import MessageRouter from '../routes/messageRoute/messageRoute.js';

const app=express();
const Server=createServer(app);
const port=process.env.PORT || 8000
socketServer(Server);

app.use(cors({
        origin:process.env.ORIGIN,
        methods:["GET","POST","PUT","PATCH","DELETE"],
        credentials:true,
    })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


app.use(cookieParser())

app.use('/api/auth',AuthRouter)
app.use('/api/user',UserRouter)
app.use('/api/posts',PostRouter)
app.use('/api/chats',MessageRouter)

Server.listen(port,()=>{
    console.log(`server listening in port ${port}`);
})