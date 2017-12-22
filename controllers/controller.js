var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

var comments = require('../models/comments.js');
var articles = require('../models/articles.js');

router.get('/', function (req, res) {
    res.redirect('/scraped');
});
router.get('/articles', function (req, res) {
    articles.find().sort({
            _id: -1
        })
        .populate('comments')
        .then(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var hbsObject = {
                    articles: doc
                }
                res.render('index', hbsObject);
            }
        });
});
var url = 'https://www.npr.org/';
router.get('/scraped', function (req, res) {
    request(url, function (err, resp, html) {
        var $ = cheerio.load(html);
        $('article div.story-wrap').each(function (i, element) {
            var hotdog = {};
            hotdog.title = $(this).children('h1.title').text().trim() + '';
            hotdog.link = $(this).children('a').attr('href');
            hotdog.summary = $(this).children('a').children('p.teaser').text().trim() + '';

            articles.count({
                title: hotdog.title
            }, function (err, check) {
                if (check == 0) {
                    var newArt = new articles(hotdog);
                    newArt.save(function (err, doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(doc);
                        }
                    });
                }
            });
        });
        res.redirect('/articles');
    });
});

router.post('/add/comments/:id', function (req, res) {
    var articleId = req.params.id;
    var commentByPerson = req.body.name;
    var commentCont = req.body.comment;

    var result = {
        author: commentAuthor,
        content: commentCont
    };

    var newComm = new Comment(result);
    newComm.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            articles.findOneAndUpdate({
                    '_id': articleId
                }, {
                    $push: {
                        'comments': doc._id
                    }
                }, {
                    new: true
                })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});

router.post('/remove/comments/:id', function (req, res) {
    var commentId = req.params.id;
    Comment.findByIdAndRemove(commentId, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    });
});
module.exports = router;