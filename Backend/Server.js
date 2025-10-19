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

      mysqlConnection.query(insertName, [name], (err, result, fields)=>{
    if (err) console.log(err)
    let id =result.insertId

      mysqlConnection.query(insertAddress, [id, address],(err, result)=>{
      if(err) console.log(err)
    })
      mysqlConnection.query(insertCompany, [id, company],(err, result)=>{
      if(err) console.log(err)
    });
    res.send("DataS inserted successfully")
  });
  });
  //  crud

app.post("/adduser",(req, res) =>{
  const {name, address, company} = req.body;
  let insertName = "INSERT INTO customer (name) VALUES(?)";
  let insertAddress = "INSERT INTO address (customer_id, address) VALUES(? , ?)";
  let insertCompany = "INSERT INTO company (customer_id, company) VALUES(? , ?)";
      mysqlConnection.query(insertName, [name], (err, result, fields)=>{
    if (err) console.log(err)
    // else console.log(result)
    let id =result.insertId

    mysqlConnection.query(insertAddress, [id, address],(err, result)=>{
      if(err) console.log(err)
    })
    mysqlConnection.query(insertCompany, [id, company],(err, result)=>{
      if(err) console.log(err)
    });
  });
  res.send("DataS inserted successfully")
});
// route /adduser => to insert customer data to the tables
app.get("/adduser", (req, res)=> {
  mysqlConnection.query(
    "SELECT *FROM customer JOIN address JOIN company ON customer.customer_id = address.customer_id AND customer.customer_id = company.customer_id", (err,results,fields)=>{
      if(err) console.log(err)
        res.json(results)
    });
});
// GET /list => retrieve all customers with their address and company
app.get("/list", (req, res) => {
  const sql = `
    SELECT 
      customer.customer_id,
      customer.name,
      address.address,
      company.company
    FROM customer
    JOIN address ON customer.customer_id = address.customer_id
    JOIN company ON customer.customer_id = company.customer_id
  `;
    mysqlConnection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database query error");
    }
    res.json(results); // return the data as JSON
  });
});
// edit the databases
app.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  const { name, address, company } = req.body;

  const sql = `
    UPDATE customer SET name = ? WHERE customer_id = ?;
    UPDATE address SET address = ? WHERE customer_id = ?;
    UPDATE company SET company = ? WHERE customer_id = ?;
  `;
  mysqlConnection.query(sql, [name, id, address, id, company, id], (err, result) => {
    if (err) return res.status(500).send("Error updating customer");
    res.send("Customer updated successfully!");
  });
});
// delete 
app.post("/deleteuser", (req, res) => {
  const id = req.body.id;

  if (!id) return res.status(400).send("ID is required");

  // SQL to delete related records first
  const sql = `
    DELETE FROM company WHERE customer_id = ?;
    DELETE FROM address WHERE customer_id = ?;
    DELETE FROM customer WHERE customer_id = ?;
  `;
    mysqlConnection.query(sql, [id, id, id], (err, result) => {
    if (err) {
      console.log("MySQL Error:", err);
      return res.status(500).send("Error deleting customer");
    }
    res.send("Customer deleted successfully!");
  });
});
app.listen(3000, ()=> console.log ("listening to : 3000"))

