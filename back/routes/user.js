const express = require('express');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      console.error(info);
      return res.status(401).send(info.reason);
    }
    req.logIn(user, async (err) => {
      try {
        if (err) {
          return next(err);
        }
        const fullUserInfWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: ['id', 'email', 'nickname'],
          include: [
            {
              model: Post,
              attributes: ['id'],
            },
            {
              model: User,
              as: 'Followings',
              attributes: ['id', 'nickname'],
            },
            {
              model: User,
              as: 'Followers',
              attributes: ['id', 'nickname'],
            },
          ],
        });
        console.log(user.id);
        return res.status(201).json(fullUserInfWithoutPassword);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exEmail) {
      return res.status(403).send('이미 동일한 이메일이 존재합니다.');
    }
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exNickname) {
      return res.status(403).send('이미 동일한 닉네임이 존재합니다.');
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashPassword,
    });
    res.status(201).send('회원가입 성공');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ['email', 'nickname', 'id'],
        include: [
          {
            model: User,
            as: 'Followings',
            attributes: ['id', 'email', 'nickname'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id', 'email', 'nickname'],
          },
          {
            model: Post,
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
