const Service = require('egg').Service;

class AllianceService extends Service {
  async findAllianceScore(options) {
    let sql = ''
    if (options.where.dateBegin && options.where.dateEnd) {
      console.log(options.where.dateBegin,options.where.dateEnd )
      sql = 'SELECT name ,'
      let dateArr = this.app.getCustomDate(options.where.dateBegin, options.where.dateEnd)
      console.log('dateArr', dateArr)
      dateArr.forEach((item)=>{
        if (dateArr[dateArr.length - 1] === item) {
          sql += ` MAX(CASE date WHEN '${item}' THEN score ELSE 0 END) '${item}'`
        } else {
          sql += ` MAX(CASE date WHEN '${item}' THEN score ELSE 0 END) '${item}',`
        }
      })
      sql += ' FROM test.alliance'
    }
    if (options.where.name) {
      sql += ` WHERE name LIKE '%${options.where.name}%'`
    }
    sql += ' GROUP BY name'
    return this.app.model.query(sql).spread(function (results) {
      let newList = results.map((item) => {
        return item
      })
      return {
        dataList: newList,
        count: newList.length
      }
    })
  }
  async findUserData(options) {
    try {
      const data = await Promise.all([
        this.app.model.Alliance.count({
          where: options.where
        }),
        this.app.model.Alliance.findAll(options)
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
  async addUser(options) {
    return this.app.model.Alliance.create(options)
  }
  async updateScore(data) {
    return this.app.model.Alliance.update(data, {
      where: {
        name: data.name,
        date: data.date
      }
    });
  }
}

module.exports = AllianceService;
