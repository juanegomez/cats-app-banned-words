const boom = require("@hapi/boom"); //to show errors
const bannedWords = require("./../../banned_words.json");

const User = require("../../models/userModel"); //get users database model

//in this class you will find the different functionalities
//to be performed in the database with the users.
class userService {
  //this function creating the user and saving it in the database
  async singUp(data) {
    const {
      firstName,
      lastName,
      profileImage,
      email,
      birthdate,
      password,
      confirmPassword,
    } = data;

    //validate fields
    if (!profileImage) {
      throw boom.badData("Profile image is required.");
    }

    if (bannedWords.includes(firstName)) {
      throw boom.badData(`the word ${firstName} is banned.`);
    }

    if (!firstName) {
      throw boom.badData("First Name is required.");
    }

    if (bannedWords.includes(lastName)) {
      throw boom.badData(`the word ${lastName} is banned.`);
    }

    if (!lastName) {
      throw boom.badData("Last Name is required.");
    }

    if (!email) {
      throw boom.badData("Email is required.");
    }

    if (bannedWords.includes(email)) {
      throw boom.badData(`the word ${email} is banned.`);
    }

    if (!birthdate) {
      throw boom.badData("Birthdate is required.");
    }

    if (!password) {
      throw boom.badData("Password is required.");
    }

    if (bannedWords.includes(password)) {
      throw boom.badData(`the word ${password} is banned.`);
    }

    if (password != confirmPassword) {
      throw boom.badData("Password do not match.");
    }

    const emailUser = await User.findOne({ email: email });

    //throw error if the email is not found in the database
    if (emailUser) {
      throw boom.badData("This email is already in use.");
    }

    //a database template object is created with the new user's data
    const newUser = new User({
      firstName,
      lastName,
      profileImage,
      email,
      birthdate,
      password,
    });

    //encrypts the user password
    newUser.password = await newUser.encryptPassword(password);

    try {
      //saves the new user in the database and if it doesn't return an error
      await newUser.save();
    } catch (error) {
      //error when data is incorrect
      throw boom.badData("incorrect data, please try again.");
    }
  }
}

module.exports = userService;
