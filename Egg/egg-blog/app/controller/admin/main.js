'use strict';

const Controller = require('egg').Controller;
class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello egg';
  }
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const sql = 'SELECT username FROM admin_user WHERE username = \'' + username +
                '\' AND password = \'' + password + '\'';
    const data = await app.mysql.query(sql);
    if (data.length) {
      const sessionId = new Date().getTime();
      ctx.session.sessionId = sessionId;
      ctx.body = { sessionId, message: '登录成功' };
    } else {
      ctx.body = {
        error: true,
        message: '用户名或密码错误',
      };
    }
  }
  async type() {
    const { ctx, app } = this;
    const data = await app.mysql.select('type');
    ctx.body = data;
  }
}

module.exports = MainController;
