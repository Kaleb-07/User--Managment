const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const path = require("path");

var app = express();
app.use(cors());
// Middleware to parse form data or middle ware to extract info from the html body name attribute 
app.use(
  express.urlencoded({
     extended: true ,
    }));
// middle ware to extract info from the frontend that are sent through json
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../DataBase/Frontend/js/index.html"));
});
