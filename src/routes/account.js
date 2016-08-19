const express = require('express');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/account", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});

router.get("/updateAccount", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/updateAccount", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});

router.post("/updateAccount", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let major = (req.body.major);
    let cwid = parseInt(req.body.cwid);
    let password = req.body.password
    let gpa = parseInt(req.body.gpa);
    let semester_of_entry = (req.body.semester_of_entry);
    let d_o_g = (req.body.d_o_g);
    let current_credit_total = (req.body.current_credit_total);

    let updatedUser = {

    };

    data.course_info.updateUser(username, null, null, password, null, null, null, null, null).then(user => {
        if(password !== password2) throw "Passwords don't match"
        res.render("layouts/account", { partial: "jquery-scripts", user: user });
    }).catch((e) => {
        res.render("layouts/signup", { partial: "jquery-scripts", error: e });
    });
});

module.exports = router;
