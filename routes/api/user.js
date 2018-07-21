const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

// Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')
const keys = require('../../config/keys')

/**
 * @route   GET api/user/test
 * @desc    Tests user route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({
  msg: 'user works'
}))

/**
 * @route   POST api/user/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body)

  // check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        errors.email = 'Email already registered'
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm' // default
        })
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          avatar
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

/**
 * @route   POST api/user/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body)

  // check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const {
    email,
    password
  } = req.body

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              first_name: user.first_name,
              avatar: user.avatar
            }
            // Sign
            jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 604800
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors)
          }
        })
    })
})

/**
 * @route   GET api/user/current
 * @desc    Get current user
 * @access  Private
 */
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json(req.user)
})

module.exports = router