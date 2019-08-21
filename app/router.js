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
  /* country */
  router.get('/api/country/getCountry', controller.country.getCountry);
  router.get('/api/country/getAllCountry', controller.country.getAllCountry);

  /* clothes */
  router.get('/api/clothes/getAllClothes', controller.clothes.getAllClothes);
  router.get('/api/clothes/getClothes', controller.clothes.getClothes);
};
