const Service = require('egg').Service;

class ImpressionService extends Service {
  // 获取套装（分页）
  async findImpression(options) {
    try {
      const data = await Promise.all([
        this.app.model.Impression.count({
          where: options.where
        }),
        this.app.model.Impression.findAll(options)
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
  // 获取所有套装
  async findAllImpression(options) {
    return this.app.model.Impression.findAll(options)
  }
  // 增
  async addImpression(impression) {
    return this.app.model.Impression.create(impression)
  }
  // 改
  async updateImpression(id, impression) {
    return this.app.model.Impression.update(impression, {
      where: {
        id: id
      }
    });
  }
  // 删
  async deleteImpression(id) {
    return this.app.model.Impression.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = ImpressionService;