const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const alert = require("./routes/api/alert");
const profile = require("./routes/api/profile");
const user = require("./routes/api/user");
const passport = require("passport");
const cloudinary = require("cloudinary");

const app = express();

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
app.use(bodyparser.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// this can all be replaced by uncommenting cors middleware and app.use
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/api/alert", alert);
app.use("/api/profile", profile);
app.use("/api/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
