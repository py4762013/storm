var mongoose = require('mongoose');
mongoose.connect('mongodb://ustorm:pstorm@localhost/storm');
module.exports = mongoose;
