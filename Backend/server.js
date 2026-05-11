require("dotenv").config();
const app=require("./src/app.js");
const connectToDb=require("./src/config/database.js");
// const {resume,selfDescription,jobDescription}=require("./src/services/temp.js");
// const generateInterviewReport=require("./src/services/ai.services.js");


connectToDb();
// generateInterviewReport({resume,selfDescription,jobDescription});
// invokeGenAi();

app.listen(3000,(req,res)=>{
    console.log("server is ruuning on the port 3000")
})