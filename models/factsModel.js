const { Schema, model } = require("mongoose");

//facts collection model to control which data can be stored
// in the collection and which data is required
const factSchema = new Schema({
  fact: {
    type: String,
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
});

module.exports = model("facts", factSchema);
