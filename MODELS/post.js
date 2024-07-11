import mongoose from "mongoose";
const postSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        image:{
            type:String,
        },
        liked:{
            type:String,
            default:false,
        },
        user:{
            type:String,
        },
        comment:[
            {
                text:{
                    type: String,
                },
                createdAt:{
                    type: Date,
                    default: Date.now,
                }
            },
        ],           
        },
        {
            timestamps: true,
        }
);

export const Post= mongoose.model("Post",postSchema)
// const post used to export multiple functions