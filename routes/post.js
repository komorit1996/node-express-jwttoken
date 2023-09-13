const router = require("express").Router();
const { query, body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { privatePosts, puclicPosts } = require("../db/post");
const checkJWT = require("../middleware/checkJWT");

// get all post
router.get("/", (req, res) => {
    res.json(puclicPosts);
});

// get private post
router.get("/private", checkJWT, (req, res) => {
    // checkJWT で next() されたら投稿を返す。JWTを所持しているか確認している。
    res.json(privatePosts);
});

module.exports = router;
