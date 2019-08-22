const Service = require('egg').Service;

class SuitService extends Service {
  // 获取套装（分页）
  async findSuit(options) {
    try {
      const data = await Promise.all([
        this.app.model.Suit.count({
          where: options.where
        }),
        this.app.model.Suit.findAll(options)
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
  async findAllSuit() {
    return this.app.model.Suit.findAll()
  }
  // 增
  async addSuit(suit) {
    return this.app.model.Suit.create(suit)
  }
  // 改
  async updateSuit(id, suit) {
    return this.app.model.Suit.update(suit, {
      where: {
        id: id
      }
    });
  }
  // 删
  async deleteSuit(id) {
    return this.app.model.Suit.destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = SuitService;