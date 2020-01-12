'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class SuitController extends Controller {
  // 获取所有套装
  async getAllSuit() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.suit.findAllSuit()
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id,
          name: itm.name,
          level: itm.level,
          author: itm.author,
          mainAttr: itm.mainAttr,
          amount: itm.amount,
          source: itm.source,
          label: itm.label,
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
      console.log('getAllSuit失败! 原因为：', error);
      throw error;
    }
  }
  // 获取套装（分页）
  async getSuit() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('getSuit参数：', prm)
      const offset = ctx.formatResponse.skip;
      const limit = ctx.formatResponse.pageSize;
      const where = {};
      if (prm.searchType) {
        where[prm.searchType] = { [Op.like]: `%${prm.keyword}%` }
      }
      if (prm.mainAttr) {
        // 主属性 模糊搜索
        where.mainAttr = { [Op.like]: `%${prm.mainAttr}%` }
      }
      if (prm.level) {
        // 品质 模糊搜索
        where.level = { [Op.like]: `%${prm.level}%` }
      }
      console.log('getSuit查询条件：', where)

      // 获取数据
      const list = await ctx.service.suit.findSuit({
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
          author: itm.author,
          mainAttr: itm.mainAttr,
          amount: itm.amount,
          source: itm.source,
          label: itm.label,
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
      console.log('getSuit错误原因：', error);
      throw error;
    }
  }
  // 新建套装
  async addSuit() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addSuit参数：', prm)
      if (prm.name && prm.mainAttr) {
        const list = await ctx.service.suit.findSuit({
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
        const data = await ctx.service.suit.addSuit({
          id: uuid.v1(),
          name: prm.name,
          level: prm.level,
          author: prm.author,
          mainAttr: prm.mainAttr,
          amount: prm.amount,
          source: prm.source,
          label: prm.label,
          createTime: app.dateFormat(now),
          updateTime: app.dateFormat(now)
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('addSuit失败! 原因为：', error);
      throw error;
    }
  }
  // 更新套装
  async updateSuit() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('updateSuit参数：', prm)
      if (prm.id) {
        const now = new Date();
        const data = await ctx.service.suit.updateSuit(prm.id, {
          name: prm.name,
          level: prm.level,
          author: prm.author,
          mainAttr: prm.mainAttr,
          amount: prm.amount,
          source: prm.source,
          label: prm.label,
          updateTime: app.dateFormat(now)
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('updateSuit失败! 原因为：', error);
      throw error;
    }
  }
  // 删除套装
  async deleteSuit() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      if (prm.id) {
        const data = await ctx.service.suit.deleteSuit(prm.id);
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      }
    } catch (error) {
      console.log('deleteSuit失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = SuitController