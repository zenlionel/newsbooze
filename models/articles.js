var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    updated: {
        type: String,
        default: Date
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]

});

var articles = mongoose.model('articles', articleSchema);
module.exports = articles;