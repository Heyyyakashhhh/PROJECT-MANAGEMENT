import dotenv from "dotenv"
import express from "express"
import {app} from "../app.js"
import connectDB from "./db/connection.js"

dotenv.config({
    path : "./.env"
})


connectDB().then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
         console.log(`\n 🖥 server running at port: ${process.env.PORT || 5000}`);
    })
}).catch((error)=>{
    console.log(`MongoDb connection failed at : \n${error.message}`);
})