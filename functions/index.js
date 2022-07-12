const functions = require("firebase-functions")
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// Returning response with 404 when incorrect url is requested 
exports.fn = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.send("Hello from Firebase!");
  })
});