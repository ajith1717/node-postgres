const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Movie = sequelize.define('movies', {
    name: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.NUMBER,
    },
    cast: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    genre: {
        type: DataTypes.TEXT,
    },
    releaseDate: {
        type: DataTypes.DATE,
    }
});

module.exports = Movie;
