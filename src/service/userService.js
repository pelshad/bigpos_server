const User = require("../models/userModel");

const UserService = {
    ////회원 가입 및 정보
    //회원가입
    create:(user, result) => {
        User.create(user, (err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    //유저 전체 조회
    findAll:result => {
        User.findAll((err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    //특정 유저 조회
    findById:(userId, result) => {
        User.findById(userId, (err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    //유저 정보 수정
    updateById:(userId, user, result) => {
        User.updateById(userId, user, (err,data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    //유저 삭제(논리 삭제)
    deleteById:(userId, result) => {
        User.deleteById(userId, (err, data) => {
            if (err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    ////로그인
    //로그인
    login:(req, user, result) => {
        User.login(req, user, (err, data) => {
            if(err) {
                return result(err, null);
            }
            return result(null, data);
        })
    },
    // 로그인 체크
    checkLogin:(req, result) => {
        if(req.session[req.body.user_id] === true){
            return result(null, "success");
        } else if(req.body.user_id === undefined){
            return result(null, "guest");
        }
        return result(null, "fail");
    }
}

module.exports = UserService;