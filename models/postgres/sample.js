const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    },
});

module.exports = Post;
