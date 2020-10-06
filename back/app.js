const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const cors = require('cors');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('연결 성공');
  })
  .catch(console.error);
passportConfig();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello 1' },
    { id: 2, content: 'hello 2' },
    { id: 3, content: 'hello 3' },
  ]);
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});
