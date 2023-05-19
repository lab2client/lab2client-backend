const express = require('express');
const app = express();
// const stringSimilarity = require('string-similarity');
// import { stringSimilarity } from "string-similarity-js";
const admin = require("firebase-admin");

const credentials = require('./key.json');

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
        const id = req.body.email_identification;
        const labjson = {
            identification : {
            email_identification: req.body.email_identification,
            institution_name: req.body.institution_name,
            research_facillity: req.body.research_facillity,
            street_address: req.body.street_address,
            building_name: req.body.research_facillity,
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

    // async function searchSimilarData(searchTerm, threshold) {

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

app.get("/home", (req,res) => {

    res.send("Hello we are Lab2Client Team")

})

app.listen(process.env.PORT || 5000,() => {

    console.log('http://localhost:5000/')
})