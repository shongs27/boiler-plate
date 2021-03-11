const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// 암호화에 이용하는 slat 자릿수 설정
const saltRounds = 10;

// 토큰을 만드는 라이브러리
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    minlength: 4,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, //지정하지 않으면 기본으로 0을 주겠따
  },
  image: String,
  token: {
    type: String, // 유효성 관리?
  },
  tokenExp: {
    type: Number, // 유효성 기간
  },
});

//mongoDB method
//저장하기 전에 무엇을 한다
userSchema.pre("save", function (next) {
  //비밀번호를 암호화 시킨다

  //중요!! 여기서의 this는 인스턴스를 가르키고 있다 //
  var user = this;

  //password 변환될때만
  if (user.isModified("password")) {
    //salt를 이용해서 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//내가 만드는 method
userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 평범한 , 암호화된 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken 이용해서 token 생성하기
  var token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  console.log(user);

  //토큰을 decode 한다.
  jwt.verify(token, "secret", function (err, decode) {
    //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
