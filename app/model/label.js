/**
 * 标签表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Label = app.model.define('label', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '标签id' },
    name: { type: DataTypes.STRING(10), comment: '标签名称' },
    color: { type: DataTypes.STRING(10), comment: '标签颜色' }
  }, {
    comment: '标签表',
    tableName: 'label',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Label.prototype.associate = () => {};
  return Label;
};