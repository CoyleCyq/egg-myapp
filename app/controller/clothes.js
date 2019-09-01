'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class ClothesController extends Controller {
  // 获取所有服装信息
  async getAllClothes() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.clothes.findAllClothes({
        order: [
          ['level', 'DESC'],
          ['mainAttr', 'ASC'],
          ['name', 'DESC']
        ]
      })
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id, 
          name: itm.name,
          level: itm.level,
          type: itm.type,
          mainAttr: itm.mainAttr,
          suit: {
            id: itm.suitId,
            name: itm.suitName
          },
          suitName: itm.suitName,
          author: itm.author,
          imgurl: itm.imgurl,
          source: itm.source,
          elegantValue: itm.elegantValue,
          freshValue: itm.freshValue,
          sweetValue: itm.sweetValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          price: itm.price,
          priceType: itm.priceType,
          brand: itm.brand,
          amount: itm.amount,
          label: itm.label,
          labelValue: itm.labelValue,
          description: itm.description,
          createTime: app.dateFormat(itm.createTime), 
          updateTime: app.dateFormat(itm.updateTime) 
        }
      })

      // 格式化数据
      ctx.formatResponse.list = newList;
      ctx.formatResponse.count = newList.length;
      ctx.formatResponse.pageSize = newList.length;
      const body = ctx.formatResponse.formattedRes();
      ctx.body = body;
    } catch(error) {
      console.log('获取所有服装信息失败! 原因为：', error);
      throw error;
    }
  }
  // 获取服装信息
  async getClothes() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('getClothes参数：', prm)
      const offset = this.ctx.formatResponse.skip;
      const limit = this.ctx.formatResponse.pageSize;
      const where = {};

      if (prm.searchType) {
        where[prm.searchType] = { [Op.like]: `%${prm.keyword}%` }
      }

      if (prm.mainAttr) {
        where.mainAttr = { [Op.like]: `%${prm.mainAttr}%` }
      }
      if (prm.type) {
        where.type = { [Op.like]: `%${prm.type}%` }
      }
      if (prm.level) {
        where.level = { [Op.like]: `%${prm.level}%` }
      }
      
      console.log('getClothes查询条件：', where)

      // 获取数据
      const list = await ctx.service.clothes.findClothes({
        limit,
        offset,
        where,
        order: [
          ['level', 'DESC'],
          ['mainAttr', 'ASC'],
          ['name', 'DESC']
        ]
      }); 

      // 数据组装
      let newList = list.dataList.map(itm => {
        return { 
          id: itm.id, 
          name: itm.name,
          level: itm.level,
          type: itm.type,
          mainAttr: itm.mainAttr,
          suit: {
            id: itm.suitId,
            name: itm.suitName
          },
          suitName: itm.suitName,
          author: itm.author,
          imgurl: itm.imgurl,
          source: itm.source,
          elegantValue: itm.elegantValue,
          freshValue: itm.freshValue,
          sweetValue: itm.sweetValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          price: itm.price,
          priceType: itm.priceType,
          brand: itm.brand,
          amount: itm.amount,
          label: itm.label,
          labelValue: itm.labelValue,
          description: itm.description,
          createTime: app.dateFormat(itm.createTime), 
          updateTime: app.dateFormat(itm.updateTime) 
        }
      })

      // 格式化数据
      ctx.formatResponse.list = newList;
      ctx.formatResponse.count = list.count;
      const body = ctx.formatResponse.formattedRes();
      // 返回数据
      ctx.body = body;
    } catch (error) {
      console.log('getClothes错误原因：', error);
      throw error;
    }
  }
  // 新增服装
  async addClothes() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addClothes参数：', prm)
      if (prm.name && prm.mainAttr && prm.type && prm.level) {
        const list = await ctx.service.clothes.findClothes({
          where: {
            name: {
              [Op.like]: `%${prm.name}%`
            }
          }
        })

        if (list.dataList.length >= 1 ) {
          throw new Error("已存在相同的数据");
        }

        const now = new Date();
        const data = await ctx.service.clothes.addClothes({
          id: uuid.v1(), 
          name: prm.name,
          level: prm.level,
          type: prm.type,
          mainAttr: prm.mainAttr,
          suitId: prm.suit.id,
          suitName: prm.suit.name,
          author: prm.author,
          imgurl: prm.imgurl,
          source: prm.source,
          elegantValue: prm.elegantValue,
          freshValue: prm.freshValue,
          sweetValue: prm.sweetValue,
          sexyValue: prm.sexyValue,
          handsomeValue: prm.handsomeValue,
          price: prm.price,
          priceType: prm.priceType,
          brand: prm.brand,
          amount: prm.amount,
          label: prm.label,
          labelValue: prm.labelValue,
          description: prm.description,
          createTime: now,
          updateTime: now
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('addClothes失败! 原因为：', error);
      throw error;
    }
  }
  // 更新服饰
  async updateClothes() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('updateClothes参数：', prm)
      if (prm.name && prm.mainAttr && prm.type && prm.level) {
        const now = new Date();
        const data = await ctx.service.clothes.updateClothes(prm.id, {
          name: prm.name,
          level: prm.level,
          type: prm.type,
          mainAttr: prm.mainAttr,
          suitId: prm.suit.id,
          suitName: prm.suit.name,
          author: prm.author,
          imgurl: prm.imgurl,
          source: prm.source,
          elegantValue: prm.elegantValue,
          freshValue: prm.freshValue,
          sweetValue: prm.sweetValue,
          sexyValue: prm.sexyValue,
          handsomeValue: prm.handsomeValue,
          price: prm.price,
          priceType: prm.priceType,
          brand: prm.brand,
          amount: prm.amount,
          label: prm.label,
          labelValue: prm.labelValue,
          description: prm.description,
          updateTime: now
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('updateClothes失败! 原因为：', error);
      throw error;
    }
  }
  // 删除服饰
  async deleteClothes() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      if (prm.id) {
        const data = await ctx.service.clothes.deleteClothes(prm.id);
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      }
    } catch (error) {
      console.log('deleteClothes失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = ClothesController
