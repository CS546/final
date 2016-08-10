const express = require('express');
var http = require('http');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/scheduler", {
            partial: "jquery-scripts",
            placeholderData: data_result
        });
    });
});

router.get("/schedule", (req, res) => {
    courses = req.query.courses;
    let path = '/get_combos?courses='
    for(let i in courses){
        let course = courses[i];
        for(let char in course){
            if(course[char] == ' '){
                path += '%20';
            }else{
                path += course[char];
            }
        }
    }
    let schedules = http.request( "http://dev.sitstuff.com" + path , (resp) => {
        let sum_data = '';
        resp.on('data', (data) => {//gets buffers
            sum_data += data.toString('utf8');
        });
        resp.on('end', (data) => {//says when the stream of buffers is done
            res.send(sum_data);
        });
    }).end();
});


module.exports = router;
