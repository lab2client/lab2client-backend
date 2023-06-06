"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var crypto = require('crypto');

var stripe = require('./stripe');

var stringSimilarity = require("string-similarity");

var admin = require("firebase-admin");

var credentials = require('./key.json');

var _require = require('worker_threads'),
    workerData = _require.workerData;

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
app.use(cors({
  origin: 'https://lab2client.vercel.app'
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var db = admin.firestore();
app.post("/create", function _callee(req, res) {
  var labjson, id;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);
          labjson = {
            identification: {
              email_identification: req.body.email_identification,
              institution_name: req.body.institution_name,
              research_facillity: req.body.research_facillity,
              street_address: req.body.street_address,
              building_name: req.body.building_name,
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
          id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
          console.log(id);
          _context.next = 7;
          return regeneratorRuntime.awrap(db.collection('users').doc(id).set(labjson));

        case 7:
          res.send(response);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.get('/getall', function _callee2(req, res) {
  var userRef, _response, array;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userRef = db.collection('users');
          _context2.next = 4;
          return regeneratorRuntime.awrap(userRef.get());

        case 4:
          _response = _context2.sent;
          array = [];

          _response.forEach(function (doc) {
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
  var userRef, _response2;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userRef = db.collection("users").doc(req.params.id);
          _context3.next = 4;
          return regeneratorRuntime.awrap(userRef.get());

        case 4:
          _response2 = _context3.sent;
          res.send(_response2.data());
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
  var _response3;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            _response3 = db.collection("users").doc(req.params.id)["delete"]();
            res.send(_response3);
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
app.get('/search/:field', function _callee5(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user_search = req.params.field;
          console.log(user_search);
          userRef = db.collection('users');
          _context5.next = 6;
          return regeneratorRuntime.awrap(userRef.get());

        case 6:
          snapshot = _context5.sent;
          array = [];
          snapshot.forEach(function (doc) {
            console.log(doc.data().identification.city);
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().identification.city);
            console.log(similarity);

            if (similarity > 0.5) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          res.send(_context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
app.get('/email/:field', function _callee6(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user_search = req.params.field;
          console.log(user_search);
          userRef = db.collection('users');
          _context6.next = 6;
          return regeneratorRuntime.awrap(userRef.get());

        case 6:
          snapshot = _context6.sent;
          array = [];
          snapshot.forEach(function (doc) {
            console.log(doc.data().identification.city);
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().identification.email_identification);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          res.send(_context6.t0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
app.get('/word/:field', function _callee7(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_search = req.params.field;
          user_search_lower = user_search.toLowerCase();
          console.log(user_search);
          userRef = db.collection('users');
          _context7.next = 7;
          return regeneratorRuntime.awrap(userRef.get());

        case 7:
          snapshot = _context7.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var word = "";
            var facility = doc.data().identification.research_facillity;
            var institution = doc.data().identification.institution_name;
            var building = doc.data().identification.building_name;
            var DESCRIPTION_OF_YOUR_FACILITY = doc.data().research.DESCRIPTION_OF_YOUR_FACILITY;
            var areas_of_expertise = doc.data().research.areas_of_expertise;
            var Research_services = doc.data().research.Research_services;
            var DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE = doc.data().research.DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE;
            var PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS = doc.data().research.PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS;
            var Additional_information = doc.data().research.Additional_information;
            var research_fields = doc.data().Fields_of_research.fields;
            var applications = doc.data().Sectors_of_application.applications;
            var research_array = research_fields.toString().replace(/,/g, ' , ');
            var application_array = applications.toString().replace(/,/g, ' , ');
            word += facility + " " + institution + " " + building + " " + DESCRIPTION_OF_YOUR_FACILITY + " " + areas_of_expertise + " " + Research_services + " " + DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE + " " + PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS + " " + Additional_information + " " + application_array + " " + research_array;

            if (word.toLowerCase().includes(user_search_lower)) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          res.send(_context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
app.post('/payment', function _callee8(req, res) {
  var _req$body, amount, currency, source, paymentIntent;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body = req.body, amount = _req$body.amount, currency = _req$body.currency, source = _req$body.source;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
            payment_method: source,
            confirm: true
          }));

        case 4:
          paymentIntent = _context8.sent;
          res.status(200).json({
            success: true,
            paymentIntent: paymentIntent
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          res.status(500).json({
            success: false,
            error: _context8.t0.message
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.get("/home", function (req, res) {
  res.send("Hello we are Lab2Client Team");
});
app.listen(process.env.PORT || 5000, function () {
  console.log('http://localhost:5000/');
});