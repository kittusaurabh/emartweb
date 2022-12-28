var mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    sender: {
      type: String,
    },
    body: {
      type: String,
    },
    title: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
let Notification = new mongoose.model("Notification", notificationSchema);
module.exports = Notification;
