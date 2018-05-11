/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-03-27 09:50:11
 */
('use strict');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const squel = require('squel');
const axios = require('axios');
const md5 = require('md5');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('hello world!');
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
    if (response.status === 200) {
      let response_data = JSON.stringify(response.data);
      let data = [];
      if (ctx.redis) {
        data = await ctx.redis.get('data');
        if (data && md5(data) !== md5(JSON.stringify(response_data))) {
          data = JSON.stringify(response_data);
          ctx.redis.set('data', JSON.stringify(response_data));
        }
      } else {
        data = response_data;
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
