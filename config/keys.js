const dotenv = require('dotenv');
dotenv.config();
const CONFIG = {
    DEVELOPMENT: {
        Postgres: {
            "username": "ixwovjkk",
            "password": "bJvxDw2JBtvpR4qpUZFiGOEsaBzchEtn",
            "database": "ixwovjkk",
            "host": "satao.db.elephantsql.com",
            "dialect": "postgres",
            "port": "5432",
        },
    },

}
module.exports = {
    CONFIG
}
