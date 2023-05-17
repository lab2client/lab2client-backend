"use strict";

var express = require('express');

var app = express();

var admin = require("firebase-admin");

var credentials = require('./key.json');

admin.initializeApp({
  credentials: admin.credential.cert(credentials)
});
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var db = admin.firestore();
app.post('/create', function _callee(req, res) {
  var id, labjson, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            console.log(req.body.email);
            id = req.body.email;
            labjson = {
              email: req.body.email,
              university: req.body.university,
              department: req.body.department,
              lab: req.body.lab,
              area: req.body.area
            };
            response = db.collection("users").doc(id).set(labjson);
            res.send(response);
          } catch (error) {
            res.send(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/home", function (req, res) {
  res.send("Hello we are Lab2Client Team");
});
app.listen(5000, function () {
  console.log('http://localhost:5000/');
});