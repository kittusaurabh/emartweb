let mongoose = require("mongoose");
let contactUsSchema = mongoose.Schema(
  {
    yourName: {
      type: String,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let ContactUs = new mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
