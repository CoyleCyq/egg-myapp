'use strict';

const Controller = require('egg').Controller;

class AllianceController extends Controller {
  async getAllData() {
    const { ctx, app } = this;
    const prm = ctx.formatResponse.prm;
    console.log('getAllData参数：', prm)
    const where = {};
    if (prm.searchType) {
      where[prm.searchType] = prm.keyword
    }
    where.dateBegin = prm.dateBegin
    where.dateEnd = prm.dateEnd
    const list = await ctx.service.alliance.findAllianceScore({ where: where })
    let newList = list.dataList.map(item => {
      return item
    });
    ctx.formatResponse.list = newList;
    ctx.formatResponse.count = newList.length;
    ctx.formatResponse.pageSize = newList.length;
    const body = ctx.formatResponse.formattedRes();
    ctx.body = body;
  }
  async singleUpdate() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addUser参数：', prm)
      if (prm.name && prm.score && prm.date) {
        let data = {}
        const list = await ctx.service.alliance.findUserData({
          where: {
            name: prm.name,
            date: prm.date
          }
        })
        if (list.dataList.length >= 1 ) {
          // 如果有数据，就修改
          const now = new Date();
          data = await ctx.service.alliance.updateScore({
            name: prm.name,
            date: prm.date,
            score: prm.score,
            updateTime: app.dateFormat(now)
          })
        } else {
          // 如果没有数据就新增
          const now = new Date();
          data = await ctx.service.alliance.addUser({
            name: prm.name,
            date: prm.date,
            score: prm.score,
            createTime: app.dateFormat(now),
            updateTime: app.dateFormat(now)
          })
        }
        
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('addUser失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = AllianceController;
