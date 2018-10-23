var axios = require("axios");

var nytAPI = "4d60e927ce784f368e7d0e246154de1f";

var helper = {

  runQuery: function(location) {

    console.log(location);



    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + location;
    return axios.get(queryURL).then(function(response) {
      console.log(response.data.response.docs[0]);
      var resultsArr = response.data.response.docs;
      resultsArr.forEach(function(element){
        console.log(element.web_url);
      })
         if (response.data.response.docs) {
        return response.data.response.docs;
      }
      return "";
    });
  },

  getHistory: function() {
    return axios.get("/api");
  },

  postHistory: function(location) {
    return axios.post("/api", { title: location });
  }
};

module.exports = helper;