/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:21:55 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-01-25 10:45:04
 */
('use strict');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const squel = require('squel');
const axios = require('axios');
const md5 = require('md5');
const gm = require('gm');
const barcode = require('barcode');
const router = new Router();

function makeimg() {
  let uuid = uuidv1();
  // let file_name = uuid + '.jpg';
  let file_name = '123456.jpg';
  let file_path = 'make_imgs';
  let domain = '';
  let phy_path = path.join(__dirname, './static', file_path);
  let phy_file = path.join(phy_path, file_name);
  let vir_path = path.join(domain, file_path);
  let vir_file = path.join(vir_path, file_name);

  if (!fs.existsSync(phy_path)) {
    fs.mkdirSync(phy_path);
  }

  var code39 = barcode('code39', {
    data: 'it works',
    width: 400,
    height: 100
  });

  return new Promise((resolve, reject) => {
    code39.getStream(function(err, readStream) {
      if (err) throw err;

      gm(1181, 1771, '#ffffff')
        .setFormat('JPEG')
        .font('./fonts/PingFang.ttc')
        .fontSize(48)
        .drawText(10, 50, '李恩仁打印测试')
        .append(readStream)
        .quality(100)
        .noProfile()
        .strip()
        .write(phy_file, err => {
          if (err) {
            reject(err);
          } else {
            if (fs.existsSync(phy_file)) {
              resolve({
                exists: true,
                filepath: vir_file
              });
            } else {
              resolve({
                exists: false,
                filepath: ''
              });
            }
          }
        });
    });
  });
}

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
  })
  .get('/getimg', async (ctx, next) => {
    await makeimg()
      .then(data => {
        ctx.body = {
          ...data
        };
      })
      .catch(err => {
        ctx.body = {
          err: err
        };
      });
  });

module.exports = router.routes();
