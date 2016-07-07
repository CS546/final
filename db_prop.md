# Database Proposal
## Stevens Course Scheduler Remake
John Pesenti, Ashley Bromiley, Julia Kim, Josh Gribbon, Matt Colozzo


#### Courses
The course collection will store information on all the courses, parsed from the scheduler XML document
```json
{
    "_id":"096537ac-de0d-45a5-b4f9-7a3da64381bc",
    "name":"Web Programming",
    "dept":"CS",
    "num":"546",
    "call":"10100",
    "min-credits":"3",
    "max-credits":"3",
    "max_enrollment":"30",
    "curr_enrollment":"21",
    "status":"O",
    "start_date":"2016-05-11Z",
    "end_date":"2016-08-29Z",
    "instructor":"Barresi P",
    "term":"2016A",
    "meetings": [
        {"day":"TBA", "start":null, "end":null, "site":"WS", "building":"OFF", "room":"WEB", "activity":"LEC"}
    ],
    "requirements": [
        {"control":"RQ", "argument":"", "value1":"CS 442", "operator":"", "value2":"CS561"},
        {"control":"R&", "argument":"", "value1":"CS 146", "operator":"", "value2":"SOC 611"}
    ]
}
```

| Name | Type| Desciption |
| :---: | :---: | :--- | 
| _id | string | A unique identifier for the course |
| name | string | The name of the course |
| dept | string | The department for the course
| num | string | The course number |
| call | string | The call number for the course |
| min-credits | string | The minimum credits for the course | 
| max-credits | string | The maximum credits for the course |
| max_enrollment | string | The maximum allowabl enrollment in the course |
| curr_enrollment | string | The amount of studetns currently enrolled in the course |
| status | string | The course status - open(O), closed(C), or cancelled(X) |
| start_date | string | The first day of class |
| end_date | string | The last day of class |
| instructor | string | The instructor for the class |
| term | string | When the course is happening |
| meetings | array | The different times the course meets within a week
| requirements | array | Other course requirements for the course (labs, prereqs, etc)


#### Meeting (subdocument)
Meetings represent a time when the course meetings during the week
```json
{
    "day":"M",
    "start_time":"8:000:00Z",
    "end_time":"8:50:00Z",
    "site":"Castle Point",
    "building":"K",
    "room":"360",
    "activity":""LEC"
}
```

| Name | Type | Description |
| :---: | :---: | :--- |
| day | string | The day of the week of the meeting |
| start_time | string | The time the meeting starts |
| end_time | string | The time the meeting ends |
| site | string | The location of the meeting (usually Castle Point) |
| building | string | The building for the meeting |
| room | string | The room in the building for the meeting |
| activity | string | What type of meeting it is |


#### Requirement (subdocument)
Requirements represent other courses that must be taken before or alongside the main course
```json
{
    "control":"RQ",
    "argument":"",
    "value1":"CS 442",
    "operator":"",
    "value2":"CS 561"
}
```
| Name | Type | Description |
| :---: | :---: | :--- |
| control | string | What type of requirement this is |
| argument | string | Unknown meaning, but only even "IP" with a control of "RQM" and paired with another requirement with control of "RQ" |
| value1 | string | The first course |
| operator | string | Unknown, not filled in for any data I could find |
| value2 | string | THe second course |
