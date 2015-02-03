var mongoose = require('./mongodb');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: String,
    //authorimg: String,
    title: String,
    src: String,
    href: String,
    imgs: [String]
    /*photos: [{
        img: String
    }]*/
});

var Post = mongoose.model('post', PostSchema);

module.exports = Post;
