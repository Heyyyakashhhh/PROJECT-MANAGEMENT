import {ApiResponse} from "../../utils/apiResponse.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
import mongoose from "mongoose"

const healthcheck = asyncHandler(async(req,res)=>{
    const dbStatus = mongoose.connection.readyState == 1 ? "Connected" : "Dissconected";

    const healthData = {
        server : "Healthy & Acitve",
        database : dbStatus,
        uptime: `${process.uptime().toFixed(2)} seconds`,
        timestamp: new Date().toISOString()
    }

    return res.status(200).json(new ApiResponse(200 , healthData , "System is operating is normally"))

})

export {healthcheck}