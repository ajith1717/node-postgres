const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Users = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.TEXT,
    },
    password: {
        type: DataTypes.TEXT,
    },
    token: {
        type: DataTypes.TEXT,
    }
});

module.exports = Users;
