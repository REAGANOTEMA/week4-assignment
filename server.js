/*
  Author: Reagan Otema
  Correct CSE 340 server.js — compatible with Assignment 1–4 structure
*/

const express = require("express")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const pool = require("./db")               // PostgreSQL DB pool (required)
const utilities = require("./utilities")   // Nav builder + helpers
require("dotenv").config()

const app = express()

/* ---------------------------
   Middleware & Configuration
---------------------------- */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static assets
app.use(express.static(path.join(__dirname, "public")))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Flash
app.use(flash())

// Pass flash + nav to every view
app.use(async (req, res, next) => {
  res.locals.message = req.flash("notice")
  res.locals.nav = await utilities.getNav()
  next()
})

/* ---------------------------
            Routes
---------------------------- */

const baseRoute = require("./routes/baseRoute")
const invRoute = require("./routes/inventoryRoute")   // CORRECT FILE NAME

app.use("/", baseRoute)
app.use("/inv", invRoute)

/* ---------------------------
       404 Not Found Page
---------------------------- */
app.use(async (req, res, next) => {
  let nav = await utilities.getNav()
  res.status(404).render("errors/404", {
    title: "Not Found",
    nav,
    message: "The page you requested was not found.",
  })
})

/* ---------------------------
       Global Error Handler
---------------------------- */
app.use(async (err, req, res, next) => {
  console.error("Server Error:", err)
  let nav = await utilities.getNav()
  res.status(500).render("errors/500", {
    title: "Server Error",
    message: err.message,
    nav,
  })
})

/* ---------------------------
        Start Server
---------------------------- */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`CSE 340 server running on port ${PORT}`)
})

module.exports = app
