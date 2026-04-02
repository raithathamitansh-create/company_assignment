const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // optional (for JSON)

// MySQL connection
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
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

// POST route
app.post("/submit", (req, res) => {
  console.log("📥 Received Data:", req.body);

  const { firstname, lastname, email, password, mobile } = req.body;

  // Basic validation
  if (!firstname || !lastname || !email || !password || !mobile) {
    return res.send("All fields are required");
  }

  const sql = `
    INSERT INTO users (firstname, lastname, email, password, mobile)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [firstname, lastname, email, password, mobile], (err, result) => {
    if (err) {
      console.log(" DB Error:", err);
      return res.send(" Error inserting data");
    }

    console.log("✅ Data inserted successfully");

    // Redirect back with success flag
    res.redirect("http://127.0.0.1:5500/index.html?success=true");
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});