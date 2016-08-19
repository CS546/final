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
    //comments are showing an example of the schema of various objects
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
        let fulfilled = false;//I don't think this is needed
        for(let i=fullCourseName.length-1; i>=0;  i--){
            let iChar = fullCourseName.charAt(i);
            if((!isNaN(iChar) && (iChar !== " ") )){
                fulfill(fullCourseName.substring(0,i+1));
                fulfilled = true;
            }
        }
        if(!fulfilled){
            reject(`Course "${fullCourseName}" could not be trimmed`);
        }
    });
}

let pull_courses = (xmlJSON, course_list) => {
    /*
    Return an array of all the courses for the given call numbers
    */
    return new Promise( function(fulfill, reject){
        let courses_big_list = xmlJSON["Semester"]["Course"];
        let pulled_courses = [];//the data pulled from the big xml doc
        let prereqs = [];
        let coreqs = [];

        //iterate through all courses from the API
        for(let i in courses_big_list){
            let course = courses_big_list[i];
            let course_info = course["$"];
            let call_num = course_info["Section"];
            //remove the "section" letters from the course
            //ex: "CS 115A" -> "CS 115"
            trim_course_section(course_info["Section"]).then( (trimmed_course) => {
                //if the course name is in the list of names to get...
                if ( course_list.indexOf( trimmed_course ) > -1 ){
                    //add the course info to a list to be returned
                    pulled_courses.push(course);
                }
            }).catch( (err) => {
                reject(err);
            });
        }
        fulfill(pulled_courses);
    });
}

/*
Maybe make a dictionary of all courses and info stored by call number
Then I can just pass around lists of call numbers instead of the actual objects
*/

let group_courses = (pulled_courses) => {
    let groups = {};
    let promises = [];
    for(let i in pulled_courses){
        let course = pulled_courses["$"];
        let course_name = course["Section"];
        promises.push(trim_course_section(course_name));
    }
    let promises2 = [];
    return Promise.all(promises).then( (trimmed_names) => {
        let groups = {};

        for(let i in trimmed_names){
            groups[trimmed_names[i]] = [];
            for(let i in pulled_courses){

            }
        }
        return groups;
    });
}

let findAllCombos = (grouped_courses) => {
    /*      WARNING: RECURSIVE
    Take in a list of lists of courses, each list in the main list is used to
    seperate the different courses - the lecture and lab for the same course will be in different groups
    Find all the different ways to take one from each group
    Return a list of combinations
    */
    if(grouped_courses.length === 1){
        //no groups left, end teh recursion
        return grouped_courses[0];
    }
    //for each element in the first group...
    let build_up_list = [];
    let combos = [];
    let new_group = grouped_courses[0];
    findAllCombos(grouped_courses.shift() ).then( (base_group) => {
        for(let i in base_group) {
            for( let j in new_group){
                combos.push( base_group[i].append(new_group[j]) );
            }
        }
        return combos;
    });
}

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



//Info for course requirements
                    //course["$"] = course info
                    //course["Meeting"]
                    //course["Requirement"]

                    //check if there are any requirements associated with it
                    //if there are, see what type("Control") they are
                    //CA =? other course needed directly for the class - LEC/LAB/RCT
                    //RQ =? prereq, can be one or two - (CS  284, CS  181) for 385 - note double spaces between dept and num




//parse_file("2016F.xml", explore_data);
let testCourseList = ['CS 383', 'CS 385', 'CS 334', 'BT 353'];
//get XML by parsing file
parse_file('2016F.xml').then( (xmlData) => {
    //pull out the info for the courses we need
    pull_courses(xmlData, testCourseList).then( (pulled_courses) => {
        //find the combinations that don't have conflicts
        group_courses(pulled_courses).then( (group_list) => {
            console.log(group_list);
        });

        //console.log(course_list);

        //for each valid combo, pull out list of prereqs and coreqs(probably only ones that aren't fulfilled already
        /*Brainstorming
            maybe add "scores" to each schedule for each for the preferences?
                early morning score could be average wake-up time
                same for when you end, average time out
                gap times - times between class where you probably wouldn't go home
                friday end time
                monday start time
                etc
            then we can send this object to the frontend and let the user sort there - faster response and then shorted operations to sort differently, while also not requiring server time to make the schedules all over again with different preferences

        */
    });
});
