const express = require('express');
const passport = require('passport')
const router = express.Router();

const Alert = require('../../models/Alert')

/**
 * Callback to an express route to get all alerts
 * @return {Promise} - resolves to an array of objects representing all alerts
 */
const getAllAlerts = () =>
  Alert.find({}).sort({
    createdAt: -1
  });

/**
 * Callback to an express route to add a new alert
 * @param {object} newAlertPost - represents new alert
 * @return {Promise} -resolves to an object representing the alert
 */
const addNewAlert = newAlertPost => {
  const newAlert = new Alert(newAlertPost);
  return newAlert.save();
};

/**
 * Callback to an express route to get alert by its id
 * @param  {string} alertId - unique id of alert
 * @return {Promise} - resolves to an object representing the alert
 */
const getOneAlert = alertId => Alert.findById(alertId);

/**
 * Callback to an express route to delete an alert of given id
 * @param  {string} alertId - unique id of alert
 * @return {Promise} - resolves to an array of objects representing all alerts
 */
const deleteOneAlert = alertId => Alert.findByIdAndRemove(alertId);

/**
 * Callback to an express route to search for all alerts that has search terms in title or type
 * @param  {string} terms - entered search terms
 * @return {Promise} - resolves to array of objects representing relevant alerts
 */
const searchAlerts = terms => {
  console.log(terms);
  if (terms === "") {
    return getAllAlerts();
  }
  const splitTerms = terms.split(" ");
  return Alert.where({
    $or: [{
        alert_type: {
          $in: splitTerms
        }
      },
      {
        city: {
          $in: splitTerms
        }
      },
      {
        county: {
          $in: splitTerms
        }
      },
      {
        title: {
          $in: splitTerms
        }
      },
      {
        zip: {
          $in: splitTerms
        }
      }
    ]
  });
};

const filterAlerts = filterBy => {
  console.log(filterBy);
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

// GET all alerts page
// TODO change to get 10 at a time with paging
router.get("/alert", (req, res) => {
  getAllAlerts()
    .then(alerts => res.json(alerts))
    .catch(err => console.log(err));
});

// POST new alert
router.post("/alert", (req, res) => {
  db.addNewAlert(req.body)
    .then(() => {
      getAllAlerts().then(alerts => res.status(201).json(alerts));
    })
    .catch(err => console.log(err));
});

// GET search alerts
router.get("/alert/search", (req, res) => {
  const {
    terms
  } = req.query;
  searchAlerts(terms)
    .then(alerts => {
      res.json(alerts);
    })
    .catch(err => console.log(err));
});

// GET filter alerts
router.get("/alert/filter", (req, res) => {
  const {
    filterBy
  } = req.query;
  filterAlerts(filterBy)
    .then(alerts => {
      res.json(alerts);
    })
    .catch(err => console.log(err));
});

// GET one alert
router.get("/alert/:aID", (req, res) => {
  getOneAlert(req.params.aID)
    .then(alert => res.json(alert))
    .catch(err => console.log(err));
});

// DELETE one alert
router.delete("/alert/:aID", (req, res) => {
  db.deleteOneAlert(req.params.aID)
    .then(() => {
      getAllAlerts().then(alerts => res.json(alerts));
    })
    .catch(err => console.log(err));
});

module.exports = router;