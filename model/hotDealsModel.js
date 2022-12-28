let mongoose = require("mongoose");
let hotDealsSchema = mongoose.Schema(
  {
    createdDate: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

let HotDeals = new mongoose.model("HotDeals", hotDealsSchema);
module.exports = HotDeals;
