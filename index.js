const express = require('express');
const app = express();
const stringSimilarity = require('string-similarity');
const admin = require("firebase-admin");

const credentials = require('./key.json');

admin.initializeApp({
    credential : admin.credential.cert(credentials)
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
const db  = admin.firestore();

app.post("/create", async (req,res) => {
    try {
        console.log(req.body)
        const id = req.body.email;
        const labjson = {
            email: req.body.email,
            university: req.body.university,
            department: req.body.department,
            lab: req.body.lab,
            area: req.body.area,

        }
        const response = db.collection("users").doc(id).set(labjson);
        res.send(response);
    }
    catch(error) {
        res.send(error)
    }
    });

    app.get('/getall', async(req,res) => {

        try {
            const userRef = db.collection('users');
            const response = await userRef.get();
            let array = [];
            response.forEach(doc => {
                array.push(doc.data());
            })
            res.send(array);
        }
        catch(error){
            res.send(error);
        }

    });

    app.get('/getspecific/:id', async (req,res) => {

        try {
            const userRef = db.collection("users").doc(req.params.id);
            const response = await userRef.get();
            res.send(response.data());

        }
        catch(error){
            res.send(error)
        }
    });

    app.delete('/delete/:id' , async(req,res) => {
        try {
            const response = db.collection("users").doc(req.params.id).delete();
            res.send(response);
        } catch(error) {
            res.send(error)
        }
    })

    async function searchSimilarData(searchTerm, threshold) {

        const userRef = db.collection('users');
        const response = await userRef.get();

        const similarDocuments = [];

        response.forEach((doc) => {

          const data = doc.data();
          

          const similarity = stringSimilarity.compareTwoStrings(searchTerm, data.email);
          
          if (similarity > threshold) {
            similarDocuments.push({
              id: doc.email,
              data: data,
            });
          }
        });

        return similarDocuments;
      }
      console.log("here is the search")

      console.log(searchSimilarData("I need a lab to do the electron spectroscopy ?",0.3))
      




app.get("/home", (req,res) => {

    res.send("Hello we are Lab2Client Team")

})

app.listen(5000,() => {

    console.log('http://localhost:5000/')
})