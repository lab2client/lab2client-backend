const express = require('express');
const app = express();
var cors = require('cors')
var crypto = require('crypto');
const stripe = require('./stripe');
var stringSimilarity = require("string-similarity");
const admin = require("firebase-admin");
const credentials = require('./key.json');
const { workerData } = require('worker_threads');

admin.initializeApp({
    credential : admin.credential.cert(credentials)
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const db  = admin.firestore();

app.post("/create", async (req,res) => {
    try {
        console.log(req.body)
        const labjson = {
            identification : {
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
        research: {
            DESCRIPTION_OF_YOUR_FACILITY: req.body.DESCRIPTION_OF_YOUR_FACILITY,
            areas_of_expertise: req.body.areas_of_expertise,
            Research_services: req.body.Research_services,
            DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE: req.body.DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE,
            PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS: req.body.PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS,
            website: req.body.website,
            Additional_information : req.body.Additional_information,
            Social_media_platforms : req.body.Social_media_platforms,
            LOGOS: req.body.LOGOS
        
        }
    }

    const id = crypto.createHash('sha256').update(JSON.stringify(labjson)).digest('hex');
    console.log(id)
    await db.collection('users').doc(id).set(labjson);
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

    app.get('/search/:field', async (req, res) => {
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

      app.get('/email/:field', async (req, res) => {
        try {
          const user_search = req.params.field;
          console.log(user_search);
          const userRef = db.collection('users');
          const snapshot = await userRef.get();
      
          let array = [];
          snapshot.forEach((doc) => {
            console.log(doc.data().identification.city)
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


      app.get('/word/:field', async (req, res) => {
        try {
          const user_search = req.params.field;
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

      

            word += facility + " "+institution+ " "+building+" "+DESCRIPTION_OF_YOUR_FACILITY+
            " "+areas_of_expertise+" "+Research_services+" "+DESCRIPTION_OF_RESEARCH_INFRASTRUCTURE+" "+
            PRIVATE_AND_PUBLIC_SECTOR_RESEARCH_PARTNERS+" "+Additional_information+" "+application_array+" "+research_array

            if (word.toLowerCase().includes(user_search_lower)) {
              array.push(doc.data());
            }
    
           });
          res.send(array);
        } catch (error) {
          res.send(error);
        }
      });

      app.post('/payment', async (req, res) => {
        const { amount, currency, source } = req.body;
      
        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card'],
            payment_method: source,
            confirm: true,
          });
      
          res.status(200).json({ success: true, paymentIntent });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      });
      



app.get("/home", (req,res) => {

    res.send("Hello we are Lab2Client Team")

})

app.listen(process.env.PORT || 5000,() => {

    console.log('http://localhost:5000/')
})