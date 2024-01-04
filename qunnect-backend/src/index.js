import dotenv from 'dotenv'
dotenv.config()
import express from 'express';

const app=express();
const port=process.env.PORT || 8000



app.listen(port,()=>{
    console.log(`server listening in port ${port}`);
})