import mongoose, { mongo, Schema } from "mongoose";

const userSchema = new Schema({
     avatar: {type :String , required : true},
     username:{
        type : String ,
        required : true,
        unique : true,
        lowercase: true,
        trime: true,
        index  : true
     },
     email:{type:String , required:true , lowercase : true},
     fullname: {type :true  , required:true },
     password : {type : String , required:[true , "Password is required and choose strong password"]},
     isEmailVerified :{
        type : Boolean,
        default : false
     },
     refreshToken:{type : String},
     forgetPasswordToken:{type : String},
     forgetPasswordTokenExp :{type : Date}, 
     emailVerificationToken :{type : String},
     emailVerificationExp : {type : Date}

} , {timestamps : true})

export const User = mongoose.model("User" , userSchema)