/*const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.write('http1');
  res.write('http2');
  res.write('http3');
  res.end('http end');
});
server.listen(3065, () => console.log('서버 실행'));
*/
const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const cors = require('cors');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('연결 성공');
  })
  .catch(console.error);

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*  app.get -> 가져오다
   app.post -> 생성하다 
   app.put -> 전체 수정(전체 수정은 보통 사용할 일이 없다)
   app.patch -> 부분 수정(닉네임 수정이나 게시글 콘텐츠 수정)
   app.delete -> 제거하다
   app.options -> 찔러보다(요청을 보내면 받아줄 것인지 찔러보는 것)
   app.head -> 헤더만 가져온다(헤더/바디 중에서) */

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
