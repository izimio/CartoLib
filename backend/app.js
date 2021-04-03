const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const path = require('path')
const multer = require('multer')
const apiLimiter = require("./middleware/limits-rate")
const app = express()

app.use((req, res, next) => { // adding headers to the app
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json({
  limit: '10mb',
  extended: true
}))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))

app.use(helmet()) // adding http header to secure the ap
app.use('/images', express.static(path.join(__dirname, 'images')));

// all the routes

// exporting app
module.exports = app