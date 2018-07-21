const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let error = {}
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  if (!Validator.isLength(data.first_name, {
      min: 1,
      max: 30
    })) {
    errors.name = 'First name must be at least 1 character long'
  }

  if (!Validator.isLength(data.last_name, {
      min: 2,
      max: 30
    })) {
    errors.last_name = 'Last name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.name = 'First name field is required';
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.name = 'Last name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}