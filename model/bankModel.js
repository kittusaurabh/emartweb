let mongoose = require("mongoose");
let bankModelSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    isCreatedByAdmin: {
      type: Boolean,
      default: false,
    },
    acHolderName: {
      type: String,
    },
    bankName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    IFSCSWIFTCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Bank = new mongoose.model("Bank", bankModelSchema);
module.exports = Bank;
