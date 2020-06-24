'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.get('/admin/index', auth, controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/type', auth, controller.admin.main.type);
  router.post('/admin/article', auth, controller.admin.main.addArticle);
  router.get('/admin/articles', auth, controller.admin.main.getArticles);
  router.delete('/admin/article', auth, controller.admin.main.delArticle);
  router.get('/admin/article/:id', auth, controller.admin.main.getArticle);
};
