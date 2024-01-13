import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import connectDB from '../config/dbConnect.js';
connectDB();

import AuthRouter from '../routes/authRoute/authRoute.js'
import PostRouter from '../routes/postRoute/postRoute.js'

const app=express();
const port=process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(cookieParser())

app.use('/api/user',AuthRouter)
app.use('/api/posts',PostRouter)

app.listen(port,()=>{
    console.log(`server listening in port ${port}`);
})