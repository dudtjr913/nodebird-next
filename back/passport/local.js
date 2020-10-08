const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        console.log('LOCAL.JS');
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            return done(null, false, { reason: '아이디가 존재하지 않습니다.' });
          }
          const pw = await bcrypt.compare(password, user.password);
          if (!pw) {
            return done(null, false, {
              reason: '비밀번호가 일치하지 않습니다.',
            });
          }
          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      },
    ),
  );
};
