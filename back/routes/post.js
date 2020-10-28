const express = require('express');
const {
  Post,
  User,
  Comment,
  Image,
  Hashtag,
  ReComment,
  Report,
} = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      //파일.png
      const ext = path.extname(file.originalname); //확장자 추출 - .png
      const name = path.basename(file.originalname, ext); //파일명 추출  - 파일
      done(null, name + '_' + new Date().getTime() + ext); // 파일1512311.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20메가 제한
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = [];
      for (let i = 0; i < hashtags.length; i++) {
        if (!result.find((v) => v === hashtags[i])) {
          result.push(hashtags[i]);
        }
      }
      const noRepResult = await Promise.all(
        result.map((hash) =>
          Hashtag.findOrCreate({
            where: {
              name: hash.slice(1).toLowerCase(),
            },
          }),
        ),
      );
      await post.addHashtags(noRepResult.map((v) => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((src) => Image.create({ src })),
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullInfPost = await Post.findOne({
      where: { id: post.id },
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Comment,
        },
        {
          model: Image,
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'email', 'nickname'],
        },

        {
          model: User, // 좋아요를 표시한 사람
          as: 'Likers',
        },
      ],
    });
    res.status(200).json(fullInfPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  res.status(200).json(req.files.map((v) => v.filename));
});

router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시물입니다.');
    }
    const fullInfPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, //댓글 작성자
              attributes: ['id', 'email', 'nickname'],
            },
            {
              model: ReComment, // 답글
              include: [
                {
                  model: User, // 답글 작성자
                  attributes: ['id', 'email', 'nickname'],
                },
              ],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'email', 'nickname'],
        },
        {
          model: User, // 좋아요를 표시한 사람
          as: 'Likers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: Image,
            },
            {
              model: User,
              attributes: ['id', 'nickname', 'email'],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullInfPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.findOne({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시물입니다.');
    }
    await Post.update(
      { content: req.body.content },
      { where: { id: post.id } },
    );
    if (hashtags) {
      const result = [];
      for (let i = 0; i < hashtags.length; i++) {
        if (!result.find((v) => v === hashtags[i])) {
          result.push(hashtags[i]);
        }
      }
      const noRepResult = await Promise.all(
        result.map((hash) =>
          Hashtag.findOrCreate({
            where: {
              name: hash.slice(1).toLowerCase(),
            },
          }),
        ),
      );
      await post.addHashtags(noRepResult.map((v) => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((src) => Image.create({ src })),
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const requirePostInf = await Post.findOne({
      where: { id: post.id },
      attributes: ['id', 'content'],
    });
    res.status(200).json(requirePostInf);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.comment,
      UserId: req.user.id,
      PostId: req.params.postId,
    });
    const fullInfComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User, // 댓글 작성자
          attributes: ['id', 'email', 'nickname'],
        },
        {
          model: ReComment, // 답글
        },
      ],
    });
    res.status(200).json(fullInfComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/recomment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await ReComment.create({
      content: req.body.comment,
      UserId: req.user.id,
      PostId: req.params.postId,
      CommentId: req.body.commentId,
    });
    const fullInfReComment = await ReComment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User, // 댓글 작성자
          attributes: ['id', 'email', 'nickname'],
        },
      ],
    });
    res.status(200).json(fullInfReComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:commentId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId },
    });
    if (!comment) {
      return res.status(403).send('존재하지 않는 댓글입니다.');
    }
    await ReComment.destroy({
      where: { CommentId: req.params.commentId },
    });
    await Comment.destroy({
      where: { id: req.params.commentId },
    });
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:recommentId/recomment', isLoggedIn, async (req, res, next) => {
  try {
    const reComment = await ReComment.findOne({
      where: { id: req.params.recommentId },
    });
    if (!reComment) {
      return res.status(403).send('존재하지 않는 답글입니다.');
    }
    await ReComment.destroy({
      where: { id: req.params.recommentId },
    });
    res.status(200).json(reComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: 'Retweet',
        },
      ],
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: '리트윗',
    });
    const fullInfRetweetPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'email'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname', 'email'],
            },
            {
              model: ReComment, // 답글
              include: [
                {
                  model: User, // 답글 작성자
                  attributes: ['id', 'email', 'nickname'],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: Image,
            },
            {
              model: User,
              attributes: ['id', 'nickname', 'email'],
            },
          ],
        },
      ],
    });
    res.status(200).json(fullInfRetweetPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: post.UserId });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId/unlike', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: post.UserId });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await ReComment.destroy({
      where: { PostId: req.params.postId },
    });
    await Comment.destroy({
      where: { PostId: req.params.postId },
    });
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).send(req.params.postId);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/:postId/report', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const exReport = await Report.findOne({
      where: {
        UserId: req.user.id,
        PostId: post.id,
      },
    });
    if (exReport) {
      return res.status(403).send('이미 신고한 게시글입니다.');
    }
    if (req.body.reportValue) {
      await Report.create({
        UserId: req.user.id,
        PostId: post.id,
        reason: parseInt(req.body.reportValue, 10),
      });
    } else if (req.body.etcValue) {
      await Report.create({
        UserId: req.user.id,
        PostId: post.id,
        reason: 4,
        specific: req.body.etcValue,
      });
    }
    const fullInfReport = await Report.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: ['PostId'],
    });
    res.status(200).json(fullInfReport);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
