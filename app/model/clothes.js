/**
 * 服装表
 * @param {*} sequelize
 * @param {*} DataTypes
 */
'use strict';
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const Clothes = app.model.define('clothes', {
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, comment: '服装id' },
    name: { type: DataTypes.STRING(10), comment: '服装名称' },
    level: { type: DataTypes.STRING(10), comment: '服装等级' },
    type: { type: DataTypes.STRING(10), comment: '服装类型（上装，下装。。。）' },
    mainAttr: { type: DataTypes.STRING(10), comment: '主属性' },
    suitId: { type: DataTypes.UUID, comment: '套装Id' },
    suitName: { type: DataTypes.STRING(10), comment: '套装名称' },
    author: { type: DataTypes.STRING(10), comment: '设计师' },
    imgurl: { type: DataTypes.STRING, comment: '图片路径' },
    source: { type: DataTypes.STRING, comment: '来源' },
    elegantValue: { type: DataTypes.INTEGER, comment: '典雅属性值' },
    freshValue: { type: DataTypes.INTEGER, comment: '清新属性值' },
    sweetValue: { type: DataTypes.INTEGER, comment: '甜美属性值' },
    sexyValue: { type: DataTypes.INTEGER, comment: '性感属性值' },
    handsomeValue: { type: DataTypes.INTEGER, comment: '帅气属性值' },
    price: { type: DataTypes.INTEGER, comment: '消耗，花费'},
    priceType: { type: DataTypes.STRING(10), comment: '消耗类型，花费类型' },
    brand: { type: DataTypes.STRING(10), comment: '妆容品牌' },
    amount: { type: DataTypes.INTEGER, comment: '拥有数' },
    label: { type: DataTypes.STRING(10), comment: '标签' },
    labelValue: { type: DataTypes.STRING(10), comment: '标签值' },
    description: { type: DataTypes.STRING, comment: '服装描述' },
  }, {
    comment: '服装表',
    tableName: 'clothes',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
  });
  Clothes.prototype.associate = () => {};
  return Clothes;
};