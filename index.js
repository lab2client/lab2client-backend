// express: The express module is required and assigned to the express variable, which is then used to create the Express application.

// app.use(cors()): This line adds the cors middleware to the Express application. Cross-Origin Resource Sharing (CORS) allows requests from different origins to access your server's resources. 
// The cors middleware enables CORS support in your application.

// crypto: The crypto module is required. It provides cryptographic functionality, such as generating hashes or creating secure random numbers.

// stripe: The stripe module is required, presumably for handling payments with Stripe. However, the stripe variable is not assigned any value in the provided code.

// stringSimilarity: The string-similarity module is required. It provides functions to calculate the similarity between strings.

// admin.initializeApp({...}): The Firebase Admin SDK is initialized with the provided credentials file (key.json). 
// This step is necessary to authenticate and authorize administrative access to Firebase services.


const express = require('express');
const app = express();
var cors = require('cors')
var crypto = require('crypto');
const stripe = require('stripe')('sk_test_51NMaMTIprkPPYKcJ9uAibY8qhRuNj9DDTHtbeIjHKyYja44g55tx7Fld0jdF9C3qF5XTTevvDDeEIIBGk0JjfLXG00pCyx03Wt');
var stringSimilarity = require("string-similarity");
const admin = require("firebase-admin");
const credentials = require('./key.json');
const stripeWebhookSecret = 'whsec_ToSEYibnMqWxWXZYrIox7u8OutnSSbwK'; 
const nodemailer = require('nodemailer');


admin.initializeApp({
	credential: admin.credential.cert(credentials)
});

app.use(cors());


// This middleware is used to parse incoming requests with JSON payloads.
//  It allows you to access the request body as a JavaScript object. 
// It is typically used when expecting JSON data in the request body.
app.use((req, res, next) => {
	if (req.originalUrl === '/stripe-webhook') {
	  // Skip parsing for the Stripe webhook route
	  next();
	} else {
	  // Parse JSON and URL-encoded payloads for other routes
	  express.json()(req, res, next);
	}
  });

  app.use((req, res, next) => {
	if (req.originalUrl === '/stripe-webhook') {
	  // Skip parsing for the Stripe webhook route
	  next();
	} else {
	  // Parse JSON and URL-encoded payloads for other routes
	  express.urlencoded({ extended: true })(req, res, next);
	}
  });


//  This code initializes a Firestore instance using the admin object.
//  It suggests that you are using Firebase Admin SDK to interact with Firestore, which is a NoSQL document database provided by Firebase.
const db = admin.firestore();
// This API endpoint (POST /create) is used to create a new lab document in the system. It expects a JSON payload in the request body with the following properties
// Upon a successful request, a new lab document will be created in the system with the provided information.
app.post("/create", async (req, res) => {
	try {
		const labjson = {
			user_unique_id: req.body.user_unique_id,
			identification: {
				email_identification: req.body.email_identification,
				institution_name: req.body.institution_name,
				research_facillity: req.body.research_facillity,
				street_address: req.body.street_address,
				building_name: req.body.building_name,
				city: req.body.city,
				province: req.body.province,
				postal_code: req.body.postal_code,
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
				language2: req.body.language2,
			},
			facilities: {
				CFI_project_number: req.body.CFI_project_number,
				Project_leader_first_name: req.body.Project_leader_first_name,
				Project_leader_last_name: req.body.Project_leader_last_name,
				Project_leader_email: req.body.Project_leader_email,
			},
			Fields_of_research: {
				fields: req.body.fields
			},
			Sectors_of_application: {
				applications: req.body.applications
			},
			lab_equipment: req.body.lab_equipment,
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
		}
		// This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
		// The labjson object is saved as the document data.
		const id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
		labjson["id"] = id;
		await db.collection('users').doc(id).set(labjson);
		res.send(response);
	}
	catch (error) {
		res.send(error)
	}
});

// app.get('/getall', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/getall' endpoint.

// const userRef = db.collection('users');: This line creates a reference to the "users" collection in Firestore.

// const response = await userRef.get();: This line retrieves all the documents from the "users" collection using the get() method. It returns a response containing the query snapshot.

// let array = [];: This line initializes an empty array to store the retrieved documents.

// response.forEach(doc => { array.push(doc.data()); }): This code iterates over each document in the response using the forEach() method. It retrieves the data of each document using the data() method and pushes it to the array.

// res.send(array);: After retrieving and formatting the documents, the array containing all the document data is sent as the response.

// catch(error) { res.send(error); }: If an error occurs during the retrieval process, the catch block is executed. The error message is sent as the response.
app.get('/getall', async (req, res) => {

	try {
		const userRef = db.collection('users');
		const response = await userRef.get();
		let array = [];
		response.forEach(doc => {
			array.push(doc.data());
		})
		res.send(array);
	}
	catch (error) {
		res.send(error);
	}

});




// app.get('/getspecific/:id', async (req, res) => { ... }): This code defines a route handler for the GET request to the '/getspecific/:id' endpoint. 
// The :id part in the endpoint is a route parameter that can be accessed using req.params.id.

// const userRef = db.collection("users").doc(req.params.id);: This line creates a reference to a specific document in the "users" collection based on the provided id from the route parameter.

// const response = await userRef.get();: This line retrieves the specific document from Firestore using the get() method on the userRef. It returns a response containing the document snapshot.

// res.send(response.data());: After retrieving the document, the data() method is used on the response to extract the data of the document. This data is sent as the response.

// catch(error) { res.send(error); }: If an error occurs during the retrieval process, the catch block is executed. The error message is sent as the response.

app.get('/getspecific/:id', async (req, res) => {

	try {
		const docId = req.params.id;
		const docRef = db.collection('users').doc(docId);
		const doc = await docRef.get();

		if (!doc.exists) {
			return res.status(404).send('Document not found');
		}

		// Return the document data as the API response
		res.json(doc.data());
	} catch (error) {
		console.error('Error retrieving document:', error);
		res.status(500).send('Internal Server Error');
	}

});
// The updated code snippet includes a new route handler for the DELETE request to delete a specific document from the "users" collection in Firestore based on the provided ID.
//  Here's an explanation of the code:

// app.delete('/delete/:id', async (req, res) => { ... }): This code defines a route handler for the DELETE request to the '/delete/:id' endpoint.
//  The :id part in the endpoint is a route parameter that represents the ID of the document to be deleted.

// const response = db.collection("users").doc(req.params.id).delete();: This line deletes the specific document from Firestore based on the provided id from the route parameter.
//  The delete() method is called on the document reference to delete it.

// res.send(response);: After deleting the document, the response is sent as the response.
//  Note that the response in this case doesn't contain any data, as the delete() method doesn't return any data. It confirms the success of the delete operation.

// catch(error) { res.send(error); }: If an error occurs during the deletion process, the catch block is executed. The error message is sent as the response.


app.delete('/delete/:id', async (req, res) => {
	try {
		const response = db.collection("users").doc(req.params.id).delete();
		res.send(response);
	} catch (error) {
		res.send(error)
	}
})


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
app.get('/search_city/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		console.log(user_search);
		const userRef = db.collection('users');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {

			console.log(doc.data().identification.city)
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().identification.city);
			console.log(similarity)
			if (similarity > 0.5) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});

//   The updated code snippet includes a new route handler for the GET request to search for documents in the "users" collection in Firestore based on a provided email field.
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
app.get('/email/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		const userRef = db.collection('users');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().identification.email_identification);
			console.log(similarity)
			if (similarity >= 1.0) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});

// The updated code snippet includes a new route handler for the GET request to search for documents in the "users" collection in Firestore based on a provided search word.
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
app.get('/search_word/:field', async (req, res) => {
	try {
		const user_search = req.params.field;

		if (user_search.length == 1) {
			throw error
		}
		user_search_lower = user_search.toLowerCase()
		console.log(user_search);
		const userRef = db.collection('users');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {


			let word = ""

			const facility = doc.data().identification.research_facillity;
			const institution = doc.data().identification.institution_name;
			const building = doc.data().identification.building_name;
			const DESCRIPTION_OF_YOUR_FACILITY = doc.data().research.DESCRIPTION_OF_YOUR_FACILITY;
			const areas_of_expertise = doc.data().research.areas_of_expertise;
			const Research_services = doc.data().research.Research_services;
			const DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE = doc.data().research.DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE;
			const PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS = doc.data().research.PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS;
			const Additional_information = doc.data().research.Additional_information;
			const research_fields = doc.data().Fields_of_research.fields;
			const applications = doc.data().Sectors_of_application.applications;

			let research_array = research_fields.toString().replace(/,/g, ' , ');
			let application_array = applications.toString().replace(/,/g, ' , ');



			word += facility + " " + institution + " " + building + " " + DESCRIPTION_OF_YOUR_FACILITY +
				" " + areas_of_expertise + " " + Research_services + " " + DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE + " " +
				PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS + " " + Additional_information + " " + application_array + " " + research_array

			if (word.toLowerCase().includes(user_search_lower)) {
				array.push(doc.data());
			}

		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});
// this endpoint would be used to create the dashboard for the user, the user would be able to view all the forms for the lab he has submiited
// This code defines an API endpoint for retrieving user data based on a search field. It expects a GET request to the /dashboard/:field URL, where :field represents the search field parameter.

// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "users" collection in the database using db.collection('users').

// The code fetches all the documents from the "users" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.

// An array named array is initialized to store the matching user objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).

// Inside the iteration, the code calculates the similarity between the search field and the user_unique_id field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.

// If the similarity score is equal to or greater than 1.0 (an exact match), the user data (doc.data()) is added to the array.

// After iterating through all the documents, the code sends the array as the response using res.send(array).

// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

app.get('/dashboard/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		const userRef = db.collection('users');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().user_unique_id);
			console.log(similarity)
			if (similarity >= 1.0) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});

//  this endpoint is able to create signup for the any user whether being the lab provider or client.
// This code defines an API endpoint for signing up a facility user. It expects a POST request to the /facility/signup URL, where the user information is sent in the request body.

// When a request is received, the code extracts the user information (first name, last name, email, password) from the request body.

// The code creates a new user account in the authentication system using admin.auth().createUser(). It passes the email, password, emailVerified, and disabled properties to the createUser() method to configure the new user. 
// The method returns a user response object containing the details of the created user.

// The user response object is logged to the console using console.log(userResponse.displayName) to display the user's display name. This can be helpful for debugging purposes.

// Finally, the code sends the user response object as a JSON response using res.json(userResponse).

// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).
app.post("/facility/signup", async (req, res) => {
	try {
		const user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password
		};

		const userResponse = await admin.auth().createUser({
			email: user.email,
			password: user.password,
			emailVerified: false,
			disabled: false
		});

		console.log(userResponse.displayName)

		res.json(userResponse);
	} catch (error) {
		res.send(error);
	}
});

// using this endpoint the user is able to create order, 
// which would contain the both the user and client as well as the info for lab request 
//       This code defines an API endpoint for creating an order. It expects a POST request to the /create/order URL, where the order information is sent in the request body.

// When a request is received, the code extracts the order information (ucid_sent, ucid_received, information, cost, date, status) from the request body.

// Any necessary operations to create the order, such as storing it in a database or performing additional validation, can be performed at this point.

// Finally, the code sends the created order object as a JSON response using res.json(labjson).

// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

app.post("/create/order", async (req, res) => {
	try {
		const labjson = {

			ucid_sent: req.body.ucid_sent,
			ucid_recieved: req.body.ucid_recieved,
			information: req.body.information,
			cost: req.body.cost,
			date: req.body.date,
			status: req.body.status

		}
		// This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
		// The labjson object is saved as the document data.
		const id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
		await db.collection('orders').doc(id).set(labjson);
		res.send(response);
	}
	catch (error) {
		res.send(error)
	}
});

app.get('/userinfo/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		const userRef = db.collection('info');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid);
			console.log(similarity)
			if (similarity >= 1.0) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});
//  this endpoint is used to sent post request to create data for the individual user 
//   This code defines an API endpoint for retrieving user information based on a search field. It expects a GET request to the /userinfo/:field URL, where :field represents the search field parameter.

// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "info" collection in the database using db.collection('info').

// The code fetches all the documents from the "info" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.

// An array named array is initialized to store the matching user information objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).

// Inside the iteration, the code calculates the similarity between the search field and the ucid field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.

// If the similarity score is equal to or greater than 1.0 (an exact match), the user information (doc.data()) is added to the array.

// After iterating through all the documents, the code sends the array of matching user information objects as the response using res.send(array).

// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

// Please note that this documentation assumes the presence and proper configuration of the required dependencies, such as the db object for database connectivity and the stringSimilarity library for string comparison.

app.post("/create/info", async (req, res) => {
	try {

		const labjson = {
			ucid: req.body.ucid,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			user_name: req.body.user_name
		}
		// This line uses the db Firestore instance to access the "users" collection and creates a new document with the generated id as the document ID. 
		// The labjson object is saved as the document data.
		const id = req.body.ucid;
		await db.collection('info').doc(id).set(labjson);
		res.send(response);
	}
	catch (error) {
		res.send(error)
	}
});
//  this endpoint is used to retrive all the forms that had been sent by the user
// This code defines an API endpoint for retrieving sent orders based on a search field. It expects a GET request to the /orders/sent/:field URL, where :field represents the search field parameter.

// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "orders" collection in the database using db.collection('orders').

// The code fetches all the documents from the "orders" collection where the ucid_sent field is equal to the search field by calling userRef.where('ucid_sent', '==', user_search).get() and awaits the snapshot result.
//  The snapshot contains a list of documents retrieved from the database that match the query.

// An array named array is initialized to store the matching sent order objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}) and adds the data of each document to the array using array.push(doc.data()).

// After iterating through all the documents, the code sends the array of matching sent order objects as the response using res.send(array).

// If an error occurs during the process, the error is caught in the catch block, and the error message is sent as the response using res.send(error).

// Please note that this documentation assumes the presence and proper configuration of the required dependencies, such as the db object for database connectivity.

app.get('/orders/sent/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		const userRef = db.collection('orders');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid_sent);
			console.log(similarity)
			if (similarity >= 1.0) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});
//   this endpoint is used to retrive all the forms that had been recieved by the user
//         This code defines an API endpoint for retrieving received orders based on a search field. It expects a GET request to the /orders/received/:field URL, where :field represents the search field parameter.

// When a request is received, the code retrieves the search field from the request parameters using req.params.field. It then creates a reference to the "orders" collection in the database using db.collection('orders').

// The code fetches all the documents from the "orders" collection by calling userRef.get() and awaits the snapshot result. The snapshot contains a list of documents retrieved from the database.

// An array named array is initialized to store the matching received order objects. The code iterates through each document in the snapshot using snapshot.forEach((doc) => {}).

// Inside the iteration, the code calculates the similarity between the search field and the ucid_received field of the current document using stringSimilarity.compareTwoStrings(). The similarity score is logged to the console for debugging purposes.

// If the similarity score is equal to or greater than 1.0 (an exact match), the received order data (doc.data()) is added to the array.

// After iterating through all the documents, the code sends the array of matching received order objects as the response using res.send(array).
app.get('/orders/received/:field', async (req, res) => {
	try {
		const user_search = req.params.field;
		const userRef = db.collection('orders');
		const snapshot = await userRef.get();

		let array = [];
		snapshot.forEach((doc) => {
			const similarity = stringSimilarity.compareTwoStrings(user_search, doc.data().ucid_recieved);
			console.log(similarity)
			if (similarity >= 1.0) {
				array.push(doc.data());
			}
		});
		res.send(array);
	} catch (error) {
		res.send(error);
	}
});




// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
	service: 'Gmail', // e.g., 'Gmail' for Gmail
	auth: {
	  user: 'l2cpaymentnotification@gmail.com', // your email address
	  pass: 'oxqc qkfc tnrh orji', // your email password
	},
  });


// Define a route to handle incoming Stripe webhooks
app.post('/stripe-webhook', express.raw({type: 'application/json'}), (req, res) => {
	try {
	  const sig = req.headers['stripe-signature'];
      
	  let event;
	  event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  
	  

	  // Handle different types of Stripe webhook events
	  switch (event.type) {
		case 'invoice.paid': // Use the 'invoice.paid' event to capture the payment of an invoice
		  // Extract invoice information from the event
		  const currency = event.data.object.currency;
		  const customerId = event.data.object.customer;
		  const amount = event.data.object.amount_paid; // Convert from cents to dollars
		  const name = event.data.object.customer_name;
		  // Get the LabID from the invoice's metadata
		  const labOwnerEmail = event.data.object.lines.data[0].metadata.labOwnerEmail;
          const cuID = event.data.object.lines.data[0].metadata.cuID; 

		  // Create an object to store in the Firestore database
		  const paymentData = {
			currency,
			customerId,
			amount,
            labOwnerEmail,
			cuID,
			name
		  };
	
		  // Send an email to labOwnerEmail
		  sendEmailToLabOwner(paymentData);
  
		  // Store payment information in the Firestore database
		  db.collection('transactions').add(paymentData);
  
		  res.status(200).end(); // Respond to the webhook with a 200 OK status
		  break;
  
		default:
		  res.status(400).send('Unhandled event type');
	  }
	} catch (error) {
	  console.error('Error handling Stripe webhook:', error);
	  res.status(400).send('Webhook Error');
	}
  });

    // Function to send an email to labOwnerEmail
	function sendEmailToLabOwner(paymentData) {
		const mailOptions = {
			from: 'l2cpaymentnotification@gmail.com',
			to: paymentData.labOwnerEmail,
			subject: 'Payment Notification',
			html: `
            <html>
			<body>
			  <p>Dear Lab Owner,</p>
			  <p>A payment has been received from your customer, ${paymentData.name}.</p>
			  <p>Amount: ${paymentData.amount / 100} ${paymentData.currency}</p>
			  <p>Status: Paid</p>
			  <p>Thank you for using Lab2Client!</p>
			  <p>Sincerely,<br/>Lab2Client</p>
			</body>
			</html>
			`,
		  };
	
		transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent:', info.response);
		}
		});
	}
  
  

app.get("/home", (req, res) => {

	res.send("Hello we are Lab2Client Team")

})

app.get('/getequipment/:id', async (req, res) => {

	try {
		const docId = req.params.id;
		const docRef = db.collection('users').doc(docId);
		const doc = await docRef.get();

		if (!doc.exists) {
			return res.status(404).send('Document not found');
		}

		// Return the document data as the API response
		res.json(doc.data().lab_equipment);
	} catch (error) {
		console.error('Error retrieving document:', error);
		res.status(500).send('Internal Server Error');
	}

});

app.post("/stripe/invoice", async (req, res) => {
	try {
		const email = req.body.email;
		let customer;

		// Check if a customer with the given email already exists
		// 
		const existingCustomer = await stripe.customers.list({ email: email, limit: 1 });

		if (existingCustomer.data.length > 0) {
			customer = existingCustomer.data[0];
		} else {
			customer = await stripe.customers.create({
				name: req.body.name,
				email: email,
				description: 'L2C Customer',
			});
		}

		// const paymentIntent = await stripe.paymentIntents.create({
		// 	amount: req.body.amount,
		// 	currency: 'cad',
		// 	customer: customer.id
		//  LabOwnerEmail,
		//  cuID - Unique Lab Identifier.
		//  Send notification to lab owner, Unique Lab Identifier, Payment Status
		// });



		const invoice = await stripe.invoices.create({
			customer: customer.id,
			collection_method: "send_invoice",
			days_until_due: 5,
		});

		await stripe.invoiceItems.create({
			customer: customer.id,
			amount: req.body.amount,
			invoice: invoice.id,
			metadata: {
				labOwnerEmail: req.body.LabOwnerEmail,
				cuID: req.body.cuID
			}
		});

		await stripe.invoices.sendInvoice(
			invoice.id
		);

		res.send(invoice);
	} catch (error) {
		res.status(500).send(error.message);
	}
});


app.post("/stripe/create/invoice", async (req, res) => {

});

app.put("/updatelab/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const labRef = db.collection('users').doc(id);

		const existingLabData = await labRef.get();
		if (!existingLabData.exists) {
			return res.status(404).send("Lab data not found");
		}

		const updateData = req.body; // Assuming the request body contains the updated fields

		await labRef.update(updateData);

		res.send("Lab data updated successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.get('payment/balance', async (req, res) => {

		try {
		const email = req.body.email;
		let customer;
		const existingCustomer = await stripe.customers.list({ email: email, limit: 1 });

		if (existingCustomer.data.length > 0) {
			customer = existingCustomer.data[0];
		}
	  const customerId = customer.id; 
  
	  const customer1 = await stripe.customers.retrieve(customerId);
	  const balance = customer1.balance;
	  res.json({ balance: balance });
	  
	} catch (error) {
	  // Handle any errors
	  console.error(error);
	  res.status(500).json({ error: 'Failed to retrieve balance' });
	}
  });


app.listen(process.env.PORT || 3100, () => {
	console.log('http://localhost:3100/')
})