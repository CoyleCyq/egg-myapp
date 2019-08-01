const Service = require('egg').Service;

class AccountService extends Service {
  async findByName(name) {
    const user = await this.app.mysql.get('user', { name: name });
    return user;
  }
  async findBytoken(token) {
    const user = await this.app.mysql.get('user', { roles: token });
    return user;
  }
}

module.exports = AccountService;
