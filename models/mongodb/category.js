const mongoose = require("mongoose");
const { mongoDbConn } = require('../../mongo');


const categorySchema = mongoose.Schema({
    title: { type: String, default: "", required: true },
    defaultTitle: { type: String, default: "" },
    categoryId: { type: String, default: "", required: true },
    image: { type: String, default: "" },
    order: { type: Number, default: "" },
});

categorySchema.set("timestamps", true)
categorySchema.index({ title: 1, order: 1 }, { unique: true });

module.exports = Category = mongoDbConn.model("category", categorySchema);