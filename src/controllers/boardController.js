const Board = require("../models/boardModel");
const BoardService = require("../service/boardService");

//게시글 생성
exports.create = (req, res) => {
    // body가 비었으면 400 error
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    // board dto 생성
    const board = new Board({
        user_id:req.body.user_id,
        title: req.body.title,
        content: req.body.content,
        filepath:req.body.filepath,
        thumbnail:req.body.thumbnail
    });
    // service 호출
    BoardService.create(board, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error occurred while creating the board."
            });
        }
        return res.send(data);
    });
};

//게시글 조회
exports.findAll = (req, res) => {
    ////쿼리 파라미터 여부에 따라 전체 조회 or page 조회
    //전체 조회
    if(req.query.page === undefined){
        BoardService.findAll((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "An error occurred while find the board."
                });
            }
            return res.send(data);
        })
    //페이징 조회
    } else {
        const offset = (req.query.page - 1) * 10;
        BoardService.findPageInfo(offset, (err, data)=>{
            if (err) {
                return res.status(500).send({
                    message: err.message || "An error occurred while find the board."
                });
            }
            return res.send(data);
        })
    }
}

//게시글 상세 조회
exports.findById = (req, res) => {
    BoardService.findById(req.params.i_board, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: err.message || "An error occured whild fint the board."
            })
        }
        return res.send(data);
    })
}

//게시글 수정
exports.updateById = (req,res) =>{
    const board = new Board({
        title: req.body.title,
        content: req.body.content,
        filepath:req.body.filepath,
        thumbnail:req.body.thumbnail
    });
    BoardService.updateById(board, (err, data) => {
        if(err){
            return res.status(500).send({
                message: err.message || "An error occurred while update the board."
            });
        }
        return res.send(data);
    })
}

//게시글 삭제
exports.deleteById = (req,res) => {
    BoardService.deleteById(req.params.i_board, (err, data)=>{
        if(err){
            return res.status(500).send({
                message: err.message || "An error occurred while delete the board."
            });
        }
        return res.send(data);
    })
}