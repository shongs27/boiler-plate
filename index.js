const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-Parser");

const config = require("./config/key");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
//express에서 해주니 body-parser 필요없다.

const { User } = require("./models/User");

const mongoose = require("mongoose");

//github에서 몽고db 주소를 숨기기 위해서
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고DB 접속완료"))
  .catch((err) => console.log(err));

app.post("/register", (req, res) => {
  //회원가입 할떄 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다

  const user = new User(req.body);

  //mongoDB Mothod -> 저장하기전에 Bcrypt로 암호화
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다",
      });
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호 틀렸습니다",
        });
    });

    //비밀번호 맞다면 그 유저를 위한 Token 생성
    user.generateToken((err, user) => {});
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
