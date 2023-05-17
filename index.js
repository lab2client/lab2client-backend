const express = require('express')
const app = express()

const admin = require("firebase-admin")

const credentials = require('./key.json')

admin.initializeApp({
    credentials : admin.credential.cert(credentials)
})

const db  = admin.firestore();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/home", (req,res) => {

    res.send("Hello we are Lab2Client")

})

app.listen(5000,() => {

    console.log('Listening on port 5000')
})