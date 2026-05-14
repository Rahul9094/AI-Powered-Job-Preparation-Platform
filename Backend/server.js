// 
require("dotenv").config();

const path = require("path");
const express = require("express");

const app = require("./src/app.js");
const connectToDb = require("./src/config/database.js");

connectToDb();


// FRONTEND BUILD FOLDER
app.use(express.static(path.join(__dirname, "../Fronted/dist")));


// REACT ROUTES HANDLE
app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../Fronted/dist/index.html"));
});


app.listen(3000, () => {
  console.log("server is running on port 3000");
});