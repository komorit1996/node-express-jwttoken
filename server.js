const express = require("express");
const app = express();
const PORT = 3030;
const auth = require("./routes/auth.js");
const post = require("./routes/post.js");

app.use(express.json());
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req, res) => {
    res.send("hello express");
});

app.listen(PORT, () => {
    console.log(`Launch Server http://localhost:${PORT}`);
});
