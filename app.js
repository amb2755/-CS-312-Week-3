const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve signup.html from the root directory
app.get("/signup.html", function (req, res) {
    res.sendFile(path.join(__dirname, "signup.html"));
});

// Serve the root URL with the signup.html page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
    res.send('Form submitted successfully');
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

