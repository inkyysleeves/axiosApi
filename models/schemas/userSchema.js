const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  smoker: Boolean,
  dependants: {
    numberOfDependants: Number,
    ageOfDependants: Number
  }
});

module.exports = userSchema;