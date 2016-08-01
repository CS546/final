const home = require("./home");
const account = require("./account");
const scheduler = require("./scheduler");

const constructorMethod = (app) => {
    app.use("/", home);
    app.use("/account", account);
    app.use("/scheduler", scheduler);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;
