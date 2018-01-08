/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-08 20:35:35
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

    await ctx.db
      .query({
        sql: sql.text,
        values: sql.values
      })
      .then(result => {
        console.log(result);
        ctx.body = {
          ...result
        };
      });
  })
  .get('/getbatch', async (ctx, next) => {
    let sql = squel
      .select()
      .from('sm_user')
      .toParam();

    await ctx.db.batch([ctx.db.query({ sql: sql.text, values: sql.values })], {
      completeHanding: results => {
        console.log('result:', results);
        ctx.body = {
          ...results[0]
        };
      },
      exceptionHandling: err => {
        ctx.body = {
          ...err
        };
      }
    });
  });

module.exports = router.routes();
