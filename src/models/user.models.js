import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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


userSchema.pre("save" , async function(next){
    if(!this.isModified(this.password)) next ()
    this.password = await bcrypt.hashSync(this.password , 10)
})

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username: this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
         {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = function(){
 
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)