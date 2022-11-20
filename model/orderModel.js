const mongoose = require("mongoose");

let ordersSchema = new mongoose.Schema(
  {
    item_order: [Object],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    order_id: {
      type: String,
      default: "",
    },
    order_amount: {
      type: Number,
      default: 0,
    },
    delivery_type: Number,
    tax_amount: {
      type: Number,
      default: 0,
    },
    discount_amount: {
      type: Number,
      default: 0,
    },
    shipping_charge: {
      type: Number,
      default: 0,
    },
    order_status: {
      type: String,
      default: "PENDING", // ACCPECTBYSTORE // REJECTEDBYSTORE // READYTODISPATCH //ONTHEWAY //DELIVERED // CANCELLEDBYUSER  //ORDERDEXPIRED
    },
    rejection_reason: {
      type: String,
      default: "",
    },
    payment_method: {
      type: String,
      default: "",
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      // ref: "Address"
    },
    cancelation_reason: String,
  },
  {
    timestamps: true,
  }
);

let Order = new mongoose.model("Order", ordersSchema);
module.exports = Order;
