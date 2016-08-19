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

module.exports = router;
