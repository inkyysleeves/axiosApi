const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const app = express();
const UserSchema = require("./lib/getUser");
const UserModel = require("./model/user");
const axios = require("axios");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ extended: false }));

app.engine(
  ".hbs",
  hbs({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  let data = axios
    .post("/", {
      name: "test",
      age: 12,
      smoker: true,
      dependants: {
        numberOfDependants: 1,
        ageOfDependants: 14
      }
    })
    .then(res => res)
    .then(res => res.data)
    .then(res => console.log(res.data))
    .catch(e => e);
  // return console.log(res.data);
  res.render("index", {name: "test"});
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const user = new UserSchema({
    name: req.body.name,
    age: req.body.age,
    smoker: req.body.smoker,
    dependants: req.body.dependants
  });
  user.save();

  res.send("user saved");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
