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
  router.get('/api/country/getCountry', controller.country.getCountry);
  router.get('/api/country/getAllCountry', controller.country.getAllCountry);
  router.get('/api/clothes/getAllClothes', controller.clothes.getAllClothes);
};
