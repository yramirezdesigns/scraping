// var express = require("express");
// var mongoose = require("mongoose");
// var path = require('path');
// var bodyParser = require("body-parser");
// var axios = require("axios");
// var exphbs = require('express-handlebars')
// var morgan = require('morgan');
// var methodOverride = require('method-override');

// const PORT = process.env.PORT || 3000;
// let app = express();

// app
//   .use(bodyParser.json())
//   .use(bodyParser.urlencoded({
//       extended: true
//   }))
//   .use(bodyParser.text())
//   .use(bodyParser.json({
//       type: 'application/vnd.api+json'
//   }))
//   .use(methodOverride('_method'))
//   .use(morgan('dev'))
//   .use(express.static(__dirname + '/public'))
//   .engine('handlebars', exphbs({
//       defaultLayout: 'main'
//   }))
//   .set('view engine', 'handlebars')
//   .use(require('./controllers'));


  

// mongoose.Promise = Promise;

// // var app = express();
// // var PORT = process.env.PORT || 3000;

// app.get("/scrape", function(req, res) {
//   axios.get("https://www.nytimes.com/section/nyregion/").then(function(response) {
//     var $ = cheerio.load(response.data);

//     $("article h2").each(function(i, element) {
//       var result = {};

//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");

//       db.Article.create(result)
//         .then(function(dbArticle) {
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           console.log(err);
//         });
//     });

//     res.send("Scrape Complete");
//   });
// });


// app.get("/articles", function(req, res) {
//   db.Article.find({})
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.get("/articles/:id", function(req, res) {
//   db.Article.findOne({ _id: req.params.id })
//     .populate("note")
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// app.post("/articles/:id", function(req, res) {
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // ---------

// app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: false }));

// mongoose.connect("mongodb://localhost/articlesDB", function(err) {
// 	if(err) throw err;
// 	console.log('database connected');
//   });

// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// require("./routes/scrape.js")(app);


// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });




// -------------------------------------------------




var express = require("express");
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require("body-parser");

mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3032;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// mLab database

mongoose.connect("mongodb://localhost/timesArticlesDB", function(err) {
	if(err) throw err;
	console.log('database connected');
  });

// mongoose.connect("mongodb://heroku_4r7szb14:edc210mrggo2vrlpj7jr1ni8bo@ds129144.mlab.com:29144/heroku_4r7szb14", function(err) {
// 	if(err) throw err;
// 	console.log('database connected');
//   });

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/scrape.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});





// -----------------------------







// // getting-started.js
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });