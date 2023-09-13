const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    // JWT の所持を確認 x-auth-token の確認
    const token = req.header("x-auth-token"); // 本来は beare token の取得が望ましい

    if (!token) {
        return res.status(400).json({ errormessage: "権限がない" });
    } else {
        try {
            let user = JWT.verify(token, "SECRET_KEY"); // decode, "SEACRET_KET" はテスト用にハードコードしている。
            console.log(user);
            req.user === user.email;
            next();
        } catch (err) {
            res.status(400).json({ error: "トークンが不一致" });
        }
        next(); // middle ware を抜ける
    }
};
