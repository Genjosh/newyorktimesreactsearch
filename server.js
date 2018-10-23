var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require('cors')

var History = require("./models/History");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));
app.use(cors());


var db = "mongodb://localhost/nytSearch";

mongoose.connect(db, function(err){

  if(err){
    console.log(err);
  }else{
    console.log("mongoose connection is successful!")
  }
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", function(req, res) {

  History.find({}).sort([
    ["date", "descending"]
  ]).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

app.post("/api", function(req, res) {
  console.log("BODY: " + req.body.location);

  History.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
