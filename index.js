var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var app = express();

app.use(bodyParser.json())

var db;

mongodb.MongoClient.connect('mongodb://user2:password2@ds151602.mlab.com:51602/herokutest', function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  
    db = database;
    console.log("Database connection ready");
  
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// schema
const UserSchema = new Schema({
    firstname: String,
    lastname: String
})

// mondel
const User = mongoose.model('user', UserSchema)

// routes
app.get('/', (req, res) => {
    res.send({ "hello": "there" });
})

app.get('/api', (req, res) => {
    User.find({})
      .then(users => res.send(users)) 
  });

app.post('/api/new', (req, res) => {
    db.collection("user").insertOne({ "firstname": "jane"}, {"lastname": "lane"})
})

app.delete('/api/:id', (req, res) => {
    User.findByIdAndRemove({ _id: id })
        .then(user => res.send(user))
})

app.put('/api/:id', (req, res) => {
    User.findOneAndUpdate({ _id: id}, req.body)
        .then(() => User.findById({ _id: id }))
        .then(user => res.send(user))
})



