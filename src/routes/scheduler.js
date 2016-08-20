const express = require('express');
const sessionStorage = require('sessionstorage');
var http = require('http');
const router = express.Router();

const data = require("../data");

router.get("/", (req, res) => {
    let id = sessionStorage.user_id;
    data.course_info.getUserById(id).then(user => {
        let myData = data.course_info.getData();
        myData.then( (data_result) => {
            res.render("layouts/scheduler_form", {
                partial: "jquery-scripts",
                course_entry_amount: 7,
                user: user
            });
        });
    });
});

router.post("/", (req, res) => {
    let id = sessionStorage.user_id;
    let saveName = req.body.saveName;
    data.course_info.getUserById(id).then((user) => {
        data.course_info.getScheduleByName(id, saveName).then(schedule => {
            if (schedule.schedules && schedule.schedules.length !== 0) throw "Schedule of that name already exists";
            let formData = req.body;
            let courses = [];
            let saveName = req.body.saveName;
            sessionStorage.schedule_name = saveName;
            Object.keys(formData).forEach( (formKey) => {
                let value = formData[formKey];
                if (formKey === 'saveName') {
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
        }).catch((e) => {
            res.render('layouts/scheduler_form', {
                partial: "jquery-scripts",
                course_entry_amount: 7,
                user: user,
                error: e
            });
        });
    }).catch((e) => {
        res.render('layouts/error', {
            partial: "jquery-scripts",
            error: { status: '404', message: e}
        });
    });
});

router.get("/schedule", (req, res) => {
    let id=sessionStorage.user_id;
    data.course_info.getUserById(id).then(user => {
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
                        schedules: schedules,
                        user: user
                    });
                }
            });
        }).end();
    });
});

router.post('/save', (req, res) => {
    let saveData = req.body.saveData;
    saveData = saveData.replace("(", "[");
    saveData = saveData.replace(")", "]");
    saveData = saveData.replace(/'/g, "\"");
    console.log("saveData before: ", saveData);
    if(saveData.slice(-4) === ',] }') {
        saveData = saveData.slice(0, -4) + "]}";
    }
    saveData = JSON.parse(saveData);

    if (sessionStorage.schedule_name || sessionStorage.schedule_name.length > 0) saveData.name = sessionStorage.schedule_name;
    else saveData.name = "";

    let userID = sessionStorage.user_id;
    if( (userID === null) || (userID === undefined) ){
        res.sendStatus(500).send("User ID not detected in session storage");
    }
    data.course_info.addSchedule(userID, saveData).then(user => {
        res.redirect('/account');
    }).catch((e) => {
        res.render('layouts/error', {error: {status: '500', message: e}});
    });
});

module.exports = router;
