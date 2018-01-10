/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-10 20:18:48
 */
'use strict';
const Router = require('koa-router');
const squel = require('squel');
const axios = require('axios');
const md5 = require('md5');
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
  })
  .get('/users', async (ctx, next) => {
    let response = await axios.get('https://bmstorex.billgenius.cn/api/user/getusers');
    console.log('response:', response);
    if (response.status === 200) {
      let data = await ctx.redis.get('data');
      if (data && md5(data) !== md5(JSON.stringify(response.data))) {
        data = JSON.stringify(response.data);
        ctx.redis.set('data', JSON.stringify(response.data));
      }

      ctx.body = {
        data: JSON.parse(data)
      };
    } else {
      ctx.body = {
        ...response.status
      };
    }
  });

module.exports = router.routes();
