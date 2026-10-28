import dotenv from "dotenv"
import express from "express"
import {app} from "../app.js"

dotenv.config({
    path : "./.env"
})


app.get('/instagram' , (req,res)=>{
    res.send("doen")
})

app.listen( process.env.PORT || 4000 , ()=>{
    console.log(`port listen at ${process.env.PORT} `)
})