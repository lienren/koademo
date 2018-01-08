/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by:   Lienren 
 * @Last Modified time: 2018-01-08 16:21:55 
 */
const Router = require('koa-router');
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
  });

module.exports = router.routes();
