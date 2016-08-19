const express = require('express');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/home", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});

router.get("/signup", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/signup", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});


router.post("/signup", (req, res) => {
    let email = (req.body.email);
    let username = (req.body.username);
    let password = (req.body.password);
    let password2 = (req.body.password2);
    let user;

    console.log("password1: ", password);
    console.log("password2: ", password2);

    try {
        if(password !== password2) throw "Passwords don't match"

        user = data.course_info.addUser(username, null, null, password);
    } catch (e) {
        res.render("layouts/signup", { partial: "jquery-scripts", error: e });
        return;
    }
    res.render("layouts/account", { partial: "jquery-scripts", user: user });
});

router.get("/changePassword", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/changePassword", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});



module.exports = router;
