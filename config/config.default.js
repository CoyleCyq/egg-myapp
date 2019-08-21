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
  config.sequelize = { 
    dialect: 'mysql',
    database: 'test', 
    username: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306,
    define: {
      underscored: false
    },
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
