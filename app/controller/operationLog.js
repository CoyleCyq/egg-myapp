'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class OperationLogController extends Controller {

  async findLog() {
    const { ctx, app } = this;
    try {
      const list = await ctx.service.operationLog.findLog({
        order: [
          ['createTime', 'DESC']
        ]
      })
      // 数据组装
      let newList = list.map(itm => {
        return { 
          id: itm.id, 
          url: itm.url,
          request: itm.request,
          response: itm.response,
          type: itm.type,
          spendTime: itm.spendTime,
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
  // 新增日志
  async addLog() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addLog参数：', prm)
      if (prm.url && prm.type) {
        const list = await ctx.service.operationLog.findLog({
          where: {
            url: prm.url,
            type: prm.type,
            request: prm.request
          }
        })

        if (list.dataList.length >= 1 ) {
          throw new Error("已存在相同的数据");
        }

        const now = app.dateFormat(new Date());
        const logId = uuid.v1()
        const data = await ctx.service.operationLog.addLog({
          id: logId, 
          url: prm.url,
          request: prm.request,
          response: prm.response,
          type: prm.type,
          spendTime: prm.spendTime,
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
      console.log('addLog失败! 原因为：', error);
      throw error;
    }
  }
  // 删除日志
  async deleteLog() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      if (prm.id) {
        const data = await ctx.service.operationLog.deleteLog(prm.id);
        ctx.formatResponse.body = data;
        const body = ctx.formatResponse.formattedRes();
        ctx.body = body;
      }
    } catch (error) {
      console.log('deleteLog失败! 原因为：', error);
      throw error;
    }
  }
}

module.exports = OperationLogController
