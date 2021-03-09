const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// 암호화에 이용하는 slat 자릿수 설정
const saltRounds = 10;

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
    minlength: 5,
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

  //중요 !! Schema 메소드 안에서의 this는 인스턴스를 가르킨다 //
  const user = this;

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
  }
  next();
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 아이디 , 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
