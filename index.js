const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const SocketIO = require("socket.io");

const { config } = require("./config/config"); //get environment vars
const isAuthenticated = require("./middlewares/authHandler"); //for protect the routes
const breedService = require("./public/services/breedService"); //get breeds service
const factService = require("./public/services/factService"); //get facts service
const saveImagesService = require("./public/services/saveImagesService"); //for save images
const userService = require("./public/services/userService"); //get user service

const service = new breedService(); //class instance of breeds
const serviceFacts = new factService(); //class instance of facts
const imageService = new saveImagesService(); //class instance of images
const serviceUser = new userService(); //class instance of users

// Express Setup
const app = express();
const port = config.port;

//for authentication
require("./config/passport");

// Setting the view engine to render ejs templates
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//database connection
require("./database/database");

//Routes for display home
app.get("/", async (req, res) => {
  //generate random int to get fact and breed
  const randomInt = Math.floor(Math.random() * 8) + 1;
  //get all breeds
  const breed = await service.getAllBreeds();
  //get all facts
  const fact = await serviceFacts.getAllFacts();
  //get random fact
  let getRandFact = fact[randomInt];
  //get random breed
  let getRandBreed = breed[randomInt];
  //build random data
  let data = { fact: getRandFact, breed: getRandBreed };
  //display home page with random fact and breed
  res.render("home", data);
});

//route for display a breed
app.get(
  "/breed/:id",
  isAuthenticated, ////allows access to the route only to logged in users
  async (req, res) => {
    const breedId = req.params.id; //get breed id param
    const breed = await service.getBreed(breedId); //get breed data
    res.render("breeds/get-breed", { breed }); //display breed data in a page
  }
);

//route for display all breeds saved in database
app.get(
  "/breeds",
  isAuthenticated, ////allows access to the route only to logged in users
  async (req, res) => {
    const breeds = await service.getAllBreeds(); //get all breeds in database
    res.render("breeds/breeds", { breeds }); //display all breeds data in a page
  }
);

//route for display a fact
app.get("/fact/:id", async (req, res) => {
  const factId = req.params.id; //get fact id param
  const fact = await serviceFacts.getFact(factId); //get fact data
  res.render("facts/get-fact", { fact }); //display fact data in a page
});

//route for display all facts saved in database
app.get("/facts", async (req, res) => {
  const facts = await serviceFacts.getAllFacts(); //get all facts in database
  res.render("facts/facts", { facts }); //display all facts data in a page
});

//route for display page login
app.get("/login", async (req, res) => {
  res.render("login"); //display login page
});

//path to log in a user
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/breeds",
    failureFlash: true,
  })
);

//route to logout
app.get(
  "/logout",
  isAuthenticated, //allows access to the route only to logged in users
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_msg", "You are logged out now.");
      res.redirect("/login");
    });
  }
);

//route for display page singup
app.get("/singup", async (req, res) => {
  res.render("singup"); //display singup page
});

//path to save a user to the database
app.post(
  "/create-user",
  imageService.saveImage("profileImages"), //save Image
  async (req, res, next) => {
    try {
      const body = req.body;
      const image = req.file;

      // //if an image is loaded, it is saved and assigned to the user
      if (image) {
        body.profileImage = req.file.filename;
      }

      //service function is used to store user data in the database
      const data = await serviceUser.singUp(body);
      console.log(data);

      //success message on create user
      req.flash("success_msg", "You are registered");
      res.redirect("/login");
    } catch (error) {
      //show error message
      req.flash("error_msg", error.message);
      res.redirect("/singup");
    }
  }
);

const server = app.listen(port, () => {
  console.log("My port:" + port);
});

//webSockets
const io = SocketIO(server);


io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("firstName:empty", (firstName) => {
    socket.emit('firstName:empty', firstName);
  });

  socket.on("lastName:empty", (lastName) => {
    socket.emit('lastName:empty', lastName);
  });

  socket.on("email:empty", (email) => {
    socket.emit('email:empty', email);
  });

  socket.on("password:empty", (password) => {
    socket.emit('password:empty', password);
  });

  socket.on("confirmPassword:empty", (confirmPassword) => {
    socket.emit('confirmPassword:empty', confirmPassword);
  });

  socket.on("birthdate:empty", (birthdate) => {
    socket.emit('birthdate:empty', birthdate);
  });

  socket.on("profileImage:empty", (profileImage) => {
    socket.emit('profileImage:empty', profileImage);
  });
});