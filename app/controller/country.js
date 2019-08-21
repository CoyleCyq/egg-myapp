'use strict';
const Controller = require('egg').Controller;

class CountryController extends Controller {
  // 获取国家接口
  async getCountry() {
    const { ctx, app } = this;
    try {
      const prm = this.ctx.formatResponse.prm;
      console.log('getCountry参数：', prm)
      const offset = this.ctx.formatResponse.skip;
      const limit = this.ctx.formatResponse.pageSize;
      const where = {};

      if (prm.code) {
        let list = (prm.code).split(/[,，]/);
        list = list.map((item) => {
          return item.toUpperCase()
        })
        // 支持同时搜索多个
        where.code = { [Op.in]: list }
      }
      if (prm.countryEn) {
        // 模糊搜索
        where.englishName = { [Op.like]: `%${prm.countryEn}%` }
      }
      if (prm.countryCn) {
        // 模糊搜索
        where.chineseName = { [Op.like]: `%${prm.countryCn}%` }
      }

      console.log('getCountry查询条件：', where)

      // 获取数据
      const list = await ctx.service.country.findCountry({
        limit,
        offset,
        where,
        order: [
          ['code', 'asc']
        ]
      }); 

      // 数据组装
      let newList = list.dataList.map(itm => {
        return { 
          code: itm.code, 
          cn: itm.chineseName,
          en: itm.englishName, 
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
      console.log('getCountry错误原因：', error);
      throw error;
    }
  }
  // 获取所有国家接口
  async getAllCountry() {
    const { ctx, app } = this;
    try {
      const list = await app.model.Country.findAll()
      // 数据组装
      let newList = list.map(itm => {
        return { 
          code: itm.code, 
          cn: itm.chineseName,
          en: itm.englishName, 
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
      console.log('getAllCountry错误原因：', error);
      throw error;
    }
  }
}

module.exports = CountryController