import express from "express";
import mongoose from 'mongoose';
import postRouter from './ROUTES/post.js'
import authRouter from "./ROUTES/auth.js";
const app = express()
app.use(express.json())
app.use("/auth",authRouter);
app.use("/blog",postRouter);


const connectionString=
"mongodb+srv://NANCY:SHROWN4703@cluster0.rb4skrd.mongodb.net/";
mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>{ 
    console.log(" DB CONNECTED")  //work after promise or rejected
})
.catch((error) =>{
    console.log(" DB NOT CONNECTED")
});

const PORT = 5000
app.listen(PORT,(() => {
    console.log(`Server is running on http://localhost:${PORT}`)
}))

//express 
