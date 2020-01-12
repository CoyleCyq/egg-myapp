'use strict';
const uuid = require('uuid');
const Controller = require('egg').Controller;

class OperationLogController extends Controller {
  // 新增日志
  async addLog() {
    const { ctx, app } = this;
    try {
      const prm = ctx.formatResponse.prm;
      console.log('addLog参数：', prm)
      if (prm.url && prm.type) {
        const now = new Date();
        const logId = uuid.v1()
        const data = await ctx.service.operationLog.addLog({
          id: logId, 
          url: prm.url,
          request: prm.request,
          response: prm.response,
          type: prm.type,
          spendTime: prm.spendTime,
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
      console.log('addLog失败! 原因为：', error);
      throw error;
    }
  }
  // 删除服饰
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
