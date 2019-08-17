'use strict';
const Controller = require('egg').Controller;

class ClothesController extends Controller {
  async getAllClothes() {
    const { ctx, app } = this;
    try {
      const list = await app.model.Clothes.findAll()
      // 数据组装
      // let newList = list.map(itm => {
      //   var o = {};
      //   o['id'] = itm.id;
      //   o['cn'] = itm.chineseName;
      //   o['en'] = itm.englishName;
      //   o['createTime'] = app.dateFormat(itm.createTime);
      //   o['updateTime'] = app.dateFormat(itm.updateTime);
      //   return o;
      // })
      console.log(list)
      ctx.body = list;
      // ctx.body = newList;
    } catch(error) {
      console.log('获取所有服装信息失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = ClothesController
