const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

//users collection model to control which data can be stored
// in the collection and which data is required
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  birthdate: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//method to encrypt user passwords
userSchema.methods.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//method to know if the user has entered
//the correct password when logging in
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model("users", userSchema);
