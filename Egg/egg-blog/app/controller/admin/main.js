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
  async addArticle() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    const { insertId: id, affectedRows } = await app.mysql.insert('article', data);
    if (affectedRows === 1) {
      ctx.body = { id, message: '发布文章成功' };
    } else {
      ctx.body = {
        error: true,
        message: '发布文章失败',
      };
    }
  }
  async getArticles() {
    const { ctx, app } = this;
    const sql = 'SELECT article.id as id,' +
                'type.typeName as typeName,' +
                'article.title as title,' +
                'FROM_UNIXTIME(article.addTime, \'%Y-%m-%d\') as addTime,' +
                'article.view_count as view_count ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'ORDER BY article.id DESC';
    const data = await app.mysql.query(sql);
    ctx.body = data;
  }
  async delArticle() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;
    const data = await app.mysql.delete('article', { id });
    ctx.body = data;
  }
  async getArticle() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const sql = 'SELECT article.id as id,' +
                'article.type_id as type_id,' +
                'article.title as title,' +
                'article.article_content as article_content,' +
                'article.introduce as introduce,' +
                'FROM_UNIXTIME(article.addTime, \'%Y-%m-%d\') as addTime ' +
                'FROM article WHERE article.id = ' + id;
    const [ data ] = await app.mysql.query(sql);
    ctx.body = data;
  }
}

module.exports = MainController;
