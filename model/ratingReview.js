var mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rate: Number,
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      default: null,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      default: null,
    },
    review: String,
  },
  {
    timestamps: true,
  }
);
let RatingModel = new mongoose.model("RatingModel", ratingSchema);
module.exports = RatingModel;
