const express = require('express');
const { Post, Image, Comment, User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      //초기 로딩이 아닐 때 즉, mainPosts가 존재할 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; // Op는 sequelize에서 제공하는 것으로 Op.lt는 뒤의 값보다 작은 값을 가져온다.
    }
    const posts = await Post.findAll({
      where,
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
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
