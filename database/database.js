require("dotenv").config();
const mongoose = require("mongoose");

//get environment variables
const { MONGOURL } = process.env;

//moongose database connection
mongoose
  .connect(MONGOURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Database is Correct."))
  .catch((err) => console.log(err));
