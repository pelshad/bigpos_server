const express = require("express");
const router = express.Router();
const board = require("../controllers/boardController.js");

//조회
router.get("/board", board.findAll);
router.get("/board/:i_board", board.findById);

//생성
router.post("/board", board.create);

//수정
router.patch("/board/:i_board/update", board.updateById);

//삭제
router.patch("/board/:i_board/delete", board.deleteById);

//실시간 이미지 저장(ck에디터)



exports.router = router;