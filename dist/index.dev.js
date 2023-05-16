"use strict";

var express = require('express');

var app = express();

var admin = require("firebase-admin");

var credentials = require('./key.json');

admin.initializeApp({
  credentials: admin.credential.cert(credentials)
});
var db = admin.firestore();
app.use(express.json);
app.use(express.urlencoded({
  extended: true
}));
app.get("/", function (req, res) {
  res.send("Hello we are Lab2Client");
});
app.listen(5000, function () {
  console.log('Listening on port 5000');
});