const { body } = require("express-validator");

puclicPosts = [
    { title: "誰でも見れる", body: "誰でも見れる記事です" },
    { title: "誰でも見れる", body: "誰でも見れる記事です" },
];

privatePosts = [
    { title: "秘密の投稿", body: "秘密の投稿記事です" },
    { title: "秘密の投稿", body: "秘密の投稿記事です" },
];

module.exports = {
    puclicPosts,
    privatePosts,
};
