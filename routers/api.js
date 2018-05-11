/*
 * @Author: Lienren 
 * @Date: 2018-03-27 09:52:04 
 * @Last Modified by: Lienren
 * @Last Modified time: 2018-04-26 16:45:22
 */
('use strict');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const wait = require('./delay');
const Router = require('koa-router');
const router = new Router();
const sys_path = process.cwd();

//operator
//1 移动
//2 电信
//3 联通

router
  .all('/api/xhw', async (ctx, next) => {
    let body = ctx.request.body;
    body.timeout = body.timeout || 0;
    let apiKey = body.apiKey;

    switch (apiKey) {
      case 'A01010':
      case 'A02010':
      case 'A03010':
        // realname
        body = {
          ...ctx.api_data['xhw_realname']
        };

        ctx.body = {
          code: body.code,
          data: {
            checkResult: body.checkResult,
            result: body.result
          }
        };
        break;
      case 'A01050':
      case 'A02050':
      case 'A03040':
        // level
        body = {
          ...ctx.api_data['xhw_level']
        };

        ctx.body = {
          code: body.code,
          data: {
            resultValue: body.resultValue,
            result: body.result,
            message: body.message,
            score: body.score
          }
        };
        break;
      case 'A01040':
      case 'A02040':
      case 'A03030':
        // nettime
        body = {
          ...ctx.api_data['xhw_nettime']
        };

        ctx.body = {
          code: body.code,
          data: {
            resultValue: body.resultValue,
            result: body.result
          }
        };
        break;
      default:
        ctx.body = {
          code: '-1',
          data: {
            message: '未收到apiKey'
          }
        };
        break;
    }

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/xhw_realname', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      code: body.code,
      data: {
        checkResult: body.checkResult,
        result: body.result
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/xhw_level', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      code: body.code,
      data: {
        resultValue: body.resultValue,
        result: body.result,
        message: body.message,
        score: body.score
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/xhw_nettime', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      code: body.code,
      data: {
        resultValue: body.resultValue,
        result: body.result
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/ty_realname', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      credit: {
        header: {
          rspCode: body.rspCode
        },
        body: {
          checkResultAllDetail: body.checkResultAllDetail
        }
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/ty_level', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      credit: {
        header: {
          rspCode: body.rspCode
        },
        body: {
          billingCharges: body.billingCharges
        }
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/ty_nettime', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      credit: {
        header: {
          rspCode: body.rspCode
        },
        body: {
          netWorkTime: body.netWorkTime
        }
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/td_realname', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      interfaces: [
        {
          details: [
            {
              result: {
                success: body.success,
                result: body.result
              }
            }
          ]
        }
      ]
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/td_realname2', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      success: body.success,
      id: 'WF2018041115112318489544',
      nextService: body.nextService,
      reason_code: body.reason_code,
      reason_desc: body.reason_desc,
      result_desc: {
        AUTHENTICATION_INFOQUERY: {
          MobileAndNameAndIDCheck: {
            mobile_three_element_consistence: body.mobile_three_element_consistence,
            error_info: body.error_info
          },
          MobileDuration: {
            mobile_online_time_info: body.mobile_online_time_info,
            mobile_online_time_consistence: body.mobile_online_time_consistence
          }
        }
      }
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/td_nettime', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      interfaces: [
        {
          details: [
            {
              result: {
                success: body.success,
                result: body.result,
                display: body.display
              }
            }
          ]
        }
      ]
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/td_seq_id', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      seq_id: uuidv1()
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/td_score', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      final_decision: body.final_decision,
      final_score: body.final_score,
      hit_rules: [
        {
          decision: body.hit_rules[0].decision,
          id: body.hit_rules[0].id,
          name: body.hit_rules[0].name,
          parentUuid: body.hit_rules[0].parentUuid,
          score: body.hit_rules[0].score,
          uuid: body.hit_rules[0].uuid
        }
      ],
      success: body.success
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/lt_realname', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      ...body
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/lt_level', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      ...body
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/lt_score', async (ctx, next) => {
    let body = ctx.request.body;
    let api_data_key = ctx.path.substring(ctx.path.lastIndexOf('/') + 1, ctx.path.length);

    body = {
      ...ctx.api_data[api_data_key]
    };

    ctx.body = {
      ...body
    };

    if (body.timeout > 0) {
      await wait(body.timeout);
    }

    next();
  })
  .all('/api/setdata', async (ctx, next) => {
    let body = ctx.request.body;

    for (let key in body) {
      ctx.api_data[key] = {
        ...body[key]
      };
    }

    ctx.body = {
      status: 'success'
    };

    next();
  })
  .post('/api/get_api_md', async (ctx, next) => {
    let filepath = path.join(sys_path, 'static', 'abapi.md');
    let filecontext = await fs.readFileSync(filepath, 'utf-8');

    ctx.body = {
      filecontext: filecontext
    };

    next();
  })
  .post('/api/set_api_md', async (ctx, next) => {
    let filepath = path.join(sys_path, 'static', 'abapi.md');
    let filecontext = ctx.request.body.filecontext || '';

    await fs.writeFileSync(filepath, filecontext, { flag: 'w', encoding: 'utf-8', mode: '0666' });

    ctx.body = {
      filecontext: filecontext
    };

    next();
  });

module.exports = router.routes();
