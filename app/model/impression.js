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
    attrvalue: { type: DataTypes.INTEGER, comment: '属性值' },
    author: { type: DataTypes.STRING(10), comment: '设计师' },
    source: { type: DataTypes.STRING(50), comment: '获得途径' },
    skill: { type: DataTypes.STRING(100), comment: '核心技能' },
    description: { type: DataTypes.STRING(100), comment: '印象描述' },
    resonance: { type: DataTypes.STRING(100), comment: '共鸣效果' },
    imgurl: { type: DataTypes.STRING, comment: '图片路径' }
  }, {
    comment: '印象表',
    tableName: 'impression',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Impression.prototype.associate = () => {};
  return Impression;
};