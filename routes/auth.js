const router = require("express").Router();
const { query, body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//
router.get("/", (req, res) => {
    res.send("hello auth js");
});

// すべてのユーザーを返す
router.get("/allusers", (req, res) => {
    return res.json(User);
});

// test 大文字、小文字注意
const { User } = require("../db/user");
//

// Login API
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // dbにユーザーが存在するか確認する
    const user = User.find((user) => user.email === email);

    if (!user) {
        return res.status(400).json([
            {
                errormessage: "ユーザーが存在していません",
            },
        ]);
    }
    // パスワードの照合
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password); // becrypt で復号するので、暗号化してある必要がある
    //
    if (!isMatch) {
        return res.status(400).json([
            {
                errormessage: "パスワードが違います",
            },
        ]);
    }
    // トークン発行:復号するとパスワードが出力される
    const token = await JWT.sign(
        {
            email,
        },
        "SECRET_KEY",
        {
            expiresIn: "24h",
        }
    );
    return res.json({ token: token }); // token を返す
});

//

// ユーザー新規登録用API
// middlewareのように validator を追加する
router.post(
    "/register",
    // validation check
    body("email").isEmail(),
    body("password").isLength(6),
    // Validation Check
    async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const errors = validationResult(req);

        // 入力確認
        if (!errors.isEmpty()) {
            return res.send(400).json({ errors: errors.array() });
        }
        // dbにユーザーが存在するか確認する
        const user = User.find((user) => user.email === email);

        if (user) {
            return res.status(400).json([
                {
                    errormessage: "既にユーザーが存在しています",
                },
            ]);
        }

        // password を暗号化(hash)する
        let hashedPassword = await bcrypt.hash(password, 10); // salte > パスワードを追加で付与する暗号化手法
        // console.log(hashedPassword);

        User.push({
            email: email,
            password: hashedPassword,
        });

        // JWT発行
        const token = await JWT.sign(
            {
                email,
            },
            "SECRET_KEY",
            {
                expiresIn: "24h",
            }
        );

        return res.json({ token: token }); // token を返す
    }
);

module.exports = router;
