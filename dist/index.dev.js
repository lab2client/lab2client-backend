"use strict";

var express = require('express');

var app = express(); // const stringSimilarity = require('string-similarity');
// import { stringSimilarity } from "string-similarity-js";

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
            id = req.body.email_identification;
            labjson = {
              identification: {
                email_identification: req.body.email_identification,
                institution_name: req.body.institution_name,
                research_facillity: req.body.research_facillity,
                street_address: req.body.street_address,
                building_name: req.body.research_facillity,
                city: req.body.city,
                province: req.body.province,
                postal_code: req.body.postal_code
              },
              contact: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                title: req.body.title,
                office: req.body.office,
                email: req.body.email,
                telephone: req.body.telephone,
                language: req.body.language,
                first_name2: req.body.first_name2,
                last_name2: req.body.last_name2,
                title2: req.body.title2,
                office2: req.body.office2,
                email2: req.body.email2,
                telephone2: req.body.telephone2,
                language2: req.body.language2
              },
              facilities: {
                CFI_project_number: req.body.CFI_project_number,
                Project_leader_first_name: req.body.Project_leader_first_name,
                Project_leader_last_name: req.body.Project_leader_last_name,
                Project_leader_email: req.body.Project_leader_email
              },
              Fields_of_research: {
                fields: req.body.fields
              },
              Sectors_of_application: {
                applications: req.body.applications
              },
              research: {
                DESCRIPTION_OF_YOUR_FACILITY: req.body.DESCRIPTION_OF_YOUR_FACILITY,
                areas_of_expertise: req.body.areas_of_expertise,
                Research_services: req.body.Research_services,
                DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE: req.body.DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE,
                PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS: req.body.PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS,
                website: req.body.website,
                Additional_information: req.body.Additional_information,
                Social_media_platforms: req.body.Social_media_platforms,
                LOGOS: req.body.LOGOS
              }
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
}); // async function searchSimilarData(searchTerm, threshold) {
//     const userRef = db.collection('users');
//     const response = await userRef.get();
//     const similarDocuments = [];
//     response.forEach(doc => {
//       const data = doc.data();
//       const similarity = stringSimilarity(searchTerm, data.applications);
//       if (similarity > threshold) {
//         similarDocuments.push(data);
//       }
//     });
//     return similarDocuments;
//   }
// console.log(searchSimilarData("I need a lab to do the computer vision ?",0.3))
// stringSimilarity("The quick brown fox jumps over the lazy dog", "Lorem ipsum")

app.get("/home", function (req, res) {
  res.send("Hello we are Lab2Client Team");
});
app.listen(5000, function () {
  console.log('http://localhost:5000/');
});