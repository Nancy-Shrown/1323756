import express from 'express'
import { Post } from '../MODELS/post.js'
const postRouter= express.Router()//make small mini router(path)


//request,reponse,next >>>>>middlewares
postRouter.post("/posts", async (req,res)=> {
    try{
        const post=new Post({
            title : req.body.title, //payload
            description: req.body.description,
        });
        const newPost= await post.save()
        res.status(201).json(newPost);
    }catch(error){
        console.log(error,"error during post")  
    }
});

//get API  //give all data from db
postRouter.get("/posts",async(req,res)=>{
    try{
        const posts=await Post.find()  //this will fetch all data from db
        res.json(posts)
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Interval Server Error "});
    }
});

//TO GET DATA OF ONE PARTICULAR USER//GET API
//in db there is id of each user
postRouter.get("/posts/:id",async (req,res) => {
    const id =req.params.id;
    try{
        const posts=await Post.findById(id)   //this will take specific id and find data in db
        res.json(posts);
    }
    catch(err){
        console.log('err',err);
        res.status(500).json({message:"Interval Server Error "});
    }
});

//delete API
postRouter.delete("/posts/:id",async (req,res) => {
    const id =req.params.id;
    try{
        const deletePost= await Post.findByIdAndDelete(id);
        res.json({message: "Post Deleted Successfully"}) ;
    }
    catch(err){
        console.log('err',err);
        res.status(500).json({message:"Interval Server Error "});
    }
});
//update api
//put and patch   (types)
//in put need to send whole data again but in patch the updated data should be sended only

//put API
postRouter.put("/posts/:id",async(req,res)=>{
    const id = req.params.id;
    const{title,description}= req.body;
    try{
        const updatePost = await Post.findByIdAndUpdate(
            id,
            {title,description},   //difference
            {new : true}  //give us updated response
        );
        res.json(updatePost);
    }
    catch(err){
        console.log('err',err);
    }
});

//PATCH API  ----changes can be made side by side
postRouter.patch("/posts/:id",async(req,res)=>{
    const id = req.params.id;
    const updateFields= req.body;  //difference
    try{
        const updatePost = await Post.findByIdAndUpdate(
            id,
            updateFields,
            {new : true}  //give us updated response
        );
        res.json(updatePost);
    }
    catch(err){
        console.log('err',err);
    }
});





export default postRouter;


//only allow to export single value only


//async -- like a promise //take time to access data
//await -- 
// .save() -- method of mongodb to save data

//don't create two api with same name and method