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
          model: User,
          attributes: ['id','email', 'nickname'],
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
          model: User,
          attributes: ['id','email', 'nickname'],
        },
      ],
    });
    res.status(200).json(fullInfComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
