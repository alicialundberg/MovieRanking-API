var PouchDB = require("pouchdb");
var bodyParser = require("body-parser");
var Express = require("express");
var error = Error("error");
var path = require("path");

var app = Express();

//Här skapas den lokala databasen, mapp movie_rating
var database = new PouchDB('movie_rating');

//Här skapas en remote CouchDB databas som ska synkas mot den lokala databasen
var remoteDB = 'http://localhost:5984/movie_rating/'

sync();

//Synkar den lokala PouchDB databasen med CouchDB
function sync() {
    var opts = {live: true};
    database.replicate.to(remoteDB, opts);
    database.replicate.from(remoteDB, opts);

  }
//json tolkare och urlencoded tolkare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(path.join(__dirname, 'public')));

//Initierar CORS för att servern och browsern ska kunna interagera
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Route till servern
app.get('/', function (req, res, next) {
    if (!error) {
        res.send('index.html');
    } else {
        console.log("Error, check your code!");
    }
});

//Route som hämtar alla dokument från databasen
app.get("/movies", function (req, res, next) {
  database.allDocs({include_docs: true}).then(function(result) {
          res.send(result.rows.map(function(item) {
              return item.doc;
          }));
      }, function(error) {
          res.status(400).send(error);
      });
  });

//Route som raderar data från databasen innehållandes angivet ID
app.delete("/movies:id", function(req, res, next) {
    database.get(req.params.id).then(function(result) {
        return database.remove(result);
    }).then(function(result) {
        res.send(result);
    });

});

//Route som postar ny data till movie_rating databasen
app.post("/addmovies", function (req, res, next) {
  database.post(req.body).then(function(result) {
    res.sendFile(path.join(__dirname+'/public/mymovies.html'));
  });
});

app.listen(8080, function (error) {
    if (!error) {
        console.log('Server is running on port 8080');
    }
});
