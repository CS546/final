const express = require('express');
const sessionStorage = require('sessionstorage');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    sessionStorage.clear();
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/home", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});

router.post("/", (req, res) => {
    let username = (req.body.username);
    let password = (req.body.password);
    console.log("username: ", username);
    console.log("password: ", password);

    data.course_info.getUserByName(username).then(user => {
        if(password !== user.password) throw "Incorrect Password"
        console.log("store user id: ", user._id);
        sessionStorage.user_id = user._id;
        console.log("get session storage id: ", sessionStorage.user_id);
        res.render("layouts/account", { partial: "jquery-scripts", user: user });
    }).catch((e) => {
        console.log("error");
        res.render("layouts/home", { partial: "jquery-scripts", error: e });
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

    console.log("password1: ", password);
    console.log("password2: ", password2);

    data.course_info.addUser(username, null, null, password, null, null, null, null, null).then(user => {
        if(password !== password2) throw "Passwords don't match"
        sessionStorage.user_id = user._id;
        res.render("layouts/account", { partial: "jquery-scripts", user: user });
    }).catch((e) => {
        res.render("layouts/signup", { partial: "jquery-scripts", error: e });
    });
});

module.exports = router;
