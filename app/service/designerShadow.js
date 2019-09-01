const Service = require('egg').Service;

class DesignerShadowService extends Service {
  // 获取设计师之影（分页）
  async findDesignerShadow(options) {
    try {
      const data = await Promise.all([
        this.app.model.DesignerShadow.count({
          where: options.where
        }),
        this.app.model.DesignerShadow.findAll(options)
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
  // 获取所有设计师之影
  async findAllDesignerShadow(options) {
    return this.app.model.DesignerShadow.findAll(options)
  }
  // 增
  async addDesignerShadow(data) {
    return this.app.model.DesignerShadow.create(data)
  }
  // 改
  async updateDesignerShadow(id, data) {
    return this.app.model.DesignerShadow.update(data, {
      where: {
        id: id
      }
    });
  }
  // 删
  async deleteDesignerShadow(id) {
    return this.app.model.DesignerShadow.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = DesignerShadowService;