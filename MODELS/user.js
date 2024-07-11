import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        default:" "
    
    },
    State:{
        type:String,
        default:" "
    
    },
    pincode:{
        type:String,
        default:" "
    },
    profilePhoto:{
        type:String,
        default:" "
    
    },     
});
export const User= mongoose.model("User",UserSchema)