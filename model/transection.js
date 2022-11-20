let mongoose = require("mongoose");
let transectionModelSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    wallet_amount: Number,
    transaction_validity: {
      create: Date,
      expireDate: Date,
    },
    transaction_type: {
      enum: ["credit", "debit"],
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

let Transaction = new mongoose.model("Transaction", transectionModelSchema);
module.exports = Transaction;
