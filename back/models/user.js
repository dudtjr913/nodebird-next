const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {},
      nickname: {},
      password: {},
      // id : {} 이건 mysql에서 자동으로 넣어주기 때문에 넣지 않아도 되지만 알고는 있자
    },
    {
      charset: 'utf8', // 한글
      collate: 'utf8_general_ci', // 한글 저장
    },
  );
  User.associate = (db) => {};
  return User;
};
