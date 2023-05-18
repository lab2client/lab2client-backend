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
app.get('/getspecific/:id', function _callee3(req, res) {
  var userRef, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userRef = db.collection("users").doc(req.params.id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(userRef.get());

        case 4:
          response = _context3.sent;
          res.send(response.data());
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.send(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app["delete"]('/delete/:id', function _callee4(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            response = db.collection("users").doc(req.params.id)["delete"]();
            res.send(response);
          } catch (error) {
            res.send(error);
          }

        case 1:
        case "end":
          return _context4.stop();
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