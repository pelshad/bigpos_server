const User = function(user){
    this.user_id = user.user_id,
    this.user_pw = user.user_pw,
    this.user_name = user.user_name,
    this.user_nick = user.user_nick,
    this.user_addr = user.user_addr,
    this.user_tel = user.user_tel,
    this.user_email = user.user_email,
    this.user_active_yn = user.user_active_yn,
    this.user_grade = user.user_grade,
    this.user_join_date = user.user_join_date
}

module.exports = User;