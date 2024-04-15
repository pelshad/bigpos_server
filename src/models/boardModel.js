const sql = require("../config/dbConfig.js");
const Board = require("../dtos/boardDto.js");

//게시글 생성
Board.create = (newBoard, result) => {
    sql.query(
        "INSERT INTO board SET ?",
        newBoard,
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(err, null);
                return;
            }
            result(null, "success");
        }
    );
};

//게시글 조회
Board.findAll = result => {
    sql.query(
        "SELECT * FROM board WHERE delete_yn='n'",
        (err, res) => {
            if(err){
                console.log("err : ", err);
                return result(err, null);
            }
            console.log(res);
            return result(null, res);
        }
    )
}

//게시글 페이징 조회
Board.findByPage = (offset, result) =>{
    sql.query(
        "SELECT * FROM board WHERE delete_yn = 'n' ORDER BY i_board DESC LIMIT ?, 10",
        offset,
        (err,res) => {
            if(err){
                console.log("err : ", err);
                return result(err, null);
            }
            return result(null, res);
        }
    )
}

//총 게시글 페이징 갯수
Board.countPage = result => {
    sql.query(
        "SELECT ceil(COUNT(i_board)/10) as page_count FROM board WHERE delete_yn = 'n'",
        (err,res) => {
            if(err){
                console.log("err : ", err);
                return result(err, null);
            }
            return result(null, res);
        }
    )
}

//게시글 상세 조회
Board.findById = (i_board, result) => {
    sql.query(
        "SELECT * FROM board WHERE i_board = ? and delete_yn = 'n'",
        i_board,
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(err, null);
                return;
            }
            console.log(res);
            return result(null, res);
        }
    )
}

//게시글 수정
Board.updateById = (board, result) =>{
    sql.query(
        "UPDATE board SET title = ?, content = ?, filepath = ?, thumbnail = ?, img_code= ?",
        [board.title, board.content, board.filepath, board.thumbnail],
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(err, null);
                return;
            }
            console.log(res);
            return result(null, res);
        }
    )
}

//게시글 삭제
Board.deleteById = (i_board, result) => {
    sql.query(
        "UPDATE board SET delete_yn = 'y' where i_board = ?",
        i_board,
        (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(err, null);
                return;
            }
            result(null, "success");
        }
    )
}


module.exports = Board;