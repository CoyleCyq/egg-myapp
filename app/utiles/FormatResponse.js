"use strict";
const querystring = require("querystring");
class FormatResponse {
  constructor() {
    this.status = "success";
    this.msg = "操作成功";
    this.list = null;
    this.pageIndex = 1;
    this.pageSize = 0;
    this.pages = 0;
    this.count = 0;
    this.skip = 0;
    this.prm = undefined;
    this.body = undefined;
  }
  // 格式化参数
  getPrm(ctx) {
    if (ctx.method === "GET") {
      this.prm = ctx.request.query;
    } else {
      this.prm = ctx.request.body;
    }
    if (this.prm) {
      this.pageIndex = this.prm.pageIndex ? this.prm.pageIndex * 1 : 1;
      this.pageSize = this.prm.pageSize ? this.prm.pageSize * 1 : 20;
      this.skip = (this.pageIndex - 1) * this.pageSize;
    }
    return this;
  }
  // 格式化响应
  formattedRes() {
    const length = this.list ? this.list.length : 0;
    this.count = this.count ? this.count : length;
    this.pageSize = this.pageSize ? this.pageSize : length;
    if (this.body) {
      return {
        code: 0,
        status: this.status || "success",
        msg: this.msg || "操作成功",
        data: this.body
      };
    } else {
      return {
        code: 0,
        status: this.status || "success",
        msg: this.msg || "操作成功",
        data: {
          dataList: this.list,
          dataMeta: {
            data: this.data || '',
            pageIndex: this.pageIndex || 1,
            totalCount: this.count,
            pageSize: this.pageSize,
            pages: Math.ceil(this.count / this.pageSize)
          }
        }
      };
    }
  }
}
module.exports = FormatResponse;
