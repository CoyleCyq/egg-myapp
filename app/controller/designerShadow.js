'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class DesignerShadowController extends Controller {
  // 获取所有印象
  async getAllDesignerShadow() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.designerShadow.findAllDesignerShadow()
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id,
          name: itm.name,
          level: itm.level,
          mainAttr: itm.mainAttr,
          elegantValue: itm.elegantValue,
          freshValue: itm.freshValue,
          sweetValue: itm.sweetValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          source: itm.source,
          skill1: itm.skill1,
          skill2: itm.skill2,
          skill3: itm.skill3,
          callOfShadow: itm.callOfShadow,
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
      console.log('getAllDesignerShadow失败! 原因为：', error);
      throw error;
    }
  }
  // 获取设计师之影（分页）
  async getDesignerShadow() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('getDesignerShadow参数：', prm)
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

      console.log('getDesignerShadow查询条件：', where)

      // 获取数据
      const list = await ctx.service.designerShadow.findDesignerShadow({
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
          mainAttr: itm.mainAttr,
          elegantValue: itm.elegantValue,
          freshValue: itm.freshValue,
          sweetValue: itm.sweetValue,
          sexyValue: itm.sexyValue,
          handsomeValue: itm.handsomeValue,
          source: itm.source,
          skill1: itm.skill1,
          skill2: itm.skill2,
          skill3: itm.skill3,
          callOfShadow: itm.callOfShadow,
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
      console.log('getDesignerShadow错误原因：', error);
      throw error;
    }
  }
  // 新建印象
  async addDesignerShadow() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addDesignerShadow参数：', prm)
      if (prm.name && prm.mainAttr) {
        const list = await ctx.service.designerShadow.findDesignerShadow({
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
        const data = await ctx.service.designerShadow.addDesignerShadow({
          id: uuid.v1(),
          name: prm.name,
          level: prm.level,
          mainAttr: prm.mainAttr,
          elegantValue: prm.elegantValue,
          freshValue: prm.freshValue,
          sweetValue: prm.sweetValue,
          sexyValue: prm.sexyValue,
          handsomeValue: prm.handsomeValue,
          source: prm.source,
          skill1: prm.skill1,
          skill2: prm.skill2,
          skill3: prm.skill3,
          callOfShadow: prm.callOfShadow,
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
      console.log('addDesignerShadow失败! 原因为：', error);
      throw error;
    }
  }
  // 更新设计师之影
  async updateDesignerShadow() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('updateDesignerShadow参数：', prm)
      if (prm.id) {
        const now = new Date();
        const data = await ctx.service.designerShadow.updateDesignerShadow(prm.id, {
          name: prm.name,
          level: prm.level,
          mainAttr: prm.mainAttr,
          elegantValue: prm.elegantValue,
          freshValue: prm.freshValue,
          sweetValue: prm.sweetValue,
          sexyValue: prm.sexyValue,
          handsomeValue: prm.handsomeValue,
          source: prm.source,
          skill1: prm.skill1,
          skill2: prm.skill2,
          skill3: prm.skill3,
          callOfShadow: prm.callOfShadow,
          updateTime: now
        });
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      } else {
        throw new Error("缺少参数");
      }
    } catch (error) {
      console.log('updateDesignerShadow失败! 原因为：', error);
      throw error;
    }
  }
  // 删除设计师之影
  async deleteDesignerShadow() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      if (prm.id) {
        const data = await ctx.service.designerShadow.deleteDesignerShadow(prm.id);
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      }
    } catch (error) {
      console.log('deleteDesignerShadow失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = DesignerShadowController