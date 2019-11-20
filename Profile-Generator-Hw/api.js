var axios = require("axios");
var url = "https://api.github.com/users/"

var api = var api = {
    getUser(username){
      return axios.get(baseUrl + gitHubUserName)
      .then(function (response) {
        return response;
      })
    }
  }
  
  module.exports = api;