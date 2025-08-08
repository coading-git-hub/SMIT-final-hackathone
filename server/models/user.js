import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    password_otp:{
        otp:{type:String},
        send_time:{type:String},
        limit:{type:Number,default:5},
        last_attempt:{type:Object},
//         
    }
},{timestamps:true})

export default mongoose.model('User',userSchema)