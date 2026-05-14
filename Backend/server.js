// 
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = require("./src/app.js");
const connectToDb = require("./src/config/database.js");

connectToDb();


// FRONTEND STATIC FILES
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});


app.listen(3000, () => {
  console.log("server is running on port 3000");
});