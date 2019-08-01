const Service = require('egg').Service;

class TableService extends Service {
  async findCountry(options) {
    try {
      const data = await Promise.all([
        this.app.model.Country.count({
          where: options.where
        }),
        this.app.model.Country.findAll(options)
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
}

module.exports = TableService;