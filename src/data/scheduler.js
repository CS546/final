/*
TODO
  [X] Read file and convert to JSON
  [ ] Go through JSON course info and pull out data for requested courses
    add coreqs and prereqs to lists of each, then later we can notify
	or add them in automatically
  [ ] Finish scheduling program to work with the downloaded file
  [ ] Add code to get most recent semester and download the file
  [ ] Interact with the database to get info
*/
const xmlFile = "path/to/file";
let fs = require('fs');
let xml2js = require('xml2js');
let parse_file = (fname) => {
	/*
	Takes in the XML file, converts it to JSON,
	and returns a promise with the object
	*/
	let parser = new xml2js.Parser();
	return new Promise( function(fulfill, reject){
		fs.readFile(__dirname + '/' + fname, function(err, data){
			parser.parseString( data, function(err, result){
				if(err) reject(err);
				else fulfill(result);
			});
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
	let course = courses[i];
	let course_info = course["$"];
	/*       *** course_info ***
	{ Section: 'TM 810W0',
	  Title: 'Special Topics in TM',
      CallNumber: '11793',
      MinCredit: '3', MaxCredit: '60',
      MaxEnrollment: '26',
      CurrentEnrollment: '1',
      Status: 'O',
      StartDate: '2016-08-29Z',
      EndDate: '2016-12-22Z',
      Instructor1: 'Ryan K',
      Term: '2016F' } */
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
            Value2: '' } */
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

let trim_course_section = (fullCourseName) => {
	/*
	Takes a course like 'CS 810A' or 'E 122RB'
	Return just 'CS 810' or 'E 122' respectively
	*/
	return new Promise( function(fulfill, reject){
		for(let i=fullCourseName.length-1; i>=0;  i--){
			let iChar = fullCourseName.charAt(i);
			if((!isNaN(iChar) && (iChar !== " ") )){
				fulfill(fullCourseName.substring(0,i+1));
			}
		}
	});
	reject(`Course "${fullCourseName}" could not be trimmed`);
}

let pull_courses = (xmlJSON, course_list) => {
    /*
    Return an array of all the courses for the given call numbers
    */
	return new Promise( function(fulfill, reject){
		let courses = xmlJSON["Semester"]["Course"];
		let resp = [];
		for(let i in courses){
			let course = courses[i];
			let course_info = course["$"];
			let call_num = course_info["Section"];
			trim_course_section(course_info["Section"]).then( (trimmed_course) => {
                //console.log(trimmed_course);
				if ( course_list.indexOf( trimmed_course ) > -1 ){
					resp.push(course);
				}
			}).catch( (err) => {
                reject(err);
            });
		}
		fulfill(resp);
	});
}

//parse_file("2016F.xml", explore_data);
let testCourseList = ['CS 115', 'CS 284', 'CS 385'];
parse_file('2016F.xml').then( (xmlData) => {
	//console.log(xmlData); 
    console.log(testCourseList);
    pull_courses(xmlData, testCourseList).then( (course_list) => {
        console.log(course_list);
    }); 
}); 

let foo = () => { 
    return bar; 
} 

let exportedMethods = { 
    foo: foo 
} 

module.exports = exportedMethods; 
/* PLAN

Get and maybe parse XML data if I have to

Pull out relevant courses

Find schedules without conflicts
    Generate all possible schedules
    Search all for conflicts
    -OR-
    Maybe make some sort of graph that handles it

Return the schedules
*/

