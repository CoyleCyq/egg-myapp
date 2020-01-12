/**
 * 操作日志
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const OperationLog = app.model.define('operationLog', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '操作Id' },
    url: { type: DataTypes.STRING, comment: '请求接口' },
    request: { type: DataTypes.STRING, comment: '请求参数' },
    response: { type: DataTypes.TEXT, comment: '返回信息' },
    spendTime: { type: DataTypes.STRING, comment: '花费时间' },
    type: { type: DataTypes.STRING(10), comment: '请求类型' }
  }, {
    comment: '操作日志',
    tableName: 'operationLog',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  OperationLog.prototype.associate = () => {};
  return OperationLog;
};