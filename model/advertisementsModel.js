let mongoose = require("mongoose");
let advertisementsModelSchema = mongoose.Schema(
  {
    selectPosition: {
      type: String,
      enum: ["On Category Page", "On Product Details Page"],
    },
    displayProductPage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    displayCategoryPage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    linkByPage: {
      type: String,
      enum: [
        "By Category Page",
        "By Product Page",
        "By Custom Page",
        "By Google Adsence",
      ],
    },
    chooseImage: {
      type: String,
    },
    adsCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    headingText: {
      type: String,
    },
    headingTextColor: {
      type: String,
    },
    subHeadingTextColor: {
      type: String,
    },
    customURL: {
      type: String,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    buttonText: {
      type: String,
    },
    buttonTextColor: {
      type: String,
    },
    buttonBackgroundColor: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

let Advertisements = new mongoose.model(
  "Advertisements",
  advertisementsModelSchema
);
module.exports = Advertisements;
