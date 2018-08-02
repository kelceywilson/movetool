const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const alert = require("./routes/api/alert");
const profile = require("./routes/api/profile");
const user = require("./routes/api/user");
const passport = require("passport");

const app = express();

app.use(
  bodyparser.urlencoded({
    extended: false
  })
);
app.use(bodyparser.json());

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

app.get("/", (req, res) => res.send("Hello"));

// Routes
app.use("/api/alert", alert);
app.use("/api/profile", profile);
app.use("/api/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
