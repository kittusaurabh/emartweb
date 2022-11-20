let mongoose = require("mongoose");
let wishlistSchema = mongoose.Schema(
  {
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

let Wishlist = new mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
