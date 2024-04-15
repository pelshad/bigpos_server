const Board = require("../models/boardModel");

const BoardService = {
    //게시글 생성
    create: (board, result) => {
        Board.create(board, (err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        });
    },
    
    //게시글 전체 조회
    findAll: (board, result) => {
        Board.findAll(board, (err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        });
    },

    //게시글 페이징 조회
    findPageInfo: async (pageNum, result) => {
        try {
          const pageInfo = [];

          // 페이지별 리스트
          const list = await new Promise((resolve, reject) => {
            Board.findByPage(pageNum, (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
      
          // 총 게시글 페이징 갯수
          const count = await new Promise((resolve, reject) => {
            Board.countPage((err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
      
          pageInfo.push(list);
          pageInfo.push(count);
      
          return result(null, pageInfo);
        } catch (err) {
          return result(err, null);
        }
      },

    //게시글 상세 조회
    findById: (i_board, result) => {
        Board.findById(i_board, (err,data) => {
            if(err){
                return result(err, null);
            }
            return result(null,data);
        })
    },

    //게시글 수정
    updateById:(i_board, result) => {
      Board.updateById(i_board, (err, data) => {
        if(err){
          return result(err,null);
        }
        return result(null, data);
      })
    },

    //게시글 삭제
    deleteById: (i_board, result) => {
        Board.deleteById(i_board, (err,data) => {
            if(err){
                return result(err,null);
            }
            return result(null, data);
        })
    }
};

module.exports = BoardService;