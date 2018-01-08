/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-08 17:07:30
 */
'use strict';
const Router = require('koa-router');
const squel = require('squel');
const sqlhelper = require('./utils/mysql-helper');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    ctx.body = `<h1>你好</h1>`;
  })
  .post('/create', async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = {
      ...ctx.request.body
    };
  })
  .get('/getusers', async (ctx, next) => {
    let sql = squel
      .select()
      .from('sm_user')
      .toParam();

    await sqlhelper.query(sql.text, sql.values).then(result => {
      console.log(result);
      ctx.body = {
        ...result
      };
    });
  });

module.exports = router.routes();
