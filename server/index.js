var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Require DB config
var db = require('./config')

var app = express();
module.exports = app;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json() );
app.use(express.static(path.join(__dirname, '../client/')));


//Route calls function to insert into database.
app.post('/repos/import', function (req, res) {

  db.insert(req.body.repoName, req.body.userName, req.body.stargazers);
  res.status(200).end();
});


app.get('/repos', function (req, res) {
  db.returnTop25()
  .then(function(results) {
    res.send(results);
  });
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
