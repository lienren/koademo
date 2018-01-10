/*
 * @Author: Lienren 
 * @Date: 2018-01-02 14:28:21 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-10 19:57:23
 */
'use strict';
const http = require('http');
const path = require('path');
const koa = require('koa');
const koastatic = require('koa-static');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new koa();

// mysql数据库初始化
const mysql_config = require('./configs/mysql_config');
const sqlhelper = require('mysql-helper-simple')(mysql_config);
app.context.db = sqlhelper;

// redis初始化
const redis_config = require('./configs/redis_config');
const redis = require('ioredis');
const redishelper = new redis(redis_config);
app.context.redis = redishelper;

// 静态存放地址
const staticPath = './static';
app.use(koastatic(path.join(__dirname, staticPath)));

// 配置跨域访问
app.use(
  cors({
    origin: function(ctx) {
      if (ctx.url === '/test') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
);

// 使用koa-bodyparser中间件
app.use(bodyParser());

// 全局处理异常
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = {
      code: err.code,
      message: err.message
    };
    ctx.status = err.status || 500;
  }
});

// 使用路由
const router = require('./router');
app.use(router);

// 绑定访问端口
http.createServer(app.callback()).listen(3000);
