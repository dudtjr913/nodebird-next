const express = require('express');
const { Post, User, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullInfPost = await Post.findOne({
      where: { id: post.id },
      attributes: ['id', 'content'],
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

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.comment,
      UserId: req.user.id,
      PostId: req.params.postId,
    });
    const fullInfComment = await Comment.findOne({
      where: { id: comment.id },
      attributes: ['id', 'content', 'PostId'],
      include: [
        {
          model: User, // 댓글 작성자
          attributes: ['id', 'email', 'nickname'],
        },
      ],
    });
    res.status(200).json(fullInfComment);
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
      res.status(403).send('게시글이 존재하지 않습니다.');
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
      res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.status(200).json({ PostId: post.id, UserId: post.UserId });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
