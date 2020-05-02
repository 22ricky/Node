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
};
