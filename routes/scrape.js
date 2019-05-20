
var request = require("request");
var cheerio = require("cheerio");
var Comments = require("./../models/comments.js");
var Articles = require("./../models/articles.js");

module.exports = function(app) {
  app.get("/", function(req, res) {
    request("https://www.nytimes.com/section/nyregion/", function(error, response, html) {
          var $ = cheerio.load(html);
          var allResults = [];
            $(".lede").each(function(i, element) {
              var result = {};
              var getLink = $(element).children("a").attr("href");
              var trimTitle = $(element).find($(".lede__title")).text();
              trimTitle = trimTitle.trim();
              if(!getLink)
                return;

              result.latest = "active-page";
              result.archive = "active-page";
              result.title = trimTitle;
              result.link = getLink;
              result.summary = $(element).find($(".lede__kicker")).text();
              result.img = $(element).find($(".bf_dom")).attr("rel:bf_image_src") ||
              $(element).find($(".lede__image")).attr("src");

              var article = new Articles(result);

              article.save(function(err, doc) {
                if (err) {
                  return console.log(err);
                }
                else {
                  console.log(doc);
                }
              });

              allResults.push(result);

          });
      for(var i = 0; i < allResults.length; i++)
        allResults[i]["idnum"] = i;
      var hbsObject = {
        articles: allResults
      };
      res.render("index", hbsObject);

    });
  });
  app.get("/archive", function(req, res) {
    Articles.find({}).sort({"createdAt": -1})
    .exec(function(error, results) {
      if (error) {
      }
      else {
        console.log(results.length);
        for(var i = 0; i < results.length; i++) {
          results[i]["idnum"] = i;
        }
        var hbsObject = {
          articles: results
        };
        res.render("index", hbsObject);
      }
    });
  });


  app.post('/comments/:title', function(req, res){
     var comment = new Comments(req.body);
    comment.save(function(error, doc) {
       if (error) {
       }
      else {
        console.log("COMMENTS NEW DOC", doc._id);
        Articles.findOneAndUpdate({"title": req.params.title }, { $push: { "comments": doc._id } }, { new: true })
        .exec(function(err, newdoc) {
        if (err) {
          console.log("err");
          res.send(err);
        }
        else {
          console.log("newdoc", newdoc);
          res.send(newdoc);
        }
      });
      }
    });
  });
  app.get('/comments/:title', function(req, res) {

    console.log(req.params.title);
    Articles.findOne({"title": req.params.title})
    .populate("comments")
    .exec(function(error, doc) {
      if (error) {
        res.send(error);
      }
      else {
        res.send(doc);
      }
    });
  });
  app.delete("/comments/delete/:id", function(req, res) {
      Comments.remove({"_id": req.params.id})
      .exec(function(error, doc) {
        if (error) {
          res.send(error);
        }
        else {
          console.log("doc", doc);
          res.send(doc);
        }
      });
  });

}
