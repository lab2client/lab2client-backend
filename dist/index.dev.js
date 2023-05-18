"use strict";

var express = require('express');

var app = express();

var admin = require("firebase-admin");

var credentials = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var db = admin.firestore();
app.post("/create", function _callee(req, res) {
  var id, labjson, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            console.log(req.body);
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
app.get('/getall', function _callee2(req, res) {
  var userRef, response, array;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userRef = db.collection('users');
          _context2.next = 4;
          return regeneratorRuntime.awrap(userRef.get());

        case 4:
          response = _context2.sent;
          array = [];
          response.forEach(function (doc) {
            array.push(doc.data());
          });
          res.send(array);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.send(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.get("/home", function (req, res) {
  res.send("Hello we are Lab2Client Team");
});
app.listen(5000, function () {
  console.log('http://localhost:5000/');
});