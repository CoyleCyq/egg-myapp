/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.erpToken = 'admin';
  config.sequelize = { // 阿里数据库 9月到期
    dialect: 'mysql',
    database: 'test', // 
    username: 'root',
    password: 'Cyq19940802',
    host: 'rm-wz9282q8h24jq6j159o.mysql.rds.aliyuncs.com',
    port: 3306
  };
  config.security = { // egg-cors
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080']
  };
  // 允许跨域
  config.cors = { // egg-cors
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.static = { // 静态资源目录
    prefix: '/',
    dir: [path.join(appInfo.baseDir, 'app/public/')],
    dynamic: true,
    preload: false,
    maxAge: 60000,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564626673176_5937';

  // add your middleware config here
  config.middleware = ["myCors", "formatResponse"];
  config.formatResponse = {}; // 定义的中间件配置

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
