'use strict';
module.exports = app => {
  global.Op = app.Sequelize.Op;
  global.Sequelize = app.Sequelize;
  app.beforeStart(async () => {
    // await app.model.sync();
  });
  app.ready(async () => {
    console.log('启动成功');
  });
};