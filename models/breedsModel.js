const { Schema, model } = require("mongoose");

//breeds collection model to control which data can be stored
// in the collection and which data is required
const breedSchema = new Schema({
  breed: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  coat: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = model("breeds", breedSchema);
