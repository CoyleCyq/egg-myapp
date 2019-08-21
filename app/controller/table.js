'use strict';
const Controller = require('egg').Controller;

class TableController extends Controller {
  // 获取国家接口
  async getCountry() {
    const { ctx, app } = this;
    try {
      const prm = this.ctx.formatResponse.prm;
      console.log('getCountry参数：', prm)
      const offset = this.ctx.formatResponse.skip;
      const limit = this.ctx.formatResponse.pageSize;
      const where = {};
      let msg = '';

      // 参数处理
      if (prm.condition.length > 0) {
        for (let condition of prm.condition) {
          switch (condition.name) {
            case 'searchType':
              switch (condition.value) {
                case 'code':
                  if (prm.condition.filter(x => { x.name === 'keyword' && x.value !== '' })) {
                    where.code = { [Op.like]: '%' + prm.condition.find(x => { if (x.name === 'keyword') return x }).value + '%' };
                  }
                  break;
                case 'countryEn':
                  if (prm.condition.filter(x => { x.name === 'keyword' && x.value !== '' })) {
                    where.englishName = { [Op.like]: '%' + prm.condition.find(x => { if (x.name === 'keyword') return x }).value + '%' } ;
                  }
                  break;
                case 'countryCn':
                  if (prm.condition.filter(x => { x.name === 'keyword' && x.value !== '' })) {
                    where.chineseName = { [Op.like]: '%' + prm.condition.find(x => { if (x.name === 'keyword') return x }).value + '%'  } ;
                  }
                  break;
                default:
                  msg = '找不到参数，请求失败';
              }
              break;
          } 
        }
      }

      console.log('getcountry查询条件：', where)

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
        var o = {};
        o['code'] = itm.code;
        o['cn'] = itm.chineseName;
        o['en'] = itm.englishName;
        o['createTime'] = app.dateFormat(itm.createTime);
        o['updateTime'] = app.dateFormat(itm.updateTime);
        return o;
      })

      // 格式化数据
      ctx.formatResponse.list = newList;
      ctx.formatResponse.count = list.count;
      const body = ctx.formatResponse.formattedRes();
      ctx.body = body;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // 获取所有国家接口
  async getAllCountry() {
    const { ctx, app } = this;
    try {
      // console.log(app.model)
      const list = await app.model.Country.findAll()
      // 数据组装
      let newList = list.map(itm => {
        var o = {};
        o['code'] = itm.code;
        o['cn'] = itm.chineseName;
        o['en'] = itm.englishName;
        o['createTime'] = app.dateFormat(itm.createTime);
        o['updateTime'] = app.dateFormat(itm.updateTime);
        return o;
      })

      // // 格式化数据
      // ctx.formatResponse.list = newList;
      // ctx.formatResponse.count = list.count;
      // const body = ctx.formatResponse.formattedRes();
      ctx.body = newList;
    } catch(error) {
      console.log('123', error);
      throw error;
    }
  }
}

module.exports = TableController