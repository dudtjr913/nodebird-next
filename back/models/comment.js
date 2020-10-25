module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
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
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.hasMany(db.ReComment);
  };
  return Comment;
};
