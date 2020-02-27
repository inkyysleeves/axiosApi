const mongoose = require("mongoose");
const userSchema = require("../model/user")

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
