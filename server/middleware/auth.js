const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리를 하는 곳

  //클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;
  //토큰 복호화(Decode)한 후 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    //왜 req에 넣어주는가? res는 안되나?
    req.token = token;
    req.user = user;
    next();
  });

  //유저가 있으면 인증 ok

  //유저가 없으면 인증 no
};

module.exports = { auth };
