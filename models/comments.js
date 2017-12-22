var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
    author: {
        type: String
    },
    content: {
        type: String
    }
});
var comments = mongoose.model('comments', commentSchema);
module.exports = comments;