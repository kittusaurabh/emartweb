var mongoose = require("mongoose");
let cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total_items_in_cart: {
    type: Number,
    default: 0,
  },
  grand_total_of_cart: {
    type: Number,
    default: 0,
  },
  items_in_cart: [
    {
      seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },
      store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
      subCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategories",
      },
      childCategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "childCategories",
      },
      menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
      footerMenu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FooterMenu",
      },
      brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brands",
      },
      selected_quantity: {
        type: Number,
        default: 0,
      },
      item_unit_price: {
        type: Number,
        default: 0,
      },
      item_total_price: {
        type: Number,
        default: 0,
      },
    },
  ],
});
let Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;
