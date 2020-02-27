require('dotenv').config()

const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const userModel = require("./models/userModel");
const userSchema = require("./models/schemas/userSchema");
const axios = require("axios");
const bodyParser = require("body-parser");

// server config
const app = express();
const port = process.env.PORT;

// middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// view config
app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

// routes
app.get('/', (req, res) => {
  let data = {
    name: "test",
    age: 45,
    smoker: true,
    dependants: {
      numberOfDependants: 1,
      ageOfDependants: 14,
    }
  };

  axios
    .post(`${process.env.SITEURL}/`, data)
    .then(response => res.render('index', response.data))
    .catch(err => res.render('index', err));
});

app.post("/", (req, res) => {
  try {
    const User = mongoose.model('User', userSchema);
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      smoker: req.body.smoker,
      dependants: req.body.dependants
    });

    newUser.save();
    return res.json(newUser);
  } catch(err) {
    return res.json(err);
  };
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});