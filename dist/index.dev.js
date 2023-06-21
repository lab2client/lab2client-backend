"use strict";

// express: The express module is required and assigned to the express variable, which is then used to create the Express application.
// app.use(cors()): This line adds the cors middleware to the Express application. Cross-Origin Resource Sharing (CORS) allows requests from different origins to access your server's resources. 
// The cors middleware enables CORS support in your application.
// crypto: The crypto module is required. It provides cryptographic functionality, such as generating hashes or creating secure random numbers.
// stripe: The stripe module is required, presumably for handling payments with Stripe. However, the stripe variable is not assigned any value in the provided code.
// stringSimilarity: The string-similarity module is required. It provides functions to calculate the similarity between strings.
// admin.initializeApp({...}): The Firebase Admin SDK is initialized with the provided credentials file (key.json). 
// This step is necessary to authenticate and authorize administrative access to Firebase services.
var express = require('express');

var app = express();

var cors = require('cors');

var crypto = require('crypto');

var stripe = require('stripe');

var stringSimilarity = require("string-similarity");

var admin = require("firebase-admin");

var credentials = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});
app.use(cors()); // This middleware is used to parse incoming requests with JSON payloads.
//  It allows you to access the request body as a JavaScript object. 
// It is typically used when expecting JSON data in the request body.

app.use(express.json()); // This middleware is used to parse incoming requests with URL-encoded payloads. 
// It allows you to access the request body as key-value pairs. The extended: true option enables the parsing of rich objects and arrays.

app.use(express.urlencoded({
  extended: true
})); //  This code initializes a Firestore instance using the admin object.
//  It suggests that you are using Firebase Admin SDK to interact with Firestore, which is a NoSQL document database provided by Firebase.

var db = admin.firestore(); // This API endpoint (POST /create) is used to create a new lab document in the system. It expects a JSON payload in the request body with the following properties
// Upon a successful request, a new lab document will be created in the system with the provided information.

app.post("/create", function _callee(req, res) {
  var uid, labjson, id;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          uid = req.body.user_unique_id;
          labjson = {
            user_unique_id: req.body.user_unique_id,
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
          }; // This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
          // The labjson object is saved as the document data.

          id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
          _context.next = 6;
          return regeneratorRuntime.awrap(db.collection('users').doc(id).set(labjson));

        case 6:
          res.send(response);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.send(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // app.get('/getall', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/getall' endpoint.
// const userRef = db.collection('users');: This line creates a reference to the "users" collection in Firestore.
// const response = await userRef.get();: This line retrieves all the documents from the "users" collection using the get() method. It returns a response containing the query snapshot.
// let array = [];: This line initializes an empty array to store the retrieved documents.
// response.forEach(doc => { array.push(doc.data()); }): This code iterates over each document in the response using the forEach() method. It retrieves the data of each document using the data() method and pushes it to the array.
// res.send(array);: After retrieving and formatting the documents, the array containing all the document data is sent as the response.
// catch(error) { res.send(error); }: If an error occurs during the retrieval process, the catch block is executed. The error message is sent as the response.

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
}); // app.get('/getspecific/:id', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/getspecific/:id' endpoint. 
// The :id part in the endpoint is a route parameter that can be accessed using req.params.id.
// const userRef = db.collection("users").doc(req.params.id);: This line creates a reference to a specific document in the "users" collection based on the provided id from the route parameter.
// const response = await userRef.get();: This line retrieves the specific document from Firestore using the get() method on the userRef. It returns a response containing the document snapshot.
// res.send(response.data());: After retrieving the document, the data() method is used on the response to extract the data of the document. This data is sent as the response.
// catch(error) { res.send(error); }: If an error occurs during the retrieval process, the catch block is executed. The error message is sent as the response.

app.get('/getspecific/:id', function _callee3(req, res) {
  var docId, docRef, doc;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          docId = req.params.id;
          docRef = db.collection('users').doc(docId);
          _context3.next = 5;
          return regeneratorRuntime.awrap(docRef.get());

        case 5:
          doc = _context3.sent;

          if (doc.exists) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(404).send('Document not found'));

        case 8:
          // Return the document data as the API response
          res.json(doc.data());
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error('Error retrieving document:', _context3.t0);
          res.status(500).send('Internal Server Error');

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // The updated code snippet includes a new route handler for the DELETE request to delete a specific document from the "users" collection in Firestore based on the provided ID.
//  Here's an explanation of the code:
// app.delete('/delete/:id', async (req, res) => { ... }): This code defines a route handler for the DELETE request to the '/delete/:id' endpoint.
//  The :id part in the endpoint is a route parameter that represents the ID of the document to be deleted.
// const response = db.collection("users").doc(req.params.id).delete();: This line deletes the specific document from Firestore based on the provided id from the route parameter.
//  The delete() method is called on the document reference to delete it.
// res.send(response);: After deleting the document, the response is sent as the response.
//  Note that the response in this case doesn't contain any data, as the delete() method doesn't return any data. It confirms the success of the delete operation.
// catch(error) { res.send(error); }: If an error occurs during the deletion process, the catch block is executed. The error message is sent as the response.

app["delete"]('/delete/:id', function _callee4(req, res) {
  var _response2;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            _response2 = db.collection("users").doc(req.params.id)["delete"]();
            res.send(_response2);
          } catch (error) {
            res.send(error);
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // The updated code snippet includes a new route handler for the GET request to search for documents in the "users" collection in Firestore based on a provided search field. 
// Here's an explanation of the code:
// app.get('/search/:field', async (req, res) => { ... }): 
// This code defines a route handler for the GET request to the '/search/:field' endpoint. The :field part in the endpoint is a route parameter that represents the search field value.
// const user_search = req.params.field;: This line retrieves the search field value from the route parameter and assigns it to the user_search variable.
// console.log(user_search);: This line logs the user_search value to the console.
// const userRef = db.collection('users');: This line creates a reference to the "users" collection in Firestore.
// const snapshot = await userRef.get();: This line retrieves all the documents from the "users" collection using the get() method. The result is stored in the snapshot variable.
// let array = [];: This line initializes an empty array to store the matching documents.
// snapshot.forEach((doc) => { ... }): This code iterates over each document in the snapshot using the forEach() method.
//  For each document, the code compares the search field value (user_search) with a specific field in the document (in this case, the identification.city field).
//  It calculates the similarity between the search field value and the document field value using the stringSimilarity.compareTwoStrings() function.
// console.log(doc.data().identification.city);: This line logs the document's city field value to the console.
// console.log(similarity);: This line logs the calculated similarity between the search field value and the document's city field value to the console.
// if (similarity > 0.5) { array.push(doc.data()); }: 
// This code checks if the calculated similarity is greater than a threshold value of 0.5. If the similarity is above the threshold, the document data is pushed into the array.
// res.send(array);: After iterating through all the documents and finding the matching ones, the array containing the matching document data is sent as the response.
// catch(error) { res.send(error); }: If an error occurs during the search process, the catch block is executed. The error message is sent as the response.

app.get('/search_city/:field', function _callee5(req, res) {
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
}); //   The updated code snippet includes a new route handler for the GET request to search for documents in the "users" collection in Firestore based on a provided email field.
//  Here's an explanation of the code:
// app.get('/email/:field', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/email/:field' endpoint. 
// The :field part in the endpoint is a route parameter that represents the email field value.
// const user_search = req.params.field;: This line retrieves the email field value from the route parameter and assigns it to the user_search variable.
// console.log(user_search);: This line logs the user_search value to the console.
// const userRef = db.collection('users');: This line creates a reference to the "users" collection in Firestore.
// const snapshot = await userRef.get();: This line retrieves all the documents from the "users" collection using the get() method. The result is stored in the snapshot variable.
// let array = [];: This line initializes an empty array to store the matching documents.
// snapshot.forEach((doc) => { ... }): This code iterates over each document in the snapshot using the forEach() method.
//  For each document, the code compares the email field value (user_search) with a specific field in the document (in this case, the identification.email_identification field). 
// It calculates the similarity between the email field value and the document field value using the stringSimilarity.compareTwoStrings() function.
// console.log(doc.data().identification.city);: This line logs the document's city field value to the console.
// console.log(similarity);: This line logs the calculated similarity between the email field value and the document's email_identification field value to the console.
// if (similarity >= 1.0) { array.push(doc.data()); }: 
// This code checks if the calculated similarity is equal to or greater than 1.0. 
// Since the similarity is being compared for an email field, an exact match is expected. If the similarity is 1.0, indicating an exact match, the document data is pushed into the array.
// res.send(array);: After iterating through all the documents and finding the matching ones, the array containing the matching document data is sent as the response.
// catch(error) { res.send(error); }: If an error occurs during the search process, the catch block is executed. The error message is sent as the response.

app.get('/email/:field', function _callee6(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user_search = req.params.field;
          userRef = db.collection('users');
          _context6.next = 5;
          return regeneratorRuntime.awrap(userRef.get());

        case 5:
          snapshot = _context6.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().identification.email_identification);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          res.send(_context6.t0);

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // The updated code snippet includes a new route handler for the GET request to search for documents in the "users" collection in Firestore based on a provided search word.
//  Here's an explanation of the code:
// app.get('/word/:field', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/word/:field' endpoint.
//  The :field part in the endpoint is a route parameter that represents the search word.
// const user_search = req.params.field;: This line retrieves the search word from the route parameter and assigns it to the user_search variable.
// user_search_lower = user_search.toLowerCase();: This line converts the search word to lowercase and assigns it to the user_search_lower variable. This ensures case-insensitive searching.
// console.log(user_search);: This line logs the user_search value to the console.
// const userRef = db.collection('users');: This line creates a reference to the "users" collection in Firestore.
// const snapshot = await userRef.get();: This line retrieves all the documents from the "users" collection using the get() method. The result is stored in the snapshot variable.
// let array = [];: This line initializes an empty array to store the matching documents.
// snapshot.forEach((doc) => { ... }): This code iterates over each document in the snapshot using the forEach() method.
//  For each document, it concatenates the relevant fields' values into a word string.
// if (word.toLowerCase().includes(user_search_lower)) { array.push(doc.data()); }:
//  This code checks if the word string (containing concatenated field values) includes the search word (user_search_lower). 
// It performs a case-insensitive search. If the search word is found in the word string, the document data is pushed into the array.
// res.send(array);: After iterating through all the documents and finding the matching ones, the array containing the matching document data is sent as the response.
// catch(error) { res.send(error); }: If an error occurs during the search process, the catch block is executed. The error message is sent as the response.

app.get('/search_word/:field', function _callee7(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_search = req.params.field;

          if (!(user_search.length == 1)) {
            _context7.next = 4;
            break;
          }

          throw error;

        case 4:
          user_search_lower = user_search.toLowerCase();
          console.log(user_search);
          userRef = db.collection('users');
          _context7.next = 9;
          return regeneratorRuntime.awrap(userRef.get());

        case 9:
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
          _context7.next = 18;
          break;

        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          res.send(_context7.t0);

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); // this endpoint would be used to create the dashboard for the user, the user would be able to view all the forms for the lab he has submiited
// This code defines an API endpoint for retrieving user data based on a search field. It expects a GET request to the /dashboard/:field URL, where :field represents the search field parameter.
// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "users" collection in the database using db.collection('users').
// The code fetches all the documents from the "users" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.
// An array named array is initialized to store the matching user objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).
// Inside the iteration, the code calculates the similarity between the search field and the user_unique_id field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.
// If the similarity score is equal to or greater than 1.0 (an exact match), the user data (doc.data()) is added to the array.
// After iterating through all the documents, the code sends the array as the response using res.send(array).
// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

app.get('/dashboard/:field', function _callee8(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user_search = req.params.field;
          userRef = db.collection('users');
          _context8.next = 5;
          return regeneratorRuntime.awrap(userRef.get());

        case 5:
          snapshot = _context8.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().user_unique_id);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context8.next = 14;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          res.send(_context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // setting up the stripe payment for the client

app.post('/payment', function _callee9(req, res) {
  var _req$body, amount, currency, source, paymentIntent;

  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _req$body = req.body, amount = _req$body.amount, currency = _req$body.currency, source = _req$body.source;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
            payment_method: source,
            confirm: true
          }));

        case 4:
          paymentIntent = _context9.sent;
          res.status(200).json({
            success: true,
            paymentIntent: paymentIntent
          });
          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          res.status(500).json({
            success: false,
            error: _context9.t0.message
          });

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //  this endpoint is able to create signup for the any user whether being the lab provider or client.
// This code defines an API endpoint for signing up a facility user. It expects a POST request to the /facility/signup URL, where the user information is sent in the request body.
// When a request is received, the code extracts the user information (first name, last name, email, password) from the request body.
// The code creates a new user account in the authentication system using admin.auth().createUser(). It passes the email, password, emailVerified, and disabled properties to the createUser() method to configure the new user. 
// The method returns a user response object containing the details of the created user.
// The user response object is logged to the console using console.log(userResponse.displayName) to display the user's display name. This can be helpful for debugging purposes.
// Finally, the code sends the user response object as a JSON response using res.json(userResponse).
// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

app.post("/facility/signup", function _callee10(req, res) {
  var user, userResponse;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
          };
          _context10.next = 4;
          return regeneratorRuntime.awrap(admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
          }));

        case 4:
          userResponse = _context10.sent;
          console.log(userResponse.displayName);
          res.json(userResponse);
          _context10.next = 12;
          break;

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          res.send(_context10.t0);

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // using this endpoint the user is able to create order, 
// which would contain the both the user and client as well as the info for lab request 
//       This code defines an API endpoint for creating an order. It expects a POST request to the /create/order URL, where the order information is sent in the request body.
// When a request is received, the code extracts the order information (ucid_sent, ucid_received, information, cost, date, status) from the request body.
// Any necessary operations to create the order, such as storing it in a database or performing additional validation, can be performed at this point.
// Finally, the code sends the created order object as a JSON response using res.json(labjson).
// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

app.post("/create/order", function _callee11(req, res) {
  var labjson, id;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          labjson = {
            ucid_sent: req.body.ucid_sent,
            ucid_recieved: req.body.ucid_recieved,
            information: req.body.information,
            cost: req.body.cost,
            date: req.body.date,
            status: req.body.status
          }; // This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
          // The labjson object is saved as the document data.

          id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
          _context11.next = 5;
          return regeneratorRuntime.awrap(db.collection('orders').doc(id).set(labjson));

        case 5:
          res.send(response);
          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          res.send(_context11.t0);

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/userinfo/:field', function _callee12(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          user_search = req.params.field;
          userRef = db.collection('info');
          _context12.next = 5;
          return regeneratorRuntime.awrap(userRef.get());

        case 5:
          snapshot = _context12.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context12.next = 14;
          break;

        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          res.send(_context12.t0);

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //  this endpoint is used to sent post request to create data for the individual user 
//   This code defines an API endpoint for retrieving user information based on a search field. It expects a GET request to the /userinfo/:field URL, where :field represents the search field parameter.
// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "info" collection in the database using db.collection('info').
// The code fetches all the documents from the "info" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.
// An array named array is initialized to store the matching user information objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).
// Inside the iteration, the code calculates the similarity between the search field and the ucid field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.
// If the similarity score is equal to or greater than 1.0 (an exact match), the user information (doc.data()) is added to the array.
// After iterating through all the documents, the code sends the array of matching user information objects as the response using res.send(array).
// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).
// Please note that this documentation assumes the presence and proper configuration of the required dependencies, such as the db object for database connectivity and the stringSimilarity library for string comparison.

app.post("/create/info", function _callee13(req, res) {
  var labjson, id;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          labjson = {
            ucid: req.body.ucid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name
          }; // This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
          // The labjson object is saved as the document data.

          id = req.body.ucid;
          _context13.next = 5;
          return regeneratorRuntime.awrap(db.collection('info').doc(id).set(labjson));

        case 5:
          res.send(response);
          _context13.next = 11;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          res.send(_context13.t0);

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //  this endpoint is used to retrive all the forms that had been sent by the user
// This code defines an API endpoint for retrieving sent orders based on a search field. It expects a GET request to the /orders/sent/:field URL, where :field represents the search field parameter.
// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "orders" collection in the database using db.collection('orders').
// The code fetches all the documents from the "orders" collection where the ucid_sent field is equal to the search field by calling userRef.where('ucid_sent', '==', user_search).get() and awaits the snapshot result.
//  The snapshot contains a list of documents retrieved from the database that match the query.
// An array named array is initialized to store the matching sent order objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}) and adds the data of each document to the array using array.push(doc.data()).
// After iterating through all the documents, the code sends the array of matching sent order objects as the response using res.send(array).
// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).
// Please note that this documentation assumes the presence and proper configuration of the required dependencies, such as the db object for database connectivity.

app.get('/orders/sent/:field', function _callee14(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          user_search = req.params.field;
          userRef = db.collection('orders');
          _context14.next = 5;
          return regeneratorRuntime.awrap(userRef.get());

        case 5:
          snapshot = _context14.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid_sent);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context14.next = 14;
          break;

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          res.send(_context14.t0);

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); //   this endpoint is used to retrive all the forms that had been recieved by the user
//         This code defines an API endpoint for retrieving received orders based on a search field. It expects a GET request to the /orders/received/:field URL, where :field represents the search field parameter.
// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "orders" collection in the database using db.collection('orders').
// The code fetches all the documents from the "orders" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.
// An array named array is initialized to store the matching received order objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).
// Inside the iteration, the code calculates the similarity between the search field and the ucid_received field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.
// If the similarity score is equal to or greater than 1.0 (an exact match), the received order data (doc.data()) is added to the array.
// After iterating through all the documents, the code sends the array of matching received order objects as the response using res.send(array).

app.get('/orders/received/:field', function _callee15(req, res) {
  var user_search, userRef, snapshot, array;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          user_search = req.params.field;
          userRef = db.collection('orders');
          _context15.next = 5;
          return regeneratorRuntime.awrap(userRef.get());

        case 5:
          snapshot = _context15.sent;
          array = [];
          snapshot.forEach(function (doc) {
            var similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid_recieved);
            console.log(similarity);

            if (similarity >= 1.0) {
              array.push(doc.data());
            }
          });
          res.send(array);
          _context15.next = 14;
          break;

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          res.send(_context15.t0);

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
app.get("/home", function (req, res) {
  res.send("Hello we are Lab2Client Team");
});
app.listen(process.env.PORT || 5000, function () {
  console.log('http://localhost:5000/');
});