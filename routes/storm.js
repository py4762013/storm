var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');
var tuchong = require('../models/tuchong.js');

router.get('/search', function(req, res){
    superagent
        .get('http://fbyx.duowan.com/tag/260388334859.html')
        .end(function(err, sres){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio.load(sres.text);
            //var title = $('#list-page .list-page__bd h2').text();
            var item = [];
            $('#list-page .list-page__bd li a').each(function(idx, element){
                item.push({
                    title: $(this).attr('title'),
                    href: $(this).attr('href')
                });
            });
            console.log(item);
        });
    res.render('search');
});

router.get('/one', function(req, res){
    superagent
        .get('http://fbyx.duowan.com/1501/285864593506.html')
        .end(function(err, sres){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
        });
});

router.get('/tuchong', function(req, res){
    superagent
        .get('http://zuoxiaoxi.tuchong.com/7061965/#image11798029')
        .end(function(err, sres){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio.load(sres.text);
            var imgitem = [];
            $('.figures-wrapper figure img').each(function(i, elem){
                /*imgitem.push({
                    href: $(this).attr('src')
                });*/
                imgitem.push($(this).attr('src'));
            });
            //console.log(imgitem);
            res.render('tuchong', {
                imgs: imgitem
            });
        });
    //res.render('tuchong', imgitem);
});

router.get('/name', function(req, res){
    superagent
        .get('http://zuoxiaoxi.tuchong.com/')
        .end(function(err, sres){
            if(err){
                req.flash('error', err);
                return callback(err);
            }
            var $ = cheerio.load(sres.text);
            var posts = [];
            /*$('.grid-post-list .post-grid h3 a').each(function(i, elem){
                //postname.push($(this).attr('href'));
                posts.push({
                    title: $(this).attr('title'),
                    href: $(this).attr('href')
                });
            });*/
            /*$('.grid-post-list .post-grid').map(function(i, elem){
                //console.log($(this).text());
                console.log($(this).find('img').attr('src'));
            });*/
            $('.grid-post-list .post-grid').each(function(i, elem){
                //console.log($(this).find('img').attr('src'));
                //console.log($(this).find('h3 a').attr('title'));
                //console.log($(this).find('h3 a').attr('href'));
                posts.push({
                    src: $(this).find('img').attr('src'),
                    href: $(this).find('h3 a').attr('href'),
                    title: $(this).find('h3 a').attr('title')
                });
            });
            console.log($('.pagebar .wrapper .pages .next').attr('href'));
            var next = $('.pagebar .wrapper .pages .next').attr('href');
            if(next){
                console.log('go on');
            }
            //console.log(posts);
            res.render('posts',{
                posts: posts
            });
        });
        tuchong.fromname('http://zuoxiaoxi.tuchong.com/');
});

module.exports = router;
