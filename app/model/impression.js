/**
 * 印象表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Impression = app.model.define('impression', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '印象id' },
    name: { type: DataTypes.STRING(10), comment: '印象名称' },
    level: { type: DataTypes.STRING(10), comment: '印象等级' },
    mainAttr: { type: DataTypes.STRING(10), comment: '主属性' },
    description: { type: DataTypes.STRING, comment: '印象描述' },
  }, {
    comment: '印象表',
    tableName: 'impression',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Impression.prototype.associate = () => {};
  return Impression;
};