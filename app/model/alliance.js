/**
 * 计分表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
 'use strict';
 module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Alliance = app.model.define('alliance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, comment: '主键Id' },
    name: { type: DataTypes.STRING(30), comment: '用户名' },
    date: { type: DataTypes.DATEONLY, comment: '日期' },
    score: { type: DataTypes.INTEGER, comment: '分数' }
  }, {
    comment: '计分',
    tableName: 'alliance',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Alliance.prototype.associate = () => {};
  return Alliance;
 };