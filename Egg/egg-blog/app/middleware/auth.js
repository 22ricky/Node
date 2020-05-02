'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.session.sessionId) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        error: true,
        message: '您还没有登录，无法访问',
      };
    }
  };
};
