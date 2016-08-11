const express = require('express');
var http = require('http');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/scheduler", {
            partial: "jquery-scripts",
            data: data_result
        });
    });
});

router.get("/schedule", (req, res) => {
    /*
    ex: /schedule?courses=CS 442,CS 392,CS 519,MA 3331
    Respond with json data of the possible schedules
    */
    //parse querystring and create new one on path, changing spaces to "%20"
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
    //use the API I already have for finding schedules
    let schedules = http.request( "http://dev.sitstuff.com" + path , (resp) => {
        let sum_data = '';
        resp.on('data', (data) => {//gets buffers
            sum_data += data.toString('utf8');
        });
        resp.on('end', (data) => {//says when the stream of buffers is done
            //res.json(JSON.parse(sum_data));
            dataJSON = JSON.parse(sum_data);
            schedules = [];
            for(let i in dataJSON){
                schedules.push(dataJSON[i]);
            }
            res.render("layouts/scheduler", {
                partial: "jquery-scripts",
                schedules: schedules
            });
        });
    }).end();
});


module.exports = router;
