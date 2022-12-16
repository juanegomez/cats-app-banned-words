const users = require("./users.json");
const userModel = require("./models/userModel"); //get users database model
require("./database/database");

async function addUsers() {
  for (const user of users.data) {
    //a database template object is created with the new user's data
    const newUser = new userModel({
      username: user.username,
      password: user.password,
    });

    //encrypts the user password
    newUser.password = await newUser.encryptPassword(user.password);
    //saves the new user in the database and if it doesn't return an error
    await newUser.save();
  }
}

addUsers();
