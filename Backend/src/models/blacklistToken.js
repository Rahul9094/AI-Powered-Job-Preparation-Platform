// import mongoose from "mongoose";
const mongoose=require("mongoose");

const blackListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required"]
    }},{
        timestamps:true,
    }
)

const toeknBlacklistModel=mongoose.model("blacklistTokens",blackListTokenSchema);
module.exports=toeknBlacklistModel;