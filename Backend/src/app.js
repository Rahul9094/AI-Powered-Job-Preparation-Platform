const exprees=require("express");
const cookieParser=require("cookie-parser");
const app=exprees();
const cors=require("cors");
app.use(exprees.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true 
}));
app.use(cookieParser());

// require all routes here i set the prefix of the routes 
const authRouter=require("./routes/auth.routes.js");
const interviewRouter=require("./routes/interview.route.js");
//  using all routes here 
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);
module.exports=app;