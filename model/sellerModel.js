let mongoose = require("mongoose");

let sellerSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    storeName: {
      type: String,
    },
    buisness_email: {
      type: String,
    },
    mobile_number: {
      type: String,
    },
    phone_number: {
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
    storeAddress: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    storeLogo: {
      type: String,
    },
    documentForVerification: {
      type: String,
    },
    password: {
      type: String,
    },
    access_token: {
      type: String,
    },
    player_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Seller = new mongoose.model("Seller", sellerSchema);
module.exports = Seller;
