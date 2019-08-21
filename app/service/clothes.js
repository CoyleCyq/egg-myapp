const Service = require('egg').Service;

class ClothesService extends Service {
  // 查
  async findClothes(options) {
    try {
      const data = await Promise.all([
        this.app.model.Clothes.count({
          where: options.where
        }),
        this.app.model.Clothes.findAll(options)
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
  async addClothes(clothes) {
    return this.app.model.Clothes.create(clothes)
  }
  // 改
  async updateClothes(id, clothes) {
    return this.app.model.Clothes.update(clothes, { id: id });
  }
  // 删
  async deleteClothes(id) {
    return this.app.model.Clothes.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = ClothesService;