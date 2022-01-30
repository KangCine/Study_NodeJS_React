const express = require('express');
const app = express();
const port = 3000;

const { User } = require('./model.User');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cine:cine@cluster0.7sr4t.mongodb.net/myFirstDatabase')
.then(() => console.log('MongoDB Connected...'))
.catch(arr => console.log(arr))

app.get('/', (req, res) => {
  res.send('Hello, Express!');
})

app.post('/register', (req, res) => {
  // 회원가입에 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err});
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});