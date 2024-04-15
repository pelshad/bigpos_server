const express = require("express");
const session = require('express-session');
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
}));

const PORT = 8080;

// 포트넘버
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

// 테스트
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

//라우팅
const root = require("./src/routers/root").router;
app.use(root);