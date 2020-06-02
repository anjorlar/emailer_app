const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('users', userSchema);