const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch((error) => {
    console.error('초기화 실패');
    console.error(error);
  });

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello api');
});

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});
