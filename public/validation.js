const socket = io();// Create a connection to the socket server

//get inputs with id
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let profileImage = document.getElementById("profileImage");
let email = document.getElementById("email");
let birthdate = document.getElementById("birthdate");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

// get a reference to them to modify your HTML.
let firstNameMessage = document.getElementById("firstNameMessage");
let lastNameMessage = document.getElementById("lastNameMessage");
let emailMessage = document.getElementById("emailMessage");
let passwordMessage = document.getElementById("passwordMessage");
let confirmPasswordMessage = document.getElementById("confirmPasswordMessage");
let birthdateMessage = document.getElementById("birthdateMessage");
let imageMessage = document.getElementById("imageMessage");


//get the values of the inputs

firstName.addEventListener("input", function () {
  let value = firstName.value;
  socket.emit("firstName:empty", value);
});

lastName.addEventListener("input", function () {
  let value = lastName.value;
  socket.emit("lastName:empty", value);
});

email.addEventListener("input", function () {
  let value = email.value;
  socket.emit("email:empty", value);
});

password.addEventListener("input", function () {
  let value = password.value;
  socket.emit("password:empty", value);
});


confirmPassword.addEventListener("input", function () {
  let value = confirmPassword.value;
  socket.emit("confirmPassword:empty", value);
});

birthdate.addEventListener("input", function () {
  let value = birthdate.value;
  socket.emit("birthdate:empty", value);
});

profileImage.addEventListener("input", function () {
  let value = profileImage.value;
  socket.emit("profileImage:empty", value);
});
//////////////////////////////////////////////////////////

//action to display error message when an input is empty

socket.on("firstName:empty", function (firstName) {
  if (firstName === "") {
    firstNameMessage.innerHTML = `<p>First Name cannot be empty</p>`;
  } else {
    firstNameMessage.innerHTML = ``;
  }
});

socket.on("lastName:empty", function (lastName) {
  if (lastName === "") {
    lastNameMessage.innerHTML = `<p>Last Name cannot be empty</p>`;
  } else {
    lastNameMessage.innerHTML = ``;
  }
});

socket.on("email:empty", function (email) {
  if (email === "") {
    emailMessage.innerHTML = `<p>Email cannot be empty</p>`;
  } else {
    emailMessage.innerHTML = ``;
  }
});

socket.on("password:empty", function (password) {
  if (password === "") {
    passwordMessage.innerHTML = `<p>Password cannot be empty</p>`;
  } else {
    passwordMessage.innerHTML = ``;
  }
});

socket.on("confirmPassword:empty", function (confirmPassword) {
  if (confirmPassword === "") {
    confirmPasswordMessage.innerHTML = `<p>Password cannot be empty</p>`;
  } else {
    confirmPasswordMessage.innerHTML = ``;
  }
});

socket.on("confirmPassword:empty", function (confirmPassword) {
  if (confirmPassword === "") {
    confirmPasswordMessage.innerHTML = `<p>Password cannot be empty</p>`;
  } else {
    confirmPasswordMessage.innerHTML = ``;
  }
});

socket.on("birthdate:empty", function (birthdate) {
  if (birthdate === "") {
    birthdateMessage.innerHTML = `<p>Birthdate cannot be empty</p>`;
  } else {
    birthdateMessage.innerHTML = ``;
  }
});

socket.on("profileImage:empty", function (profileImage) {
  if (profileImage === "") {
    imageMessage.innerHTML = `<p>Profile Image cannot be empty</p>`;
  } else {
    imageMessage.innerHTML = ``;
  }
});