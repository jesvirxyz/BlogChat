const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('users', UserSchema);
