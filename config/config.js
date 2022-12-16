require("dotenv").config(); //get the env variables

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
};

module.exports = { config };
