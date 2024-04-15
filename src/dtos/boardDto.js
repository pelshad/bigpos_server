const Board = function(board){
    this.title = board.title;
    this.content = board.content;
    this.user_id = board.user_id;
    this.filepath = board.filepath;
    this.thumbnail = board.thumbnail;
};

module.exports = Board;