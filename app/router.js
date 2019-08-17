'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/account/login', controller.account.login);
  router.post('/api/account/logout', controller.account.logout);
  router.get('/api/account/getUserInfo', controller.account.getUserInfo);
  router.post('/api/table/country', controller.table.getCountry);
  router.get('/api/table/allCountry', controller.table.getAllCountry);
  router.get('/api/clothes/getAllclothes', controller.clothes.getAllClothes);
};
