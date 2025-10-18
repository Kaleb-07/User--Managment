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
var mysqlConnection = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "evani",
  port: 3308,
  multipleStatements: true
});
mysqlConnection.connect((err) =>{
  if(err) console.log(err);
  else console.log("Database Connected")
});
app.get("/create-table", (req, res)=>{
  const name = `
    CREATE TABLE IF NOT EXISTS customer (
      customer_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
  `;
      const company = `
    CREATE TABLE IF NOT EXISTS company (
      company_id INT AUTO_INCREMENT PRIMARY KEY,
      customer_id INT,
      company VARCHAR(100),
      FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
    );
  `;
    mysqlConnection.query(name, (err) => {
    if (err) throw err;
    console.log(" name table ready");
  mysqlConnection.query(address, (err) => {
    if (err) throw err;
    console.log(" address table ready");
  mysqlConnection.query(company, (err) => {
    if (err) throw err;
    console.log(" company table ready");
    res.send("✅ All tables created successfully!");
    });
    });
    });
  }); 
  app.post("/adduser",(req, res) =>{
  const {name, address, company} = req.body;
  let insertName = "INSERT INTO customer (name) VALUES(?)";
  let insertAddress = "INSERT INTO address (customer_id, address) VALUES(? , ?)";
  let insertCompany = "INSERT INTO company (customer_id, company) VALUES(? , ?)";
  
  });