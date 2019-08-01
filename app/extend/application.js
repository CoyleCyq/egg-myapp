"use strict";
const crypto = require('crypto');

module.exports = {
  // MD5加密
  md5(str) {
    if (str) {
      const md5 = crypto.createHash('md5');
      md5.update(str.toString());
      const newstr = md5.digest('hex');
      return newstr.toUpperCase();
    } else {
      throw new Error('参数错误');
    }
  },
  async encryptionPassword(user_id, password) {
    return await crypto.createHmac("sha256", user_id).update(password).digest("hex");
  },
  async erpToken() {
    return this.config.erpToken || "admin";
  },
  // 格式化时间
  dateFormat(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!date) return '';
    date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) 
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}