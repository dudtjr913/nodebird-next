const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 동일한 이메일이 존재합니다.');
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

module.exports = router;
