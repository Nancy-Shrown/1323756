import express from 'express'
import { User } from '../MODELS/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const authRouter= express.Router()

authRouter.post("/signup",async(req,res)=>{
    try{
        const{userName,email,password}= req.body;
        const existingUser= await User.findOne({email})   //method of mongodb to find one user with one email
        if(existingUser){
            return res.status(404).json({message:"User Already Exists"})
        }
        const saltValue=10  //MAIN IMP //USED TO HASH THE DATA INTO DECRYPTED FORM
        const hashPassword= await bcrypt.hash(password,saltValue)  //hashing is used
        const user= new User({
            userName:userName,
            email:email,
            password:hashPassword
        })
        await user.save()
        res.status(201).json({message:"User Created Successfully"})
    }
    catch(error)
    {
        console.log('err',error)
    }
});

//LOGIN
authRouter.post("/login",async(req,res)=>{
    try{
        const{email,password,userName}= req.body
        if(!password ||!(email || userName)){
            return res.json({message:"All fields are required"})
        }
        const existingUser= await User.findOne({
            $or:[{email},         //key of mongodb to check email or username
                {userName}
            ] 
        });
        if(!existingUser){
            return res.json({message: "User not exists"})
        }
        const matchPassword= await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.json({message :"Invalid Password"})
        }

        const token = jwt.sign({          //TOKEN will store/contain info about user
            userId:existingUser._id
        },
        "gojojogogojojogo"
    );
    const userId=existingUser._id
    res.status(201).json({message:"Login Successfully",token,userId})
    }
    catch(error){
        console.log('err',error)
    }
})
export default authRouter