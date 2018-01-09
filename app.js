/*
 * @Author: Lienren 
 * @Date: 2018-01-02 14:28:21 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-09 11:02:51
 */
'use strict';
const http = require('http');
const path = require('path');
const koa = require('koa');
const koastatic = require('koa-static');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new koa();

const mysqlconfig = require('./configs/mysql_config');
const sqlhelper = require('mysql-helper-simple')(mysqlconfig);
app.context.db = sqlhelper

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

// 使用路由
const router = require('./router');
app.use(router);

// 绑定访问端口
http.createServer(app.callback()).listen(3000);
