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



module.exports = router;
