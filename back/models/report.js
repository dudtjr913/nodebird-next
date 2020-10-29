module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
    {
      reason: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specific: {
        type: DataTypes.STRING(100),
      },
    },
    {
      charset: 'utf8', // 한글
      collate: 'utf8_general_ci', // 한글 저장
    },
  );
  Report.associate = (db) => {
    db.Report.belongsTo(db.User);
    db.Report.belongsTo(db.Post);
  };
  return Report;
};
