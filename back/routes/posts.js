const express = require('express');
const { Post, Image, Comment, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
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
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
