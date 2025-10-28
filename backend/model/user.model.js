import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    },
    resetOTP:{type:String},
    otpExpires:{type:String},
    isOTPVerified:{type:Boolean,default:false}
},{timestamps:true});

const UserModel = mongoose.model('User',userSchema);
export default UserModel;