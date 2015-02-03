var express = require('express');
var router = express.Router();
var TuChong = require('../models/tuchong.js');

router.get('/search', function(req, res){
    TuChong.getAuthor(function(err, authors){
        if(err){
            req.flash('error', err);
        }
        res.render('tcindex',{
            authors: authors
        });
    });
});

router.post('/search', function(req, res){
    //console.log(req.body.url);
    TuChong.fromname(req.body.url, function(err){
        if(err){
            req.flash('error',err);
        }
    });
    res.redirect('/tuchong/search');
    //res.send("Get all collection success");
})

router.get('/getname', function(req, res){
    TuChong.fromname('http://zuoxiaoxi.tuchong.com/', function(err){
        if(err){
            req.flash('error', err);
        }
    });
    res.send("Get all collection sucess");
});

router.get('/test', function(req, res){
   /*var test =  tcmodel.one('http://zuoxiaoxi.tuchong.com/7061965/', function(err){
        if(err){
            console.log(err);
        }
    });*/
    TuChong.one('http://zuoxiaoxi.tuchong.com/7061965/', function(err, img){
        if(err){
            console.log(err);
        }
        console.log(img);
    });
    //console.log(test);
});

router.get('/author/:name', function(req, res){
    TuChong.getAll(req.params.name, function(err, docs){
        if(err){
            req.flash('error', err);
            return res.resirect('/');
        }
        res.render('tuchong', {
            docs: docs
            //imgs: posts.img
        });
    });
});

router.get('/photo/:id', function(req, res){
    TuChong.getOne(req.params.id, function(err, docs){
        if(err){
            req.flash('error', err);
        }
        res.render('photo',{
            title: docs.title,
            author: docs.author,
            imgs: docs.imgs
        });
    });
});

router.get('/showauthor', function(req, res){
    TuChong.getAuthor(function(err, authors){
        if(err){
            req.flash('error', err);
        }
        res.render('author',{
            authors: authors
        });
    });
});

module.exports = router;
