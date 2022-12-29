let mongoose = require("mongoose");
let flashsaleSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    backgroundImage: {
      type: String,
    },
    startDate: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    detail: {
      type: String,
    },
    selectProduct: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        discount: {
          type: String,
        },
        discountType: {
          type: String,
          enum: ["Fixed", "Upto"],
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let FlashSale = new mongoose.model("FlashSale", flashsaleSchema);
module.exports = FlashSale;
