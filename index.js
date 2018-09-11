var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

var app = express();

app.use(bodyParser.json())

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
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
const UserSchema = new userSchema({
    firstname: String,
    lastname: String
})

// mondel
const User = mongoose.model('user', UserSchema)

// routes
app.get('/', (req, res) => {
    User.find({})
      .then(users => res.send(users)) 
  });

  app.post('/api/new', () => {
    User.create(req.body)
      .then(user => res.send(user))
  })

  app.delete('/api/:id', () => {
    User.findByIdAndRemove({ _id: id })
      .then(user => res.send(user))
  })

  app.put('/api/:id', () => {
    User.findOneAndUpdate({ _id: id}, req.body)
      .then(() => User.findById({ _id: id }))
      .then(user => res.send(user))
  })



