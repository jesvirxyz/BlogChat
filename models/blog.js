const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    postedBy: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
    },
    commentID: {
        type: String,
    },
    shares: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('blogs', BlogSchema);
