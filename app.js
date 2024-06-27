const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/ba8608705a";

    const options = {
        method: "POST",
        auth: "amb2755:8ac05d5834c3f3e6594ebd5c36dcbdfc-us14"
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(path.join(__dirname, "success.html"), function (err) {
                if (err) {
                    res.status(500).send("Error loading success page.");
                }
            });
        } else {
            res.sendFile(path.join(__dirname, "failure.html"), function (err) {
                if (err) {
                    res.status(500).send("Error loading failure page.");
                }
            });
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData); 
    request.end(); 
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

//API key
//8ac05d5834c3f3e6594ebd5c36dcbdfc-us14

//List Id
//ba8608705a
