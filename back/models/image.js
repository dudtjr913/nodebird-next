const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {},
    },
    {
      charset: 'utf8', // 한글과 이모티콘
      collate: 'utf8_general_ci', // 한글과 이모티콘 저장
    },
  );
  Image.associate = (db) => {};
  return Image;
};
