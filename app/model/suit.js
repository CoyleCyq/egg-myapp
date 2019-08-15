/**
 * 套装表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Suit = app.model.define('suit', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '套装id' },
    name: { type: DataTypes.STRING(10), comment: '套装名称' },
    level: { type: DataTypes.STRING(10), comment: '套装等级' },
    author: { type: DataTypes.STRING(20), comment: '设计师' },
    mainAttr: { type: DataTypes.STRING(10), comment: '主属性' },
    amount: { type: DataTypes.INTEGER, comment: '部件数' },
    source: { type: DataTypes.STRING, comment: '来源' },
    label: { type: DataTypes.STRING, comment: '标签' }
  }, {
    comment: '套装表',
    tableName: 'suit',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Suit.prototype.associate = () => {};
  return Suit;
};