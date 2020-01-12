const Service = require('egg').Service;

class OperationLogService extends Service {
    // 查
  async findLog(options) {
    try {
      const data = await Promise.all([
        this.app.model.OperationLog.count({
          where: options.where
        }),
        this.app.model.OperationLog.findAll(options)
      ]);
      const count = data[0];
      const dataList = data[1];
      return {
        dataList,
        count
      };
    } catch (error) {
      console.log(error)
    }
  }
  // 增
  async addLog(clothes) {
    return this.app.model.OperationLog.create(clothes)
  }
  // 删
  async deleteLog(id) {
    return this.app.model.OperationLog.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = OperationLogService;