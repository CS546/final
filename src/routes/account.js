const express = require('express');
const sessionStorage = require('sessionstorage');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let id = sessionStorage.user_id;
    console.log("get user id: ", id);
    data.course_info.getUserById(id).then((user) => {
        res.render("layouts/account", {
            partial: "jquery-scripts",
            user: user
        });
    });
});

router.get("/updateAccount", (req, res) => {
    let id = sessionStorage.user_id;
    data.course_info.getUserById(id).then((user) => {
        res.render("layouts/updateAccount", {
            partial: "jquery-scripts",
            user: user
        });
    });
});

router.post("/updateAccount", (req, res) => {
    let id = sessionStorage.user_id;
    let name = req.body.name;
    let major = (req.body.major);
    let cwid = parseInt(req.body.cwid);
    let password = req.body.password
    let gpa = parseInt(req.body.gpa);
    let semester_of_entry = (req.body.semester_of_entry);
    let d_o_g = (req.body.d_o_g);
    let current_credit_total = (req.body.current_credit_total);

    let updatedUser = {
        name: name,
        major: major,
        cwid: cwid,
        password: password,
        gpa: gpa,
        semester_of_entry: semester_of_entry,
        d_o_g: d_o_g,
        current_credit_total: current_credit_total
    };

    data.course_info.updateUser(id, updatedUser).then(user => {
        res.render("layouts/account", { partial: "jquery-scripts", user: user });
    }).catch((e) => {
        res.render("layouts/updateAccount", { partial: "jquery-scripts", error: e });
    });
});

module.exports = router;
