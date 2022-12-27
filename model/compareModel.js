var mongoose = require("mongoose");
const CompareModelSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

let CompareModel = new mongoose.model("CompareModel", CompareModelSchema);
module.exports = CompareModel;
