const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        maxLength: 200,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
})

userSchema.pre('save', function (next) {
    // 자신의 user를 찾는다(해당파일에 있는 user)
    var user = this;
    // 비밀변호를 변경할때만 password를 암호화 시키는 로직이 수행되어야함
    if (user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            // salt가 잘 만들어지지 않으면 err리턴
            if (err) return next(err);

            // user.password를 salt만큼 암호화
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                // 암호화된 비밀번호를 user.password에 초기화
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
    // 입력한 비밀번호와 암호화된 비밀번호를 비교하기위해 입력된 비밀번호도 암호화하여 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callback(err);
        callback(null, isMatch)
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 토큰을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decode) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 있는 token이 일치하는지 확인
        user.findOne({"_id": decode, "token": token}, function(err, user) {
            if(err) return callback(err);
            callback(null, user);
        });
    });
}

const User = mongoose.model('User', userSchema)

module.exports = { User }