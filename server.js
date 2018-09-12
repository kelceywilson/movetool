require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const cors = require("cors");
const passport = require("passport");
const path = require("path");
const cloudinary = require("cloudinary");

const alert = require("./routes/api/alert");
const message = require("./routes/api/message");
const profile = require("./routes/api/profile");
const user = require("./routes/api/user");

const app = express();

// app.use(cors());
// app.use(
//   cors({
//     allowedHeaders: ["sessionId", "Content-Type"],
//     exposedHeaders: ["sessionId"],
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false
//   })
// );
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// app.options("*", cors());
// this can all be replaced by uncommenting cors middleware and app.use
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,OPTIONS");
    return res.status(200).json({});
  }
  next();
});

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
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/alert", alert);
app.use("/api/message", message);
app.use("/api/profile", profile);
app.use("/api/user", user);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on ${port}`));
