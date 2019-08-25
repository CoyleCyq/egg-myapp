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
  /* 国家 */
  router.get('/api/country/getCountry', controller.country.getCountry);
  router.get('/api/country/getAllCountry', controller.country.getAllCountry);

  /* 服装 */
  router.get('/api/clothes/getAllClothes', controller.clothes.getAllClothes);
  router.get('/api/clothes/getClothes', controller.clothes.getClothes);
  router.post('/api/clothes/addClothes', controller.clothes.addClothes);
  router.post('/api/clothes/updateClothes', controller.clothes.updateClothes);

  /* 套装 */
  router.get('/api/suit/getAllSuit', controller.suit.getAllSuit);
  router.get('/api/suit/getSuit', controller.suit.getSuit);
  router.post('/api/suit/addSuit', controller.suit.addSuit);
  router.post('/api/suit/updateSuit', controller.suit.updateSuit);
  router.post('/api/suit/deleteSuit', controller.suit.deleteSuit);
};
