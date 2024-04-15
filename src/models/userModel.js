const sql = require("../config/dbConfig.js");
const User = require("../dtos/userDto.js");

//유저 생성
User.create = (newUser, result) =>{
    sql.query(
        "INSERT INTO user (user_id, user_pw, user_name, user_nick, user_addr, user_tel, user_email) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            newUser.user_id,
            newUser.user_pw,
            newUser.user_name,
            newUser.user_nick,
            newUser.user_addr,
            newUser.user_tel,
            newUser.user_email
        ],
        (err, res) => {
            if (err) return result(err, null);
            result(null, "success");
        }
    );
};

//유저 전체 조회
User.findAll = result => {
    sql.query(
        "select * from user where user_active_yn = 'y'",
        (err, res) => {
            if(err) return result(err, null);
            return result(null, res);
        }
    )
}

//특정 유저 조회
User.findById = (userId, result) => {
    sql.query(
        "select * from user where user_id = ?",
        [userId],
        (err, res) => {
            if(err) return result(err, null); //err
            if(res.length) return result(null, res[0]); //결과 데이터
            return result({kind: "not_found"}, null); //조회 실패
        }
    )
}

//유저 정보 수정
User.updateById = (id, user, result) => {
    sql.query(
        "update user set user_pw = ?, user_name = ?, user_nick = ?, user_addr = ?, user_tel = ?, user_email = ? where user_id = ?",
        [user.user_pw, user.user_name, user.user_nick, user.user_addr, user.user_tel, user.user_email, id],
        (err, res) => {
            if(err) return result(err, null); //에러
            if(res.affectedRows === 0) return result({kink:"not_found"},null); //해당 아이디 없음
            return result(null, "success"); //성공
        }
    )
}

//유저 삭제
User.deleteById = (userId, result) => {
    sql.query(
        "update user set user_active_yn = 'n' where user_id = user_id",
        [userId],
        (err, res) => {
            if(err) return result(err, null); //에러
            if(res.affectedRows === 0) return result({kink:"not_found"},null); //해당 아이디 없음
            return result(null, "success"); //성공
        }
        
    )
}
////로그인
//로그인
User.login = (req, user, result) => {
    sql.query(
        "SELECT user_id, user_pw FROM user WHERE user_id = ?",
        user.user_id,
        (err, res) => {
            if(err) return result(err, null); //err
            if(res.length){
                //로그인 성공
                if(res[0].user_pw === user.user_pw){
                    const user_id = user.user_id;
                    req.session[user_id] = true;
                    return result(null, "success");
                //로그인 실패(비밀번호 틀림)
                } else {
                    return result(null, "fail");
                }
            }
            //조회 실패(존재하지 않는 아이디)
            return result({kind: "not_found"}, null); 
        }
    )
}

//로그인 체크


module.exports = User;