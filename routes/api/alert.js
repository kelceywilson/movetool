const express = require("express");
const passport = require("passport");
const router = express.Router();

const Alert = require("../../models/Alert");
const User = require("../../models/User");

/**
 * Callback to an express route to get all alerts
 * @return {Promise} - resolves to an array of objects representing all alerts
 */
const getAllAlerts = () =>
  Alert.find({}).sort({
    createdAt: -1
  });

/**
 * Callback to an express route to search for all alerts that has search terms in title or type
 * @param  {string} terms - entered search terms
 * @return {Promise} - resolves to array of objects representing relevant alerts
 */
const searchAlerts = terms => {
  console.log("search", terms);
  if (terms === "") {
    return getAllAlerts();
  }
  const splitTerms = terms.split(" ");
  console.log(splitTerms);
  // title: { $regex: terms, $options: "ix" }

  return Alert.find({ $text: { $search: terms } });

  // return Alert.where({
  //   $or: [
  //     {
  //       alert_type: {
  //         $in: splitTerms
  //       }
  //     },
  //     {
  //       city: {
  //         $in: splitTerms
  //       }
  //     },
  //     {
  //       county: {
  //         $in: splitTerms
  //       }
  //     },
  //     {
  //       title: { $regex: splitTerms, $options: "ix" }
  //     },
  //     {
  //       zip: {
  //         $in: splitTerms
  //       }
  //     }
  //   ]
  // }).collation({ locale: "en", strength: 2 });
};

const filterAlerts = filterBy => {
  console.log("filter", filterBy);
  return Alert.where({
    alert_type: filterBy
  });
};

/**
 * @route   GET api/alert/test
 * @desc    Tests alert route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({
    msg: "alert works"
  })
);

/**
 * @route   GET api/alert
 * @desc    Get all alerts
 * @access  Public
 * TODO     change to get 10 at a time with paging
 */
router.get("/", (req, res) => {
  Alert.find({})
    .sort({
      createdAt: -1
    })
    .then(alerts => res.json(alerts))
    .catch(err => console.log(err));
});

/**
 * @route   POST api/alert
 * @desc    Post new alert
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const newAlert = new Alert({
      ...req.body,
      user: req.user.id
    });
    console.log(newAlert);

    newAlert
      .save()
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
