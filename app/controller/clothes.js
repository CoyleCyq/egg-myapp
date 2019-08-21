'use strict';
const Controller = require('egg').Controller;

class ClothesController extends Controller {
  // 获取所有服装信息
  async getAllClothes() {
    const { ctx, app } = this;
    try {
      const list = await app.model.Clothes.findAll()
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id, 
          name: itm.name,
          level: itm.level,
          type: itm.type,
          mainAttr: itm.mainAttr,
          suitId: itm.suitId,
          suitName: itm.suitId,
          imgurl: itm.imgurl,
          elegantValue: itm.elegantValue,
          sweetValue: itm.sweetValue,
          freshValue: itm.freshValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          price: itm.price,
          priceType: itm.priceType,
          label: itm.label,
          labelValue: itm.labelValue,
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
      const prm = this.ctx.formatResponse.prm;
      console.log('getClothes参数：', prm)
      const offset = this.ctx.formatResponse.skip;
      const limit = this.ctx.formatResponse.pageSize;
      const where = {};

      if (prm.name) {
        where.name = { [Op.like]: `%${prm.name}%` }
      }
      if (prm.mainAttr) {
        // 模糊搜索
        where.mainAttr = { [Op.like]: `%${prm.mainAttr}%` }
      }
      if (prm.type) {
        // 模糊搜索
        where.type = { [Op.like]: `%${prm.type}%` }
      }

      console.log('getClothes查询条件：', where)

      // 获取数据
      const list = await ctx.service.clothes.findClothes({
        limit,
        offset,
        where,
        order: [
          ['name', 'asc']
        ]
      }); 

      console.log('list', list)

      // 数据组装
      let newList = list.dataList.map(itm => {
        return { 
          id: itm.id, 
          name: itm.name,
          level: itm.level,
          type: itm.type,
          mainAttr: itm.mainAttr,
          suitId: itm.suitId,
          suitName: itm.suitId,
          imgurl: itm.imgurl,
          elegantValue: itm.elegantValue,
          sweetValue: itm.sweetValue,
          freshValue: itm.freshValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          price: itm.price,
          priceType: itm.priceType,
          label: itm.label,
          labelValue: itm.labelValue,
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
      const prm = this.ctx.formatResponse.prm;
      console.log('addClothes参数：', prm)
      if (prm.name && prm.mainAttr && prm.type) {
        const now = new Date.now()
        const data = await service.Clothes.addClothes({
          id: prm.id, 
          name: prm.name,
          level: prm.level,
          type: prm.type,
          mainAttr: prm.mainAttr,
          suitId: prm.suitId,
          suitName: prm.suitId,
          imgurl: prm.imgurl,
          elegantValue: prm.elegantValue,
          sweetValue: prm.sweetValue,
          freshValue: prm.freshValue,
          sexyValue: prm.sexyValue,
          handsomeValue: prm.handsomeValue,
          price: prm.price,
          priceType: prm.priceType,
          label: prm.label,
          labelValue: prm.labelValue,
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
}

module.exports = ClothesController
