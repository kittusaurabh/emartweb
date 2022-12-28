let mongoose = require("mongoose");
let testimonialModelSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    designation: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
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

let Testimonial = new mongoose.model("Testimonial", testimonialModelSchema);
module.exports = Testimonial;
