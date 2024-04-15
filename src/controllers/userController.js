const User = require("../models/userModel");
const UserService = require("../service/userService");

////회원 가입 및 정보
//유저 생성
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    const user = new User({
        user_id:req.body.user_id,
        user_pw:req.body.user_pw,
        user_name:req.body.user_name,
        user_nick:req.body.user_nick,
        user_addr:req.body.user_addr,
        user_tel:req.body.user_tel,
        user_email:req.body.user_email,
        user_grade:req.body.user_grade
    });

    UserService.create(user, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "An error occurred while creating the user."
            });
        }

        return res.send(data);
    });
}
//유저 전체 조회
exports.findAll = (req, res) =>{
    UserService.findAll((err,data) => {
        if(err){
            return res.status(400).send({
                message: err.message || "An error occurred while find the user."
            });
        }
        return res.send(data);
    })
}
//특정 유저 조회
exports.findById = (req, res) =>{
    UserService.findById(req.params.userId, (err, data) => {
        if(err){
            return res.status(400).send({
                message: err.message || "An error occurred while find the user."
            });
        }
        return res.send(data);
    })
}
//유저 정보 수정
exports.updateById = (req, res) =>{
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    const user = new User(req.body);
    UserService.updateById(req.params.userId, user, (err, data) => {
        if (err) {
            return res.status(400).send({
                message: err.message || "An error occurred while update the user."
            });
        }
        return res.send(data);
    })
}
//유저 삭제(논리 삭제)
exports.deleteById = (req, res) =>{
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    UserService.deleteById(req.body.user_id, (err, data) => {
        if (err) {
            return res.status(400).send({
                message: err.message || "An error occurred while update the user."
            });
        }
        return res.send(data);
    })
}

////로그인
//로그인
exports.login = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }
    UserService.login(req, req.body, (err, data) => {
        if (err) {
            return res.status(400).send({
                message: err.message || "An error occurred while update the user."
            });
        }
        return res.send(data);
    })
}
//로그인 체크
exports.checkLogin = (req, res) => {
    if (!req.body) {
        return res.status(200).send({
            message: "guest"
        });
    }
    UserService.checkLogin(req, (err,data) => {
        return res.send(data);
    })
}