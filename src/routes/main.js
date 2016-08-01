const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("layouts/home", {
        partial: "jquery-scripts"
    });
});


module.exports = router;
