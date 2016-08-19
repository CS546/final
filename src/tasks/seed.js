const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.courses;

let empty_schedule = {};

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return users.addUser("Test User", "Computer Science", "10393905", "#####", "3.0", "2014", "2018", "21", empty_schedule);
    }).then(test) => {

    }).then(() => {
        console.log("done seeding db");
        db.close();
    });
}, (error) => {
    console.error(error);
});
