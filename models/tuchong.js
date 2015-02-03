var superagent = require('superagent');
var cheerio = require('cheerio');
//var mongodb = require('./db');
var Post = require('../models/post.js');
var async = require('async');

function TuChong(title, src, href){
    this.title = title;
    this.src = src,
    this.href = href
}

TuChong.fromname = function(url, callback){
    var posts = [];
    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                console.log('error');
                //req.flash('error', err);
                //return callback(err);
                return err;
            }
            var $ = cheerio.load(res.text);
            //var posts = [];
            var author = $('.site-header-wrapper .container img').attr('title');
            var authorimg = $('.site-header-wrapper .container img').attr('src');
            $('.grid-post-list .post-grid').each(function(i, elem){
                var src = $(this).find('img').attr('src');
                var href = $(this).find('h3 a').attr('href');
                var title = $(this).find('h3 a').attr('title');
                
                TuChong.one(href, function(err, img){
                    if(err){
                        console.log(err);
                    }
                    //console.log(img);
                    var posts = {
                        author: author,
                        authorimg: authorimg,
                        title: title,
                        src: src,
                        //href: href,
                        imgs: img
                    }

                    post = new Post(posts);
                    post.save(function(err){
                        if(err){
                            req.flash('error', err);
                            return res.redirect('/');
                        }
                        console.log("save mongodb success");
                    });
                });

                /*var posts = {
                    title: title,
                    src: src,
                    href: href
                };

                post = new Post(posts);
                post.save(function(err){
                    if(err){
                        req.flash('error', err);
                        return res.redirect('/');
                    }
                    console.log("save to mongodb good");
                });*/
            });
            var next = $('.pagebar .wrapper .pages .next').attr('href');
            if(next){
                TuChong.fromname(url + next);
            }else{
                console.log("success");
                return null;
            }
        });
    //console.log(posts);
}

TuChong.one = function(url, callback){
    var imgitem = [];
    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio.load(res.text);
            $('.figures-wrapper figure img').each(function(i, elem){
                imgitem.push($(this).attr('src'));
            });
            //console.log(imgitem);
            callback(null, imgitem);
        });
    //console.log(imgitem);
    //return imgitem;

   /*test = async.series([
        function(callback){
            superagent
            .get(url)
            .end(function(err, res){
                if(err){
                    return callback(err);
                }
                var $ = cheerio.load(res.text);
                $('.figures-wrapper figure img').each(function(i, elem){
                    imgitem.push($(this).attr('src'));
                });
                callback(null, imgitem);
            });
        }
    ], function(err, imgitem){
        console.log(imgitem);
    });*/
}

TuChong.getAll = function(name, callback){
    console.log(name);
    /*Post.find({author:"佐小夕"},function(err, docs){

        console.log(docs.length);
    });*/
    Post.find({author:name}, function(err, docs){
        //console.log(docs.length);
        if(err){
            req.flash('error', err);
        }
        callback(null, docs);
    });
}

TuChong.getOne = function(id, callback){
    Post.findOne({_id:id}, function(err, docs){
        //console.log(docs);
        if(err){
            req.flash('error', err);
        }
        callback(null, docs);
    });
}

TuChong.getAuthor = function(callback){
    console.log("test");
    Post.distinct('author',{},function(err, authors){
        if(err){
            req.flash('error', err);
        }
        callback(null, authors);
    });
}

module.exports = TuChong;
