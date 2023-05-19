const axios = require('axios');

axios.get('https://lab2client.herokuapp.com/getall')
  .then(response => {
    const data = response.data;
    data.forEach(item => {
      console.log(item);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
