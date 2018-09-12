const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
