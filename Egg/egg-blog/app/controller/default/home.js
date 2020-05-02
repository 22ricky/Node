'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const result = await app.mysql.get('blog_content', {});
    ctx.body = result;
  }

  async type() {
    const { ctx, app } = this;
    const data = await app.mysql.select('type');
    ctx.body = data;
  }

  async list() {
    const { ctx, app } = this;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.view_count as view_count,' +
                'FROM_UNIXTIME(article.addTime, "%Y-%m-%d") as addTime,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id';
    const data = await app.mysql.query(sql);
    ctx.body = data;
  }

  async getListById() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.view_count as view_count,' +
                'FROM_UNIXTIME(article.addTime, "%Y-%m-%d") as addTime,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.type_id = ' + id;
    const data = await app.mysql.query(sql);
    ctx.body = data;
  }

  async detail() {
    const { ctx, app } = this;
    const { id } = ctx.params;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                'FROM_UNIXTIME(article.addTime, "%Y-%m-%d") as addTime,' +
                'article.view_count as view_count,' +
                'type.typeName as typeName,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                'WHERE article.id = ' + id;
    const data = await app.mysql.query(sql);
    ctx.body = data;
  }
}

module.exports = HomeController;
