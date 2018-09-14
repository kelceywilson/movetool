const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMessageInput(data) {
  let errors = {};
  console.log("validator", data);

  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isLength(data.subject, { min: 1, max: undefined })) {
    errors.subject = "Subject is required";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject is required";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
