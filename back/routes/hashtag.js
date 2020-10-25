const express = require('express');
const { Hashtag, Post, Image, User, Comment, ReComment } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/:name', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.name) },
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
        {
          model: Image,
          attributes: ['src'],
        },
        {
          model: User,
          attributes: ['id', 'email', 'nickname'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
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
          model: User,
          as: 'Likers',
          attributes: ['id', 'email', 'nickname'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!posts) {
      return res.status(403).send('존재하지 않는 해시태그입니다.');
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
