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
              attributes: ['id'],
              through: {
                attributes: [],
              },
            },
            {
              model: User,
              as: 'Followers',
              attributes: ['id'],
              through: {
                attributes: [],
              },
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
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
            through: {
              attributes: [],
            },
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

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      { nickname: req.body.nickname },
      {
        where: {
          id: req.user.id,
        },
      },
    );
    res.status(200).json(req.body.nickname);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      return res.status(403).send('존재하지 않는 사용자입니다.');
    }
    user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(403).send('로그인이 필요합니다.');
    }
    const followings = await user.getFollowings({
      attributes: ['id', 'nickname'],
    });
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(403).send('로그인이 필요합니다.');
    }
    const followers = await user.getFollowers({
      attributes: ['id', 'nickname'],
    });
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
