/*
  Author: Reagan Otema
  Correct production-ready app.js for CSE 340 Week 4
  Works with Render + PostgreSQL + MVC structure
*/

const express = require("express")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

const pool = require("./db")          // PostgreSQL connection pool
const utilities = require("./utilities") // For nav builder + helpers

const app = express()

/* ============================
        GLOBAL MIDDLEWARE
=============================== */
app.use(helmet())          // Security headers
app.use(morgan("dev"))     // Logging

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Public folder
app.use(express.static(path.join(__dirname, "public")))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
    },
  })
)

// Flash messages
app.use(flash())

/* Make nav + flash available in all EJS views */
app.use(async (req, res, next) => {
  res.locals.message = req.flash("notice")
  res.locals.nav = await utilities.getNav()
  next()
})

/* ============================
           VIEW ENGINE
=============================== */

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* ============================
              ROUTES
=============================== */
const baseRoute = require("./routes/baseRoute")
const invRoute = require("./routes/inventoryRoute")  // Correct file name

app.use("/", baseRoute)
app.use("/inv", invRoute)

/* ============================
            404 PAGE
=============================== */
app.use(async (req, res) => {
  const nav = await utilities.getNav()
  res.status(404).render("errors/404", {
    title: "404 Not Found",
    nav,
    message: "The page you requested could not be found.",
  })
})

/* ============================
        GLOBAL ERROR HANDLER
=============================== */
app.use(async (err, req, res, next) => {
  console.error("SERVER ERROR:", err)
  const nav = await utilities.getNav()
  res.status(500).render("errors/500", {
    title: "Server Error",
    message: err.message,
    nav,
  })
})

/* ============================
            START SERVER
=============================== */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
