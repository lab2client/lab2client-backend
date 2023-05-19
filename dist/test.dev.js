"use strict";

// const axios = require('axios');
//   axios.get('https://lab2client.herokuapp.com/getall')
//   .then(function (response) {
//     const data = response.data;
//     for(let index=0;index<=data.length; index++){
//       console.log(data[index]);
//     }
//     });
var stringSimilarity = require("string-similarity");

var similarity = stringSimilarity.compareTwoStrings("healed", "sealed");
console.log(similarity);