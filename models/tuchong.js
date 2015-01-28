var superagent = require('superagent');
var cheerio = require('cheerio');
//var mongodb = require('./db');
var Post = require('../models/post.js');

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
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio.load(res.text);
            //var posts = [];
            $('.grid-post-list .post-grid').each(function(i, elem){
                src = $(this).find('img').attr('src');
                href = $(this).find('h3 a').attr('href');
                title = $(this).find('h3 a').attr('title');
                /*posts.push({
                    src: $(this).find('img').attr('src'),
                    href: $(this).find('h3 a').attr('href'),
                    title: $(this).find('h3 a').attr('title')
                });*/
                /*console.log(src);
                console.log(href);
                console.log(title);*/
                post = new Post(title, src, href);
                post.save(function(err){
                    if(err){
                        req.flash('error', err);
                        return res.redirect('/');
                    }
                    console.log("save to mongodb good");
                });
            });
            var next = $('.pagebar .wrapper .pages .next').attr('href');
            if(next){
                TuChong.fromname(url + next);
            }
            //console.log(posts);
            
        });
    //console.log(posts);
}

TuChong.one = function(url, callback){
    superagent
        .get(url)
        .end(function(err, res){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio
        })
}

module.exports = TuChong;
