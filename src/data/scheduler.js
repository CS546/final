const xmlFile = "path/to/file";

let fs = require('fs');
let xml2js = require('xml2js');

let parse_file = (fname, callback) => {
    /*
    Takes in the XML file, converts it to JSON, and calls the callback on it
    */
    let parser = new xml2js.Parser();
    let res = {};
    fs.readFile(__dirname + '/' + fname, function(err, data) {
        parser.parseString(data, function (err, result) {
            callback(result);
        });
    });
}

let pretty_print = (json) => {
    console.log(JSON.stringify(json, null, 1));
}

let explore_data = (xmlJSON) => {
    let data = xmlJSON["Semester"];
    let sem_info = data["$"];//'$' is an array of tag attributes
    /*      *** sem_info ***
    { Semester: '2016F',
      Courses: '1892',
      Meetings: '2101',
      Requirements: '2180' }
    */
    let courses = data["Course"];

    for(let i in courses){
        let course = courses[i]
        let course_info = course["$"];
        /*       *** course_info ***
        { Section: 'TM 810W0',
          Title: 'Special Topics in TM',
          CallNumber: '11793',
          MinCredit: '3',
          MaxCredit: '60',
          MaxEnrollment: '26',
          CurrentEnrollment: '1',
          Status: 'O',
          StartDate: '2016-08-29Z',
          EndDate: '2016-12-22Z',
          Instructor1: 'Ryan K',
          Term: '2016F' }
        */
        let req_arr = course["Requirement"];
        let meeting_arr = course["Meeting"];
        if(req_arr !== undefined){
            for(let j in req_arr){
                let requirement = req_arr[j]["$"];
                /*      ***requirement***
                { Control: 'RQM',
                  Argument: 'IP',
                  Value1: 'CE  900',
                  Operator: '',
                  Value2: '' }
                */
            }
        }
        if(meeting_arr !== undefined){
            for(let j in meeting_arr){
                let meeting = meeting_arr[j]["$"];
                /*     ***meeting***
                { Day: 'R',
                  StartTime: '4:20:00Z',
                  EndTime: '4:50:00Z',
                  Site: 'Castle Point',
                  Building: 'X',
                  Room: '218A',
                  Activity: 'LEC' }
                */
            }
        }
    }
}

let pull_courses = (xmlJSON, call_numbers) => {
    /*
    Return an array of all the courses for the given call numbers
    */
    let courses = xmlJSON["Semester"]["Course"];
    let resp = [];
    for(let i in courses){
        let course = courses[i];
        let course_info = course["$"];
        let call_num = course_info["CallNumber"];
        if ( call_numbers.indexOf( call_num ) > -1 ){
            resp.push(course);
        }
    }
    return resp;
}

parse_file("2016F.xml", explore_data);


let foo = () => {
    return bar;
}

let exportedMethods = {
    foo: foo
}

module.exports = exportedMethods;

/*
PLAN

Get and maybe parse XML data if I have to

Pull out relevant courses

Find schedules without conflicts
    Generate all possible schedules
    Search all for conflicts
    -OR-
    Maybe make some sort of graph that handles it

Return the schedules
*/
