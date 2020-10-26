module.exports = (sequelize, DataTypes) => {
  const ReComment = sequelize.define(
    'ReComment',
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
  ReComment.associate = (db) => {
    db.ReComment.belongsTo(db.User);
    db.ReComment.belongsTo(db.Post);
    db.ReComment.belongsTo(db.Comment);
  };
  return ReComment;
};
