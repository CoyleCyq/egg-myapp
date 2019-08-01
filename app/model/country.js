/**
 * 国家表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Country = app.model.define('country', {
    code: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: 'id' },
    chineseName: { type: DataTypes.STRING(50), comment: '国家名称(中)' },
    englishName: { type: DataTypes.STRING(100), comment: '国家名称(英)' },
  }, {
    comment: '国家表',
    tableName: 'country',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Country.prototype.associate = () => {};
  return Country;
};