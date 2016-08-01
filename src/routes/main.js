const express = require('express');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    res.render("layouts/home", {
        partial: "jquery-scripts"
    });
});


module.exports = router;
