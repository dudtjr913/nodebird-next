module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT, //TEXT = 긴글
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 한글과 이모티콘
      collate: 'utf8mb4_general_ci', // 한글과 이모티콘 저장
    },
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.ReComment);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Report);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};
