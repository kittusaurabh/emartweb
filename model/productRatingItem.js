var mongoose = require("mongoose");

const productItemRatingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
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
      ref: "Product",
      default: null,
    },
    review: String,
  },
  {
    timestamps: true,
  }
);

let productItemRatingModel = new mongoose.model(
  "productItemRating",
  productItemRatingSchema
);
module.exports = productItemRatingModel;
