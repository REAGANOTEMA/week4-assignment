/*
  Author: Reagan Otema
  Final working server for CSE 340 Week 4 assignment
*/

const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/inventory", inventoryRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Reagan Otema — CSE 340 Assignment Server Running");
});

// Render deployment port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
