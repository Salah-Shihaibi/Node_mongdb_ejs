const express = require("express");
const mongoose = require("mongoose");
const app = express();
const posts = require("./routes/posts");
const passwords = require("./passwords")


// set the view engine to ejs
app.set('view engine', 'ejs');

// this is used for body parsa
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.get("/", (req, res) => {
    res.render('pages/home');  
    //res.send("Home");
});

app.use("/posts", posts);

// connect to db
mongoose.connect(
  passwords.mongodb_atlas,
  () => console.log("DB connected")
);
// Start server
const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log(`local host ${Port} running`);
});
