const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());

// MySQL connection
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,   // or your username
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// GET route
app.get("/submit", (req, res) => {
  const { firstname, lastname, email, password, mobile } = req.query;

  const sql = "INSERT INTO users (firstname, lastname, email, password, mobile) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [firstname, lastname, email, password, mobile], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error inserting data");
    } else {
      res.send("Data saved successfully using GET!");
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});