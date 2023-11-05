const Post = require("../models/postgres/sample");





exports.create = async (req, res) => {
    try {
        const payload = {
            title: "asdsad",
            content: "asdasd",
        }
        const post = await Post.create(payload);
        return post
    } catch (error) {
        throw error;
    }
}

// fetch all posts
exports.findAll = async (req, res) => {
    try {
        const posts = await Post.findAll();
        return posts
    } catch (error) {
        throw error;
    }
}