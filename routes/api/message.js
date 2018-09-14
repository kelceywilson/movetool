const express = require("express");
const passport = require("passport");
const router = express.Router();

const Message = require("../../models/Message");
const validateMessageInput = require("../../validation/message");

/**
 * @route   GET api/message/test
 * @desc    Tests message route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({
    msg: "message works"
  })
);

/**
 * Callback to an express route to get all message
 * @return {Promise} - resolves to an array of objects representing all messages
 */
const getAllMessages = () =>
  Message.find({}).sort({
    createdAt: -1
  });

/**
 * @route   GET api/alert
 * @desc    Get all alerts
 * @access  Public
 * TODO     change to get 10 at a time with paging
 */
router.get("/", (req, res) => {
  Message.find({})
    .sort({
      createdAt: -1
    })
    .then(messages => res.json(messages))
    .catch(err => res.json(err));
});

/**
 * @route   POST api/message
 * @desc    Post new message
 * @access  Private
 */
router.post("/", (req, res) => {
  console.log("route", req.body);
  const { errors, isValid } = validateMessageInput(req.body);
  console.log("route errors", errors);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  const newMessage = new Message({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

  newMessage
    .save()
    .then(message => res.status(201).json(message))
    .catch(err => console.log("api/message", err));
});

/**
 * @route   PUT api/alert/:aid
 * @desc    Update alert
 * @access  Private
 */
router.put(
  "/:aID",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Alert.findByIdAndUpdate(req.params.aID, { $set: req.body }, { new: true })
      .then(() => getAllAlerts())
      .then(alerts => res.status(201).json(alerts))
      .catch(err => console.log(err));
  }
);

// GET search alerts
router.get("/search", (req, res) => {
  const { terms } = req.query;
  searchAlerts(terms)
    .then(alerts => {
      res.json(alerts);
    })
    .catch(err => console.log(err));
});

// GET filter alerts
router.get("/filter", (req, res) => {
  const { filterBy } = req.query;
  filterAlerts(filterBy)
    .then(alerts => {
      res.json(alerts);
    })
    .catch(err => console.log(err));
});

/**
 * @route   GET api/alert/:aID
 * @desc    GET one alert by id
 * @access  Public
 */
router.get("/:aID", (req, res) => {
  Alert.findById(req.params.aID)
    .then(alert => res.json(alert))
    .catch(err => console.log(err));
});

/**
 * @route   DELETE api/alert/:aID
 * @desc    Delete alert by ID
 * @access  Private
 */
router.delete(
  "/:aID",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Alert.findByIdAndRemove(req.params.aID)
      .then(() => {
        getAllAlerts().then(alerts => res.json(alerts));
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
