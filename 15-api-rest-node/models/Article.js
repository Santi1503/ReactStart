const { Schema, model } = require('mongoose');

const ArticleSchema = Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, default: "default.png" },
    createdAt: { type: Date, default: Date.now },
})

module.exports = model("Article", ArticleSchema)