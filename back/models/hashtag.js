module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: DataTypes.STRING(20), //TEXT = 긴글
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 한글과 이모티콘
      collate: 'utf8mb4_general_ci', // 한글과 이모티콘 저장
    },
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
};
