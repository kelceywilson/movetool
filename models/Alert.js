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
  photo_url: String,
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
  address: String,
  city: String,
  state: String,
  zip: String,
  county: String,
  public: Boolean,
  body: String,
  price_value: Number,
  item_or_unit: String,
  measurement: String,
  discount: Number,
  category: String,
  quantity: Number,
  acreage: Number,
  frequency: Number,
  expires: Date,
  event_date_time: Date,
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
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Alert = mongoose.model("alert", AlertSchema);
