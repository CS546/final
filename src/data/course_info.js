const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;
const users = mongoCollections.users;

let getData = () => {
    return Promise.resolve("Data");
}

let exportedMethods = {
    getData: getData
}

module.exports = exportedMethods;
