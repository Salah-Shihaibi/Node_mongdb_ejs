const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const posts = require("./routes/posts");
const passwords = require("./passwords");
const flash = require('connect-flash');
const session = require('express-session');


// set the view engine to ejs
//app.use(expressLayouts);
app.set('view engine', 'ejs');

// this is used for body parsa
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// // Connect flash
// app.use(flash());

// // Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   next();
// });

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
