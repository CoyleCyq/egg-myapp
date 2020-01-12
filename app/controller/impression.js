'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class ImpressionController extends Controller {
  // 获取所有印象
  async getAllImpression() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.impression.findAllImpression()
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id,
          name: itm.name,
          level: itm.level,
          mainAttr: itm.mainAttr,
          attrvalue: itm.attrvalue,
          author: itm.author,
          source: itm.source,
          skill: itm.skill,
          description: itm.description,
          resonance: itm.resonance,
          imgurl: itm.imgurl,
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
      console.log('getAllImpression失败! 原因为：', error);
      throw error;
    }
  }
  // 获取印象（分页）
  async getImpression() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('getImpression参数：', prm)
      const offset = ctx.formatResponse.skip;
      const limit = ctx.formatResponse.pageSize;
      const where = {};

      if (prm.searchType) {
        where[prm.searchType] = { [Op.like]: `%${prm.keyword}%` }
      }
      
      if (prm.mainAttr) {
        // 模糊搜索
        where.mainAttr = { [Op.like]: `%${prm.mainAttr}%` }
      }
      if (prm.level) {
        // 模糊搜索
        where.level = { [Op.like]: `%${prm.level}%` }
      }

      console.log('getImpression查询条件：', where)

      // 获取数据
      const list = await ctx.service.impression.findImpression({
        limit,
        offset,
        where,
        order: [
          ['level', 'DESC'],
          ['mainAttr', 'ASC'],
          ['name', 'ASC']
        ]
      }); 

      // 数据组装
      let newList = list.dataList.map(itm => {
        return { 
          id: itm.id,
          name: itm.name,
          level: itm.level,
          mainAttr: itm.mainAttr,
          attrvalue: itm.attrvalue,
          author: itm.author,
          source: itm.source,
          skill: itm.skill,
          description: itm.description,
          resonance: itm.resonance,
          imgurl: itm.imgurl,
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
      console.log('getImpression错误原因：', error);
      throw error;
    }
  }
  // 新建印象
  async addImpression() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addImpression参数：', prm)
      if (prm.name && prm.mainAttr) {
        const list = await ctx.service.impression.findImpression({
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
        const data = await ctx.service.impression.addImpression({
          id: uuid.v1(),
          name: prm.name,
          level: prm.level,
          mainAttr: prm.mainAttr,
          attrvalue: prm.attrvalue,
          author: prm.author,
          source: prm.source,
          skill: prm.skill,
          description: prm.description,
          resonance: prm.resonance,
          imgurl: prm.imgurl,
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
      console.log('addImpression失败! 原因为：', error);
      throw error;
    }
  }
  // 更新印象
  async updateImpression() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('updateImpression参数：', prm)
      if (prm.id) {
        const now = new Date();
        const data = await ctx.service.impression.updateImpression(prm.id, {
          name: prm.name,
          level: prm.level,
          mainAttr: prm.mainAttr,
          attrvalue: prm.attrvalue,
          author: prm.author,
          source: prm.source,
          skill: prm.skill,
          description: prm.description,
          resonance: prm.resonance,
          imgurl: prm.imgurl,
          updateTime: app.dateFormat(now)
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('updateImpression失败! 原因为：', error);
      throw error;
    }
  }
  // 删除印象
  async deleteImpression() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      if (prm.id) {
        const data = await ctx.service.impression.deleteImpression(prm.id);
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      }
    } catch (error) {
      console.log('deleteImpression失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = ImpressionController