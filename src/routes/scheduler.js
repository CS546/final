const express = require('express');
var http = require('http');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let myData = data.course_info.getData();
    myData.then( (data_result) => {
        res.render("layouts/scheduler_form", {
            partial: "jquery-scripts",
            course_entry_amount: 7
        });
    });
});

router.post("/", (req, res) => {
    let formData = req.body;
    let courses = [];
    let saveName = undefined;
    Object.keys(formData).forEach( (formKey) => {
        let value = formData[formKey];
        if (formKey === 'save-name') {
            saveName = value;
        }else{
            if(value !== ''){
                courses.push(value);
            }
        }
    });
    let path = '/scheduler/schedule?courses=';
    courses.forEach( (course) => {
        path = path + course + ',';
    });
    path = path.slice(0, -1);//remove that last comma
    res.redirect(path);
});

router.get("/schedule", (req, res) => {
    /*
    ex: /schedule?courses=CS 442,CS 392,CS 519,MA 3331
    Respond with json data of the possible schedules
    add "json=true" to querystring to get just the json back
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
            let json_bool = req.query.json;
            if(json_bool){
                res.json(JSON.parse(sum_data));
            }else{
                dataJSON = JSON.parse(sum_data);
                schedules = [];
                for(let i in dataJSON){
                    schedules.push(dataJSON[i]);
                }
                //save schedules?
                res.render("layouts/scheduler", {
                    partial: "save-schedule",
                    schedules: schedules
                });
            }
        });
    }).end();
});

router.post('/save', (req, res) => {
    console.log(req.body.url);
    res.sendStatus(200);
});

module.exports = router;
