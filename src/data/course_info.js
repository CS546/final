let getData = () => {
    return Promise.resolve("Data");
}

let exportedMethods = {
    getData: getData
}

module.exports = exportedMethods;
