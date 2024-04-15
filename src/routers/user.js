const express = require("express");
const router = express.Router();
const user = require("../controllers/userController.js");

//조회
router.get("/user/:userId", user.findById);
router.get("/user", user.findAll);

//가입
router.post("/user", user.create);

//수정
router.patch("/user/:userId/update", user.updateById);

//삭제(soft delete)
router.patch("/user/:userId/delete", user.deleteById);

//로그인
router.post("/login", user.login);
router.post("/checkLogin", user.checkLogin);

exports.router = router;