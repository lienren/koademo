/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-10 17:20:06
 */
'use strict';
const Router = require('koa-router');
const squel = require('squel');
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

    let result = await ctx.db.query({
      sql: sql.text,
      values: sql.values
    });

    ctx.body = {
      ...result
    };
  })
  .get('/getbatch', async (ctx, next) => {
    let sql = squel
      .select()
      .from('sm_user')
      .toParam();

    let results = await ctx.db.batch([ctx.db.query({ sql: sql.text, values: sql.values })]);
    ctx.body = {
      ...results[0]
    };
  });

module.exports = router.routes();
