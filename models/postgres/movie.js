const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Movies = sequelize.define('movies', {
    name: {
        type: DataTypes.STRING, defaultValue: ''
    },
    email: {
        type: DataTypes.STRING, defaultValue: ''
    },
    rating: {
        type: DataTypes.INTEGER, defaultValue: 1
    },
    cast: {
        type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: []
    },
    genre: {
        type: DataTypes.TEXT, defaultValue: ''
    },
    releaseDate: {
        type: DataTypes.DATE, defaultValue: new Date()
    }
});

module.exports = Movies;
