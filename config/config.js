var config = {

    development: {
        //url to be used in link generation
        dbURI: "mongodb+srv:<DatabaseURI>",
        options: {
            useNewUrlParser: true,
            dbName: "<DatabaseName>"
        },

    },
    production: {
        dbURI: "mongodb+srv:<DatabaseURI>",
        options: {
            useNewUrlParser: true,
            dbName: "<DatabaseName>"
        },

    }
};
module.exports = config;