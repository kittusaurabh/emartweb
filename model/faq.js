let mongoose = require("mongoose");
let faqSchema = mongoose.Schema(
  {
    que: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let Faq = new mongoose.model("Faq", faqSchema);
module.exports = Faq;
