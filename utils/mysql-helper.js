/*
 * @Author: Lienren 
 * @Date: 2018-01-08 16:34:24 
 * @Last Modified by:   Lienren 
 * @Last Modified time: 2018-01-08 16:34:24 
 */
'use strict';
const mysql = require('mysql');
const mysql_config = require('../configs/mysql_config.json');

module.exports = {
  start() {
    this.connection = mysql.createConnection(mysql_config);
    this.connection.connect();
    return this;
  },
  end() {
    if (this.connection) {
      this.connection.end();
    }
    return this;
  },
  execute(sql, values, callback) {
    if (values) {
      sql = mysql.format(sql, values);
    }

    this.connection.query(sql, (err, rows, fields) => {
      callback({ err: err, rows: rows, fields: fields });
    });
    return this;
  },
  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.start()
        .execute(sql, values, result => {
          if (result.err) {
            reject(result.err);
          } else {
            resolve(result.rows);
          }
        })
        .end();
    });
  },
  create(sql, values) {
    let get_auto_id = 'SELECT LAST_INSERT_ID() as id;';
    return new Promise((resolve, reject) => {
      this.start()
        .execute(sql, values, result => {
          if (result.err) {
            reject(result.err);
          }
        })
        .execute(get_auto_id, result => {
          if (result.err) {
            reject(result.err);
          } else {
            resolve(result.rows);
          }
        })
        .end();
    });
  },
  update(sql, values) {
    return new Promise((resolve, reject) => {
      this.start()
        .execute(sql, values, result => {
          if (result.err) {
            reject(result.err);
          } else {
            resolve({ rows: result.rows.affectedRows });
          }
        })
        .end();
    });
  },
  batch(executes, { completeHanding = result => {}, exceptionHandling = err => {} }) {
    Promise.all(executes)
      .then(completeHanding)
      .catch(exceptionHandling);
  }
};
