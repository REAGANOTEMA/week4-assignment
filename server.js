// Week 4 Assignment Server
// Author: Reagan Otema

require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static public folder
app.use(express.static(path.join(__dirname, "public")));

// Test route
app.get("/", (req, res) => {
  res.send("Week 4 Assignment deployed successfully — by Reagan Otema");
});

// Render gives a PORT automatically
const PORT = process.env.PORT || 3000;

// Render REQUIREMENT: do NOT specify a host
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
