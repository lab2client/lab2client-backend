"use strict";

var axios = require('axios');

axios.get('https://lab2client.herokuapp.com/getall').then(function (response) {
  var data = response.data;
  data.forEach(function (item) {
    console.log(item);
  });
})["catch"](function (error) {
  console.error('Error:', error);
});