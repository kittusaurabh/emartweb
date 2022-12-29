let mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
    },
    access_token: {
      type: String,
    },
    user_email: {
      type: String,
    },
    userRole: {
      type: String,
      enum: ["SuperAdmin", "Customer", "Seller", "Blocked", "Support"],
    },
    mobile_number: {
      type: String,
    },
    wallet_amount: {
      type: Number,
      default: 0,
    },
    phone_number: {
      type: String,
    },
    password: {
      type: String,
    },
    lat: {
      type: String,
      default: "",
    },
    long: {
      type: String,
      default: "",
    },
    country: {
      type: String,
    },
    website: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    user_image: {
      url: String,
      url_type: String,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    refer_id: String,
    player_id: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

let User = new mongoose.model("User", userSchema);
module.exports = User;
