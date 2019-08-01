/**
 * 用户表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: 'id' },
    name: { type: DataTypes.STRING(30), unique: true, comment: '用户名 唯一存在' },
    phone: { type: DataTypes.STRING(16), unique: true, comment: '手机号 唯一存在' },
    password: { type: DataTypes.STRING(255), comment: '密码' },
    roles: {type: DataTypes.STRING(20), comment: '权限'},
    imgurl: {type: DataTypes.STRING(255), comment: '头像路径'}
  }, {
    comment: '用户信息',
    tableName: 'user',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  User.prototype.associate = () => {};
  return User;
};