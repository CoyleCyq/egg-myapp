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
  router.post('/api/clothes/deleteClothes', controller.clothes.deleteClothes);

  /* 套装 */
  router.get('/api/suit/getAllSuit', controller.suit.getAllSuit);
  router.get('/api/suit/getSuit', controller.suit.getSuit);
  router.post('/api/suit/addSuit', controller.suit.addSuit);
  router.post('/api/suit/updateSuit', controller.suit.updateSuit);
  router.post('/api/suit/deleteSuit', controller.suit.deleteSuit);

  /* 印象 */
  router.get('/api/impression/getAllImpression', controller.impression.getAllImpression);
  router.get('/api/impression/getImpression', controller.impression.getImpression);
  router.post('/api/impression/addImpression', controller.impression.addImpression);
  router.post('/api/impression/updateImpression', controller.impression.updateImpression);
  router.post('/api/impression/deleteImpression', controller.impression.deleteImpression);
  
  /* 设计师之影 */
  router.get('/api/designerShadow/getAllDesignerShadow', controller.designerShadow.getAllDesignerShadow);
  router.get('/api/designerShadow/getDesignerShadow', controller.designerShadow.getDesignerShadow);
  router.post('/api/designerShadow/addDesignerShadow', controller.designerShadow.addDesignerShadow);
  router.post('/api/designerShadow/updateDesignerShadow', controller.designerShadow.updateDesignerShadow);
  router.post('/api/designerShadow/deleteDesignerShadow', controller.designerShadow.deleteDesignerShadow);
  /* 分数 */ 
  router.get('/api/alliance/getAllData', controller.alliance.getAllData);
  router.post('/api/alliance/singleUpdate', controller.alliance.singleUpdate);

  // 日志
  router.post('/api/operationLog/addLog', controller.operationLog.addLog);
  router.post('/api/operationLog/deleteLog', controller.operationLog.deleteLog);
};
