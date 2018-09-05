const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  alert_type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    text: true,
    index: true,
    required: true
  },
  description: String,
  photo_url: String,
  price_value: String,
  name: String,
  avatar: String,
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  flags: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      issue: {
        type: String,
        required: true
      },
      name: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  event_date_time: Date,
  address: String,
  city: String,
  state: String,
  zip: String,
  county: String,
  public: Boolean,
  body: String,
  item_or_unit: String,
  measurement: String,
  discount: Number,
  category: String,
  quantity: Number,
  acreage: Number,
  frequency: Number,
  expires: Date,
  venue_name: String,
  rsvp_link: String,
  company: String,
  goal: String,
  url: String,
  deadline: Date,
  job_title: String,
  compensation: Number,
  need_have: String,
  item_for_trade: String,
  note: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = Alert = mongoose.model("alert", AlertSchema);
