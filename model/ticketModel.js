let mongoose = require("mongoose");
let ticketModelSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    issue: {
      type: String,
    },
    image: {
      type: String,
    },
    describeYourIssue: {
      type: String,
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending", "solved"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

let Ticket = new mongoose.model("Ticket", ticketModelSchema);
module.exports = Ticket;
