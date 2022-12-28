let mongoose = require("mongoose");
let credentialModelSchema = mongoose.Schema(
  {
    credential: {},
    credentialType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Credential = new mongoose.model("Credential", credentialModelSchema);
module.exports = Credential;
