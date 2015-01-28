var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Post(title, src, href){
    this.title = title;
    this.src = src;
    this.href = href;
}

module.exports = Post;

Post.prototype.save = function(callback){
    var post = {
        title: title,
        src: src,
        href: href
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err)
            }
            collection.insert(post, {
                safe: true
            }, function(err){
                mongodb.close(err);
                if(err){
                    return callback(err);
                }
                callback(null);
            })
        })
    });
}
