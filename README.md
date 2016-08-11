# final
Our final project for CS546

![System architecture](https://raw.githubusercontent.com/CS546/final/master/architecture.png)

##API Endpoints
| Path | Request type | Response |
|:--|:-:|:--|
| / | GET | Home page of website |
| /account | GET | Account info page |
| /scheduler/schedule?courses=<csv course names> | GET | An HTML page displaying the possible schedules for that combination of courses |
| /scheduler/schedule?courses=<csv course names>&json=true | GET | A JSON object containing a list of schedules, which each include a list of the course sections and the url for the scheduler website showing that combination |
