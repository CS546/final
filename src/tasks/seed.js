const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const uuid = require('node-uuid');

let empty_schedule = [ { url: 'https://web.stevens.edu/scheduler/#2016F=10457,10477,10458',
       list: [Object],
       name: 'Jim' } ]; 



dbConnection().then( (db) => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return data.course_info.addUser("Test User", "Computer Science", "10393905", "password123", "3.0", "2014", "2018", "21", empty_schedule);
    }).then(() => {
        console.log("done seeding db");
        db.close();
    });
}, (error) => {
    console.error(error);
});
