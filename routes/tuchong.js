var express = require('express');
var router = express.Router();
var tcmodel = require('../models/tuchong.js');

router.get('/name', function(req, res){
    tcmodel.fromname('http://zuoxiaoxi.tuchong.com/', function(err, posts){
        if(err){
            console.log(err);
        }
        console.log(posts);
    });
});

module.exports = router;
