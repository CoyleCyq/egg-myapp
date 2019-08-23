/**
 * 设计师之影表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const DesignerShadow = app.model.define('designerShadow', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '设计师之影id' },
    name: { type: DataTypes.STRING(10), comment: '设计师之影名称' },
    level: { type: DataTypes.STRING(10), comment: '等阶' },
    mainAttr: { type: DataTypes.STRING(10), comment: '主属性' },
    elegantValue: { type: DataTypes.INTEGER, comment: '典雅属性值' },
    sweetValue: { type: DataTypes.INTEGER, comment: '甜美属性值' },
    freshValue: { type: DataTypes.INTEGER, comment: '清新属性值' },
    sexyValue: { type: DataTypes.INTEGER, comment: '性感属性值' },
    handsomeValue: { type: DataTypes.INTEGER, comment: '帅气属性值' },
    skill1: { type: DataTypes.UUID, comment: '技能1' },
    skill2: { type: DataTypes.UUID, comment: '技能2' },
    skill3: { type: DataTypes.UUID, comment: '技能3' },
    callOfShadow: { type: DataTypes.UUID, comment: '影之召唤'}
  }, {
    comment: '设计师之影表',
    tableName: 'label',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  DesignerShadow.prototype.associate = () => {};
  return DesignerShadow;
};