const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    level: String,
    active: Boolean,
    dateCreated: String,
    lastActive: String
  });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema, 'users')