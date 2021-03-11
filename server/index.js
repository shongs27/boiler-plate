const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-Parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//express에서 기본제공, body-parser 필요없다.
//application/x-www-form-urlencoded 를 분석
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");

//github에서 몽고db 주소를 숨기기 위해서 config.mongoURI로 설정
//connect 환경설정 {Deprecation Warnings}
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고DB 접속 온"))
  .catch((err) => console.log(err));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요 아유미예요");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다

  const user = new User(req.body);

  //mongoDB Mothod로 이동 -> 저장하기전에 Bcrypt로 암호화
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다",
      });
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호 틀렸습니다",
        });

      //비밀번호 맞다면 그 유저를 위한 Token 생성
      // webToken 다운로드 npm install jsonwebtoken
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키 ? 스토리지?
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //앤드포인트에서 리퀘스트를 받은 다음, 콜백함수가 실행되기 전 auth라는 미들웨어를 실행한다
  //auth에서 req에 user와 token을 넣어줌으로써 req.user와 req.token을 하면 정보들을 가져올 수 있음
  //여기까지 미들웨어를 통과했다는 얘기는 Authentication이 true라는 말
  res.status(200).json({
    //클라이언트에다 정보를 제공해주면 됨
    //유저정보들 제공하기
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //관리자인지 확인해주는 코드
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
