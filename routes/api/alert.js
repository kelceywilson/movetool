const express = require('express')
const router = express.Router()

/**
 * @route   GET api/alert/test
 * @desc    Tests alert route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({
  msg: 'alert works'
}))

module.exports = router