/*
  Author: Reagan Otema
  Final working server for CSE 340 Week 4 assignment
*/

const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session middleware for flash messages
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/inv", inventoryRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Reagan Otema — CSE 340 Assignment Server Running");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
